'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  simulateSurgery, 
  getInitialStressForTear, 
  SurgeryType, 
  SurgeryResult,
  LigamentStress 
} from '@/lib/surgery-simulation';
import { TearType } from '@/lib/fea-simulation';
import { Scissors, TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SurgerySimulationProps {
  tearType: TearType;
  onSurgeryComplete?: (result: SurgeryResult) => void;
}

const SURGERY_OPTIONS: { value: SurgeryType; label: string; description: string }[] = [
  {
    value: 'acl_reconstruction',
    label: 'ACL Reconstruction',
    description: 'Restore anterior stability using autograft or allograft',
  },
  {
    value: 'mcl_repair',
    label: 'MCL Repair',
    description: 'Surgical repair of medial collateral ligament',
  },
  {
    value: 'meniscectomy',
    label: 'Meniscectomy',
    description: 'Partial removal of damaged meniscus',
  },
  {
    value: 'cartilage_repair',
    label: 'Cartilage Repair',
    description: 'Microfracture or cartilage grafting procedure',
  },
  {
    value: 'osteotomy',
    label: 'Osteotomy',
    description: 'Bone realignment to redistribute joint stress',
  },
];

export function SurgerySimulation({ tearType, onSurgeryComplete }: SurgerySimulationProps) {
  const [selectedSurgery, setSelectedSurgery] = useState<SurgeryType>(null);
  const [surgeryResult, setSurgeryResult] = useState<SurgeryResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSurgery = async () => {
    if (!selectedSurgery || !tearType) return;

    setIsSimulating(true);
    
    // Simulate surgery computation time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const initialStress = getInitialStressForTear(tearType);
    const result = simulateSurgery(selectedSurgery, initialStress);
    
    setSurgeryResult(result);
    setIsSimulating(false);

    if (onSurgeryComplete) {
      onSurgeryComplete(result);
    }
  };

  // Prepare data for comparison chart
  const stressComparisonData = surgeryResult ? [
    {
      structure: 'ACL',
      'Pre-Surgery': surgeryResult.preSurgeryStress.acl,
      'Post-Surgery': surgeryResult.postSurgeryStress.acl,
    },
    {
      structure: 'MCL',
      'Pre-Surgery': surgeryResult.preSurgeryStress.mcl,
      'Post-Surgery': surgeryResult.postSurgeryStress.mcl,
    },
    {
      structure: 'PCL',
      'Pre-Surgery': surgeryResult.preSurgeryStress.pcl,
      'Post-Surgery': surgeryResult.postSurgeryStress.pcl,
    },
    {
      structure: 'LCL',
      'Pre-Surgery': surgeryResult.preSurgeryStress.lcl,
      'Post-Surgery': surgeryResult.postSurgeryStress.lcl,
    },
    {
      structure: 'Patellar Tendon',
      'Pre-Surgery': surgeryResult.preSurgeryStress.patellarTendon,
      'Post-Surgery': surgeryResult.postSurgeryStress.patellarTendon,
    },
  ] : [];

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-clinical-grey-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Surgery Simulation Card - Full Width */}
      <Card className="border-2 border-clinical-blue-200">
        <CardHeader className="bg-gradient-to-r from-clinical-blue-50 to-clinical-blue-100">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Scissors className="h-7 w-7 text-clinical-blue-600" />
            Surgical Planning & Simulation
          </CardTitle>
          <p className="text-clinical-grey-600 mt-2">
            Select a surgical procedure to simulate biomechanical outcomes and plan incisions on the 3D model
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
        {!tearType && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Upload an MRI file first to detect the tear type and enable surgery simulation.
            </p>
          </div>
        )}
        
        {/* Surgery Selection */}
        <div>
          <label className="text-sm font-medium text-clinical-grey-700 mb-2 block">
            Select Surgery Type
          </label>
          <Select
            value={selectedSurgery || ''}
            onValueChange={(value) => setSelectedSurgery(value as SurgeryType)}
            disabled={!tearType}
          >
            <SelectTrigger disabled={!tearType}>
              <SelectValue placeholder={tearType ? "Choose a surgery type..." : "Upload MRI first..."} />
            </SelectTrigger>
            <SelectContent>
              {SURGERY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-clinical-grey-600">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Run Surgery Button */}
        {selectedSurgery && tearType && (
          <Button
            onClick={handleRunSurgery}
            disabled={isSimulating || !tearType}
            className="w-full bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
            size="lg"
          >
            {isSimulating ? (
              <>
                <Scissors className="h-4 w-4 mr-2 animate-pulse" />
                Simulating Surgery...
              </>
            ) : (
              <>
                <Scissors className="h-4 w-4 mr-2" />
                Run Surgery Simulation
              </>
            )}
          </Button>
        )}

        {/* Surgery Results */}
        {surgeryResult && (
          <div className="space-y-6 mt-6">
            {/* Success Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <p className="text-sm text-clinical-grey-600 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {surgeryResult.successRate}%
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-blue-50">
                <p className="text-sm text-clinical-grey-600 mb-1">Recovery Time</p>
                <p className="text-2xl font-bold text-blue-600">
                  {surgeryResult.recoveryTime} weeks
                </p>
              </div>
            </div>

            {/* Stress Comparison Chart */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Stress Changes (Pre vs Post-Surgery)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stressComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="structure" />
                  <YAxis label={{ value: 'Stress (MPa)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Pre-Surgery" fill="#ef4444" />
                  <Bar dataKey="Post-Surgery" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Improvements */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-600" />
                Stress Improvements
              </h4>
              <div className="space-y-2">
                {surgeryResult.improvements.map((improvement, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{improvement.structure}</span>
                      <Badge className={getSignificanceColor(improvement.significance)}>
                        {improvement.significance.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-clinical-grey-600">Before</p>
                        <p className="font-semibold">{improvement.before.toFixed(1)} MPa</p>
                      </div>
                      <div>
                        <p className="text-clinical-grey-600">After</p>
                        <p className="font-semibold text-green-600">
                          {improvement.after.toFixed(1)} MPa
                        </p>
                      </div>
                      <div>
                        <p className="text-clinical-grey-600">Reduction</p>
                        <p className="font-semibold text-green-600">
                          {improvement.stressReduction.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complications */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                Potential Complications
              </h4>
              <div className="space-y-2">
                {surgeryResult.complications.map((complication, index) => (
                  <div key={index} className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                    <p className="text-sm text-orange-800">{complication}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stress Breakdown */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Detailed Stress Analysis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-clinical-grey-600 mb-2">Meniscus</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Medial:</span>
                      <span className="font-semibold">
                        {surgeryResult.postSurgeryStress.meniscus.medial.toFixed(1)} MPa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lateral:</span>
                      <span className="font-semibold">
                        {surgeryResult.postSurgeryStress.meniscus.lateral.toFixed(1)} MPa
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-clinical-grey-600 mb-2">Cartilage</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Femoral:</span>
                      <span className="font-semibold">
                        {surgeryResult.postSurgeryStress.cartilage.femoral.toFixed(1)} MPa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tibial:</span>
                      <span className="font-semibold">
                        {surgeryResult.postSurgeryStress.cartilage.tibial.toFixed(1)} MPa
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Patellar:</span>
                      <span className="font-semibold">
                        {surgeryResult.postSurgeryStress.cartilage.patellar.toFixed(1)} MPa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
}
