import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  GitCompare, 
  Flag, 
  CheckCircle2,
  Info,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface ComparisonModeProps {
  hasSimulation: boolean;
}

export default function ComparisonMode({ hasSimulation }: ComparisonModeProps) {
  const [opacity, setOpacity] = useState([50]);
  const [reportedDivergence, setReportedDivergence] = useState(false);
  const [showHealingTimeline, setShowHealingTimeline] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(0);

  const healingStages = [
    { week: 0, label: 'Immediate Post-Op', swelling: 100, bruising: 80 },
    { week: 1, label: 'Week 1', swelling: 70, bruising: 50 },
    { week: 2, label: 'Week 2', swelling: 40, bruising: 20 },
    { week: 4, label: 'Week 4', swelling: 15, bruising: 5 },
    { week: 8, label: 'Week 8', swelling: 5, bruising: 0 },
    { week: 12, label: 'Final Result', swelling: 0, bruising: 0 },
  ];

  const handleReportDivergence = () => {
    setReportedDivergence(true);
    // In real app, this would update patient record status
  };

  if (!hasSimulation) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-600">Complete a procedure simulation first to enable comparison mode</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comparison View */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <GitCompare className="w-5 h-5" />
                Pre-Op vs. Predicted Post-Op Comparison
              </CardTitle>
              <CardDescription>
                Use the slider to compare your baseline scan with the predicted outcome
              </CardDescription>
            </div>
            <Button onClick={() => setShowHealingTimeline(!showHealingTimeline)} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              {showHealingTimeline ? 'Hide' : 'Show'} Healing Timeline
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comparison Canvas */}
          <div className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
            {/* Base image (Pre-Op) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-80 bg-gradient-to-b from-amber-100 to-amber-50 rounded-full relative shadow-lg">
                  {/* Pre-op face features */}
                  <div className="absolute top-24 left-16 w-8 h-4 bg-slate-700 rounded-full" />
                  <div className="absolute top-24 right-16 w-8 h-4 bg-slate-700 rounded-full" />
                  <div className="absolute top-36 left-1/2 -translate-x-1/2 w-6 h-12 bg-amber-200 rounded-b-lg" />
                  <div className="absolute top-52 left-1/2 -translate-x-1/2 w-16 h-2 bg-rose-300 rounded-full" />
                  
                  {/* Overlay with predicted changes */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-200"
                    style={{ opacity: opacity[0] / 100 }}
                  >
                    {/* Enhanced cheeks */}
                    <div className="absolute top-32 left-8 w-24 h-24 bg-blue-300/40 rounded-full blur-md" />
                    <div className="absolute top-32 right-8 w-24 h-24 bg-blue-300/40 rounded-full blur-md" />
                    
                    {showHealingTimeline && selectedWeek < 3 && (
                      <>
                        {/* Swelling overlay */}
                        <div 
                          className="absolute inset-0 bg-red-200/20 rounded-full"
                          style={{ opacity: healingStages[selectedWeek].swelling / 200 }}
                        />
                        {/* Bruising marks */}
                        {healingStages[selectedWeek].bruising > 0 && (
                          <>
                            <div 
                              className="absolute top-36 left-12 w-12 h-8 bg-purple-400/40 rounded-full blur-sm"
                              style={{ opacity: healingStages[selectedWeek].bruising / 100 }}
                            />
                            <div 
                              className="absolute top-36 right-12 w-12 h-8 bg-purple-400/40 rounded-full blur-sm"
                              style={{ opacity: healingStages[selectedWeek].bruising / 100 }}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                Pre-Op Baseline
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-600 text-white">
                Predicted Outcome
              </Badge>
            </div>

            {/* Performance indicator */}
            <div className="absolute bottom-4 right-4 text-xs bg-white/90 backdrop-blur px-2 py-1 rounded">
              <span className="text-green-600">● </span>
              Rendering at 60 FPS
            </div>
          </div>

          {/* Transparency Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm">Comparison Opacity</label>
              <span className="text-sm text-slate-600">{opacity[0]}%</span>
            </div>
            <Slider 
              value={opacity}
              onValueChange={setOpacity}
              min={0}
              max={100}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Pre-Op Only</span>
              <span>Post-Op Only</span>
            </div>
          </div>

          {/* Report Divergence */}
          <div className="flex gap-3">
            <Button 
              onClick={handleReportDivergence}
              disabled={reportedDivergence}
              variant={reportedDivergence ? "outline" : "default"}
              className="flex-1"
            >
              {reportedDivergence ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Divergence Reported
                </>
              ) : (
                <>
                  <Flag className="w-4 h-4 mr-2" />
                  Report Significant Divergence
                </>
              )}
            </Button>
          </div>

          {reportedDivergence && (
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="w-4 h-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                Your case has been flagged for clinical review. A staff member will contact you within 24 hours 
                to assess the recovery divergence and provide guidance.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Healing Timeline */}
      {showHealingTimeline && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recovery Timeline Visualization
            </CardTitle>
            <CardDescription>
              See how your appearance is expected to change during the healing process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timeline Selector */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {healingStages.map((stage, idx) => (
                <Button
                  key={idx}
                  onClick={() => setSelectedWeek(idx)}
                  variant={selectedWeek === idx ? "default" : "outline"}
                  className="flex flex-col h-auto py-3"
                  size="sm"
                >
                  <span className="text-xs mb-1">{stage.label}</span>
                  {stage.week > 0 && (
                    <span className="text-xs opacity-70">{stage.week}w</span>
                  )}
                </Button>
              ))}
            </div>

            {/* Recovery Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Swelling</span>
                    <Badge variant={healingStages[selectedWeek].swelling > 50 ? "destructive" : 
                                   healingStages[selectedWeek].swelling > 20 ? "default" : "secondary"}>
                      {healingStages[selectedWeek].swelling}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${healingStages[selectedWeek].swelling}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bruising</span>
                    <Badge variant={healingStages[selectedWeek].bruising > 50 ? "destructive" : 
                                   healingStages[selectedWeek].bruising > 20 ? "default" : "secondary"}>
                      {healingStages[selectedWeek].bruising}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${healingStages[selectedWeek].bruising}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stage Description */}
            <Alert>
              <Info className="w-4 h-4" />
              <AlertDescription>
                {selectedWeek === 0 && "Immediately after the procedure, expect moderate swelling and possible bruising. This is a normal part of the healing process."}
                {selectedWeek === 1 && "Week 1: Swelling and bruising should be noticeably reduced. You may still see some asymmetry."}
                {selectedWeek === 2 && "Week 2: Most swelling has subsided. The filler is beginning to settle into its final position."}
                {selectedWeek === 3 && "Week 4: Nearly at your final result. Minor settling may still occur."}
                {selectedWeek === 4 && "Week 8: Filler has fully integrated. Results are stable."}
                {selectedWeek === 5 && "Final Result: This represents your expected long-term appearance. Individual results may vary."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
