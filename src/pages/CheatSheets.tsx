import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Thermometer, Droplets, Activity, Pill, Stethoscope, ClipboardCheck, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CheatSheets = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const cheatSheets = [
    {
      id: "vital-parameters",
      icon: Activity,
      title: "Vitalparametrar",
      description: "Normalvärden för puls, blodtryck, andning och temperatur",
      badge: "Grundläggande",
      color: "medical",
      items: ["Puls: 60-100 slag/min", "BT: 120/80 mmHg", "Andning: 12-20/min", "Temp: 36.1-37.2°C"]
    },
    {
      id: "medications",
      icon: Pill,
      title: "Läkemedelsadministrering", 
      description: "Administreringssätt och säkerhetsrutiner",
      badge: "Viktigt",
      color: "quiz",
      items: ["Per os (genom munnen)", "I.m. (intramuskulärt)", "I.v. (intravenöst)", "S.c. (subkutant)"]
    },
    {
      id: "hygiene",
      icon: Droplets,
      title: "Hygienrutiner",
      description: "Basala hygienrutiner och infektionsprevention",
      badge: "Dagligt",
      color: "success",
      items: ["Handdesinfektion före/efter", "Skyddsutrustning", "Rena/orena moment", "Isolering vid smitta"]
    },
    {
      id: "sbar",
      icon: FileText,
      title: "SBAR-dokumentation",
      description: "Strukturerad rapportering och dokumentation",
      badge: "Kommunikation",
      color: "medical",
      items: ["Situation - Vad händer?", "Bakgrund - Relevant info", "Aktuellt - Bedömning", "Rekommendation - Förslag"]
    },
    {
      id: "apl-checklist",
      icon: ClipboardCheck,
      title: "APL-checklista",
      description: "Förberedelse inför Arbetsplatsförlagd utbildning",
      badge: "Praktik",
      color: "quiz",
      items: ["Presentation av sig själv", "Arbetstider och rutiner", "Säkerhetsföreskrifter", "Dokumentationssystem"]
    },
    {
      id: "delegering",
      icon: Users,
      title: "Delegering & Ansvar",
      description: "Vad får undersköterskor göra och inte göra",
      badge: "Juridiskt",
      color: "success",
      items: ["Får ej ordinera läkemedel", "Får administrera efter delegering", "Ansvar för egen kompetens", "Rapportera avvikelser"]
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
              Cheat Sheets
            </h1>
            <p className="text-muted-foreground mt-2">
              Snabba referensguider för viktiga ämnen och rutiner
            </p>
          </div>
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatSheets.map((sheet) => {
            const IconComponent = sheet.icon;
            return (
              <Card key={sheet.id} className="group bg-gradient-card shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {sheet.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {sheet.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {sheet.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {sheet.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant={sheet.color as any} 
                    className="w-full group-hover:shadow-medium transition-all duration-300"
                  >
                    Visa fullständig guide
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-strong">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Behöver du något snabbt?
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Använd sökfunktionen för att snabbt hitta specifika värden, procedurer eller riktlinjer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Sök i alla guider
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Skapa egen fuskapp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatSheets;