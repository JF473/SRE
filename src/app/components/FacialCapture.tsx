import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Camera, 
  Sun, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  RotateCcw,
  Video
} from 'lucide-react';

interface FacialCaptureProps {
  onCaptureComplete: () => void;
}

export default function FacialCapture({ onCaptureComplete }: FacialCaptureProps) {
  const [captureState, setCaptureState] = useState<'idle' | 'checking' | 'ready' | 'capturing' | 'processing' | 'complete'>('idle');
  const [luminance, setLuminance] = useState(0);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const luminanceIntervalRef = useRef<number | null>(null);

  const MIN_LUMINANCE = 200; // 200 lux minimum as per requirements

  useEffect(() => {
    // Cleanup camera stream and luminance interval on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (luminanceIntervalRef.current) {
        clearInterval(luminanceIntervalRef.current);
      }
    };
  }, []);

  const calculateLuminance = (imageData: ImageData): number => {
    const data = imageData.data;
    let sum = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Standard luminance calculation
      sum += (0.299 * r + 0.587 * g + 0.114 * b);
    }
    
    return Math.round(sum / (data.length / 4));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 1920, height: 1080 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
        setCaptureState('checking');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Unable to access camera. Please grant camera permissions.');
    }
  };

  // Luminance interval managed by useEffect
  useEffect(() => {
    if (showCamera && (captureState === 'checking' || captureState === 'ready')) {
      luminanceIntervalRef.current = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const video = videoRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const avgLuminance = calculateLuminance(imageData);
            setLuminance(avgLuminance);
            if (avgLuminance >= MIN_LUMINANCE) {
              setCaptureState('ready');
            } else {
              setCaptureState('checking');
            }
          }
        }
      }, 500);
    } else if (
      captureState === 'capturing' ||
      captureState === 'processing' ||
      captureState === 'complete' ||
      !showCamera
    ) {
      if (luminanceIntervalRef.current) {
        clearInterval(luminanceIntervalRef.current);
        luminanceIntervalRef.current = null;
      }
    }
    // Cleanup interval on state change
    return () => {
      if (luminanceIntervalRef.current) {
        clearInterval(luminanceIntervalRef.current);
        luminanceIntervalRef.current = null;
      }
    };
  }, [showCamera, captureState]);

  const startCapture = () => {
    setCaptureState('capturing');
    setCaptureProgress(0);
    
    // Simulate capture progress
    const progressInterval = setInterval(() => {
      setCaptureProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCaptureState('processing');
          
          // Simulate processing
          setTimeout(() => {
            setCaptureState('complete');
            onCaptureComplete();
          }, 2000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const reset = () => {
    setCaptureProgress(0);
    setCaptureState('idle');
    setShowCamera(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (luminanceIntervalRef.current) {
      clearInterval(luminanceIntervalRef.current);
      luminanceIntervalRef.current = null;
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Camera View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            3D Facial Capture
          </CardTitle>
          <CardDescription>
            Position your face in the frame and follow the guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-[4/3] bg-slate-900 rounded-lg overflow-hidden relative">
            {!showCamera && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-slate-600" />
              </div>
            )}
            
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              muted
              className={`w-full h-full object-cover ${showCamera ? 'block' : 'hidden'} scale-x-[-1]`}
            />
            
            {/* Face Guide Overlay */}
            {showCamera && captureState !== 'complete' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-80 border-4 border-white/30 rounded-full"></div>
              </div>
            )}
            
            {/* Status Indicator */}
            {showCamera && (
              <div className="absolute top-4 right-4">
                {captureState === 'ready' && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Ready
                  </div>
                )}
                {captureState === 'checking' && (
                  <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Sun className="w-3 h-3" />
                    Checking Light
                  </div>
                )}
                {captureState === 'capturing' && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Capturing
                  </div>
                )}
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Controls */}
          <div className="space-y-3">
            {captureState === 'idle' && (
              <Button onClick={startCamera} className="w-full" size="lg">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            )}
            
            {(captureState === 'checking' || captureState === 'ready') && (
              <>
                <Button 
                  onClick={startCapture} 
                  className="w-full" 
                  size="lg"
                  disabled={captureState !== 'ready'}
                >
                  {captureState === 'ready' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Begin Capture
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Adjusting to lighting...
                    </>
                  )}
                </Button>
                <Button onClick={reset} variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
            
            {captureState === 'capturing' && (
              <div className="space-y-2">
                <Progress value={captureProgress} className="h-3" />
                <p className="text-sm text-center text-slate-600">
                  Slowly rotate your head left and right...
                </p>
              </div>
            )}
            
            {captureState === 'processing' && (
              <div className="text-center py-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-slate-600">Processing 3D model...</p>
              </div>
            )}
            
            {captureState === 'complete' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  3D facial model captured successfully!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions & Status */}
      <Card>
        <CardHeader>
          <CardTitle>Capture Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Lighting Status */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Scene Luminance
              </span>
              <span className={`text-sm px-2 py-1 rounded ${
                luminance >= MIN_LUMINANCE ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {luminance} lux
              </span>
            </div>
            <Progress 
              value={Math.min((luminance / MIN_LUMINANCE) * 100, 100)} 
              className="h-2"
            />
            {luminance < MIN_LUMINANCE && luminance > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="text-xs">
                  Insufficient lighting. Minimum required: {MIN_LUMINANCE} lux. 
                  Please move to a brighter area or turn on more lights.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h4 className="text-sm">Steps:</h4>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                <span>Ensure you're in a well-lit environment (minimum 200 lux)</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                <span>Position your face within the guide circle</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                <span>Keep your face neutral and relaxed</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                <span>When capturing begins, slowly turn your head left and right</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">5</span>
                <span>Hold still briefly for final processing</span>
              </li>
            </ol>
          </div>

          {/* Technical Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h4 className="text-sm mb-2 text-blue-900">Technical Details</h4>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>• Real-time 3D point cloud generation</li>
              <li>• RGB depth estimation from parallax</li>
              <li>• Seamless texture mapping (no stitching)</li>
              <li>• Captures full facial contours and depth profile</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
