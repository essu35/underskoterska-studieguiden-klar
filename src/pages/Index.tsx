import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, FileText, Heart, Stethoscope, ClipboardCheck, Award, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const getFeatureLink = (title: string) => {
    switch (title) {
      case "Cheat Sheets": return "/cheat-sheets";
      case "Quiz & Övningar": return "/quiz";
      case "Sammanfattningar": return "/summaries";
      case "Praktiska Övningar": return "/practical-exercises";
      default: return "/";
    }
  };

  const features = [
    {
      icon: FileText,
      title: "Cheat Sheets",
      description: "Snabba referensguider för anatomi, vitalparametrar, hygienrutiner och mer",
      badge: "Ny",
      color: "medical"
    },
    {
      icon: Brain,
      title: "Quiz & Övningar",
      description: "Testa dina kunskaper med interaktiva frågor och case-baserade scenarier",
      badge: "Populär",
      color: "success"
    },
    {
      icon: BookOpen,
      title: "Sammanfattningar",
      description: "Kompakta översikter av kursmoment inom medicin, psykiatri och omvårdnad",
      badge: "Omfattande",
      color: "quiz"
    },
    {
      icon: ClipboardCheck,
      title: "Praktiska Övningar",
      description: "Steg-för-steg guider för blodtrycksmätning, dokumentation och mer",
      badge: "Praktiskt",
      color: "medical"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-success/5">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-success/10 text-primary border-primary/20 px-4 py-2" variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Ny plattform för undersköterskor
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 animate-fade-in-up leading-tight">
              Lär dig som en
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent block lg:inline"> proffs</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up leading-relaxed">
              Enkla och tydliga resurser för studerande undersköterskor. Förbättra din inlärning 
              och klara tentor med våra cheat sheets, quiz och praktiska övningar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up">
              <Button variant="medical" size="lg" className="group text-lg px-8 py-4 h-auto" asChild>
                <Link to="/cheat-sheets">
                  Börja lära dig
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-2" asChild>
                <Link to="/summaries">
                  Utforska innehåll
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 opacity-30 animate-pulse-glow hidden lg:block">
          <Stethoscope size={40} className="text-primary" />
        </div>
        <div className="absolute top-40 right-16 opacity-30 animate-pulse-glow hidden lg:block">
          <Heart size={32} className="text-accent" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 animate-pulse-glow hidden lg:block">
          <Brain size={36} className="text-success" />
        </div>
        <div className="absolute top-60 right-32 opacity-25 animate-pulse-glow hidden lg:block">
          <ClipboardCheck size={28} className="text-primary" />
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Allt du behöver för att lyckas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vår plattform är designad specifikt för undersköterskor med praktiska verktyg 
            och resurser som verkligen gör skillnad i dina studier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-[1.02] border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="pb-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-soft">
                      <IconComponent className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-success/10 text-primary border-primary/20 px-3 py-1">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant={feature.color as any} 
                    className="w-full group-hover:shadow-medium transition-all duration-300 text-base py-3 h-auto"
                    asChild
                  >
                    <Link to={getFeatureLink(feature.title)}>
                      Utforska {feature.title.toLowerCase()}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-primary via-primary to-success rounded-3xl p-12 lg:p-16 shadow-strong relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Redo att börja din läranderesa?
          </h3>
            <p className="text-primary-foreground/90 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Gå med i tusentals undersköterskor som redan förbättrat sina studieresultat 
            med våra verktyg och resurser.
          </p>
            <Button variant="secondary" size="lg" className="shadow-medium hover:shadow-strong text-lg px-8 py-4 h-auto">
            Kom igång gratis
            <Award className="ml-2" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
