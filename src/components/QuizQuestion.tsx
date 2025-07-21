import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface QuizQuestionProps {
  question: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: string;
  };
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizQuestion = ({ question, onNext, questionNumber, totalQuestions }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="bg-gradient-card shadow-soft border-0">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            Fråga {questionNumber} av {totalQuestions}
          </Badge>
          <Badge variant="outline" className="bg-quiz/5 text-quiz border-quiz/20">
            {question.category}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-relaxed text-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full text-left justify-start h-auto p-4 transition-all duration-200";
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += " bg-success/20 border-success text-success hover:bg-success/20";
              } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                buttonClass += " bg-destructive/20 border-destructive text-destructive hover:bg-destructive/20";
              } else {
                buttonClass += " opacity-50";
              }
            } else {
              buttonClass += " hover:bg-primary/10 border-border";
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 text-sm leading-relaxed">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {showResult && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className="animate-fade-in">
            <Card className={`border-2 ${isCorrect ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-success mt-1" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive mt-1" />
                  )}
                  <div>
                    <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isCorrect ? 'Rätt svar!' : 'Fel svar'}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={onNext}
              className="w-full mt-4"
              size="lg"
            >
              {questionNumber === totalQuestions ? 'Avsluta quiz' : 'Nästa fråga'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};