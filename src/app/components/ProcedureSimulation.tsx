import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { 
  Syringe, 
  AlertTriangle, 
  ShieldAlert, 
  Eye,
  Zap,
  CheckCircle2
} from 'lucide-react';
import type { MedicalHistory } from '../App';

interface ProcedureSimulationProps {
  medicalHistory: MedicalHistory;
  has3DModel: boolean;
  onSimulationComplete: () => void;
}

interface Procedure {
  id: string;
  name: string;
  description: string;
  substance: string;
  contraindications: string[];
}

const procedures: Procedure[] = [
  {
    id: 'dermal-filler-cheek',
    name: 'Cheek Filler',
    description: 'Dermal filler for cheek augmentation',
    substance: 'Hyaluronic acid',
    contraindications: ['Hyaluronic acid', 'Lidocaine']
  },
  {
    id: 'dermal-filler-nasolabial',
    name: 'Nasolabial Filler',
    description: 'Filler for smile lines',
    substance: 'Hyaluronic acid',
    contraindications: ['Hyaluronic acid']
  },
  {
    id: 'botox-forehead',
    name: 'Forehead Botox',
    description: 'Botulinum toxin for forehead lines',
    substance: 'Botulinum toxin type A',
    contraindications: ['Botulinum toxin', 'Botox']
  },
  {
    id: 'botox-crowsfeet',
    name: "Crow's Feet Botox",
    description: 'Botulinum toxin for eye area',
    substance: 'Botulinum toxin type A',
    contraindications: ['Botulinum toxin', 'Botox']
  },
  {
    id: 'lip-filler',
    name: 'Lip Filler',
    description: 'Dermal filler for lip enhancement',
    substance: 'Hyaluronic acid',
    contraindications: ['Hyaluronic acid', 'Lidocaine']
  },
];

const dangerZones = [
  { name: 'Temporal Artery', region: 'temple', color: 'red' },
  { name: 'Facial Artery', region: 'cheek-lower', color: 'red' },
  { name: 'Angular Artery', region: 'nose-side', color: 'red' },
  { name: 'Supraorbital Nerve', region: 'eyebrow', color: 'orange' },
  { name: 'Infraorbital Nerve', region: 'under-eye', color: 'orange' },
];

