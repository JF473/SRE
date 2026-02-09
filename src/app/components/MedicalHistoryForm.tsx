import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ClipboardList, X, Plus, AlertTriangle } from 'lucide-react';
import type { MedicalHistory } from '../App.tsx';

interface MedicalHistoryFormProps {
  onComplete: (history: MedicalHistory) => void;
}

export default function MedicalHistoryForm({ onComplete }: MedicalHistoryFormProps) {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [currentAllergy, setCurrentAllergy] = useState('');
  const [medications, setMedications] = useState<string[]>([]);
  const [currentMedication, setCurrentMedication] = useState('');
  const [previousProcedures, setPreviousProcedures] = useState<string[]>([]);
  const [currentProcedure, setCurrentProcedure] = useState('');
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [currentCondition, setCurrentCondition] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const addItem = (value: string, setter: (items: string[]) => void, current: string[]) => {
    if (value.trim()) {
      setter([...current, value.trim()]);
    }
  };

  const removeItem = (index: number, setter: (items: string[]) => void, current: string[]) => {
    setter(current.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];

    if (allergies.length === 0) {
      newErrors.push('Please specify at least one allergy or enter "None"');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const history: MedicalHistory = {
      allergies,
      medications,
      previousProcedures,
      medicalConditions,
    };

    onComplete(history);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-2">
            <ClipboardList className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Medical History & Allergies</CardTitle>
          <CardDescription>
            This information helps ensure your safety during procedures
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
              {errors.map((error, idx) => (
                <p key={idx} className="text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </p>
              ))}
            </div>
          )}

          {/* Allergies Section */}
          <div className="space-y-3">
            <Label className="text-base flex items-center gap-2">
              Allergies <span className="text-red-500">*</span>
              <span className="text-xs text-slate-500">(Required - enter "None" if no allergies)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Lidocaine, Hyaluronic acid"
                value={currentAllergy}
                onChange={(e) => setCurrentAllergy(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem(currentAllergy, setAllergies, allergies);
                    setCurrentAllergy('');
                  }
                }}
              />
              <Button 
                type="button"
                onClick={() => {
                  addItem(currentAllergy, setAllergies, allergies);
                  setCurrentAllergy('');
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, idx) => (
                <Badge key={idx} variant="destructive" className="gap-1">
                  {allergy}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeItem(idx, setAllergies, allergies)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="space-y-3">
            <Label className="text-base">Current Medications</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Aspirin, Blood thinners"
                value={currentMedication}
                onChange={(e) => setCurrentMedication(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem(currentMedication, setMedications, medications);
                    setCurrentMedication('');
                  }
                }}
              />
              <Button 
                type="button"
                onClick={() => {
                  addItem(currentMedication, setMedications, medications);
                  setCurrentMedication('');
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {medications.map((med, idx) => (
                <Badge key={idx} variant="secondary" className="gap-1">
                  {med}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeItem(idx, setMedications, medications)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Previous Procedures */}
          <div className="space-y-3">
            <Label className="text-base">Previous Aesthetic Procedures</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Botox, Dermal fillers"
                value={currentProcedure}
                onChange={(e) => setCurrentProcedure(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem(currentProcedure, setPreviousProcedures, previousProcedures);
                    setCurrentProcedure('');
                  }
                }}
              />
              <Button 
                type="button"
                onClick={() => {
                  addItem(currentProcedure, setPreviousProcedures, previousProcedures);
                  setCurrentProcedure('');
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {previousProcedures.map((proc, idx) => (
                <Badge key={idx} variant="outline" className="gap-1">
                  {proc}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeItem(idx, setPreviousProcedures, previousProcedures)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-3">
            <Label className="text-base">Medical Conditions</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Diabetes, Hypertension"
                value={currentCondition}
                onChange={(e) => setCurrentCondition(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem(currentCondition, setMedicalConditions, medicalConditions);
                    setCurrentCondition('');
                  }
                }}
              />
              <Button 
                type="button"
                onClick={() => {
                  addItem(currentCondition, setMedicalConditions, medicalConditions);
                  setCurrentCondition('');
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {medicalConditions.map((cond, idx) => (
                <Badge key={idx} className="gap-1">
                  {cond}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeItem(idx, setMedicalConditions, medicalConditions)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full h-12 text-base"
            size="lg"
          >
            Complete Onboarding
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
