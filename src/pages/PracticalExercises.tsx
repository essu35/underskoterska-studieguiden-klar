import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Thermometer, Droplet, Heart, Stethoscope, FileText, Users, PlayCircle, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PracticalExercises = () => {
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
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Övningar</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-quiz mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">82 min</div>
              <div className="text-sm text-muted-foreground">Total tid</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">0/8</div>
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
          {exercises.map((exercise) => {
            const IconComponent = exercise.icon;
            return (
              <Card key={exercise.id} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
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
                    variant={exercise.color as any} 
                    className="w-full group-hover:shadow-medium transition-all duration-300"
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Starta övning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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