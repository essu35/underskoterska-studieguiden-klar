import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCw, Clock, Coffee, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const StudyTimer = () => {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const studyTime = 25 * 60;
  const breakTime = 5 * 60;
  const longBreakTime = 15 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (mode === 'study') {
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);
      
      toast({
        title: "Bra jobbat! 🎉",
        description: "Dags för en paus!",
      });

      // Long break after 4 sessions
      if (newSessionCount % 4 === 0) {
        setMode('break');
        setTimeLeft(longBreakTime);
        toast({
          title: "Lång paus! ☕",
          description: "Du har klarat 4 studiepass. Ta 15 minuter paus!",
        });
      } else {
        setMode('break');
        setTimeLeft(breakTime);
      }
    } else {
      toast({
        title: "Pausen är över! 💪",
        description: "Dags att fortsätta studera!",
      });
      setMode('study');
      setTimeLeft(studyTime);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? studyTime : breakTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'study' 
    ? ((studyTime - timeLeft) / studyTime) * 100
    : ((breakTime - timeLeft) / breakTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tillbaka
          </Button>
        </Link>

        <div className="mb-8 animate-fade-in text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Studietimer
          </h1>
          <p className="text-muted-foreground text-lg">
            Pomodoro-teknik för effektivare studier
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{sessionsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Sessioner</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{sessionsCompleted * 25}</p>
                  <p className="text-sm text-muted-foreground">Minuter</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Coffee className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.floor(sessionsCompleted / 4)}</p>
                  <p className="text-sm text-muted-foreground">Långa pauser</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Timer Card */}
          <Card className="p-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center space-y-6">
              <Badge 
                className={`text-lg px-4 py-2 ${
                  mode === 'study' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-success/20 text-success'
                }`}
              >
                {mode === 'study' ? '📚 Studiepass' : '☕ Paus'}
              </Badge>

              <div className="relative">
                <div className="text-8xl font-bold mb-4 font-mono">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="h-3 mb-6" />
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className="gap-2 text-lg px-8 py-6"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pausa
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Starta
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={resetTimer}
                  className="gap-2 text-lg px-8 py-6"
                >
                  <RotateCw className="w-5 h-5" />
                  Återställ
                </Button>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-4">Hur fungerar Pomodoro-tekniken?</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  1
                </div>
                <p>Studera fokuserat i 25 minuter</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  2
                </div>
                <p>Ta en kort paus på 5 minuter</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  3
                </div>
                <p>Upprepa 4 gånger</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  4
                </div>
                <p>Ta en längre paus på 15 minuter</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