export default function ProcedureSimulation({ 
  medicalHistory, 
  has3DModel,
  onSimulationComplete 
}: ProcedureSimulationProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [volume, setVolume] = useState([1.0]);
  const [injectionPoints, setInjectionPoints] = useState<{x: number, y: number}[]>([]);
  const [showDangerZones, setShowDangerZones] = useState(true);
  const [simulationActive, setSimulationActive] = useState(false);
  const [allergyWarning, setAllergyWarning] = useState<string | null>(null);

  const checkAllergies = (procedure: Procedure) => {
    const conflicts = procedure.contraindications.filter(contra => 
      medicalHistory.allergies.some(allergy => 
        allergy.toLowerCase().includes(contra.toLowerCase())
      )
    );
    
    if (conflicts.length > 0) {
      setAllergyWarning(conflicts.join(', '));
    } else {
      setAllergyWarning(null);
    }
  };

  const handleProcedureChange = (procedureId: string) => {
    setSelectedProcedure(procedureId);
    const procedure = procedures.find(p => p.id === procedureId);
    if (procedure) {
      checkAllergies(procedure);
    }
    setInjectionPoints([]);
    setSimulationActive(false);
  };

  const handleFaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedProcedure || allergyWarning) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Check if point is in danger zone (simplified check)
    const inDangerZone = dangerZones.some(zone => {
      // Simplified zone checking - in real app would use actual facial landmarks
      if (zone.region === 'temple' && x < 20 && y < 30) return true;
      if (zone.region === 'under-eye' && x > 30 && x < 70 && y > 20 && y < 35) return true;
      return false;
    });
    
    if (inDangerZone) {
      alert('⚠️ Critical Anatomy Zone - Injection blocked for safety');
      return;
    }
    
    setInjectionPoints([...injectionPoints, { x, y }]);
  };

  const runSimulation = () => {
    setSimulationActive(true);
    onSimulationComplete();
  };

  const clearPoints = () => {
    setInjectionPoints([]);
    setSimulationActive(false);
  };

  if (!has3DModel) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Syringe className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-600">Please complete facial capture first to enable simulation</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* 3D Model View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            AR Simulation Preview
          </CardTitle>
          <CardDescription>
            Click on the face to place injection points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg relative overflow-hidden cursor-crosshair border-2 border-slate-300"
            onClick={handleFaceClick}
          >
            {/* Simulated 3D Face */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Face outline */}
                <div className="w-64 h-80 bg-gradient-to-b from-amber-100 to-amber-50 rounded-full relative shadow-lg">
                  {/* Danger zones overlay */}
                  {showDangerZones && (
                    <>
                      {/* Temple zones */}
                      <div className="absolute top-12 left-4 w-12 h-12 bg-red-500/20 border-2 border-red-500 rounded-full" 
                           title="Temporal Artery - Critical Zone" />
                      <div className="absolute top-12 right-4 w-12 h-12 bg-red-500/20 border-2 border-red-500 rounded-full" 
                           title="Temporal Artery - Critical Zone" />
                      
                      {/* Under eye zones */}
                      <div className="absolute top-24 left-12 w-16 h-8 bg-orange-500/20 border-2 border-orange-500 rounded-full" 
                           title="Infraorbital Nerve" />
                      <div className="absolute top-24 right-12 w-16 h-8 bg-orange-500/20 border-2 border-orange-500 rounded-full" 
                           title="Infraorbital Nerve" />
                      
                      {/* Nose sides */}
                      <div className="absolute top-32 left-[45%] w-8 h-12 bg-red-500/20 border-2 border-red-500 rounded" 
                           title="Angular Artery - Critical Zone" />
                    </>
                  )}
                  
                  {/* Eyes */}
                  <div className="absolute top-24 left-16 w-8 h-4 bg-slate-700 rounded-full" />
                  <div className="absolute top-24 right-16 w-8 h-4 bg-slate-700 rounded-full" />
                  
                  {/* Nose */}
                  <div className="absolute top-36 left-1/2 -translate-x-1/2 w-6 h-12 bg-amber-200 rounded-b-lg" />
                  
                  {/* Mouth */}
                  <div className="absolute top-52 left-1/2 -translate-x-1/2 w-16 h-2 bg-rose-300 rounded-full" />
                  
                  {/* Injection points */}
                  {injectionPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg animate-ping-once"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-full h-full bg-blue-600 rounded-full animate-pulse" />
                    </div>
                  ))}
                  
                  {/* Simulation effect */}
                  {simulationActive && selectedProcedure.includes('filler') && (
                    <div className="absolute inset-0 pointer-events-none">
                      {injectionPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="absolute w-24 h-24 bg-blue-300/30 rounded-full blur-xl"
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Legend */}
            {showDangerZones && (
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 text-xs space-y-1 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 border border-red-700 rounded-full" />
                  <span>Critical - Vascular</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 border border-orange-700 rounded-full" />
                  <span>Caution - Nerve</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 border border-white rounded-full" />
                  <span>Injection Point</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              onClick={() => setShowDangerZones(!showDangerZones)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              {showDangerZones ? 'Hide' : 'Show'} Danger Zones
            </Button>
            <Button 
              onClick={clearPoints}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={injectionPoints.length === 0}
            >
              Clear Points
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Procedure Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Allergy Alert */}
          {allergyWarning && (
            <Alert variant="destructive" className="bg-red-50 border-red-300">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <p className="mb-1">⚠️ <strong>HIGH RISK - ALLERGY CONFLICT</strong></p>
                <p className="text-sm">
                  Patient has documented allergy to: <strong>{allergyWarning}</strong>
                </p>
                <p className="text-sm mt-1">
                  This procedure is contraindicated. Please select an alternative.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Procedure Selection */}
          <div className="space-y-2">
            <label className="text-sm">Select Procedure</label>
            <Select value={selectedProcedure} onValueChange={handleProcedureChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a procedure..." />
              </SelectTrigger>
              <SelectContent>
                {procedures.map(proc => (
                  <SelectItem key={proc.id} value={proc.id}>
                    {proc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedProcedure && (
              <div className="bg-slate-50 rounded p-3 text-sm space-y-2">
                <p className="text-slate-600">
                  {procedures.find(p => p.id === selectedProcedure)?.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {procedures.find(p => p.id === selectedProcedure)?.substance}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Volume Control */}
          {selectedProcedure && !allergyWarning && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm">Volume per Point</label>
                <span className="text-sm text-slate-600">{volume[0].toFixed(1)} mL</span>
              </div>
              <Slider 
                value={volume}
                onValueChange={setVolume}
                min={0.5}
                max={2.0}
                step={0.1}
                className="py-2"
              />
            </div>
          )}

          {/* Injection Summary */}
          {injectionPoints.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <h4 className="text-sm">Injection Plan</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Points:</span>
                  <span>{injectionPoints.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Volume per point:</span>
                  <span>{volume[0].toFixed(1)} mL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total volume:</span>
                  <span>{(injectionPoints.length * volume[0]).toFixed(1)} mL</span>
                </div>
              </div>
            </div>
          )}

          {/* Patient Safety Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm mb-2 text-green-900">Patient Allergies</h4>
            <div className="flex flex-wrap gap-2">
              {medicalHistory.allergies.map((allergy, idx) => (
                <Badge key={idx} variant="outline" className="bg-white">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          {/* Simulate Button */}
          <Button 
            onClick={runSimulation}
            disabled={!selectedProcedure || allergyWarning !== null || injectionPoints.length === 0}
            className="w-full"
            size="lg"
          >
            {simulationActive ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Simulation Complete
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Run AR Simulation
              </>
            )}
          </Button>

          {simulationActive && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-700 text-sm">
                AR simulation completed. You can now view this in Compare Mode.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
