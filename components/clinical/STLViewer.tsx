'use client';

import { useEffect, useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Loader2, Upload, X, Scissors, MapPin, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STLViewerAnnotations, Annotation } from './STLViewerAnnotations';

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

export interface Annotation {
  id: string;
  position: [number, number, number];
  type: 'incision' | 'mark' | 'measurement';
  label: string;
  color: string;
}

interface STLViewerProps {
  stlPath: string;
  onTearTypeDetected?: (tearType: 'mcl_grade3' | 'acl_tear' | null) => void;
  annotations?: Annotation[];
  onAnnotationAdd?: (annotation: Annotation) => void;
  onAnnotationRemove?: (id: string) => void;
  isAnnotationMode?: boolean;
  annotationType?: 'incision' | 'mark' | 'measurement';
}

function STLModel({ 
  stlPath, 
  onHover, 
  hoveredPart,
  annotations,
  onAnnotationAdd,
  onAnnotationRemove,
  isAnnotationMode,
  annotationType,
}: { 
  stlPath: string; 
  onHover: (part: string | null) => void;
  hoveredPart: string | null;
  annotations?: Annotation[];
  onAnnotationAdd?: (annotation: Annotation) => void;
  onAnnotationRemove?: (id: string) => void;
  isAnnotationMode?: boolean;
  annotationType?: 'incision' | 'mark' | 'measurement';
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
    
    // Handle annotation clicks
    if (isAnnotationMode) {
      const handleClick = (event: MouseEvent) => {
        if (!meshRef.current) return;
        
        const rect = gl.domElement.getBoundingClientRect();
        mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.current.setFromCamera(mouse.current, camera);
        const intersects = raycaster.current.intersectObject(meshRef.current);
        
        if (intersects.length > 0 && onAnnotationAdd && annotationType) {
          const point = intersects[0].point;
          
          const newAnnotation: Annotation = {
            id: `annotation-${Date.now()}`,
            position: [point.x, point.y, point.z],
            type: annotationType,
            label: annotationType === 'incision' ? 'Incision Line' : 
                   annotationType === 'mark' ? 'Surgical Mark' : 'Measurement Point',
            color: annotationType === 'incision' ? '#ff0000' : 
                   annotationType === 'mark' ? '#00ff00' : '#0000ff',
          };
          
          onAnnotationAdd(newAnnotation);
        }
      };
      
      gl.domElement.addEventListener('click', handleClick);
      return () => {
        gl.domElement.removeEventListener('mousemove', handleMouseMove);
        gl.domElement.removeEventListener('click', handleClick);
      };
    }
    
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [camera, gl, onHover, isAnnotationMode, annotationType, onAnnotationAdd]);

  // Auto-rotation removed - model stays still for better interaction

  return (
    <>
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
      
      {/* Render annotations */}
      {annotations && annotations.map((annotation) => {
        const [x, y, z] = annotation.position;
        
        return (
          <group key={annotation.id} position={[x, y, z]}>
            {annotation.type === 'incision' ? (
              <mesh>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshBasicMaterial color={annotation.color} />
              </mesh>
            ) : annotation.type === 'mark' ? (
              <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={annotation.color} />
              </mesh>
            ) : (
              <mesh>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color={annotation.color} />
              </mesh>
            )}
            <Html position={[0, 0.2, 0]} center>
              <div className="px-2 py-1 bg-white rounded shadow-lg border text-xs font-semibold" style={{ borderColor: annotation.color }}>
                {annotation.label}
                {onAnnotationRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAnnotationRemove(annotation.id);
                    }}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </>
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

function Scene({ 
  stlPath, 
  onHover, 
  hoveredPart,
  annotations,
  onAnnotationAdd,
  onAnnotationRemove,
  isAnnotationMode,
  annotationType,
}: { 
  stlPath: string; 
  onHover: (part: string | null) => void;
  hoveredPart: string | null;
  annotations?: Annotation[];
  onAnnotationAdd?: (annotation: Annotation) => void;
  onAnnotationRemove?: (id: string) => void;
  isAnnotationMode?: boolean;
  annotationType?: 'incision' | 'mark' | 'measurement';
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      
      <Suspense fallback={null}>
        <STLModel 
          stlPath={stlPath} 
          onHover={onHover} 
          hoveredPart={hoveredPart}
          annotations={annotations}
          onAnnotationAdd={onAnnotationAdd}
          onAnnotationRemove={onAnnotationRemove}
          isAnnotationMode={isAnnotationMode}
          annotationType={annotationType}
        />
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

export default function STLViewer({ 
  stlPath, 
  onTearTypeDetected,
  annotations: externalAnnotations,
  onAnnotationAdd: externalOnAnnotationAdd,
  onAnnotationRemove: externalOnAnnotationRemove,
  isAnnotationMode: externalIsAnnotationMode,
  annotationType: externalAnnotationType,
}: STLViewerProps) {
  const [mriUploaded, setMriUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [modelLoaded, setModelLoaded] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [hoveredPartColor, setHoveredPartColor] = useState<string>('#4A90E2');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Annotation state
  const [internalAnnotations, setInternalAnnotations] = useState<Annotation[]>([]);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [annotationType, setAnnotationType] = useState<'incision' | 'mark' | 'measurement'>('mark');
  
  const annotations = externalAnnotations || internalAnnotations;
  const onAnnotationAdd = externalOnAnnotationAdd || ((annotation: Annotation) => {
    setInternalAnnotations(prev => [...prev, annotation]);
  });
  const onAnnotationRemove = externalOnAnnotationRemove || ((id: string) => {
    setInternalAnnotations(prev => prev.filter(a => a.id !== id));
  });
  const activeAnnotationMode = externalIsAnnotationMode !== undefined ? externalIsAnnotationMode : isAnnotationMode;
  const activeAnnotationType = externalAnnotationType || annotationType;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMriUploaded(true);
      setIsProcessing(true);
      setModelLoaded(false);

      // Detect tear type from filename
      const fileName = file.name.toLowerCase();
      let detectedTearType: 'mcl_grade3' | 'acl_tear' | null = null;
      
      if (fileName.includes('grade3mcltear') || fileName.includes('grade3mcl') || fileName.includes('mcltear')) {
        detectedTearType = 'mcl_grade3';
      } else if (fileName.includes('acltear') || fileName.includes('acl')) {
        detectedTearType = 'acl_tear';
      }

      // Notify parent of detected tear type
      if (detectedTearType && onTearTypeDetected) {
        onTearTypeDetected(detectedTearType);
      }

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

      {/* Annotation Controls */}
      {modelLoaded && (
        <div className="absolute top-16 left-4 z-10 bg-white rounded-lg shadow-lg p-3 border border-clinical-grey-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold">Annotation Tools:</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={activeAnnotationMode && activeAnnotationType === 'incision' ? 'default' : 'outline'}
              onClick={() => {
                setIsAnnotationMode(true);
                setAnnotationType('incision');
              }}
              className="text-xs"
            >
              <Scissors className="h-3 w-3 mr-1" />
              Incision
            </Button>
            <Button
              size="sm"
              variant={activeAnnotationMode && activeAnnotationType === 'mark' ? 'default' : 'outline'}
              onClick={() => {
                setIsAnnotationMode(true);
                setAnnotationType('mark');
              }}
              className="text-xs"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Mark
            </Button>
            <Button
              size="sm"
              variant={activeAnnotationMode && activeAnnotationType === 'measurement' ? 'default' : 'outline'}
              onClick={() => {
                setIsAnnotationMode(true);
                setAnnotationType('measurement');
              }}
              className="text-xs"
            >
              <Ruler className="h-3 w-3 mr-1" />
              Measure
            </Button>
            {activeAnnotationMode && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAnnotationMode(false)}
                className="text-xs"
              >
                Done
              </Button>
            )}
          </div>
          {activeAnnotationMode && (
            <p className="text-xs text-clinical-grey-600 mt-2">
              Click on the 3D model to add {activeAnnotationType === 'incision' ? 'an incision' : activeAnnotationType === 'mark' ? 'a mark' : 'a measurement point'}
            </p>
          )}
        </div>
      )}

      {/* 3D Canvas */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene 
            stlPath={stlPath} 
            onHover={handleHover} 
            hoveredPart={hoveredPart}
            annotations={annotations}
            onAnnotationAdd={onAnnotationAdd}
            onAnnotationRemove={onAnnotationRemove}
            isAnnotationMode={activeAnnotationMode}
            annotationType={activeAnnotationType}
          />
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
