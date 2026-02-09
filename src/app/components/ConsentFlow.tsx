import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { Shield, Lock, Camera, Database, CheckCircle2 } from 'lucide-react';
import type { ConsentRecord } from '../App.tsx';

interface ConsentFlowProps {
  onConsentGranted: (consent: ConsentRecord) => void;
}

export default function ConsentFlow({ onConsentGranted }: ConsentFlowProps) {
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollThreshold = target.scrollHeight - target.clientHeight - 20;
    
    if (target.scrollTop >= scrollThreshold) {
      setScrolledToEnd(true);
    }
  };

  // Alternative: Allow user to enable checkbox after a few seconds as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrolledToEnd(true);
    }, 3000); // Enable after 3 seconds as fallback
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAgree = () => {
    const consent: ConsentRecord = {
      consentFlag: true,
      timestamp: new Date().toISOString(),
      cameraAccess: true,
      dataCapture: true,
      dataStorageConsent: true,
    };
    onConsentGranted(consent);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Privacy Policy & Data Agreement</CardTitle>
          <CardDescription>
            Please read the following carefully before proceeding
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="relative">
            <ScrollArea className="h-[400px] border rounded-lg p-6 bg-slate-50">
              <div 
                className="space-y-6 text-sm"
                onScroll={(e) => {
                  const target = e.currentTarget.parentElement;
                  if (target) {
                    const scrollThreshold = target.scrollHeight - target.clientHeight - 20;
                    if (target.scrollTop >= scrollThreshold) {
                      setScrolledToEnd(true);
                    }
                  }
                }}
              >
                <section>
                  <h3 className="text-base mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Data Collection & Privacy
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    This application collects and processes sensitive biometric and medical data, including 3D facial scans, 
                    medical history, allergy information, and procedure records. All data is governed by Singapore's Personal 
                    Data Protection Act (PDPA) and is encrypted using AES-256 encryption at rest.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Camera & Scanning Permissions
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    To provide AR visualization services, the application requires access to your device camera for real-time 
                    3D facial capture. Camera data is processed locally on your device during capture and transmitted securely 
                    to authorized clinic systems for simulation and analysis. You maintain the right to revoke camera access at 
                    any time through device settings.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data Storage & Retention
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Your 3D facial models, medical records, and procedure data will be stored securely in the clinic's Electronic 
                    Health Record (EHR) system. Data retention follows clinical record-keeping requirements and may be stored for 
                    up to 7 years post-procedure for medical and legal compliance purposes.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2">Access Control</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Only authorized clinic staff (doctors, nurses) with valid credentials can access your complete medical records. 
                    Two-Factor Authentication (2FA) is enforced for all remote access. You will receive notifications when your 
                    records are accessed for non-emergency purposes.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2">Your Rights</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You have the right to access, correct, or request deletion of your personal data at any time. To exercise 
                    these rights, please contact the clinic's Data Protection Officer. Note that certain data may need to be 
                    retained for legal and medical compliance even after deletion requests.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2">Clinical Use</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The AR simulations and 3D models generated are for educational and consultation purposes only. They represent 
                    predicted outcomes based on physiological models and do not guarantee specific results. Actual post-procedure 
                    appearance may vary due to individual healing responses.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-2">Consent to Treatment</h3>
                  <p className="text-slate-700 leading-relaxed">
                    This data agreement does not constitute consent for any medical procedure. Separate informed consent will be 
                    obtained before any clinical treatment. You may withdraw from using this application at any time without 
                    affecting your access to medical care.
                  </p>
                </section>

                <section className="pt-4 border-t">
                  <p className="text-slate-600 italic text-xs">
                    Last updated: February 6, 2026. By proceeding, you acknowledge that you have read, understood, and agree to 
                    the terms outlined in this privacy policy and data agreement.
                  </p>
                </section>
              </div>
            </ScrollArea>

            {!scrolledToEnd && (
              <p className="text-sm text-amber-600 text-center flex items-center justify-center gap-2">
                <span className="animate-bounce">↓</span>
                Scroll to the end to proceed
              </p>
            )}
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox 
              id="agree" 
              checked={agreeChecked}
              onCheckedChange={(checked) => setAgreeChecked(checked === true)}
              disabled={!scrolledToEnd}
            />
            <label 
              htmlFor="agree" 
              className={`text-sm leading-relaxed ${!scrolledToEnd ? 'text-slate-400' : 'text-slate-700 cursor-pointer'}`}
            >
              I have read and agree to the Privacy Policy and Data Agreement. I consent to camera access, 
              data capture, and secure storage of my medical information.
            </label>
          </div>

          <Button 
            onClick={handleAgree}
            disabled={!scrolledToEnd || !agreeChecked}
            className="w-full h-12 text-base"
            size="lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            I Agree - Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}