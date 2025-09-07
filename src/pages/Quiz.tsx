import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Brain, 
  CheckCircle, 
  XCircle,
  Trophy,
  Clock,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

interface Quiz {
  _id: string;
  title: string;
  source: string;
  questions: Array<{
    question: string;
    options: string[];
  }>;
  totalQuestions: number;
  bestScore: number;
  attempts: Array<{ score: number; attemptedAt: string }>;
  createdAt: string;
}

interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

const Quiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<QuizResult[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [createForm, setCreateForm] = useState({
    title: '',
    source: '',
    text: ''
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await api.get('/quiz/my-quizzes');
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/quiz/create', createForm);
      setSuccess('Quiz created successfully!');
      setCreateForm({ title: '', source: '', text: '' });
      fetchQuizzes();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create quiz');
    } finally {
      setIsCreating(false);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers(new Array(quiz.questions.length).fill(''));
    setResults(null);
    setScore(null);
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    if (!selectedQuiz) return;

    try {
      const response = await api.post('/quiz/submit', {
        quizId: selectedQuiz._id,
        answers
      });

      setScore(response.data.score);
      setResults(response.data.results);
      fetchQuizzes(); // Refresh to update scores
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to submit quiz');
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setResults(null);
    setScore(null);
  };

  if (selectedQuiz) {
    if (results) {
      // Show results
      return (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-emerald-100 rounded-full">
                    <Trophy className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>
                  Your score: {score}% ({results.filter(r => r.isCorrect).length}/{results.length} correct)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={score || 0} className="h-3" />
                  
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {result.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{result.question}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Your answer: <span className={result.isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                                {result.userAnswer}
                              </span>
                            </p>
                            {!result.isCorrect && (
                              <p className="text-sm text-emerald-600 mt-1">
                                Correct answer: {result.correctAnswer}
                              </p>
                            )}
                            {result.explanation && (
                              <p className="text-sm text-gray-500 mt-2 italic">
                                {result.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button onClick={resetQuiz} variant="outline">
                      Back to Quizzes
                    </Button>
                    <Button onClick={() => startQuiz(selectedQuiz)}>
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    // Show current question
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion) / selectedQuiz.questions.length) * 100;

    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedQuiz.title}</CardTitle>
                  <CardDescription>
                    Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={resetQuiz}>
                  Exit Quiz
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={answers[currentQuestion] === option ? "default" : "outline"}
                        className="w-full justify-start text-left p-4 h-auto"
                        onClick={() => selectAnswer(option)}
                      >
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion]}
                  >
                    {currentQuestion === selectedQuiz.questions.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
        <p className="text-gray-600 mt-2">
          Create and take AI-generated quizzes to test your knowledge
        </p>
      </motion.div>

      {/* Create Quiz Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Quiz
            </CardTitle>
            <CardDescription>
              Generate an AI-powered quiz from your study material
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
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
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter quiz title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source Material</Label>
                <Input
                  id="source"
                  value={createForm.source}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, source: e.target.value }))}
                  placeholder="e.g., Chapter 5 - Biology textbook"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Study Material Text</Label>
                <Textarea
                  id="text"
                  value={createForm.text}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Paste or type the content you want to create a quiz from..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? 'Creating Quiz...' : 'Create Quiz'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Existing Quizzes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Your Quizzes</h2>
        
        {quizzes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes yet</h3>
              <p className="text-gray-600">Create your first quiz to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.source}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {quiz.totalQuestions} questions
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Best Score</span>
                        <span className="font-medium text-emerald-600">{quiz.bestScore}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Attempts</span>
                        <span className="font-medium">{quiz.attempts.length}</span>
                      </div>

                      <Button 
                        onClick={() => startQuiz(quiz)}
                        className="w-full flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Take Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;