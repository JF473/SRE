import { useState } from 'react';
import ConsentFlow from './components/ConsentFlow';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import Dashboard from './components/Dashboard';

export type AppState = 'locked' | 'medical-history' | 'unlocked';

export interface ConsentRecord {
  consentFlag: boolean;
  timestamp: string;
  cameraAccess: boolean;
  dataCapture: boolean;
  dataStorageConsent: boolean;
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  previousProcedures: string[];
  medicalConditions: string[];
}

function App() {
  const [appState, setAppState] = useState<AppState>('locked');
  const [consentRecord, setConsentRecord] = useState<ConsentRecord | null>(null);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(null);

  const handleConsentGranted = (consent: ConsentRecord) => {
    setConsentRecord(consent);
    setAppState('medical-history');
  };

  const handleMedicalHistoryComplete = (history: MedicalHistory) => {
    setMedicalHistory(history);
    setAppState('unlocked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {appState === 'locked' && (
        <ConsentFlow onConsentGranted={handleConsentGranted} />
      )}
      
      {appState === 'medical-history' && (
        <MedicalHistoryForm onComplete={handleMedicalHistoryComplete} />
      )}
      
      {appState === 'unlocked' && (
        <Dashboard 
          consentRecord={consentRecord!} 
          medicalHistory={medicalHistory!} 
        />
      )}
    </div>
  );
}

export default App;
