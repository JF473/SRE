import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Download, 
  Eye, 
  Lock,
  CheckCircle2,
  Clock,
  Microscope
} from 'lucide-react';

interface Document {
  id: string;
  type: 'discharge' | 'histology';
  title: string;
  date: string;
  status: 'available' | 'pending' | 'processing';
  summary: string;
}

const mockDocuments: Document[] = [
  {
    id: 'discharge-001',
    type: 'discharge',
    title: 'Discharge Summary - Dermal Filler Procedure',
    date: '2026-02-04',
    status: 'available',
    summary: 'Post-procedure care instructions and immediate recovery guidance'
  },
  {
    id: 'histology-001',
    type: 'histology',
    title: 'Histology Report - Filler Analysis',
    date: '2026-02-06',
    status: 'available',
    summary: 'Laboratory analysis of filler composition and compatibility'
  }
];

export default function DocumentViewer() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const renderDocumentContent = (doc: Document) => {
    if (doc.type === 'discharge') {
      return (
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-base mb-3">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Patient ID</p>
                <p>PT-2024-0123</p>
              </div>
              <div>
                <p className="text-slate-500">Procedure Date</p>
                <p>February 4, 2026</p>
              </div>
              <div>
                <p className="text-slate-500">Attending Physician</p>
                <p>Dr. Sarah Chen, MD</p>
              </div>
              <div>
                <p className="text-slate-500">Procedure Type</p>
                <p>Dermal Filler - Cheek Augmentation</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base mb-3">Procedure Summary</h3>
            <p className="text-slate-700 leading-relaxed">
              Patient underwent bilateral cheek augmentation using 2.0mL of hyaluronic acid-based dermal filler 
              (Juvederm Voluma XC). The procedure was completed without complications. Local anesthesia with 
              lidocaine was administered. Four injection points were used per cheek following the pre-planned 
              AR simulation protocol.
            </p>
          </section>

          <section>
            <h3 className="text-base mb-3">Immediate Post-Procedure Care</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Apply cold compress for 10-15 minutes every hour for the first 24 hours to minimize swelling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Avoid touching or massaging the treated area for 48 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Sleep with head elevated on 2-3 pillows for the first 3 nights</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Avoid strenuous exercise for 48 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>No alcohol consumption for 24 hours</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3">Expected Recovery Timeline</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong>Days 1-3:</strong> Mild to moderate swelling and possible bruising. This is normal.</p>
              <p><strong>Days 4-7:</strong> Swelling should reduce significantly. Minor asymmetry may be visible.</p>
              <p><strong>Week 2-4:</strong> Final settling of filler. Results become fully apparent.</p>
            </div>
          </section>

          <section>
            <h3 className="text-base mb-3">Warning Signs - Seek Immediate Care If:</h3>
            <ul className="space-y-2 text-red-600">
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Severe pain that worsens after 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Skin discoloration (blanching or darkening)</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Vision changes or severe headache</span>
              </li>
              <li className="flex gap-2">
                <span>⚠️</span>
                <span>Signs of infection (fever, pus, increasing redness)</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3">Follow-Up</h3>
            <p className="text-slate-700">
              Scheduled follow-up appointment: February 18, 2026 at 2:00 PM
            </p>
            <p className="text-slate-700 mt-2">
              For questions or concerns, contact clinic: +65 6123 4567 (24/7 hotline)
            </p>
          </section>

          <section className="pt-4 border-t">
            <p className="text-xs text-slate-500">
              Physician Signature: Dr. Sarah Chen, MD (Digital signature verified)<br />
              Document generated: February 4, 2026 at 4:32 PM<br />
              Document ID: DS-2026-0204-0123
            </p>
          </section>
        </div>
      );
    } else {
      return (
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-base mb-3">Laboratory Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Lab Order ID</p>
                <p>LAB-2026-0456</p>
              </div>
              <div>
                <p className="text-slate-500">Analysis Date</p>
                <p>February 6, 2026</p>
              </div>
              <div>
                <p className="text-slate-500">Sample Type</p>
                <p>Dermal Filler Material</p>
              </div>
              <div>
                <p className="text-slate-500">Pathologist</p>
                <p>Dr. Michael Wong, PhD</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base mb-3">Material Analysis</h3>
            <div className="bg-slate-50 rounded p-4 space-y-3">
              <div>
                <p className="text-slate-600">Product Name:</p>
                <p>Juvederm Voluma XC</p>
              </div>
              <div>
                <p className="text-slate-600">Primary Component:</p>
                <p>Cross-linked Hyaluronic Acid (20 mg/mL)</p>
              </div>
              <div>
                <p className="text-slate-600">Additional Ingredients:</p>
                <p>Lidocaine HCl (0.3%), Phosphate Buffer, Sodium Chloride</p>
              </div>
              <div>
                <p className="text-slate-600">Batch Number:</p>
                <p>JV-2025-8472</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base mb-3">Microscopic Findings</h3>
            <p className="text-slate-700 leading-relaxed">
              Microscopic examination reveals uniform cross-linked hyaluronic acid gel with consistent particle 
              size distribution. No evidence of contamination, foreign particles, or structural abnormalities 
              detected. Material demonstrates appropriate viscosity and elasticity characteristics for deep 
              dermal injection.
            </p>
          </section>

          <section>
            <h3 className="text-base mb-3">Biocompatibility Assessment</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Sterility Test</span>
                <Badge className="bg-green-100 text-green-700">PASS</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Endotoxin Level</span>
                <Badge className="bg-green-100 text-green-700">Within Limits</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">pH Level</span>
                <Badge className="bg-green-100 text-green-700">7.2 (Normal)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Heavy Metal Screen</span>
                <Badge className="bg-green-100 text-green-700">Negative</Badge>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base mb-3">Clinical Interpretation</h3>
            <p className="text-slate-700 leading-relaxed">
              The analyzed dermal filler material is consistent with the manufacturer's specifications and 
              demonstrates appropriate quality standards for clinical use. No adverse findings were identified 
              that would contraindicate continued use or suggest product defect. Material is deemed suitable 
              for the intended cosmetic application.
            </p>
          </section>

          <section>
            <h3 className="text-base mb-3">Expected Duration</h3>
            <p className="text-slate-700">
              Based on material composition and injection technique, expected longevity: 12-18 months with 
              gradual natural degradation. Individual results may vary based on metabolic factors and 
              injection site.
            </p>
          </section>

          <section className="pt-4 border-t">
            <p className="text-xs text-slate-500">
              Report certified by: Dr. Michael Wong, PhD, Clinical Pathologist<br />
              Laboratory: Singapore Advanced Aesthetics Lab (SAAL)<br />
              Report generated: February 6, 2026<br />
              Report ID: HR-2026-0456
            </p>
          </section>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Clinical Documents
          </CardTitle>
          <CardDescription>
            Secure, read-only access to your procedure documentation
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="discharge">Discharge</TabsTrigger>
          <TabsTrigger value="histology">Histology</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {mockDocuments.map(doc => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      doc.type === 'discharge' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {doc.type === 'discharge' ? (
                        <FileText className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Microscope className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm line-clamp-2">{doc.title}</h3>
                        {doc.status === 'available' ? (
                          <Badge className="bg-green-100 text-green-700 flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex-shrink-0">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{doc.summary}</p>
                      <p className="text-xs text-slate-400">{new Date(doc.date).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discharge">
          <div className="grid md:grid-cols-2 gap-4">
            {mockDocuments.filter(d => d.type === 'discharge').map(doc => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-2">{doc.title}</h3>
                      <p className="text-xs text-slate-500 mb-2">{doc.summary}</p>
                      <p className="text-xs text-slate-400">{new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="histology">
          <div className="grid md:grid-cols-2 gap-4">
            {mockDocuments.filter(d => d.type === 'histology').map(doc => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Microscope className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-2">{doc.title}</h3>
                      <p className="text-xs text-slate-500 mb-2">{doc.summary}</p>
                      <p className="text-xs text-slate-400">{new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{selectedDoc.title}</CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span>{new Date(selectedDoc.date).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}</span>
                  <Badge variant="outline" className="gap-1">
                    <Lock className="w-3 h-3" />
                    Read-Only
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="max-w-4xl">
              {renderDocumentContent(selectedDoc)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
