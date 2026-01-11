'use client';

import { useState, useEffect as ReactUseEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingDown, TrendingUp, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { FEASimulationResult } from '@/lib/fea-simulation';
import { recalculateFEA, calculateFEAProgress, FEAProgress, getNormalStress, getNormalTension } from '@/lib/fea-progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Loader2 } from 'lucide-react';

interface DailyFEAAnalysisProps {
  initialFEAResults: FEASimulationResult | null;
  recoveryProgress: number; // 0-100
  onAnalysisComplete?: (progress: FEAProgress) => void;
}

export function DailyFEAAnalysis({ 
  initialFEAResults, 
  recoveryProgress,
  onAnalysisComplete 
}: DailyFEAAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<FEAProgress | null>(null);
  const [previousAnalysis, setPreviousAnalysis] = useState<FEAProgress | null>(null);

  const handleRunAnalysis = async () => {
    if (!initialFEAResults) return;

    setIsAnalyzing(true);
    
    // Simulate analysis computation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save previous analysis for comparison
    if (currentAnalysis) {
      setPreviousAnalysis(currentAnalysis);
    }

    // Recalculate FEA with current recovery progress
    const recalculatedFEA = recalculateFEA(initialFEAResults, recoveryProgress);
    const progress = calculateFEAProgress(initialFEAResults, recalculatedFEA);
    
    setCurrentAnalysis(progress);
    setIsAnalyzing(false);

    if (onAnalysisComplete) {
      onAnalysisComplete(progress);
    }
  };

  // Auto-run analysis when recovery progress changes (workout completed)
  ReactUseEffect(() => {
    if (initialFEAResults && recoveryProgress > 0) {
      // Run analysis when progress changes
      const recalculatedFEA = recalculateFEA(initialFEAResults, recoveryProgress);
      const progress = calculateFEAProgress(initialFEAResults, recalculatedFEA);
      
      // Save previous for comparison
      if (currentAnalysis) {
        setPreviousAnalysis(currentAnalysis);
      }
      
      setCurrentAnalysis(progress);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(progress);
      }
    }
  }, [recoveryProgress, initialFEAResults]);

  if (!initialFEAResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily FEA Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Run FEA simulation in Model Viewer first to enable daily analysis.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentAnalysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily FEA Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-clinical-blue-600 hover:bg-clinical-blue-700 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Analysis...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4 mr-2" />
                Run Analysis for Today
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Prepare comparison data
  const comparisonData = currentAnalysis.improvements.map(improvement => {
    const initial = currentAnalysis.initialResults.ligamentStresses.find(
      l => l.ligament === improvement.ligament
    );
    const current = currentAnalysis.currentResults.ligamentStresses.find(
      l => l.ligament === improvement.ligament
    );
    const normal = getNormalStress(improvement.ligament);
    const normalTension = getNormalTension(improvement.ligament);

    const currentStress = current?.avgStress || 0;
    const currentTension = current?.tension || 0;
    const initialStress = initial?.avgStress || 0;
    const initialTension = initial?.tension || 0;

    // Calculate how much off from healthy
    const stressOffFromHealthy = currentStress - normal;
    const tensionOffFromHealthy = currentTension - normalTension;
    
    // Calculate progress towards goal (0-100%)
    const stressProgress = initialStress > normal
      ? Math.max(0, Math.min(100, ((initialStress - currentStress) / (initialStress - normal)) * 100))
      : 100;
    const tensionProgress = initialTension > normalTension
      ? Math.max(0, Math.min(100, ((initialTension - currentTension) / (initialTension - normalTension)) * 100))
      : 100;

    // Calculate change from previous analysis
    const previous = previousAnalysis?.currentResults.ligamentStresses.find(
      l => l.ligament === improvement.ligament
    );
    const stressChange = previous 
      ? ((previous.avgStress - currentStress) / previous.avgStress) * 100
      : improvement.stressReduction;
    const tensionChange = previous
      ? ((previous.tension - currentTension) / previous.tension) * 100
      : improvement.tensionReduction;

    return {
      ligament: improvement.ligament,
      initialStress,
      currentStress,
      normalStress: normal,
      stressOffFromHealthy,
      stressProgress,
      stressChange,
      initialTension,
      currentTension,
      normalTension,
      tensionOffFromHealthy,
      tensionProgress,
      tensionChange,
    };
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Daily FEA Analysis
          </CardTitle>
          <Button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            variant="outline"
            size="sm"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4 mr-2" />
                Re-run Analysis
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-green-50">
            <p className="text-sm text-clinical-grey-600 mb-1">Overall Health Score</p>
            <p className="text-3xl font-bold text-green-600">
              {Math.round(currentAnalysis.overallHealthScore)}%
            </p>
            <p className="text-xs text-clinical-grey-600 mt-1">
              {currentAnalysis.overallHealthScore >= 90 
                ? '🎉 Almost fully recovered!'
                : currentAnalysis.overallHealthScore >= 70
                ? 'Great progress!'
                : currentAnalysis.overallHealthScore >= 50
                ? 'Good progress'
                : 'Early recovery'}
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50">
            <p className="text-sm text-clinical-grey-600 mb-1">Recovery Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(currentAnalysis.recoveryPercentage)}%
            </p>
            <p className="text-xs text-clinical-grey-600 mt-1">
              Towards full recovery
            </p>
          </div>
        </div>

        {/* Stress Comparison Chart */}
        <div>
          <h4 className="text-sm font-semibold mb-4">Stress: Current vs Healthy Target</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ligament" />
              <YAxis label={{ value: 'Stress (MPa)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="currentStress" fill="#3b82f6" name="Current Stress" />
              <Bar dataKey="normalStress" fill="#10b981" name="Healthy Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Ligament Analysis */}
        <div>
          <h4 className="text-sm font-semibold mb-4">Ligament-Specific Analysis</h4>
          <div className="space-y-4">
            {comparisonData.map((data) => {
              const isImproving = data.stressChange > 0;
              const isAtTarget = Math.abs(data.stressOffFromHealthy) < 2; // Within 2 MPa
              const progressToGoal = data.stressProgress;

              return (
                <div key={data.ligament} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-lg">{data.ligament}</h5>
                    {isAtTarget ? (
                      <Badge className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        At Target
                      </Badge>
                    ) : (
                      <Badge className={isImproving ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {progressToGoal.toFixed(0)}% to Goal
                      </Badge>
                    )}
                  </div>

                  {/* Stress Analysis */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Stress (MPa)</span>
                        {previousAnalysis && (
                          <span className={`text-xs font-semibold ${isImproving ? 'text-green-600' : 'text-red-600'}`}>
                            {isImproving ? (
                              <><TrendingDown className="h-3 w-3 inline mr-1" />{data.stressChange.toFixed(1)}% decrease</>
                            ) : (
                              <><TrendingUp className="h-3 w-3 inline mr-1" />{Math.abs(data.stressChange).toFixed(1)}% increase</>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-clinical-grey-600">Current</p>
                          <p className="font-semibold">{data.currentStress.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-clinical-grey-600">Healthy Target</p>
                          <p className="font-semibold text-green-600">{data.normalStress.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-clinical-grey-600">
                            {data.stressOffFromHealthy > 0 ? 'Above' : 'Below'} Target
                          </p>
                          <p className={`font-semibold ${data.stressOffFromHealthy > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {Math.abs(data.stressOffFromHealthy).toFixed(1)} MPa
                          </p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="w-full bg-clinical-grey-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progressToGoal >= 90 ? 'bg-green-600' :
                              progressToGoal >= 70 ? 'bg-blue-600' :
                              progressToGoal >= 50 ? 'bg-yellow-600' : 'bg-orange-600'
                            }`}
                            style={{ width: `${Math.min(100, progressToGoal)}%` }}
                          />
                        </div>
                        <p className="text-xs text-clinical-grey-600 mt-1">
                          {progressToGoal.toFixed(1)}% progress towards healthy target
                        </p>
                      </div>
                    </div>

                    {/* Tension Analysis */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Tension (N)</span>
                        {previousAnalysis && (
                          <span className={`text-xs font-semibold ${data.tensionChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.tensionChange > 0 ? (
                              <><TrendingDown className="h-3 w-3 inline mr-1" />{data.tensionChange.toFixed(1)}% decrease</>
                            ) : (
                              <><TrendingUp className="h-3 w-3 inline mr-1" />{Math.abs(data.tensionChange).toFixed(1)}% increase</>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-clinical-grey-600">Current</p>
                          <p className="font-semibold">{data.currentTension.toFixed(0)}</p>
                        </div>
                        <div>
                          <p className="text-clinical-grey-600">Healthy Target</p>
                          <p className="font-semibold text-green-600">{data.normalTension.toFixed(0)}</p>
                        </div>
                        <div>
                          <p className="text-clinical-grey-600">
                            {data.tensionOffFromHealthy > 0 ? 'Above' : 'Below'} Target
                          </p>
                          <p className={`font-semibold ${data.tensionOffFromHealthy > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {Math.abs(data.tensionOffFromHealthy).toFixed(0)} N
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
