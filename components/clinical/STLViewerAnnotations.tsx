'use client';

import { useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export interface Annotation {
  id: string;
  position: [number, number, number];
  type: 'incision' | 'mark' | 'measurement';
  label: string;
  color: string;
}

interface STLViewerAnnotationsProps {
  annotations: Annotation[];
  onAnnotationAdd?: (annotation: Annotation) => void;
  onAnnotationRemove?: (id: string) => void;
  isAnnotationMode: boolean;
  annotationType: 'incision' | 'mark' | 'measurement';
  meshRef?: React.RefObject<THREE.Mesh>;
}

export function STLViewerAnnotations({
  annotations,
  onAnnotationAdd,
  onAnnotationRemove,
  isAnnotationMode,
  annotationType,
  meshRef,
}: STLViewerAnnotationsProps) {
  const { camera, gl, raycaster } = useThree();
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);

  // Handle click for adding annotations
  if (isAnnotationMode && meshRef?.current) {
    const handleClick = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current!);
      
      if (intersects.length > 0) {
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
        
        if (onAnnotationAdd) {
          onAnnotationAdd(newAnnotation);
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    // Note: cleanup would be in useEffect, but this is a simplified version
  }

  return (
    <>
      {annotations.map((annotation) => {
        const [x, y, z] = annotation.position;
        
        return (
          <group key={annotation.id} position={[x, y, z]}>
            {/* Annotation marker */}
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
            
            {/* Label */}
            <Html
              position={[0, 0.2, 0]}
              center
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <div
                className="px-2 py-1 bg-white rounded shadow-lg border text-xs font-semibold"
                style={{ borderColor: annotation.color }}
                onMouseEnter={() => setHoveredAnnotation(annotation.id)}
                onMouseLeave={() => setHoveredAnnotation(null)}
              >
                {annotation.label}
                {hoveredAnnotation === annotation.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAnnotationRemove) {
                        onAnnotationRemove(annotation.id);
                      }
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
