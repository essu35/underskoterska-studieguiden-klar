import { useState, useEffect } from "react";
import { ArrowLeft, Trophy, Target, TrendingUp, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuizResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  timeSpent: string;
}

const StudyProgress = () => {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
  });

  useEffect(() => {
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setQuizHistory(history);
      calculateStats(history);
    }
  }, []);

  const calculateStats = (history: QuizResult[]) => {
    if (history.length === 0) return;

    const total = history.length;
    const scores = history.map(q => (q.score / q.totalQuestions) * 100);
    const average = scores.reduce((a, b) => a + b, 0) / total;
    const best = Math.max(...scores);

    setStats({
      totalQuizzes: total,
      averageScore: Math.round(average),
      bestScore: Math.round(best),
      totalTimeSpent: history.length * 15, // Estimate
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tillbaka
          </Button>
        </Link>

        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Studieframsteg
          </h1>
          <p className="text-muted-foreground text-lg">
            Följ din utveckling och se dina resultat
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalQuizzes}</h3>
            <p className="text-sm text-muted-foreground">Genomförda quiz</p>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.averageScore}%</h3>
            <p className="text-sm text-muted-foreground">Genomsnittligt resultat</p>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.bestScore}%</h3>
            <p className="text-sm text-muted-foreground">Bästa resultat</p>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalTimeSpent}min</h3>
            <p className="text-sm text-muted-foreground">Studietid</p>
          </Card>
        </div>

        {/* Quiz History */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6">Historik</h2>
          
          {quizHistory.length === 0 ? (
            <Card className="p-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen historik än</h3>
              <p className="text-muted-foreground mb-6">
                Börja med att genomföra ett quiz för att se dina resultat här
              </p>
              <Link to="/quiz">
                <Button>Starta ett quiz</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {quizHistory.map((result, index) => {
                const percentage = (result.score / result.totalQuestions) * 100;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{result.quizTitle}</h3>
                        <p className="text-sm text-muted-foreground">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                          {percentage.toFixed(0)}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.score}/{result.totalQuestions} rätt
                        </p>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{result.timeSpent}</Badge>
                      {percentage >= 80 && (
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                          Utmärkt!
                        </Badge>
                      )}
                      {percentage >= 60 && percentage < 80 && (
                        <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                          Godkänd
                        </Badge>
                      )}
                      {percentage < 60 && (
                        <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">
                          Öva mer
                        </Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyProgress;
