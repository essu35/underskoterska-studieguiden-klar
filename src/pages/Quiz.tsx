import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Target, Clock, Trophy, BookOpen, CheckCircle, AlertCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Quiz = () => {
  const quizCategories = [
    {
      id: "anatomy-physiology",
      icon: Brain,
      title: "Anatomi & Fysiologi Quiz",
      description: "Testa dina kunskaper om kroppens organsystem",
      badge: "25 frågor",
      color: "medical",
      difficulty: "Grundläggande",
      estimatedTime: "15 min",
      completion: 0
    },
    {
      id: "vital-parameters", 
      icon: Target,
      title: "Vitalparametrar",
      description: "Normalvärden och mätmetoder för vitalparametrar",
      badge: "20 frågor",
      color: "success",
      difficulty: "Lätt",
      estimatedTime: "10 min",
      completion: 0
    },
    {
      id: "medications",
      icon: AlertCircle,
      title: "Läkemedelshantering",
      description: "Säker hantering och administrering av läkemedel",
      badge: "30 frågor",
      color: "quiz",
      difficulty: "Medel",
      estimatedTime: "20 min",
      completion: 0
    },
    {
      id: "hygiene-infection",
      icon: CheckCircle,
      title: "Hygien & Infektionsprevention",
      description: "Hygienrutiner och smittskydd i vårdmiljö",
      badge: "18 frågor",
      color: "success",
      difficulty: "Lätt",
      estimatedTime: "12 min",
      completion: 0
    },
    {
      id: "psychiatry-communication",
      icon: Brain,
      title: "Psykiatri & Kommunikation",
      description: "Bemötande och samtalsteknik inom psykiatri",
      badge: "22 frågor",
      color: "medical",
      difficulty: "Medel",
      estimatedTime: "18 min",
      completion: 0
    },
    {
      id: "laws-ethics",
      icon: Star,
      title: "Lagar & Etik",
      description: "Juridiska aspekter och etiska principer",
      badge: "28 frågor",
      color: "quiz",
      difficulty: "Svår",
      estimatedTime: "25 min",
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
                      variant={category.color as any} 
                      className="w-full group-hover:shadow-medium transition-all duration-300"
                    >
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