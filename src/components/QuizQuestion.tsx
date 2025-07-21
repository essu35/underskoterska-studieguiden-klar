import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface QuizQuestionProps {
  question: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: string;
  };
  onNext: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizQuestion = ({ question, onNext, questionNumber, totalQuestions }: QuizQuestionProps) => {
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
    const isCorrect = selectedAnswer === question.correctAnswer;
    onNext(isCorrect);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            {question.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Fråga {questionNumber} av {totalQuestions}
          </span>
        </div>
        <CardTitle className="text-xl text-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-red-500 bg-red-50 text-red-800"
                    : "border-primary bg-primary/5 text-primary"
                  : showResult && index === question.correctAnswer
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-muted hover:border-primary/50 bg-card hover:bg-primary/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <div>
                    {index === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <Card className={`border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Rätt svar!' : 'Fel svar'}
                  </p>
                  <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3 pt-4">
          {!showResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Svara
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              {questionNumber === totalQuestions ? 'Avsluta quiz' : 'Nästa fråga'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
