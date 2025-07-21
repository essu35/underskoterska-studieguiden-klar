import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Heart, Stethoscope, Pill, Activity, Brain, Thermometer, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CheatSheetSection {
  title: string;
  items: string[];
}

interface CheatSheetContent {
  sections: CheatSheetSection[];
}

interface CheatSheet {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  difficulty: string;
  content: CheatSheetContent;
}

const CheatSheets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cheatSheets: CheatSheet[] = [
    {
      id: "vital-signs",
      title: "Vitalparametrar",
      category: "Grundläggande",
      icon: Activity,
      description: "Normalvärden och bedömning av puls, blodtryck, andning och temperatur",
      difficulty: "Grundläggande",
      content: {
        sections: [
          {
            title: "Puls",
            items: [
              "Normal vilopuls: 60-100 slag/min",
              "Bradykardi: <60 slag/min",
              "Takykardi: >100 slag/min",
              "Kontrollera rytm och styrka",
              "Vanliga mätplatser: handled, hals, ljumske"
            ]
          },
          {
            title: "Blodtryck",
            items: [
              "Normalt: <120/80 mmHg",
              "Förhöjt: 120-129/<80 mmHg",
              "Hypertoni grad 1: 130-139/80-89 mmHg",
              "Hypertoni grad 2: ≥140/90 mmHg",
              "Hypotoni: <90/60 mmHg"
            ]
          },
          {
            title: "Andning",
            items: [
              "Normal frekvens: 12-20 andetag/min",
              "Bradypné: <12 andetag/min",
              "Takypné: >20 andetag/min",
              "Observera djup och rytm",
              "Tecken på andnöd: cyanös, användning av hjälpmuskulatur"
            ]
          },
          {
            title: "Temperatur",
            items: [
              "Normal kroppstemperatur: 36,1-37,2°C",
              "Subfebril: 37,3-38,0°C",
              "Feber: >38,0°C",
              "Hypotermi: <35,0°C",
              "Mätplatser: mun, öra, rektalt, axill"
            ]
          }
        ]
      }
    },
    {
      id: "anatomy-heart",
      title: "Hjärtats anatomi",
      category: "Anatomi",
      icon: Heart,
      description: "Hjärtats uppbyggnad, kammare, klaffar och blodcirkulation",
      difficulty: "Medel",
      content: {
        sections: [
          {
            title: "Hjärtats kammare",
            items: [
              "Höger förmak: tar emot syrefattigt blod från kroppen",
              "Höger kammare: pumpar blod till lungorna",
              "Vänster förmak: tar emot syrerikt blod från lungorna",
              "Vänster kammare: pumpar blod ut i kroppen"
            ]
          },
          {
            title: "Hjärtklaffar",
            items: [
              "Trikuspidalklaff: mellan höger förmak och kammare",
              "Pulmonalklaff: mellan höger kammare och lungartär",
              "Mitralklaff: mellan vänster förmak och kammare",
              "Aortaklaff: mellan vänster kammare och aorta"
            ]
          },
          {
            title: "Blodcirkulation",
            items: [
              "Stora kretsloppet: vänster kammare → kroppen → höger förmak",
              "Lilla kretsloppet: höger kammare → lungor → vänster förmak",
              "Koronarartärer: försörjer hjärtmuskeln med blod",
              "Hjärtfrekvens styrs av sinusknutan"
            ]
          }
        ]
      }
    },
    {
      id: "medication-safety",
      title: "Läkemedelssäkerhet",
      category: "Läkemedel",
      icon: Pill,
      description: "De 5 R:en, administrationssätt och säkerhetsrutiner",
      difficulty: "Viktigt",
      content: {
        sections: [
          {
            title: "De 5 R:en",
            items: [
              "Rätt patient: kontrollera identitet med ID-band",
              "Rätt läkemedel: dubbelkolla namn och styrka",
              "Rätt dos: beräkna och kontrollera dosering",
              "Rätt tid: följ ordinationstider",
              "Rätt administrationssätt: PO, IV, IM, SC etc."
            ]
          },
          {
            title: "Administrationssätt",
            items: [
              "PO (per os): genom munnen",
              "IV (intravenöst): direkt i blodåder",
              "IM (intramuskulärt): i muskel",
              "SC (subkutant): under huden",
              "SL (sublingualt): under tungan"
            ]
          },
          {
            title: "Säkerhetsrutiner",
            items: [
              "Läs ordinationen noggrant",
              "Kontrollera allergier",
              "Dokumentera omedelbart efter givning",
              "Observera biverkningar",
              "Förvara läkemedel säkert"
            ]
          }
        ]
      }
    },
    {
      id: "infection-control",
      title: "Hygien & Smittskydd",
      category: "Hygien",
      icon: Stethoscope,
      description: "Handhygien, skyddsutrustning och smittvägar",
      difficulty: "Grundläggande",
      content: {
        sections: [
          {
            title: "Handhygien",
            items: [
              "Före patientkontakt",
              "Före ren/aseptisk åtgärd",
              "Efter risk för kontakt med kroppsvätskor",
              "Efter patientkontakt",
              "Efter kontakt med patientens omgivning"
            ]
          },
          {
            title: "Skyddsutrustning",
            items: [
              "Handskar: vid risk för kontakt med kroppsvätskor",
              "Förkläde: skydda kläder från kontamination",
              "Munskydd: vid risk för droppsmitta",
              "Skyddsglasögon: vid risk för stänk",
              "Ta av i rätt ordning för att undvika kontamination"
            ]
          },
          {
            title: "Smittvägar",
            items: [
              "Kontaktsmitta: direkt eller indirekt kontakt",
              "Droppsmitta: stora droppar <1 meter",
              "Luftburen smitta: små partiklar i luften",
              "Vektorburen smitta: via insekter/djur",
              "Födoämnesburen smitta: via mat/vatten"
            ]
          }
        ]
      }
    },
    {
      id: "neurological-assessment",
      title: "Neurologisk bedömning",
      category: "Bedömning",
      icon: Brain,
      description: "Glasgow Coma Scale, pupillkontroll och neurologiska tecken",
      difficulty: "Avancerat",
      content: {
        sections: [
          {
            title: "Glasgow Coma Scale (GCS)",
            items: [
              "Ögonöppning: spontant (4), på tilltal (3), på smärta (2), ingen (1)",
              "Verbal respons: orienterad (5), förvirrad (4), osammanhängande (3), obegripliga ljud (2), ingen (1)",
              "Motorisk respons: följer order (6), lokaliserar smärta (5), drar undan (4), böjning (3), sträckning (2), ingen (1)",
              "Total poäng: 3-15 (15 = fullt medveten)",
              "Allvarlig skada: GCS ≤8"
            ]
          },
          {
            title: "Pupillkontroll",
            items: [
              "Storlek: normalt 2-6 mm",
              "Form: rund och jämn",
              "Ljusreaktion: snabb kontraktion vid ljus",
              "Anisokorin: olika pupillstorlek",
              "Tecken på ökat intrakraniellt tryck: stora, ljusstela pupiller"
            ]
          },
          {
            title: "Varningssignaler",
            items: [
              "Förändrat medvetandegrad",
              "Huvudvärk med kräkningar",
              "Förvirring eller agitation",
              "Svaghet i arm/ben",
              "Talsvårigheter eller synrubbningar"
            ]
          }
        ]
      }
    }
  ];

  const categories = [
    { id: "all", label: "Alla", count: cheatSheets.length },
    { id: "Grundläggande", label: "Grundläggande", count: cheatSheets.filter(s => s.category === "Grundläggande").length },
    { id: "Anatomi", label: "Anatomi", count: cheatSheets.filter(s => s.category === "Anatomi").length },
    { id: "Läkemedel", label: "Läkemedel", count: cheatSheets.filter(s => s.category === "Läkemedel").length },
    { id: "Hygien", label: "Hygien", count: cheatSheets.filter(s => s.category === "Hygien").length },
    { id: "Bedömning", label: "Bedömning", count: cheatSheets.filter(s => s.category === "Bedömning").length }
  ];

  const filteredSheets = cheatSheets.filter(sheet => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sheet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Grundläggande": return "bg-green-100 text-green-800 border-green-200";
      case "Medel": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Avancerat": return "bg-red-100 text-red-800 border-red-200";
      case "Viktigt": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cheat Sheets</h1>
            <p className="text-muted-foreground">Snabbreferenser för viktiga ämnen</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Sök cheat sheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSheets.map((sheet) => (
            <CheatSheetCard key={sheet.id} sheet={sheet} getDifficultyColor={getDifficultyColor} />
          ))}
        </div>

        {filteredSheets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Inga cheat sheets hittades för din sökning.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CheatSheetCard = ({ sheet, getDifficultyColor }: { 
  sheet: CheatSheet; 
  getDifficultyColor: (difficulty: string) => string 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = sheet.icon;

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{sheet.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {sheet.category}
              </Badge>
            </div>
          </div>
          <Badge className={getDifficultyColor(sheet.difficulty)}>
            {sheet.difficulty}
          </Badge>
        </div>
        <CardDescription className="mt-2">
          {sheet.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Dölj innehåll' : 'Visa innehåll'}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {sheet.content.sections.map((section: CheatSheetSection, index: number) => (
              <div key={index} className="border-l-4 border-primary/20 pl-4">
                <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                <ul className="space-y-1">
                  {section.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex gap-2 pt-4">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Ladda ner PDF
              </Button>
              <Button size="sm" variant="outline">
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheatSheets;
