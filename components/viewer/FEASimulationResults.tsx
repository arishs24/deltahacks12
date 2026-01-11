'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEASimulationResult, LigamentStressData, ClinicalFinding } from '@/lib/fea-simulation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FEASimulationResultsProps {
  results: FEASimulationResult;
}

export function FEASimulationResults({ results }: FEASimulationResultsProps) {
  const getSeverityColor = (severity: ClinicalFinding['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'severe': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'mild': return 'bg-blue-600';
    }
  };

  const getSeverityIcon = (severity: ClinicalFinding['severity']) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'severe': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'moderate': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'mild': return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getRiskLevelColor = (risk: LigamentStressData['riskLevel']) => {
    switch (risk) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'moderate': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
    }
  };

  // Prepare data for time series chart
  const timeSeriesData = results.timeSeries.map(ts => ({
    time: ts.time.toFixed(2),
    MCL: ts.mclStress.toFixed(1),
    ACL: ts.aclStress.toFixed(1),
    PCL: ts.pclStress.toFixed(1),
    LCL: ts.lclStress.toFixed(1),
    'Patellar Tendon': ts.patellarTendonStress.toFixed(1),
  }));

  // Prepare data for stress comparison bar chart
  const stressComparisonData = results.ligamentStresses.map(lig => ({
    name: lig.ligament,
    'Max Stress (MPa)': lig.maxStress,
    'Avg Stress (MPa)': lig.avgStress,
    'Tension (N)': lig.tension / 10, // Scale down for visibility
  }));

  return (
    <div className="space-y-6">
      {/* Simulation Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>FEA Simulation Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-clinical-grey-600">Total Nodes</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.totalNodes.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-clinical-grey-600">Total Elements</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.totalElements.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-clinical-grey-600">Max Displacement</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.maxDisplacement.toFixed(1)} mm</p>
            </div>
            <div>
              <p className="text-sm text-clinical-grey-600">Max Von Mises Stress</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.maxVonMisesStress.toFixed(1)} MPa</p>
            </div>
            <div>
              <p className="text-sm text-clinical-grey-600">Convergence Iterations</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.convergenceIterations}</p>
            </div>
            <div>
              <p className="text-sm text-clinical-grey-600">Computation Time</p>
              <p className="text-2xl font-bold">{results.simulationMetrics.computationTime.toFixed(1)}s</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ligament Stress Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Ligament Stress & Tension Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stress Comparison Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Maximum Stress by Ligament</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stressComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Stress (MPa)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Max Stress (MPa)" fill="#ef4444" />
                <Bar dataKey="Avg Stress (MPa)" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Time Series Stress Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stress Over Gait Cycle</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Stress (MPa)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MCL" stroke="#ff69b4" strokeWidth={2} />
                <Line type="monotone" dataKey="ACL" stroke="#ff6b6b" strokeWidth={2} />
                <Line type="monotone" dataKey="PCL" stroke="#ff8c69" strokeWidth={2} />
                <Line type="monotone" dataKey="LCL" stroke="#ff1493" strokeWidth={2} />
                <Line type="monotone" dataKey="Patellar Tendon" stroke="#ffa500" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ligament Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Detailed Ligament Analysis</h3>
            <div className="space-y-3">
              {results.ligamentStresses.map((ligament) => (
                <div key={ligament.ligament} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{ligament.ligament}</h4>
                    <Badge className={`${getRiskLevelColor(ligament.riskLevel)} text-white`}>
                      {ligament.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-clinical-grey-600">Max Stress</p>
                      <p className="font-semibold">{ligament.maxStress.toFixed(1)} MPa</p>
                    </div>
                    <div>
                      <p className="text-clinical-grey-600">Avg Stress</p>
                      <p className="font-semibold">{ligament.avgStress.toFixed(1)} MPa</p>
                    </div>
                    <div>
                      <p className="text-clinical-grey-600">Tension</p>
                      <p className="font-semibold">{ligament.tension.toFixed(0)} N</p>
                    </div>
                    <div>
                      <p className="text-clinical-grey-600">Strain</p>
                      <p className="font-semibold">{(ligament.strain * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Critical Findings - What Doctors Might Miss
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.highRiskFindings.map((finding, index) => (
              <div key={index} className="border-l-4 border-clinical-grey-300 pl-4 py-3 bg-clinical-grey-50 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(finding.severity)}
                    <h4 className="font-semibold text-lg">{finding.finding}</h4>
                  </div>
                  <Badge className={`${getSeverityColor(finding.severity)} text-white`}>
                    {finding.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-clinical-grey-700 mb-2">{finding.description}</p>
                <div className="bg-white rounded p-3 mb-2">
                  <p className="text-sm font-semibold text-clinical-grey-900 mb-1">Clinical Significance:</p>
                  <p className="text-sm text-clinical-grey-700">{finding.clinicalSignificance}</p>
                </div>
                <div className="bg-clinical-blue-50 rounded p-3">
                  <p className="text-sm font-semibold text-clinical-blue-900 mb-1">Recommendation:</p>
                  <p className="text-sm text-clinical-blue-800">{finding.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
