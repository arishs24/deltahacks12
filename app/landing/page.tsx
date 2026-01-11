'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Atom, 
  Database, 
  Brain, 
  FileText, 
  ArrowRight,
  Stethoscope,
  Activity,
  Target,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function LandingPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-clinical-grey-50 via-white to-clinical-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-clinical-blue-600" />
            <span className="text-2xl font-bold text-clinical-grey-900">PatellaScope</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/viewer">
              <Button variant="ghost">Model Viewer</Button>
            </Link>
            <Link href="/planner">
              <Button variant="ghost">Recovery Planner</Button>
            </Link>
            <Link href="/viewer">
              <Button className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-clinical-grey-900 mb-6">
          Advanced Knee Biomechanics Analysis
        </h1>
        <p className="text-xl text-clinical-grey-600 mb-8 max-w-3xl mx-auto">
          PatellaScope combines Finite Element Analysis, AI-powered medical databases, 
          and interactive 3D visualization to revolutionize knee injury diagnosis and treatment planning.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/viewer">
            <Button size="lg" className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white">
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#technology">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Technology Overview */}
      <section id="technology" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-clinical-grey-900 mb-12">
          Advanced Technology Stack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FEA Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="h-6 w-6 text-clinical-blue-600" />
                <CardTitle>Finite Element Analysis (FEA)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Our FEA engine uses advanced numerical methods to simulate biomechanical stress and strain 
                in knee structures under various loading conditions.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('fea')}
                className="w-full"
              >
                {expandedSection === 'fea' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === 'fea' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>Mathematical Foundation:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Von Mises stress calculations: σ_vm = √(σ₁² + σ₂² - σ₁σ₂)</li>
                    <li>Strain energy density: U = ½ σᵢⱼεᵢⱼ</li>
                    <li>Hooke's Law: σ = Eε (stress-strain relationship)</li>
                    <li>ODE-based time-dependent analysis for gait cycles</li>
                  </ul>
                  <p className="mt-3"><strong>Applications:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Ligament stress distribution analysis</li>
                    <li>Cartilage wear prediction</li>
                    <li>Post-surgical biomechanical assessment</li>
                    <li>Recovery progress tracking</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Physics Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Atom className="h-6 w-6 text-purple-600" />
                <CardTitle>Biomechanical Physics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Real-time physics simulations model joint kinematics, force vectors, and tissue deformation 
                to predict injury patterns and healing responses.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('physics')}
                className="w-full"
              >
                {expandedSection === 'physics' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === 'physics' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>Key Principles:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Newton's laws of motion for joint dynamics</li>
                    <li>Torque calculations: τ = r × F</li>
                    <li>Elastic modulus (Young's modulus) for tissue stiffness</li>
                    <li>Poisson's ratio for 3D deformation</li>
                  </ul>
                  <p className="mt-3"><strong>Simulations:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Gait cycle analysis (heel strike to toe-off)</li>
                    <li>Pivot shift and Lachman test simulations</li>
                    <li>Load distribution across joint surfaces</li>
                    <li>Compensatory mechanism modeling</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* RAG Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-6 w-6 text-green-600" />
                <CardTitle>RAG Medical Database</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Retrieval-Augmented Generation combines our medical knowledge base with AI to provide 
                evidence-based treatment recommendations and clinical insights.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('rag')}
                className="w-full"
              >
                {expandedSection === 'rag' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === 'rag' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>How It Works:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Vector embeddings of medical literature and case studies</li>
                    <li>Semantic search across PubMed, clinical guidelines, and research</li>
                    <li>Context-aware retrieval based on patient-specific data</li>
                    <li>LLM synthesis of evidence-based recommendations</li>
                  </ul>
                  <p className="mt-3"><strong>Data Sources:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Peer-reviewed medical journals</li>
                    <li>Clinical practice guidelines (AAOS, AOSSM)</li>
                    <li>Biomechanics research databases</li>
                    <li>Real-world case outcomes</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Database Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Database className="h-6 w-6 text-orange-600" />
                <CardTitle>Medical Database</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Comprehensive database of knee anatomy, injury patterns, surgical procedures, 
                and rehabilitation protocols for evidence-based decision support.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('database')}
                className="w-full"
              >
                {expandedSection === 'database' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === 'database' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>Content:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>3D anatomical models (STL meshes)</li>
                    <li>Injury classification schemas (ACL, MCL, meniscus tears)</li>
                    <li>Surgical technique libraries</li>
                    <li>Rehabilitation exercise protocols</li>
                  </ul>
                  <p className="mt-3"><strong>Features:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Patient data management (MongoDB Atlas)</li>
                    <li>Longitudinal tracking of recovery</li>
                    <li>Comparative analysis with population norms</li>
                    <li>Export capabilities for clinical records</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vectra/Vulture Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-6 w-6 text-yellow-600" />
                <CardTitle>Vectra Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Advanced imaging analysis and 3D reconstruction from MRI/DICOM data using 
                state-of-the-art segmentation and mesh generation algorithms.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('vectra')}
                className="w-full"
              >
                {expandedSection === 'vectra' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === 'vectra' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>Capabilities:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>DICOM/NIfTI file processing</li>
                    <li>Automated tissue segmentation</li>
                    <li>3D mesh generation (STL output)</li>
                    <li>Multi-planar reconstruction</li>
                  </ul>
                  <p className="mt-3"><strong>Output:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>High-resolution 3D knee models</li>
                    <li>Ligament and cartilage isolation</li>
                    <li>Pathology detection and classification</li>
                    <li>Interactive visualization ready</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive 3D Section */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-6 w-6 text-red-600" />
                <CardTitle>Interactive 3D Visualization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-clinical-grey-600 mb-4">
                Real-time 3D model manipulation with surgical planning tools, including 
                incision marking, measurement tools, and stress visualization overlays.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('3d')}
                className="w-full"
              >
                {expandedSection === '3d' ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Learn More
                  </>
                )}
              </Button>
              {expandedSection === '3d' && (
                <div className="mt-4 p-4 bg-clinical-grey-50 rounded-lg text-sm space-y-2">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>3D model rotation, zoom, and pan</li>
                    <li>Surgical incision planning and marking</li>
                    <li>Measurement tools (distance, angle)</li>
                    <li>Stress/strain heat map overlays</li>
                  </ul>
                  <p className="mt-3"><strong>Tools:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-clinical-grey-700">
                    <li>Annotation system for surgical notes</li>
                    <li>Export capabilities for surgical planning</li>
                    <li>Multi-view synchronization</li>
                    <li>VR/AR ready formats</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-clinical-grey-900 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <Target className="h-8 w-8 text-clinical-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Surgical Planning</h3>
              <p className="text-clinical-grey-600">
                Plan and simulate surgical procedures with interactive 3D models, 
                incision marking, and biomechanical predictions.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Activity className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Recovery Tracking</h3>
              <p className="text-clinical-grey-600">
                Monitor recovery progress with daily FEA analysis, showing stress reduction 
                and progress toward healthy biomechanical targets.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Brain className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-clinical-grey-600">
                Get personalized exercise recommendations and treatment plans based on 
                your specific injury and recovery progress.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FileText className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Clinical Documentation</h3>
              <p className="text-clinical-grey-600">
                Comprehensive patient records with FEA results, surgical plans, 
                and recovery metrics for clinical decision support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-clinical-grey-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-clinical-grey-600 mb-8">
          Experience the future of knee injury diagnosis and treatment planning.
        </p>
        <Link href="/viewer">
          <Button size="lg" className="bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white">
            Launch PatellaScope
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-clinical-grey-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-6 w-6 text-clinical-blue-400" />
              <span className="text-lg font-semibold">PatellaScope</span>
            </div>
            <p className="text-clinical-grey-400 text-sm">
              Advanced Knee Biomechanics Analysis Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
