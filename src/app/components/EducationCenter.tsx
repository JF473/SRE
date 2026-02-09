import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle2,
  Circle,
  AlertCircle,
  Lightbulb,
  Heart,
  Shield
} from 'lucide-react';

interface EducationItem {
  id: string;
  title: string;
  description: string;
  phase: 'pre-procedure' | 'post-procedure';
  type: 'article' | 'video' | 'checklist';
  duration?: string;
  completed: boolean;
  content: React.ReactNode;
}

export default function EducationCenter() {
  const [educationItems, setEducationItems] = useState<EducationItem[]>([
    {
      id: '1',
      title: 'Preparing for Your 3D Facial Scan',
      description: 'Learn how to ensure optimal scan quality',
      phase: 'pre-procedure',
      type: 'article',
      duration: '3 min read',
      completed: true,
      content: null
    },
    {
      id: '2',
      title: 'Understanding Dermal Fillers',
      description: 'What are dermal fillers and how do they work?',
      phase: 'pre-procedure',
      type: 'video',
      duration: '5 min',
      completed: false,
      content: null
    },
    {
      id: '3',
      title: 'Pre-Procedure Checklist',
      description: 'Important steps before your appointment',
      phase: 'pre-procedure',
      type: 'checklist',
      completed: false,
      content: null
    },
    {
      id: '4',
      title: 'Post-Procedure Care Instructions',
      description: 'Essential aftercare for optimal healing',
      phase: 'post-procedure',
      type: 'article',
      duration: '4 min read',
      completed: true,
      content: null
    },
    {
      id: '5',
      title: 'Managing Swelling and Bruising',
      description: 'Normal healing processes and when to be concerned',
      phase: 'post-procedure',
      type: 'video',
      duration: '6 min',
      completed: true,
      content: null
    },
    {
      id: '6',
      title: 'Recovery Timeline Expectations',
      description: 'What to expect week by week',
      phase: 'post-procedure',
      type: 'article',
      duration: '5 min read',
      completed: false,
      content: null
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [currentPhase] = useState<'pre-procedure' | 'post-procedure'>('post-procedure');

  const markAsComplete = (itemId: string) => {
    setEducationItems(educationItems.map(item => 
      item.id === itemId ? { ...item, completed: true } : item
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'checklist':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const renderEducationContent = (item: EducationItem) => {
    if (item.id === '1') {
      return (
        <div className="space-y-6">
          <section>
            <h3 className="text-base mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Optimal Lighting Conditions
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Your 3D facial scan requires good lighting to capture accurate details. The system requires 
              a minimum of 200 lux (similar to a well-lit office environment).
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Face a window during daytime for natural lighting</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Use overhead lights and desk lamps together</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Ensure lighting is even across your face (avoid shadows)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Avoid backlighting (light behind you)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600">✗</span>
                <span>Don't use direct sunlight (too harsh)</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3">Positioning Tips</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Hold your phone at eye level, about 18-24 inches away</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Keep your face centered in the circular guide</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Maintain a neutral expression (relaxed, not smiling)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Remove glasses and tie back hair from face</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3">During Capture</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Once capture begins, slowly rotate your head from left to right (about 45 degrees each direction). 
              Move smoothly and steadily - the system uses parallax from your movement to build depth information. 
              The entire capture takes about 10-15 seconds.
            </p>
          </section>
        </div>
      );
    } else if (item.id === '4') {
      return (
        <div className="space-y-6">
          <section>
            <h3 className="text-base mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              First 24 Hours
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Apply cold compress for 10-15 minutes every hour</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Sleep with head elevated on 2-3 pillows</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Avoid touching or massaging the treated area</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>No alcohol, strenuous exercise, or excessive heat (sauna/steam)</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3">Days 2-7</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Continue gentle cold compress if swelling persists</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Light makeup can be applied after 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Resume normal skincare routine gently</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Avoid dental work or facial treatments for 2 weeks</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Long-term Care
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Use sunscreen daily (SPF 30+) to protect treated area</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Maintain good hydration (helps filler longevity)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>Schedule follow-up appointments as recommended</span>
              </li>
            </ul>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-base mb-2 flex items-center gap-2 text-amber-900">
              <AlertCircle className="w-5 h-5" />
              When to Contact Your Doctor
            </h3>
            <ul className="space-y-1 text-sm text-amber-800">
              <li>• Severe pain that worsens after 24 hours</li>
              <li>• Skin discoloration (blanching or darkening)</li>
              <li>• Vision changes or severe headache</li>
              <li>• Signs of infection (fever, pus, increasing redness)</li>
            </ul>
            <p className="text-sm text-amber-900 mt-3">
              Emergency hotline: +65 6123 4567 (24/7)
            </p>
          </section>
        </div>
      );
    } else {
      return (
        <div className="text-center py-12 text-slate-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Content preview for: {item.title}</p>
          <p className="text-sm mt-2">This is a demonstration of the education system.</p>
        </div>
      );
    }
  };

  const preItems = educationItems.filter(item => item.phase === 'pre-procedure');
  const postItems = educationItems.filter(item => item.phase === 'post-procedure');
  const completedCount = educationItems.filter(item => item.completed).length;

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" />
                Education Center
              </CardTitle>
              <CardDescription>
                Phase-based educational materials to guide you through your journey
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-700">
              {completedCount} / {educationItems.length} Completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(completedCount / educationItems.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-slate-600">
              {Math.round((completedCount / educationItems.length) * 100)}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Indicator */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-600 mb-1">Current Phase</p>
              <p className="capitalize">
                {currentPhase === 'pre-procedure' ? 'Pre-Procedure Preparation' : 'Post-Procedure Recovery'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="post" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="pre">Pre-Procedure</TabsTrigger>
          <TabsTrigger value="post">Post-Procedure</TabsTrigger>
        </TabsList>

        <TabsContent value="pre" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {preItems.map(item => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === 'video' ? 'bg-red-100' :
                      item.type === 'checklist' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm line-clamp-2">{item.title}</h3>
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{item.description}</p>
                      {item.duration && (
                        <Badge variant="outline" className="text-xs">
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="post" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {postItems.map(item => (
              <Card 
                key={item.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === 'video' ? 'bg-red-100' :
                      item.type === 'checklist' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm line-clamp-2">{item.title}</h3>
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{item.description}</p>
                      {item.duration && (
                        <Badge variant="outline" className="text-xs">
                          {item.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Content Viewer */}
      {selectedItem && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{selectedItem.title}</CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <Badge variant="outline">
                    {selectedItem.type}
                  </Badge>
                  {selectedItem.duration && (
                    <span>{selectedItem.duration}</span>
                  )}
                  <Badge className={selectedItem.completed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}>
                    {selectedItem.completed ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3 mr-1" />
                        Not Started
                      </>
                    )}
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!selectedItem.completed && (
                  <Button 
                    onClick={() => markAsComplete(selectedItem.id)}
                    size="sm"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
                <Button 
                  onClick={() => setSelectedItem(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {renderEducationContent(selectedItem)}
          </CardContent>
        </Card>
      )}

      {/* Staff View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">For Clinic Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-3">
            Education completion status is tracked and visible to clinic staff to confirm patients 
            have reviewed relevant guidance materials.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View Patient Completion Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
