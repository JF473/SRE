import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Scan, 
  Syringe, 
  FileText, 
  GitCompare, 
  Calendar, 
  BookOpen,
  User,
  CheckCircle2
} from 'lucide-react';
import type { ConsentRecord, MedicalHistory } from '../App';
import FacialCapture from './FacialCapture';
import ProcedureSimulation from './ProcedureSimulation';
import DocumentViewer from './DocumentViewer';
import ComparisonMode from './ComparisonMode';
import RecoveryTracking from './RecoveryTracking';
import EducationCenter from './EducationCenter';

interface DashboardProps {
  consentRecord: ConsentRecord;
  medicalHistory: MedicalHistory;
}

export default function Dashboard({ consentRecord, medicalHistory }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('capture');
  const [has3DModel, setHas3DModel] = useState(false);
  const [hasSimulation, setHasSimulation] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl mb-2">AR Surgery Visualizer</h1>
                <p className="text-blue-100">Patient Dashboard</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-blue-100">Consent Status</p>
                  <Badge variant="secondary" className="bg-white text-blue-600 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto gap-2 bg-white p-2 rounded-xl shadow-md">
            <TabsTrigger value="capture" className="flex flex-col md:flex-row gap-2 py-3">
              <Scan className="w-4 h-4" />
              <span className="text-xs md:text-sm">Capture</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex flex-col md:flex-row gap-2 py-3" disabled={!has3DModel}>
              <Syringe className="w-4 h-4" />
              <span className="text-xs md:text-sm">Simulation</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col md:flex-row gap-2 py-3">
              <FileText className="w-4 h-4" />
              <span className="text-xs md:text-sm">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex flex-col md:flex-row gap-2 py-3" disabled={!hasSimulation}>
              <GitCompare className="w-4 h-4" />
              <span className="text-xs md:text-sm">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="recovery" className="flex flex-col md:flex-row gap-2 py-3">
              <Calendar className="w-4 h-4" />
              <span className="text-xs md:text-sm">Recovery</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex flex-col md:flex-row gap-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs md:text-sm">Education</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture" className="mt-0">
            <FacialCapture onCaptureComplete={() => setHas3DModel(true)} />
          </TabsContent>

          <TabsContent value="simulation" className="mt-0">
            <ProcedureSimulation 
              medicalHistory={medicalHistory} 
              has3DModel={has3DModel}
              onSimulationComplete={() => setHasSimulation(true)}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <DocumentViewer />
          </TabsContent>

          <TabsContent value="compare" className="mt-0">
            <ComparisonMode hasSimulation={hasSimulation} />
          </TabsContent>

          <TabsContent value="recovery" className="mt-0">
            <RecoveryTracking />
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <EducationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
