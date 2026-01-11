'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEAProgress } from '@/lib/fea-progress';
import { calculateRecoveryProgress, RecoveryPlan } from '@/lib/recovery-planner';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, TrendingUp, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface RecoveryProgressProps {
  progress: ReturnType<typeof calculateRecoveryProgress>;
  feaProgress: FEAProgress;
}

export function RecoveryProgress({ progress, feaProgress }: RecoveryProgressProps) {
  // Prepare data for stress reduction chart
  const stressReductionData = feaProgress.improvements.map(imp => ({
    ligament: imp.ligament,
    'Stress Reduction (%)': imp.stressReduction,
    'Tension Reduction (%)': imp.tensionReduction,
  }));

  // Prepare data for risk level changes
  const riskLevelData = feaProgress.improvements.map(imp => {
    const riskLevels = ['low', 'moderate', 'high', 'critical'];
    const fromIndex = riskLevels.indexOf(imp.riskLevelChange.from);
    const toIndex = riskLevels.indexOf(imp.riskLevelChange.to);
    return {
      ligament: imp.ligament,
      'Risk Improvement': fromIndex - toIndex, // Positive = improvement
    };
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-clinical-grey-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Recovery Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Overall Recovery Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-clinical-grey-700">
                  Recovery Progress
                </span>
                <span className="text-2xl font-bold text-clinical-blue-600">
                  {Math.round(feaProgress.overallHealthScore)}%
                </span>
              </div>
              <Progress value={feaProgress.overallHealthScore} className="h-3" />
              <p className="text-xs text-clinical-grey-600 mt-2">
                {feaProgress.overallHealthScore >= 90 
                  ? '🎉 Almost fully recovered!'
                  : feaProgress.overallHealthScore >= 70
                  ? 'Great progress! Keep it up!'
                  : feaProgress.overallHealthScore >= 50
                  ? 'Good progress, stay consistent!'
                  : 'Early stages - every workout counts!'}
              </p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-clinical-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-clinical-blue-600">
                  {progress.workoutsCompleted}
                </p>
                <p className="text-xs text-clinical-grey-600 mt-1">Workouts Completed</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {progress.daysCompleted}
                </p>
                <p className="text-xs text-clinical-grey-600 mt-1">Days Completed</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(progress.overallProgress)}%
                </p>
                <p className="text-xs text-clinical-grey-600 mt-1">Plan Progress</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">
                  {progress.totalWorkouts - progress.workoutsCompleted}
                </p>
                <p className="text-xs text-clinical-grey-600 mt-1">Remaining</p>
              </div>
            </div>

            {/* Phase Progress */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Phase Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-clinical-grey-600">Early Phase</span>
                    <span className="text-xs font-semibold">{Math.round(progress.phaseProgress.early)}%</span>
                  </div>
                  <Progress value={progress.phaseProgress.early} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-clinical-grey-600">Mid Phase</span>
                    <span className="text-xs font-semibold">{Math.round(progress.phaseProgress.mid)}%</span>
                  </div>
                  <Progress value={progress.phaseProgress.mid} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-clinical-grey-600">Late Phase</span>
                    <span className="text-xs font-semibold">{Math.round(progress.phaseProgress.late)}%</span>
                  </div>
                  <Progress value={progress.phaseProgress.late} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FEA Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Biomechanical Improvements (FEA Analysis)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stress Reduction Chart */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Stress & Tension Reduction</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stressReductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ligament" />
                <YAxis label={{ value: 'Reduction (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Stress Reduction (%)" fill="#10b981" />
                <Bar dataKey="Tension Reduction (%)" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ligament Improvements */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Ligament-Specific Improvements</h4>
            <div className="space-y-3">
              {feaProgress.improvements.map((improvement) => {
                const riskImproved = improvement.riskLevelChange.from !== improvement.riskLevelChange.to;
                const riskBetter = ['low', 'moderate', 'high', 'critical'].indexOf(improvement.riskLevelChange.to) <
                                  ['low', 'moderate', 'high', 'critical'].indexOf(improvement.riskLevelChange.from);

                return (
                  <div key={improvement.ligament} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold">{improvement.ligament}</h5>
                      {riskImproved && (
                        <div className="flex items-center gap-2">
                          <Badge className={getRiskColor(improvement.riskLevelChange.from)}>
                            {improvement.riskLevelChange.from}
                          </Badge>
                          <span className="text-clinical-grey-400">→</span>
                          <Badge className={getRiskColor(improvement.riskLevelChange.to)}>
                            {improvement.riskLevelChange.to}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-clinical-grey-600 mb-1">Stress Reduction</p>
                        <p className="font-semibold text-green-600">
                          {improvement.stressReduction.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-clinical-grey-600 mb-1">Tension Reduction</p>
                        <p className="font-semibold text-blue-600">
                          {improvement.tensionReduction.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-clinical-grey-600 mb-1">Strain Reduction</p>
                        <p className="font-semibold text-purple-600">
                          {improvement.strainReduction.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current vs Initial Comparison */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Current vs Initial Stress Levels</h4>
            <div className="space-y-2">
              {feaProgress.improvements.map((improvement) => {
                const initial = feaProgress.initialResults.ligamentStresses.find(
                  l => l.ligament === improvement.ligament
                );
                const current = feaProgress.currentResults.ligamentStresses.find(
                  l => l.ligament === improvement.ligament
                );

                if (!initial || !current) return null;

                const initialStress = initial.avgStress;
                const currentStress = current.avgStress;
                const reduction = ((initialStress - currentStress) / initialStress) * 100;

                return (
                  <div key={improvement.ligament} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{improvement.ligament}</span>
                      <span className="text-green-600 font-semibold">
                        {reduction.toFixed(1)}% reduction
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-clinical-grey-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs text-clinical-grey-600 w-16 text-right">
                        {initialStress.toFixed(1)} MPa
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-clinical-grey-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(currentStress / initialStress) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-clinical-grey-600 w-16 text-right">
                        {currentStress.toFixed(1)} MPa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
