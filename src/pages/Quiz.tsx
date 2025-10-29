import { useState } from "react";
import { ArrowLeft, Trophy, Clock, Target, BookOpen, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "@/components/QuizQuestion";
import { toast } from "@/hooks/use-toast";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: "Nybörjare" | "Medel" | "Avancerad";
  estimatedTime: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizzes: Quiz[] = [
  {
    id: "anatomy",
    title: "Anatomi & Fysiologi",
    description: "Testa dina kunskaper om kroppens uppbyggnad och funktioner",
    difficulty: "Medel",
    estimatedTime: "15 min",
    questions: [
      {
        question: "Vilket organ ansvarar för att producera insulin?",
        options: ["Levern", "Bukspottkörteln", "Njurarna", "Mjälten"],
        correctAnswer: 1,
        explanation: "Bukspottkörteln producerar insulin som reglerar blodsockernivån."
      },
      {
        question: "Vad kallas den största artären i kroppen?",
        options: ["Aorta", "Lungartären", "Halspulsådern", "Bäckenartären"],
        correctAnswer: 0,
        explanation: "Aorta är kroppens största artär och leder syrerikt blod från hjärtat."
      },
      {
        question: "Hur många kammare har hjärtat?",
        options: ["Två", "Tre", "Fyra", "Fem"],
        correctAnswer: 2,
        explanation: "Hjärtat har fyra kammare: två förmak och två kammare."
      },
      {
        question: "Vilket är det största organet i människokroppen?",
        options: ["Levern", "Hjärnan", "Huden", "Lungorna"],
        correctAnswer: 2,
        explanation: "Huden är kroppens största organ och skyddar mot yttre påverkan."
      },
      {
        question: "Vad kallas den vätska som cirkulerar i lymfsystemet?",
        options: ["Plasma", "Lymfa", "Serum", "Cerebrospinalvätska"],
        correctAnswer: 1,
        explanation: "Lymfa är den färglösa vätska som transporterar vita blodkroppar i lymfsystemet."
      },
      {
        question: "Vilken del av nervsystemet kontrollerar ofrivilliga funktioner?",
        options: ["Det somatiska nervsystemet", "Det autonoma nervsystemet", "Det centrala nervsystemet", "Det perifera nervsystemet"],
        correctAnswer: 1,
        explanation: "Det autonoma nervsystemet kontrollerar ofrivilliga funktioner som andning och hjärtslag."
      },
      {
        question: "Var produceras röda blodkroppar?",
        options: ["I levern", "I benmärgen", "I mjälten", "I njurarna"],
        correctAnswer: 1,
        explanation: "Röda blodkroppar produceras i benmärgen."
      },
      {
        question: "Vad kallas luftrörets förgrening till lungorna?",
        options: ["Bronkioler", "Alveoler", "Bronker", "Trakea"],
        correctAnswer: 2,
        explanation: "Bronkerna är luftrörets förgrening som leder luften till lungorna."
      }
    ]
  },
  {
    id: "vital-parameters",
    title: "Vitalparametrar",
    description: "Kunskap om mätning och tolkning av vitala parametrar",
    difficulty: "Nybörjare",
    estimatedTime: "12 min",
    questions: [
      {
        question: "Vilket är normalvärdet för vuxens vilopuls?",
        options: ["40-60 slag/min", "60-100 slag/min", "100-120 slag/min", "120-140 slag/min"],
        correctAnswer: 1,
        explanation: "Normalvärdet för vuxens vilopuls är 60-100 slag per minut."
      },
      {
        question: "Vad anses vara normalt blodtryck för en vuxen?",
        options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
        correctAnswer: 1,
        explanation: "120/80 mmHg anses vara optimalt blodtryck för vuxna."
      },
      {
        question: "Vilket är normalvärdet för andningsfrekvens hos vuxna?",
        options: ["8-12 andetag/min", "12-20 andetag/min", "20-30 andetag/min", "30-40 andetag/min"],
        correctAnswer: 1,
        explanation: "Normal andningsfrekvens för vuxna är 12-20 andetag per minut."
      },
      {
        question: "Vid vilken kroppstemperatur anses en vuxen ha feber?",
        options: ["Över 37.0°C", "Över 37.5°C", "Över 38.0°C", "Över 38.5°C"],
        correctAnswer: 2,
        explanation: "Feber definieras som kroppstemperatur över 38.0°C."
      },
      {
        question: "Vad kallas mätningen av syremättnad i blodet?",
        options: ["Spirometri", "Oximetri", "Kapnografi", "Pulsoximetri"],
        correctAnswer: 3,
        explanation: "Pulsoximetri är mätningen av syremättnad i blodet, normalt över 95%."
      },
      {
        question: "Vilket är normalt värde för syremättnad (SpO2)?",
        options: ["80-85%", "85-90%", "90-95%", "95-100%"],
        correctAnswer: 3,
        explanation: "Normal syremättnad är 95-100% hos friska individer."
      },
      {
        question: "Vad kallas en onormalt låg puls?",
        options: ["Takykardi", "Bradykardi", "Arytmi", "Asystoli"],
        correctAnswer: 1,
        explanation: "Bradykardi är när pulsen är under 60 slag per minut i vila."
      },
      {
        question: "Var är den vanligaste platsen att mäta puls?",
        options: ["Halspulsådern", "Ljumsken", "Handleden", "Fotleden"],
        correctAnswer: 2,
        explanation: "Radialpulsen vid handleden är den vanligaste mätplatsen."
      }
    ]
  },
  {
    id: "medications",
    title: "Läkemedelshantering",
    description: "Säker hantering och administrering av läkemedel",
    difficulty: "Avancerad",
    estimatedTime: "18 min",
    questions: [
      {
        question: "Vad betyder förkortningen 'p.o.' i läkemedelsordinationer?",
        options: ["Per os (genom munnen)", "Post operationem (efter operation)", "Pro dosi (per dos)", "Per oculus (i ögat)"],
        correctAnswer: 0,
        explanation: "P.o. står för per os, vilket betyder att läkemedlet tas genom munnen."
      },
      {
        question: "Vilken färg har nålen för subkutan injektion vanligtvis?",
        options: ["Blå", "Grön", "Orange", "Gul"],
        correctAnswer: 2,
        explanation: "Orange nål (25G) används vanligtvis för subkutana injektioner."
      },
      {
        question: "Vad kallas den handling där man kontrollerar att rätt patient får rätt läkemedel?",
        options: ["Dubbelkontroll", "Identitetskontroll", "Säkerhetsrond", "5R-kontroll"],
        correctAnswer: 3,
        explanation: "5R-kontrollen: Rätt patient, läkemedel, dos, tidpunkt och administrationssätt."
      },
      {
        question: "Hur länge ska man tvätta händerna före läkemedelshantering?",
        options: ["10 sekunder", "20 sekunder", "30 sekunder", "60 sekunder"],
        correctAnswer: 2,
        explanation: "Händerna ska tvättas noggrant i minst 30 sekunder innan läkemedelshantering."
      },
      {
        question: "Vad betyder förkortningen 's.c.'?",
        options: ["Subkutant", "Sublingualt", "Systemiskt", "Sterilt"],
        correctAnswer: 0,
        explanation: "S.c. står för subkutant, vilket betyder under huden."
      },
      {
        question: "Vilken vinkel används vid intramuskulär injektion?",
        options: ["15 grader", "45 grader", "90 grader", "120 grader"],
        correctAnswer: 2,
        explanation: "Intramuskulära injektioner ges i 90 graders vinkel mot huden."
      }
    ]
  },
  {
    id: "hygiene",
    title: "Hygien & Infektionskontroll",
    description: "Basala hygienrutiner och smittskydd",
    difficulty: "Nybörjare",
    estimatedTime: "10 min",
    questions: [
      {
        question: "Vilken typ av handskar ska användas vid rengöring?",
        options: ["Sterila handskar", "Undersökningshandskar", "Hushållshandskar", "Ingen handske behövs"],
        correctAnswer: 2,
        explanation: "Hushållshandskar används vid rengöring för att skydda händerna."
      },
      {
        question: "Hur många gånger ska händerna desinfekteras före sterila moment?",
        options: ["1 gång", "2 gånger", "3 gånger", "5 gånger"],
        correctAnswer: 1,
        explanation: "Händerna ska desinfekteras två gånger före sterila moment."
      },
      {
        question: "Vad kallas den viktigaste åtgärden för att förhindra smittspridning?",
        options: ["Munskydd", "Handhygien", "Isolering", "Vaccination"],
        correctAnswer: 1,
        explanation: "Handhygien är den enskilt viktigaste åtgärden mot smittspridning."
      },
      {
        question: "När ska händerna desinfekteras?",
        options: ["Före patientkontakt", "Efter patientkontakt", "Efter kontakt med patientens omgivning", "Alla ovanstående"],
        correctAnswer: 3,
        explanation: "Händerna ska desinfekteras före och efter patientkontakt samt efter kontakt med omgivningen."
      },
      {
        question: "Hur länge ska händerna gnidas vid alkoholbaserad handdesinfektion?",
        options: ["10 sekunder", "20 sekunder", "30 sekunder", "Tills händerna är torra"],
        correctAnswer: 3,
        explanation: "Händerna ska gnidas tills de är helt torra, vilket tar cirka 20-30 sekunder."
      }
    ]
  },
  {
    id: "communication",
    title: "Kommunikation & Psykiatri",
    description: "Professionell kommunikation och psykiatrisk omvårdnad",
    difficulty: "Medel",
    estimatedTime: "14 min",
    questions: [
      {
        question: "Vad är aktivt lyssnande?",
        options: ["Att ge råd snabbt", "Att fokusera helt på den som talar", "Att avbryta för förtydliganden", "Att tänka på vad man ska säga härnäst"],
        correctAnswer: 1,
        explanation: "Aktivt lyssnande innebär att fokusera helt på den som talar och visa engagemang."
      },
      {
        question: "Vilken kommunikationsteknik används för att bekräfta förståelse?",
        options: ["Att nicka", "Att reflektera", "Att ställa frågor", "Alla ovanstående"],
        correctAnswer: 3,
        explanation: "Alla dessa tekniker kan användas för att bekräfta att man förstått budskapet."
      },
      {
        question: "Vad innebär empatisk kommunikation?",
        options: ["Att ge medicinska råd", "Att sätta sig in i patientens situation", "Att hålla professionellt avstånd", "Att vara snabb och effektiv"],
        correctAnswer: 1,
        explanation: "Empatisk kommunikation innebär att försöka förstå och känna med patienten."
      },
      {
        question: "Hur ska man hantera en aggressiv patient?",
        options: ["Vara auktoritär", "Vara lugn och respektfull", "Lämna rummet direkt", "Hämta säkerhetsvakter"],
        correctAnswer: 1,
        explanation: "Lugn, respektfull kommunikation och säkerhet i första hand är viktigt."
      }
    ]
  },
  {
    id: "ethics",
    title: "Lagar & Etik",
    description: "Juridiska och etiska aspekter i vården",
    difficulty: "Medel",
    estimatedTime: "12 min",
    questions: [
      {
        question: "Vad innebär sekretess i vården?",
        options: ["Att inte prata om sitt jobb", "Att skydda patientinformation", "Att inte dokumentera", "Att bara prata med läkare"],
        correctAnswer: 1,
        explanation: "Sekretess innebär att skydda patientens personliga och medicinska information."
      },
      {
        question: "Vilken lag reglerar patienters rättigheter?",
        options: ["Hälso- och sjukvårdslagen", "Patientlagen", "Socialtjänstlagen", "Arbetsmiljölagen"],
        correctAnswer: 1,
        explanation: "Patientlagen reglerar patienters rättigheter och vårdgivarnas skyldigheter."
      },
      {
        question: "Vad innebär samtycke i vården?",
        options: ["Att läkaren bestämmer", "Att patienten godkänner behandling", "Att anhöriga bestämmer", "Att vårdpersonal bestämmer"],
        correctAnswer: 1,
        explanation: "Samtycke innebär att patienten informerat godkänt en viss behandling."
      },
      {
        question: "Vad är anmälningsplikt enligt Lex Maria?",
        options: ["Rapportera arbetsmiljöproblem", "Rapportera vårdskador", "Rapportera konflikter", "Rapportera sjukfrånvaro"],
        correctAnswer: 1,
        explanation: "Lex Maria är skyldigheten att rapportera händelser som lett till eller kunde ha lett till vårdskada."
      },
      {
        question: "Vad innebär god man?",
        options: ["En läkare som tar hand om patienten", "En juridisk företrädare för person med nedsatt beslutsförmåga", "En anhörig som besöker ofta", "En vårdpersonal med särskild kompetens"],
        correctAnswer: 1,
        explanation: "God man är en juridisk företrädare som hjälper personer med nedsatt beslutsförmåga."
      }
    ]
  }
];

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);

    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResults(true);
        const percentage = ((score + (isCorrect ? 1 : 0)) / (selectedQuiz?.questions.length || 1)) * 100;
        
        if (percentage >= 80) {
          toast({
            title: "Utmärkt resultat! 🎉",
            description: `Du fick ${percentage.toFixed(0)}% rätt!`,
          });
        } else if (percentage >= 60) {
          toast({
            title: "Bra jobbat! 👍",
            description: `Du fick ${percentage.toFixed(0)}% rätt!`,
          });
        } else {
          toast({
            title: "Fortsätt öva! 💪",
            description: `Du fick ${percentage.toFixed(0)}% rätt. Läs igenom materialet igen.`,
          });
        }
      }, 2000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const selectNewQuiz = () => {
    setSelectedQuiz(null);
    resetQuiz();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Nybörjare":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Medel":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Avancerad":
        return "bg-red-500/20 text-red-700 dark:text-red-400";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  if (!selectedQuiz) {
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
              Quiz
            </h1>
            <p className="text-muted-foreground text-lg">
              Testa dina kunskaper inom olika vårdområden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <Card
                key={quiz.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-2 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedQuiz(quiz)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{quiz.questions.length} frågor</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.estimatedTime}</span>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  Starta Quiz
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / selectedQuiz.questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-green-500/20' : 'bg-yellow-500/20'
            }`}>
              <Trophy className={`w-12 h-12 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">
              {passed ? 'Grattis! Du klarade quizet!' : 'Bra försök!'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {passed 
                ? 'Du har visat god förståelse för ämnet.' 
                : 'Fortsätt öva så kommer du klara det!'}
            </p>

            <div className="space-y-4 mb-8">
              <div className="text-5xl font-bold text-primary">
                {percentage.toFixed(0)}%
              </div>
              <Progress value={percentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {score} av {selectedQuiz.questions.length} rätt
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={resetQuiz}
              className="flex-1 gap-2"
              variant="outline"
            >
              <RefreshCw className="w-4 h-4" />
              Försök igen
            </Button>
            <Button
              onClick={selectNewQuiz}
              className="flex-1"
            >
              Välj nytt quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={selectNewQuiz} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Avbryt
          </Button>
          <Badge variant="outline" className="gap-2">
            <Clock className="w-4 h-4" />
            {selectedQuiz.estimatedTime}
          </Badge>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">{selectedQuiz.title}</h2>
            <span className="text-sm text-muted-foreground">
              Fråga {currentQuestionIndex + 1} av {selectedQuiz.questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          explanation={currentQuestion.explanation}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
