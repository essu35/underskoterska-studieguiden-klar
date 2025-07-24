import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Target, Clock, Trophy, BookOpen, CheckCircle, AlertCircle, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { QuizQuestion } from "@/components/QuizQuestion";

interface QuizCategory {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  color: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success" | "quiz";
  difficulty: string;
  estimatedTime: string;
  completion: number;
}

const Quiz = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Comprehensive question sets for all categories
  const sampleQuestions = {
    "anatomy-physiology": [
      {
        id: "1",
        question: "Vilket organ pumpar blod genom kroppen?",
        options: ["Lungorna", "Hjärtat", "Levern", "Njurarna"],
        correctAnswer: 1,
        explanation: "Hjärtat fungerar som en pump som driver blod genom hela kroppen via blodkärlen.",
        category: "Anatomi"
      },
      {
        id: "2", 
        question: "Vad kallas den process där syre tas upp i blodet?",
        options: ["Circulation", "Gasutbyte", "Metabolism", "Digestion"],
        correctAnswer: 1,
        explanation: "Gasutbyte sker i lungorna där syre tas upp från luften och koldioxid avges.",
        category: "Fysiologi"
      },
      {
        id: "3",
        question: "Vilken del av nervsystemet kontrollerar andning?",
        options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Ryggmärgen"],
        correctAnswer: 2,
        explanation: "Medulla oblongata i hjärnstammen kontrollerar automatiska funktioner som andning och hjärtslag.",
        category: "Neurologi"
      },
      {
        id: "4",
        question: "Hur många kammare har hjärtat?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "Hjärtat har fyra kammare: två förmak och två kammare som pumpar blod till lungorna och kroppen.",
        category: "Anatomi"
      },
      {
        id: "5",
        question: "Vad är den normala kroppstemperaturen?",
        options: ["36°C", "37°C", "38°C", "39°C"],
        correctAnswer: 1,
        explanation: "Normal kroppstemperatur är cirka 37°C, men kan variera mellan 36,1-37,2°C.",
        category: "Fysiologi"
      },
      {
        id: "6",
        question: "Vilken blodgrupp är universell givare?",
        options: ["A+", "B-", "AB+", "O-"],
        correctAnswer: 3,
        explanation: "O- kan ge blod till alla andra blodgrupper eftersom den saknar A-, B- och Rh-antigen.",
        category: "Hematologi"
      },
      {
        id: "7",
        question: "Var produceras insulin?",
        options: ["Levern", "Njurarna", "Bukspottkörteln", "Sköldkörteln"],
        correctAnswer: 2,
        explanation: "Insulin produceras av beta-celler i Langerhans öar i bukspottkörteln.",
        category: "Endokrinologi"
      },
      {
        id: "8",
        question: "Vilken del av ögat reglerar ljusinsläppet?",
        options: ["Hornhinnan", "Iris", "Linsen", "Näthinna"],
        correctAnswer: 1,
        explanation: "Iris fungerar som en bländare och reglerar pupillens storlek för att kontrollera ljusinsläppet.",
        category: "Oftalmologi"
      }
    ],
    "vital-parameters": [
      {
        id: "1",
        question: "Vad är normalt vilopuls för en vuxen?",
        options: ["40-60 slag/min", "60-100 slag/min", "100-120 slag/min", "120-140 slag/min"],
        correctAnswer: 1,
        explanation: "Normal vilopuls för vuxna är 60-100 slag per minut. Tränade personer kan ha lägre puls.",
        category: "Vitalparametrar"
      },
      {
        id: "2",
        question: "Vilket blodtryck anses som förhöjt?",
        options: ["<120/80", "120-129/<80", "130-139/80-89", "≥140/90"],
        correctAnswer: 3,
        explanation: "Blodtryck ≥140/90 mmHg klassificeras som högt blodtryck (hypertoni) och kräver behandling.",
        category: "Vitalparametrar"
      },
      {
        id: "3",
        question: "Normal andningsfrekvens för vuxna är:",
        options: ["8-12 andetag/min", "12-20 andetag/min", "20-30 andetag/min", "30-40 andetag/min"],
        correctAnswer: 1,
        explanation: "Normal andningsfrekvens för vuxna är 12-20 andetag per minut i vila.",
        category: "Vitalparametrar"
      },
      {
        id: "4",
        question: "Syremättnad mäts med:",
        options: ["Termometer", "Blodtrycksmätare", "Pulsoximeter", "Stetoskop"],
        correctAnswer: 2,
        explanation: "Pulsoximeter mäter syremättnad (SpO2) genom att skicka ljus genom huden.",
        category: "Mätinstrument"
      },
      {
        id: "5",
        question: "Normal syremättnad för en frisk vuxen är:",
        options: ["85-90%", "90-95%", "95-100%", "100%"],
        correctAnswer: 2,
        explanation: "Normal syremättnad (SpO2) är 95-100%. Värden under 95% kan indikera syrebrist.",
        category: "Vitalparametrar"
      },
      {
        id: "6",
        question: "Vilken temperatur anses som feber?",
        options: ["≥37,5°C", "≥38,0°C", "≥38,5°C", "≥39,0°C"],
        correctAnswer: 1,
        explanation: "Feber definieras som kroppstemperatur ≥38,0°C. Subfebril temperatur är 37,5-37,9°C.",
        category: "Temperatur"
      },
      {
        id: "7",
        question: "Vad mäter Glasgow Coma Scale (GCS)?",
        options: ["Smärta", "Medvetandegrad", "Blodtryck", "Andning"],
        correctAnswer: 1,
        explanation: "GCS mäter medvetandegrad genom att bedöma ögonöppning, verbal respons och motorisk respons.",
        category: "Neurologi"
      },
      {
        id: "8",
        question: "Vad kallas det när hjärtat inte pumpar tillräckligt?",
        options: ["Hjärtinfarkt", "Hjärtsvikt", "Arytmi", "Angina"],
        correctAnswer: 1,
        explanation: "Hjärtsvikt innebär att hjärtat inte kan pumpa tillräckligt med blod för att täcka kroppens behov.",
        category: "Kardiologi"
      }
    ],
    "medications": [
      {
        id: "1",
        question: "Vad betyder förkortningen 'PO'?",
        options: ["Per os (genom munnen)", "Post operationem", "Pro re nata", "Punkt och ordination"],
        correctAnswer: 0,
        explanation: "'Per os' betyder genom munnen och är det vanligaste sättet att ge läkemedel.",
        category: "Läkemedel"
      },
      {
        id: "2",
        question: "Vilka är de '5 R:en' vid läkemedelshantering?",
        options: [
          "Rätt patient, läkemedel, dos, tid, sätt",
          "Rätt doktor, patient, medicin, plats, datum", 
          "Rätt sjuksköterska, läkemedel, dos, metod, kontroll",
          "Rätt person, preparat, mängd, tidpunkt, dokumentation"
        ],
        correctAnswer: 0,
        explanation: "De 5 R:en är: Rätt patient, rätt läkemedel, rätt dos, rätt tid och rätt administrationssätt.",
        category: "Säkerhet"
      },
      {
        id: "3",
        question: "Vad betyder 'PRN' på en läkemedelsordination?",
        options: ["Permanent", "Pro re nata (vid behov)", "Preventiv", "Primär"],
        correctAnswer: 1,
        explanation: "PRN betyder 'pro re nata' vilket betyder 'vid behov' - läkemedlet ges endast när patienten behöver det.",
        category: "Ordinationer"
      },
      {
        id: "4",
        question: "Vad betyder 'IV' administrering?",
        options: ["Intramuskulärt", "Intravenöst", "Intranasalt", "Intraossalt"],
        correctAnswer: 1,
        explanation: "IV betyder intravenöst - direkt i venen för snabb effekt.",
        category: "Administrering"
      },
      {
        id: "5",
        question: "Vilken biverkning ska alltid rapporteras?",
        options: ["Mild illamående", "Lätt huvudvärk", "Allergisk reaktion", "Trötthet"],
        correctAnswer: 2,
        explanation: "Allergiska reaktioner kan vara livshotande och måste alltid rapporteras omedelbart.",
        category: "Säkerhet"
      },
      {
        id: "6",
        question: "Vad är viktigt före läkemedelsadministrering?",
        options: ["Kontrollera identitet", "Fråga om allergier", "Kontrollera dos", "Alla ovanstående"],
        correctAnswer: 3,
        explanation: "Alla dessa kontroller är kritiska för patientsäkerhet vid läkemedelsadministrering.",
        category: "Säkerhet"
      }
    ],
    "hygiene-infection": [
      {
        id: "1",
        question: "Hur länge ska handdesinfektion pågå?",
        options: ["10 sekunder", "20-30 sekunder", "1 minut", "2 minuter"],
        correctAnswer: 1,
        explanation: "Handdesinfektion ska pågå i 20-30 sekunder för att vara effektiv mot bakterier och virus.",
        category: "Hygien"
      },
      {
        id: "2",
        question: "Vilken är den viktigaste åtgärden för att förhindra smittspridning?",
        options: ["Munskydd", "Handhygien", "Skyddsrock", "Visir"],
        correctAnswer: 1,
        explanation: "Handhygien är den enskilt viktigaste åtgärden för att förhindra smittspridning i vårdmiljö.",
        category: "Infektionskontroll"
      },
      {
        id: "3",
        question: "När ska skyddsutrustning användas?",
        options: ["Bara vid operation", "Vid misstänkt smitta", "Endast med känd smitta", "Aldrig"],
        correctAnswer: 1,
        explanation: "Skyddsutrustning ska användas som försiktighetsåtgärd vid misstänkt eller känd smitta.",
        category: "Infektionskontroll"
      },
      {
        id: "4",
        question: "Vad innebär kontaktsmittoisolering?",
        options: ["Ingen kontakt alls", "Handskar och förkläde", "Bara munskydd", "Öppen dörr"],
        correctAnswer: 1,
        explanation: "Kontaktsmittoisolering kräver handskar och förkläde vid all patientkontakt.",
        category: "Isolering"
      },
      {
        id: "5",
        question: "Hur länge efter antibiotikastart är en patient smittsam?",
        options: ["Aldrig", "24-48 timmar", "1 vecka", "Hela behandlingen"],
        correctAnswer: 1,
        explanation: "De flesta bakterieinfektioner är inte längre smittsamma efter 24-48 timmar av antibiotika.",
        category: "Smittskydd"
      }
    ],
    "psychiatry-communication": [
      {
        id: "1",
        question: "Vad är aktivt lyssnande?",
        options: ["Att bara höra vad som sägs", "Att lyssna och visa förståelse", "Att avbryta ofta", "Att ge råd direkt"],
        correctAnswer: 1,
        explanation: "Aktivt lyssnande innebär att verkligen lyssna, visa förståelse och bekräfta vad personen säger.",
        category: "Kommunikation"
      },
      {
        id: "2",
        question: "Vad är empati inom vården?",
        options: ["Att känna samma sak", "Att förstå patientens känslor", "Att döma patienten", "Att ge råd"],
        correctAnswer: 1,
        explanation: "Empati innebär att förstå och känna med patienten utan att själv ta på sig deras känslor.",
        category: "Kommunikation"
      },
      {
        id: "3",
        question: "Hur bemöter man en aggressiv patient?",
        options: ["Höja rösten", "Lugnt och respektfullt", "Vända ryggen till", "Hota med konsekvenser"],
        correctAnswer: 1,
        explanation: "Lugn, respektfull kommunikation och att inte ta det personligt är viktigt vid aggression.",
        category: "Krishantering"
      },
      {
        id: "4",
        question: "Vad innebär personcentrerad vård?",
        options: ["Fokus på sjukdom", "Fokus på personen", "Fokus på personal", "Fokus på ekonomi"],
        correctAnswer: 1,
        explanation: "Personcentrerad vård sätter personen i centrum och respekterar deras värderingar och önskemål.",
        category: "Vårdfilosofi"
      }
    ],
    "laws-ethics": [
      {
        id: "1",
        question: "Vad innebär tystnadsplikt?",
        options: ["Att inte prata med patienter", "Att inte diskutera patientinformation", "Att vara tyst på jobbet", "Att inte ställa frågor"],
        correctAnswer: 1,
        explanation: "Tystnadsplikt innebär att vårdpersonal inte får diskutera eller sprida patientinformation till obehöriga.",
        category: "Juridik"
      },
      {
        id: "2",
        question: "Vad innebär informerat samtycke?",
        options: ["Muntlig överenskommelse", "Skriftligt godkännande efter information", "Tyst acceptans", "Anhörigs beslut"],
        correctAnswer: 1,
        explanation: "Informerat samtycke innebär att patienten får fullständig information innan de ger sitt skriftliga godkännande.",
        category: "Juridik"
      },
      {
        id: "3",
        question: "När får anmälan till IVO göras?",
        options: ["Aldrig", "Vid vårdskada eller missförhållanden", "Bara av chefer", "Bara av patienter"],
        correctAnswer: 1,
        explanation: "Alla har rätt och skyldighet att anmäla vårdskador eller missförhållanden till IVO.",
        category: "Tillsyn"
      },
      {
        id: "4",
        question: "Vad betyder autonomiprincipen?",
        options: ["Personalens självbestämmande", "Patientens självbestämmande", "Ledningens beslut", "Läkarens auktoritet"],
        correctAnswer: 1,
        explanation: "Autonomiprincipen innebär att patienten har rätt till självbestämmande över sin egen vård.",
        category: "Etik"
      },
      {
        id: "5",
        question: "När får tvångsvård användas?",
        options: ["När patienten inte vill", "Vid allvarlig fara för liv och hälsa", "För personalens bekvämlighet", "Aldrig"],
        correctAnswer: 1,
        explanation: "Tvångsvård får endast användas när det finns allvarlig och omedelbar fara för patientens liv och hälsa.",
        category: "Juridik"
      }
    ]
  };

  const startQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  if (activeQuiz && !quizCompleted) {
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={resetQuiz}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Avbryt quiz
            </Button>
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <QuizQuestion
            question={question}
            onNext={handleNextQuestion}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="bg-gradient-card shadow-strong border-0 text-center">
            <CardContent className="p-8">
              <Trophy className="h-20 w-20 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Quiz avslutad!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Du fick {score} av {questions.length} rätt ({percentage}%)
              </p>
              <div className="space-y-4">
                <Button onClick={resetQuiz} size="lg" className="w-full">
                  Tillbaka till quiz-kategorier
                </Button>
                <Button variant="outline" onClick={() => startQuiz(activeQuiz!)} size="lg" className="w-full">
                  Gör om quizet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const getQuestionCount = (categoryId: string) => {
    return sampleQuestions[categoryId as keyof typeof sampleQuestions]?.length || 0;
  };

  const quizCategories: QuizCategory[] = [
    {
      id: "anatomy-physiology",
      icon: Brain,
      title: "Anatomi & Fysiologi Quiz",
      description: "Testa dina kunskaper om kroppens organsystem",
      badge: `${getQuestionCount("anatomy-physiology")} frågor`,
      color: "default",
      difficulty: "Grundläggande",
      estimatedTime: "8 min",
      completion: 0
    },
    {
      id: "vital-parameters", 
      icon: Target,
      title: "Vitalparametrar",
      description: "Normalvärden och mätmetoder för vitalparametrar",
      badge: `${getQuestionCount("vital-parameters")} frågor`,
      color: "success",
      difficulty: "Lätt",
      estimatedTime: "8 min",
      completion: 0
    },
    {
      id: "medications",
      icon: AlertCircle,
      title: "Läkemedelshantering",
      description: "Säker hantering och administrering av läkemedel",
      badge: `${getQuestionCount("medications")} frågor`,
      color: "quiz",
      difficulty: "Medel",
      estimatedTime: "6 min",
      completion: 0
    },
    {
      id: "hygiene-infection",
      icon: CheckCircle,
      title: "Hygien & Infektionsprevention",
      description: "Hygienrutiner och smittskydd i vårdmiljö",
      badge: `${getQuestionCount("hygiene-infection")} frågor`,
      color: "success",
      difficulty: "Lätt",
      estimatedTime: "5 min",
      completion: 0
    },
    {
      id: "psychiatry-communication",
      icon: Brain,
      title: "Psykiatri & Kommunikation",
      description: "Bemötande och samtalsteknik inom psykiatri",
      badge: `${getQuestionCount("psychiatry-communication")} frågor`,
      color: "default",
      difficulty: "Medel",
      estimatedTime: "4 min",
      completion: 0
    },
    {
      id: "laws-ethics",
      icon: Star,
      title: "Lagar & Etik",
      description: "Juridiska aspekter och etiska principer",
      badge: `${getQuestionCount("laws-ethics")} frågor`,
      color: "quiz",
      difficulty: "Svår",
      estimatedTime: "5 min",
      completion: 0
    }
  ];

  const practiceTypes = [
    {
      title: "Flervalsfrågor",
      description: "Klassiska quiz med flera svarsalternativ",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Case-baserade scenarier",
      description: "Verklighetsnära vårdscenarier att analysera",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Blixtfrågor",
      description: "Snabba frågor för att testa reflexkunskaper",
      icon: Clock,
      color: "text-quiz"
    },
    {
      title: "Bildbaserade frågor",
      description: "Identifiera anatomi och medicinska bilder",
      icon: Target,
      color: "text-medical"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Lätt": return "bg-success/10 text-success border-success/20";
      case "Medel": return "bg-quiz/10 text-quiz border-quiz/20";
      case "Svår": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Quiz & Övningar
            </h1>
            <p className="text-muted-foreground mt-2">
              Testa dina kunskaper med interaktiva frågor och scenarier
            </p>
          </div>
        </div>

        {/* Practice Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Olika övningstyper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {practiceTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="bg-card/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`h-8 w-8 mx-auto mb-3 ${type.color}`} />
                    <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Välj ämnesområde</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 mb-1">
                          {category.badge}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{category.estimatedTime}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Svårighetsgrad:</span>
                        <Badge variant="outline" className={getDifficultyColor(category.difficulty)}>
                          {category.difficulty}
                        </Badge>
                      </div>
                      {category.completion > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Framsteg</span>
                            <span className="text-foreground">{category.completion}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${category.completion}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant={category.color} 
                      className="w-full group-hover:shadow-medium transition-all duration-300"
                      onClick={() => startQuiz(category.id)}
                      disabled={!sampleQuestions[category.id as keyof typeof sampleQuestions]}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {category.completion > 0 ? "Fortsätt quiz" : "Starta quiz"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-strong">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Tjäna badges och följ din utveckling
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Varje genomfört quiz ger poäng och lås upp nya achievements. Spåra din utveckling och se hur dina kunskaper växer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Se mina resultat
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Alla achievements
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
