import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, FileText, Users, Heart, Stethoscope, ClipboardCheck, Award } from "lucide-react";

const Index = () => {
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

  const quickStats = [
    { icon: Users, label: "Aktiva Studenter", value: "2,300+" },
    { icon: Award, label: "Genomförda Quiz", value: "45,000+" },
    { icon: Heart, label: "Framgångsgrad", value: "89%" },
    { icon: Stethoscope, label: "Ämnesområden", value: "12" }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-success-light text-success border-success/20" variant="outline">
              Ny plattform för undersköterskor
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
              Lär dig som en
              <span className="bg-gradient-primary bg-clip-text text-transparent"> proffs</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Enkla och tydliga resurser för studerande undersköterskor. Förbättra din inlärning 
              och klara tentor med våra cheat sheets, quiz och praktiska övningar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button variant="medical" size="lg" className="group">
                Börja lära dig
                <BookOpen className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Utforska innehåll
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse-glow hidden lg:block">
          <Stethoscope size={40} className="text-primary" />
        </div>
        <div className="absolute top-40 right-16 opacity-20 animate-pulse-glow hidden lg:block">
          <Heart size={32} className="text-accent" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Allt du behöver för att lyckas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vår plattform är designad specifikt för undersköterskor med praktiska verktyg 
            och resurser som verkligen gör skillnad i dina studier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button 
                    variant={feature.color as any} 
                    className="mt-6 w-full group-hover:shadow-medium transition-all duration-300"
                  >
                    Utforska {feature.title.toLowerCase()}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-strong">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Redo att börja din läranderesa?
          </h3>
          <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
            Gå med i tusentals undersköterskor som redan förbättrat sina studieresultat 
            med våra verktyg och resurser.
          </p>
          <Button variant="secondary" size="lg" className="shadow-medium hover:shadow-strong">
            Kom igång gratis
            <Award className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
