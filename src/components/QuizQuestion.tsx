import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Award, Target } from "lucide-react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
}

export const QuizQuestion = ({ question, options, correctAnswer, explanation, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === correctAnswer;
    onAnswer(isCorrect);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  const getButtonStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? "border-primary bg-primary/20 text-primary scale-[1.02] shadow-medium" 
        : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]";
    }
    
    if (index === correctAnswer) {
      return "border-success bg-success/20 text-success animate-pulse";
    }
    
    if (selectedAnswer === index && index !== correctAnswer) {
      return "border-destructive bg-destructive/20 text-destructive";
    }
    
    return "border-muted text-muted-foreground opacity-60";
  };

  const getIcon = (index: number) => {
    if (!showResult) return null;
    
    if (index === correctAnswer) {
      return <CheckCircle className="h-6 w-6 text-success animate-bounce" />;
    }
    
    if (selectedAnswer === index && index !== correctAnswer) {
      return <XCircle className="h-6 w-6 text-destructive" />;
    }
    
    return null;
  };

  return (
    <div className="animate-fade-in">
      <Card className="bg-gradient-card shadow-strong border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
          <CardTitle className="text-xl lg:text-2xl text-foreground leading-relaxed font-bold">
            {question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 lg:p-8 space-y-6">
          <div className="space-y-4">
            {options.map((option, index) => {
              const Icon = getIcon(index);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-medium group ${getButtonStyle(index)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium text-base lg:text-lg">{option}</span>
                    </div>
                    {Icon}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-6 rounded-xl border-2 animate-scale-in ${
              isCorrect 
                ? "bg-gradient-to-r from-success/10 to-success/5 border-success/30" 
                : "bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/30"
            }`}>
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <div className="p-2 rounded-full bg-success/20">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-destructive/20">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2 text-foreground">
                    {isCorrect ? "🎉 Rätt svar!" : "❌ Fel svar"}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {!showResult ? (
              <Button 
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                size="lg"
                className="flex-1 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg py-6"
              >
                💫 Svara
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                size="lg"
                className="flex-1 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg py-6"
              >
                ➡️ Nästa fråga
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
