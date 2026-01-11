'use client';

import { useEffect, useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Knee part regions (approximate positions - adjust based on your STL)
const KNEE_PARTS = [
  { name: 'Femur', position: [0, 2, 0], color: '#8B4513' },
  { name: 'Tibia', position: [0, -2, 0], color: '#654321' },
  { name: 'Femoral Cartilage', position: [0, 1, 0.5], color: '#90EE90' },
  { name: 'Tibial Cartilage', position: [0, -1, 0.5], color: '#98FB98' },
  { name: 'Patella', position: [0, 0, 1.5], color: '#FFD700' },
  { name: 'ACL', position: [0.3, 0, 0], color: '#FF6B6B' },
  { name: 'PCL', position: [-0.3, 0, 0], color: '#FF8C69' },
  { name: 'MCL', position: [0.5, 0, 0], color: '#FF69B4' },
  { name: 'LCL', position: [-0.5, 0, 0], color: '#FF1493' },
];

interface STLViewerProps {
  stlPath: string;
}

function STLModel({ stlPath, onHover, hoveredPart }: { 
  stlPath: string; 
  onHover: (part: string | null) => void;
  hoveredPart: string | null;
}) {
  const geometry = useLoader(STLLoader, stlPath);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Compute normals for proper lighting
  geometry.computeVertexNormals();

  // Handle mouse move for hover detection
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!meshRef.current) return;

      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(meshRef.current);

      if (intersects.length > 0) {
        // Determine which part based on intersection point
        const point = intersects[0].point;
        // Find closest part based on position
        let closestPart: typeof KNEE_PARTS[0] | null = null;
        let minDistance = Infinity;

        KNEE_PARTS.forEach((part) => {
          const partPos = new THREE.Vector3(...part.position);
          const distance = point.distanceTo(partPos);
          if (distance < minDistance && distance < 1.5) {
            minDistance = distance;
            closestPart = part;
          }
        });

        if (closestPart) {
          onHover(closestPart.name);
        } else {
          onHover(null);
        }
      } else {
        onHover(null);
      }
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [camera, gl, onHover]);

  // Rotate the model slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      scale={1.5} // Much larger scale
    >
      <meshStandardMaterial
        color={hoveredPart ? '#6BA3D8' : '#4A90E2'}
        metalness={0.3}
        roughness={0.7}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function HoverLabel({ partName, color }: { partName: string; color: string }) {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
      <div 
        className="px-4 py-2 bg-white rounded-lg shadow-lg border-2 border-clinical-grey-200"
        style={{ borderColor: color }}
      >
        <p className="font-semibold text-clinical-grey-900" style={{ color }}>
          {partName}
        </p>
      </div>
    </div>
  );
}

function Scene({ stlPath, onHover, hoveredPart }: { 
  stlPath: string; 
  onHover: (part: string | null) => void;
  hoveredPart: string | null;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      
      <Suspense fallback={null}>
        <STLModel stlPath={stlPath} onHover={onHover} hoveredPart={hoveredPart} />
      </Suspense>
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

export default function STLViewer({ stlPath }: STLViewerProps) {
  const [mriUploaded, setMriUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [hoveredPartColor, setHoveredPartColor] = useState<string>('#4A90E2');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMriUploaded(true);
      setIsProcessing(true);
      setModelLoaded(false);

      // Simulate processing stages
      const stages = [
        { text: 'Uploading MRI file...', delay: 500 },
        { text: 'Processing MRI data...', delay: 1000 },
        { text: 'Segmenting knee anatomy...', delay: 1500 },
        { text: 'Generating 3D mesh...', delay: 2000 },
        { text: 'Loading model...', delay: 2500 },
      ];

      let currentStage = 0;
      const processStages = () => {
        if (currentStage < stages.length) {
          setProcessingStage(stages[currentStage].text);
          setTimeout(() => {
            currentStage++;
            processStages();
          }, stages[currentStage].delay);
        } else {
          setTimeout(() => {
            setIsProcessing(false);
            setModelLoaded(true);
          }, 500);
        }
      };
      processStages();
    }
  };

  const handleHover = useCallback((part: string | null) => {
    setHoveredPart(part);
    if (part) {
      const partData = KNEE_PARTS.find(p => p.name === part);
      if (partData) {
        setHoveredPartColor(partData.color);
      }
    }
  }, []);

  // If no MRI uploaded, show upload screen
  if (!mriUploaded) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-clinical-grey-50 to-clinical-grey-100 rounded-lg border-2 border-dashed border-clinical-grey-300">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-clinical-blue-100">
            <Upload className="h-10 w-10 text-clinical-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-clinical-grey-900 text-xl">
              Upload Patient MRI
            </h3>
            <p className="text-sm text-clinical-grey-600">
              Upload a DICOM or NIfTI MRI file to generate a 3D knee model
            </p>
          </div>
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".dcm,.dicom,.nii,.nii.gz,.nifti"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload MRI
            </Button>
          </div>
          <p className="text-xs text-clinical-grey-500">
            Supported formats: DICOM (.dcm, .dicom), NIfTI (.nii, .nii.gz)
          </p>
        </div>
      </div>
    );
  }

  // If processing, show loading screen
  if (isProcessing || !modelLoaded) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-clinical-grey-50 to-clinical-grey-100 rounded-lg">
        <div className="text-center space-y-4 p-6">
          <Loader2 className="h-12 w-12 text-clinical-blue-600 animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="font-semibold text-clinical-grey-900 text-lg">
              Segmenting MRI to STL
            </h3>
            <p className="text-sm text-clinical-grey-600 animate-pulse">
              {processingStage || 'Initializing...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show 3D model
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-clinical-grey-50 to-clinical-grey-100 rounded-lg relative">
      {/* Hover label */}
      {hoveredPart && (
        <HoverLabel partName={hoveredPart} color={hoveredPartColor} />
      )}

      {/* Reset button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMriUploaded(false);
            setModelLoaded(false);
            setIsProcessing(false);
            setHoveredPart(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          className="bg-white hover:bg-clinical-grey-50"
        >
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene stlPath={stlPath} onHover={handleHover} hoveredPart={hoveredPart} />
        </Canvas>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-clinical-grey-200 shadow-sm">
        <p className="text-xs text-clinical-grey-600 text-center">
          {hoveredPart 
            ? `Hovering over: ${hoveredPart}` 
            : 'Interactive 3D knee model • Hover over parts to see labels • Rotate, zoom, and pan to explore'}
        </p>
      </div>
    </div>
  );
}
