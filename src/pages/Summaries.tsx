import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Heart, Stethoscope, Users, Scale, BookOpen, Shield, Eye, Briefcase, FileHeart, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Summaries = () => {
  const [expandedSummary, setExpandedSummary] = useState<string | null>(null);
  const summaries = [
    {
      id: "anatomy-physiology",
      icon: Heart,
      title: "Anatomi & Fysiologi",
      description: "Organsystem, cirkulation, andning och sjukdomslära",
      badge: "Grundläggande",
      color: "medical",
      topics: ["Hjärt-kärlsystemet", "Andningsorganen", "Njurar & urinvägar", "Matsmältning", "Nervsystemet"],
      duration: "45 min läsning"
    },
    {
      id: "medicine-1-2",
      icon: Stethoscope,
      title: "Medicin 1 & 2",
      description: "Vanliga sjukdomstillstånd, symptom och behandlingar",
      badge: "Kliniskt",
      color: "quiz",
      topics: ["Diabetes", "Stroke", "KOL", "Hjärtinfarkt", "Demens"],
      duration: "60 min läsning"
    },
    {
      id: "psychiatry",
      icon: Brain,
      title: "Psykiatri",
      description: "Psykiatriska diagnoser, bemötande och läkemedel",
      badge: "Specialiserat",
      color: "success",
      topics: ["Depression", "Ångest", "Schizofreni", "Bipolär sjukdom", "Samtalsteknik"],
      duration: "50 min läsning"
    },
    {
      id: "gerontology",
      icon: UserCheck,
      title: "Gerontologi & Geriatrik",
      description: "Äldres hälsa, kommunikation och vårdspecifika behov",
      badge: "Äldreomsorg",
      color: "medical",
      topics: ["Åldersförändringar", "Fallprevention", "Trycksår", "Kommunikation", "Palliativ vård"],
      duration: "40 min läsning"
    },
    {
      id: "social-care",
      icon: Users,
      title: "Social Omsorg",
      description: "Sociala behov, funktionsnedsättningar och stödinsatser",
      badge: "Socialt",
      color: "quiz",
      topics: ["Funktionsnedsättningar", "Boendeformer", "Stödinsatser", "Delaktighet", "Självbestämmande"],
      duration: "35 min läsning"
    },
    {
      id: "laws-regulations",
      icon: Scale,
      title: "Lagar & Regler",
      description: "HSL, SoL, LSS, sekretess och GDPR",
      badge: "Juridiskt",
      color: "success",
      topics: ["HSL", "SoL", "LSS", "Sekretess", "GDPR", "Tystnadsplikt"],
      duration: "55 min läsning"
    },
    {
      id: "ethics-treatment",
      icon: FileHeart,
      title: "Etik & Bemötande",
      description: "Etiska principer, mänskliga rättigheter och kulturell kompetens",
      badge: "Värdegrund",
      color: "medical",
      topics: ["Etiska principer", "Mänskliga rättigheter", "Kulturell kompetens", "Respekt", "Integritet"],
      duration: "30 min läsning"
    },
    {
      id: "communication",
      icon: Eye,
      title: "Kommunikation",
      description: "Samtalsmetodik, dokumentation och rapportering",
      badge: "Kommunikation",
      color: "quiz",
      topics: ["Samtalsmetodik", "Dokumentation", "SBAR", "Konflikthantering", "Teamarbete"],
      duration: "25 min läsning"
    }
  ];

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
              Sammanfattningar
            </h1>
            <p className="text-muted-foreground mt-2">
              Kompakta översikter av alla kärnämnen för undersköterskor
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Kärnämnen</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">6h 20min</div>
              <div className="text-sm text-muted-foreground">Total lästid</div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-quiz mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Aktuellt innehåll</div>
            </CardContent>
          </Card>
        </div>

        {/* Summaries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {summaries.map((summary) => {
            const IconComponent = summary.icon;
            return (
              <Card key={summary.id} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 mb-2">
                        {summary.badge}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{summary.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {summary.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {summary.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {summary.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant={summary.color as any} 
                    className="w-full group-hover:shadow-medium transition-all duration-300"
                  >
                    Läs sammanfattning
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Study Path Section */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-strong">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Rekommenderad studieordning
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Vi rekommenderar att du börjar med Anatomi & Fysiologi och sedan följer den ordning som passar din kurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Visa studieplan
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Skapa egen plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summaries;