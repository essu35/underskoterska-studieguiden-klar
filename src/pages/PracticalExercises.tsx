import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Thermometer, Heart, FileText, Droplet, Stethoscope, Users, PlayCircle, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ExerciseStep {
  title: string;
  content: string;
  tips: string[];
  checkpoints: string[];
}

interface Exercise {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  color: string;
  duration: string;
  steps: number;
  difficulty: string;
  equipment: string[];
  completed: boolean;
}

interface ExerciseSteps {
  [key: string]: ExerciseStep[];
}

const PracticalExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const exerciseSteps: ExerciseSteps = {
    "blood-pressure": [
      {
        title: "Förberedelse",
        content: "Kontrollera att blodtrycksmätaren fungerar och välj rätt manschettstorlek för patienten.",
        tips: ["Manschetten ska täcka 80% av överarmen", "Kontrollera att mätaren är kalibrerad"],
        checkpoints: ["Mätare kontrollerad", "Rätt manschettstorlek vald"]
      },
      {
        title: "Positionering",
        content: "Placera patienten bekvämt sittande med armen i hjärthöjd.",
        tips: ["Patienten ska vila 5 minuter före mätning", "Armen ska vara avslappnad"],
        checkpoints: ["Patient sitter bekvämt", "Arm i hjärthöjd"]
      },
      {
        title: "Applicera manschett",
        content: "Placera manschetten 2-3 cm ovanför armbågsleden, inte för hårt eller löst.",
        tips: ["Du ska kunna få in ett finger under manschetten", "Slangen ska vara på insidan av armen"],
        checkpoints: ["Manschett korrekt placerad", "Rätt åthet"]
      },
      {
        title: "Pumpa upp",
        content: "Pumpa upp manschetten till 20-30 mmHg över förväntad systolisk tryck.",
        tips: ["Känn först efter puls och pumpa tills den försvinner", "Lägg på ytterligare 20-30 mmHg"],
        checkpoints: ["Manschett uppumpad", "Puls försvunnen"]
      },
      {
        title: "Mätning",
        content: "Släpp luften långsamt (2-3 mmHg/sek) och lyssna efter Korotkoff-ljud.",
        tips: ["Första ljudet = systoliskt tryck", "Sista ljudet = diastoliskt tryck"],
        checkpoints: ["Systoliskt tryck noterat", "Diastoliskt tryck noterat"]
      },
      {
        title: "Dokumentation",
        content: "Dokumentera resultatet med tid, position och vilken arm som användes.",
        tips: ["Ange alltid vilken arm", "Notera eventuella avvikelser"],
        checkpoints: ["Resultat dokumenterat", "Tid och arm noterad"]
      }
    ],
    "temperature": [
      {
        title: "Välj mätmetod",
        content: "Välj lämplig mätmetod baserat på patient och situation (oral, rektal, axillär, öron).",
        tips: ["Oral: vanligast för vuxna", "Rektal: mest exakt", "Axillär: för barn", "Öron: snabbt men kräver teknik"],
        checkpoints: ["Mätmetod vald", "Patient informerad"]
      },
      {
        title: "Förbered termometer",
        content: "Kontrollera att termometern är ren och använd engångsöverdrag vid behov.",
        tips: ["Alltid rengöra mellan patienter", "Kontrollera batterinivå"],
        checkpoints: ["Termometer ren", "Överdrag applicerat"]
      },
      {
        title: "Utför mätning",
        content: "Placera termometern korrekt och vänta tills mätningen är klar.",
        tips: ["Oral: under tungan", "Axillär: mitt i armhålan", "Vänta på signal"],
        checkpoints: ["Korrekt placering", "Mätning avslutad"]
      },
      {
        title: "Dokumentera",
        content: "Notera temperatur, mätmetod och tid i patientjournal.",
        tips: ["Ange alltid mätmetod", "Rapportera avvikelser direkt"],
        checkpoints: ["Temperatur dokumenterad", "Mätmetod noterad"]
      }
    ],
    "pulse-measurement": [
      {
        title: "Välj mätplats",
        content: "Välj lämplig pulspoint - vanligast är handled (arteria radialis).",
        tips: ["Handled: enklast att hitta", "Hals: vid svag puls", "Använd aldrig tummen"],
        checkpoints: ["Pulspoint vald", "Korrekt fingerplacering"]
      },
      {
        title: "Känn efter puls",
        content: "Placera pek- och långfinger över pulspunkten och känn efter regelbunden pulsslag.",
        tips: ["Tryck inte för hårt", "Känn efter rytm och styrka"],
        checkpoints: ["Puls lokaliserad", "Rytm bedömd"]
      },
      {
        title: "Räkna pulsslag",
        content: "Räkna pulsslag i 60 sekunder (eller 30 sek x 2 om regelbunden).",
        tips: ["Alltid 60 sek vid oregelbunden puls", "Notera rytm och styrka"],
        checkpoints: ["Pulsslag räknade", "Rytm noterad"]
      },
      {
        title: "Bedöm kvalitet",
        content: "Bedöm pulsens rytm (regelbunden/oregelbunden) och styrka (stark/svag).",
        tips: ["Regelbunden = samma intervall", "Stark = lätt att känna"],
        checkpoints: ["Rytm bedömd", "Styrka bedömd"]
      },
      {
        title: "Dokumentera",
        content: "Dokumentera pulsfrekvens, rytm, styrka och mätplats.",
        tips: ["Ange slag/min", "Beskriv avvikelser"],
        checkpoints: ["Puls dokumenterad", "Kvalitet beskriven"]
      }
    ],
    "wound-care": [
      {
        title: "Bedöm såret",
        content: "Inspektera såret noggrant - storlek, djup, sårkanter och omgivande hud.",
        tips: ["Använd god belysning", "Dokumentera med foto om möjligt", "Bedöm smärtnivå"],
        checkpoints: ["Sårstorlek mätt", "Sårdjup bedömt", "Omgivande hud inspekterad"]
      },
      {
        title: "Rengör såret",
        content: "Rengör såret försiktigt med koksaltlösning eller kranvatten.",
        tips: ["Använd inte väteperoxid", "Spola från rent till smutsigt", "Var försiktig med granulationsvävnad"],
        checkpoints: ["Sår rengjort", "Debris avlägsnat", "Blödning kontrollerad"]
      },
      {
        title: "Välj förband",
        content: "Välj lämpligt förband baserat på sårtyp och exsudatmängd.",
        tips: ["Torrt sår = fuktig miljö", "Våt sår = absorberande förband", "Infekterat sår = antimikrobiellt"],
        checkpoints: ["Förbandstyp vald", "Storlek anpassad"]
      },
      {
        title: "Applicera förband",
        content: "Applicera förbandet sterilt och fixera säkert utan att strama åt.",
        tips: ["Steril teknik", "Täck hela såret", "Lämna utrymme för svullnad"],
        checkpoints: ["Förband applicerat", "Säkert fixerat", "Cirkulation kontrollerad"]
      },
      {
        title: "Dokumentera",
        content: "Dokumentera sårens utseende, behandling och patientens reaktion.",
        tips: ["Beskriv objektivt", "Notera smärtnivå", "Planera nästa förbandsbyten"],
        checkpoints: ["Dokumentation klar", "Uppföljning planerad"]
      }
    ],
    "catheter-care": [
      {
        title: "Förberedelse",
        content: "Samla material och informera patienten om proceduren.",
        tips: ["Steril kateter", "Glidmedel", "Uppsamlingspåse", "Handskar"],
        checkpoints: ["Material förberett", "Patient informerad", "Integritet säkrad"]
      },
      {
        title: "Hygien och positionering",
        content: "Tvätta händer, använd handskar och positionera patienten bekvämt.",
        tips: ["Steril teknik", "Bekväm position", "God belysning"],
        checkpoints: ["Handhygien utförd", "Patient positionerad", "Steril miljö"]
      },
      {
        title: "Rengöring",
        content: "Rengör genitalierna noggrant med antiseptisk lösning.",
        tips: ["Rengör framifrån och bakåt", "Använd ny kompress för varje drag", "Låt torka"],
        checkpoints: ["Området rengjort", "Antiseptik applicerad"]
      },
      {
        title: "Kateterisering",
        content: "För in katetern försiktigt tills urin kommer, för sedan in ytterligare 2-3 cm.",
        tips: ["Använd glidmedel", "Försiktig teknik", "Stoppa vid motstånd"],
        checkpoints: ["Kateter infört", "Urin flödar", "Ballong blåst upp"]
      },
      {
        title: "Fixering och dokumentation",
        content: "Fixera katetern säkert och koppla till uppsamlingspåse. Dokumentera.",
        tips: ["Undvik drag", "Påse under blåsnivå", "Kontrollera flöde"],
        checkpoints: ["Kateter fixerad", "Påse kopplad", "Dokumentation klar"]
      }
    ],
    "medication-administration": [
      {
        title: "Kontrollera ordination",
        content: "Läs ordinationen noggrant och kontrollera de 5 R:en.",
        tips: ["Rätt patient, läkemedel, dos, tid, sätt", "Kontrollera allergier", "Dubbelkolla beräkningar"],
        checkpoints: ["Ordination kontrollerad", "Allergier kontrollerade", "Dos beräknad"]
      },
      {
        title: "Förbered läkemedel",
        content: "Förbered läkemedlet under aseptiska förhållanden.",
        tips: ["Kontrollera utgångsdatum", "Steril teknik vid injektioner", "Märk sprutor tydligt"],
        checkpoints: ["Läkemedel förberett", "Sterilitet säkrad", "Märkning klar"]
      },
      {
        title: "Identifiera patient",
        content: "Kontrollera patientens identitet med ID-band och fråga om namn och personnummer.",
        tips: ["Använd två identifierare", "Jämför med ordination", "Fråga patienten"],
        checkpoints: ["Identitet bekräftad", "ID-band kontrollerat"]
      },
      {
        title: "Administrera läkemedel",
        content: "Ge läkemedlet enligt ordinationen och övervaka patienten.",
        tips: ["Rätt teknik för administreringssätt", "Övervaka biverkningar", "Stanna hos patienten"],
        checkpoints: ["Läkemedel givet", "Patient övervakas", "Inga direkta biverkningar"]
      },
      {
        title: "Dokumentera",
        content: "Dokumentera omedelbart efter given dos och övervaka effekt.",
        tips: ["Dokumentera tid, dos, sätt", "Notera patientens reaktion", "Rapportera biverkningar"],
        checkpoints: ["Dokumentation klar", "Effekt noterad", "Uppföljning planerad"]
      }
    ]
  };

  const startExercise = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setCurrentStep(0);
    setCompletedSteps([]);
    setExerciseCompleted(false);
  };

  const completeStep = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    const steps = exerciseSteps[selectedExercise as keyof typeof exerciseSteps];
    if (currentStep + 1 < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setExerciseCompleted(true);
    }
  };

  const resetExercise = () => {
    setSelectedExercise(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    setExerciseCompleted(false);
  };

  const exercises = [
    {
      id: "blood-pressure",
      icon: Activity,
      title: "Blodtrycksmätning",
      description: "Steg-för-steg guide för korrekt blodtrycksmätning",
      badge: "Grundläggande",
      color: "medical",
      duration: "8 min",
      steps: 6,
      difficulty: "Lätt",
      equipment: ["Blodtrycksmätare", "Manschett", "Stetoskop"],
      completed: false
    },
    {
      id: "temperature",
      icon: Thermometer,
      title: "Temperaturmätning",
      description: "Olika metoder för temperaturmätning",
      badge: "Dagligt",
      color: "success",
      duration: "5 min",
      steps: 4,
      difficulty: "Lätt",
      equipment: ["Termometer", "Engångsöverdrag", "Desinfektionsmedel"],
      completed: false
    },
    {
      id: "pulse-measurement",
      icon: Heart,
      title: "Pulsmätning",
      description: "Manuell och elektronisk pulsmätning",
      badge: "Viktigt",
      color: "quiz",
      duration: "6 min", 
      steps: 5,
      difficulty: "Lätt",
      equipment: ["Klocka/timer", "Pulsoximeter (vid behov)"],
      completed: false
    },
    {
      id: "documentation",
      icon: FileText,
      title: "Dokumentation i journal",
      description: "Korrekt dokumentation enligt gällande rutiner",
      badge: "Juridiskt",
      color: "medical",
      duration: "12 min",
      steps: 8,
      difficulty: "Medel",
      equipment: ["Dator/journal", "Inloggningsuppgifter"],
      completed: false
    },
    {
      id: "urine-test",
      icon: Droplet,
      title: "Urinsticka",
      description: "Provtagning och analys med urinsticka",
      badge: "Provtagning",
      color: "success",
      duration: "10 min",
      steps: 7,
      difficulty: "Medel",
      equipment: ["Urinsticka", "Provbehållare", "Handskar", "Timer"],
      completed: false
    },
    {
      id: "hlr-basics",
      icon: Heart,
      title: "HLR - Grundläggande",
      description: "Hjärt-lungräddning enligt senaste riktlinjer",
      badge: "Livräddande",
      color: "quiz",
      duration: "15 min",
      steps: 10,
      difficulty: "Svår",
      equipment: ["HLR-docka", "Skyddsandning", "AED (om tillgänglig)"],
      completed: false
    },
    {
      id: "sbar-reporting",
      icon: Users,
      title: "SBAR Rapportering",
      description: "Strukturerad rapportering mellan vårdpersonal",
      badge: "Kommunikation",
      color: "medical",
      duration: "9 min",
      steps: 4,
      difficulty: "Medel",
      equipment: ["Patientjournal", "Rapportmall"],
      completed: false
    },
    {
      id: "hygiene-procedures",
      icon: Stethoscope,
      title: "Hygienrutiner",
      description: "Handdesinfektion och skyddsutrustning",
      badge: "Infektionskontroll",
      color: "success",
      duration: "7 min",
      steps: 5,
      difficulty: "Lätt",
      equipment: ["Handdesinfektion", "Handskar", "Förkläde", "Munskydd"],
      completed: false
    },
    {
      id: "wound-care",
      icon: Heart,
      title: "Sårbehandling",
      description: "Bedömning, rengöring och förbandsläggning av sår",
      badge: "Omvårdnad",
      color: "medical",
      duration: "12 min",
      steps: 5,
      difficulty: "Medel",
      equipment: ["Sterila handskar", "Koksaltlösning", "Förband", "Tejp"],
      completed: false
    },
    {
      id: "catheter-care",
      icon: Droplet,
      title: "Kateterisering",
      description: "Säker insättning och skötsel av urinkateter",
      badge: "Steril teknik",
      color: "quiz",
      duration: "18 min",
      steps: 5,
      difficulty: "Svår",
      equipment: ["Steril kateter", "Glidmedel", "Antiseptik", "Uppsamlingspåse"],
      completed: false
    },
    {
      id: "medication-administration",
      icon: Pill,
      title: "Läkemedelsadministrering",
      description: "Säker administrering av läkemedel enligt 5 R:en",
      badge: "Säkerhet",
      color: "success",
      duration: "14 min",
      steps: 5,
      difficulty: "Medel",
      equipment: ["Läkemedel", "Sprutor", "Nålar", "Alkoholservett"],
      completed: false
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

  const ExerciseCard = ({ exercise, onStart }: { 
    exercise: Exercise; 
    onStart: (id: string) => void 
  }) => {
    return (
      <Card key={exercise.id} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
              <exercise.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-right">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 mb-1">
                {exercise.badge}
              </Badge>
              <div className="text-xs text-muted-foreground">{exercise.duration}</div>
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {exercise.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {exercise.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Steg:</span>
              <span className="text-sm font-medium text-foreground">{exercise.steps} steg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Svårighet:</span>
              <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Utrustning behövs:</span>
              <div className="flex flex-wrap gap-1">
                {exercise.equipment.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variant={exercise.color as any} 
            className="w-full group-hover:shadow-medium transition-all duration-300"
            onClick={() => onStart(exercise.id)}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Starta övning
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Exercise step component
  if (selectedExercise && !exerciseCompleted) {
    const steps = exerciseSteps[selectedExercise as keyof typeof exerciseSteps];
    const step = steps[currentStep];
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={resetExercise}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Avbryt övning
            </Button>
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  Steg {currentStep + 1} av {steps.length}
                </Badge>
              </div>
              <CardTitle className="text-xl text-foreground">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg">
                {step.content}
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
                <ul className="space-y-1">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="text-blue-800 text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">✓ Kontrollpunkter:</h4>
                <ul className="space-y-2">
                  {step.checkpoints.map((checkpoint, index) => (
                    <li key={index} className="flex items-center text-green-800 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {checkpoint}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                    Föregående steg
                  </Button>
                )}
                <Button onClick={completeStep} className="flex-1">
                  {currentStep === steps.length - 1 ? 'Slutför övning' : 'Nästa steg'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Exercise completed
  if (exerciseCompleted) {
    const exercise = exercises.find(ex => ex.id === selectedExercise);
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="bg-gradient-card shadow-strong border-0 text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Övning genomförd!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Du har slutfört övningen: {exercise?.title}
              </p>
              <div className="space-y-4">
                <Button onClick={resetExercise} size="lg" className="w-full">
                  Tillbaka till övningar
                </Button>
                <Button variant="outline" onClick={() => startExercise(selectedExercise!)} size="lg" className="w-full">
                  Gör om övningen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              Praktiska Övningar
            </h1>
            <p className="text-muted-foreground mt-2">
              Lär dig praktiska färdigheter med steg-för-steg instruktioner
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <PlayCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{exercises.length}</div>
              <div className="text-sm text-muted-foreground">Övningar</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-quiz mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{exercises.reduce((total, ex) => total + parseInt(ex.duration), 0)} min</div>
              <div className="text-sm text-muted-foreground">Total tid</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">0/{exercises.length}</div>
              <div className="text-sm text-muted-foreground">Genomförda</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-medical mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">APL</div>
              <div className="text-sm text-muted-foreground">Förberedelse</div>
            </CardContent>
          </Card>
        </div>

        {/* Exercises Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              onStart={startExercise}
            />
          ))}
        </div>

        {/* APL Preparation Section */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-strong">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Förbered dig för APL
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Dessa praktiska övningar förbereder dig för Arbetsplatsförlagd utbildning. 
              Öva tills du känner dig säker på alla moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                APL-checklista
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Skapa träningsschema
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalExercises;
