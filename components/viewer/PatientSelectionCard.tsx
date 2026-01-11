// Component extracted from: Viewer Page
// Displays patient search and selection panel

import { useState } from 'react';
import { Patient } from '@/types/clinical';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PatientSelectionCardProps {
  patients: Patient[];
  selectedPatientId: string;
  onPatientSelect: (patientId: string) => void;
}

export function PatientSelectionCard({
  patients,
  selectedPatientId,
  onPatientSelect,
}: PatientSelectionCardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(
    (patient) =>
      !searchQuery.trim() ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.injuryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-clinical-grey-400" />
            <Input
              type="text"
              placeholder="Search patients by name, injury type, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Patient List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onPatientSelect(patient.id)}
                className={`
                  text-left p-4 rounded-lg border-2 transition-colors
                  ${
                    selectedPatientId === patient.id
                      ? 'border-clinical-blue-600 bg-clinical-blue-50'
                      : 'border-clinical-grey-200 hover:border-clinical-grey-300 hover:bg-clinical-grey-50'
                  }
                `}
              >
                <div className="font-semibold text-clinical-grey-900 mb-1">
                  {patient.name}
                </div>
                <div className="text-sm text-clinical-grey-600">
                  {patient.injuryType}
                </div>
                <div className="text-xs text-clinical-grey-500 mt-1">
                  ID: {patient.id}
                </div>
              </button>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-clinical-grey-500">
              No patients found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
