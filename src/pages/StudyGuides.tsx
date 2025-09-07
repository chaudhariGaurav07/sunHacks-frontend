import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Brain, 
  PlayCircle, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface StudyGuide {
  _id: string;
  title: string;
  originalFileName: string;
  fileSize: number;
  summary: string;
  flashcards: Array<{ front: string; back: string }>;
  mindMap: string;
  audioUrl: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

const StudyGuides = () => {
  const [guides, setGuides] = useState<StudyGuide[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await api.get('/guides/my-guides');
      setGuides(response.data.guides);
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await api.post('/guides/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Study guide uploaded successfully!');
      setSelectedFile(null);
      fetchGuides();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'processing':
        return <Badge variant="secondary"><Brain className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'completed':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Ready</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Study Guides</h1>
        <p className="text-gray-600 mt-2">
          Upload PDFs and get AI-generated study materials
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Study Guide
            </CardTitle>
            <CardDescription>
              Upload a PDF to generate summaries, flashcards, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFileUpload} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="file">PDF File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? 'Uploading...' : 'Upload & Process'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Guides List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Your Study Guides</h2>
        
        {guides.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No study guides yet</h3>
              <p className="text-gray-600">Upload your first PDF to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>
                          {guide.originalFileName} • {Math.round(guide.fileSize / 1024)} KB
                        </CardDescription>
                      </div>
                      {getStatusBadge(guide.processingStatus)}
                    </div>
                  </CardHeader>
                  
                  {guide.processingStatus === 'completed' && (
                    <CardContent>
                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="summary">Summary</TabsTrigger>
                          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                          <TabsTrigger value="mindmap">Mind Map</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="summary" className="mt-4">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {guide.summary}
                          </p>
                        </TabsContent>
                        
                        <TabsContent value="flashcards" className="mt-4">
                          <div className="space-y-3">
                            {guide.flashcards.slice(0, 2).map((card, idx) => (
                              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                <p className="font-medium text-sm text-gray-900">{card.front}</p>
                                <p className="text-sm text-gray-600 mt-1">{card.back}</p>
                              </div>
                            ))}
                            {guide.flashcards.length > 2 && (
                              <p className="text-sm text-gray-500">
                                +{guide.flashcards.length - 2} more flashcards
                              </p>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="mindmap" className="mt-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                              {guide.mindMap}
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      {guide.audioUrl && (
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <PlayCircle className="h-4 w-4" />
                            Play Audio Summary
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudyGuides;