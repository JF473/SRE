import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Calendar, 
  Camera, 
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Upload
} from 'lucide-react';

interface CheckIn {
  id: string;
  day: number;
  label: string;
  status: 'pending' | 'completed' | 'overdue';
  completedDate?: string;
  symptoms: string[];
  notes: string;
  photoTaken: boolean;
}

export default function RecoveryTracking() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([
    { id: '1', day: 1, label: 'Day 1 Check-in', status: 'completed', completedDate: '2026-02-05', 
      symptoms: ['Mild swelling', 'Minor tenderness'], notes: 'Following care instructions. Minimal discomfort.', photoTaken: true },
    { id: '2', day: 3, label: 'Day 3 Check-in', status: 'completed', completedDate: '2026-02-07',
      symptoms: ['Swelling reduced', 'No pain'], notes: 'Swelling going down nicely. Feeling good.', photoTaken: true },
    { id: '3', day: 7, label: 'Week 1 Check-in', status: 'pending', symptoms: [], notes: '', photoTaken: false },
    { id: '4', day: 14, label: 'Week 2 Check-in', status: 'pending', symptoms: [], notes: '', photoTaken: false },
    { id: '5', day: 28, label: 'Week 4 Check-in', status: 'pending', symptoms: [], notes: '', photoTaken: false },
  ]);

  const [activeCheckIn, setActiveCheckIn] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const symptomOptions = [
    'No symptoms',
    'Mild swelling',
    'Moderate swelling',
    'Severe swelling',
    'Minor tenderness',
    'Pain',
    'Bruising',
    'Redness',
    'Asymmetry',
    'Numbness',
    'Itching',
    'Other'
  ];

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload
    setPhotoUploaded(true);
  };

  const submitCheckIn = (checkInId: string) => {
    setCheckIns(checkIns.map(ci => 
      ci.id === checkInId 
        ? { 
            ...ci, 
            status: 'completed' as const,
            completedDate: new Date().toISOString().split('T')[0],
            symptoms: selectedSymptoms,
            notes,
            photoTaken: photoUploaded
          }
        : ci
    ));
    setActiveCheckIn(null);
    setSelectedSymptoms([]);
    setNotes('');
    setPhotoUploaded(false);
  };

  const startCheckIn = (checkInId: string) => {
    setActiveCheckIn(checkInId);
    setSelectedSymptoms([]);
    setNotes('');
    setPhotoUploaded(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recovery Check-in Schedule
          </CardTitle>
          <CardDescription>
            Complete regular check-ins to track your healing progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">
                {checkIns.filter(ci => ci.status === 'completed').length}
              </div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">
                {checkIns.filter(ci => ci.status === 'pending').length}
              </div>
              <div className="text-sm text-blue-700">Pending</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">
                {Math.round((checkIns.filter(ci => ci.status === 'completed').length / checkIns.length) * 100)}%
              </div>
              <div className="text-sm text-purple-700">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Check-in Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checkIns.map((checkIn, idx) => (
              <div key={checkIn.id} className="relative">
                {/* Timeline connector */}
                {idx < checkIns.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200" />
                )}
                
                <div className={`flex gap-4 p-4 rounded-lg border-2 ${
                  checkIn.status === 'completed' 
                    ? 'bg-green-50 border-green-200' 
                    : checkIn.status === 'overdue'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-slate-200'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    checkIn.status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : checkIn.status === 'overdue'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {checkIn.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : checkIn.status === 'overdue' ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{checkIn.label}</h3>
                        <p className="text-sm text-slate-600">Day {checkIn.day} post-procedure</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {checkIn.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {checkIn.status === 'pending' && (
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    {checkIn.status === 'completed' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          Completed on {new Date(checkIn.completedDate!).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </div>
                        {checkIn.symptoms.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {checkIn.symptoms.map((symptom, idx) => (
                              <Badge key={idx} variant="secondary">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {checkIn.notes && (
                          <p className="text-sm text-slate-700 bg-white p-3 rounded border">
                            {checkIn.notes}
                          </p>
                        )}
                        {checkIn.photoTaken && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Camera className="w-4 h-4" />
                            Progress photo uploaded
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button 
                        onClick={() => startCheckIn(checkIn.id)}
                        variant="outline"
                        size="sm"
                      >
                        Complete Check-in
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Check-in Form */}
      {activeCheckIn && (
        <Card className="border-2 border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle>
              {checkIns.find(ci => ci.id === activeCheckIn)?.label}
            </CardTitle>
            <CardDescription>
              Please provide an update on your recovery progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Photo Upload */}
            <div className="space-y-3">
              <Label>Progress Photo</Label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                photoUploaded ? 'border-green-300 bg-green-50' : 'border-slate-300'
              }`}>
                {photoUploaded ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-green-600" />
                    <p className="text-sm text-green-700">Photo uploaded successfully</p>
                    <p className="text-xs text-slate-600">
                      Timestamp: {new Date().toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-12 h-12 mx-auto text-slate-400" />
                    <p className="text-sm text-slate-600">Take or upload a progress photo</p>
                    <Button onClick={handlePhotoUpload} size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
              <Label>Current Symptoms (select all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {symptomOptions.map(symptom => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`symptom-${symptom}`}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <label
                      htmlFor={`symptom-${symptom}`}
                      className="text-sm leading-none cursor-pointer"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="How are you feeling? Any concerns or observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button 
                onClick={() => submitCheckIn(activeCheckIn)}
                disabled={!photoUploaded || selectedSymptoms.length === 0}
                className="flex-1"
                size="lg"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Check-in
              </Button>
              <Button 
                onClick={() => setActiveCheckIn(null)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Review Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            For Clinic Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4">
            All patient check-ins are viewable by authorized clinic staff in chronological order for 
            comprehensive recovery monitoring and clinical review.
          </p>
          <Button variant="outline">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            View Full Recovery Timeline
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
