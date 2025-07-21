import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, BookOpen, Clock, User, Calendar, Eye, Heart, Brain, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

interface SummarySection {
  title: string;
  content: string;
}

interface SummaryContent {
  overview: string;
  keyPoints: string[];
  sections: SummarySection[];
}

interface Summary {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  author: string;
  readTime: string;
  lastUpdated: string;
  views: number;
  description: string;
  content: SummaryContent;
}

const Summaries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const summaries: Summary[] = [
    {
      id: "cardiovascular-system",
      title: "Kardiovaskulära systemet",
      category: "Anatomi & Fysiologi",
      icon: Heart,
      author: "Dr. Anna Svensson",
      readTime: "8 min",
      lastUpdated: "2024-01-15",
      views: 1247,
      description: "Komplett genomgång av hjärtats anatomi, blodcirkulation och vanliga hjärt-kärlsjukdomar",
      content: {
        overview: "Hjärt-kärlsystemet är kroppens transportsystem som försörjer alla organ med syre och näringsämnen.",
        keyPoints: [
          "Hjärtat pumpar cirka 5 liter blod per minut",
          "Stora kretsloppet försörjer kroppen, lilla kretsloppet syresätter blodet",
          "Blodtrycket mäts som systoliskt/diastoliskt tryck",
          "Vanliga sjukdomar: hypertoni, kranskärlssjukdom, hjärtsvikt"
        ],
        sections: [
          {
            title: "Hjärtats anatomi",
            content: "Hjärtat består av fyra kammare: två förmak och två kammare. Höger sida pumpar syrefattigt blod till lungorna, vänster sida pumpar syrerikt blod till kroppen. Hjärtklaffarna säkerställer att blodet flödar åt rätt håll."
          },
          {
            title: "Blodcirkulation",
            content: "Stora kretsloppet: Vänster kammare → Aorta → Kroppens organ → Vena cava → Höger förmak. Lilla kretsloppet: Höger kammare → Lungartär → Lungor → Lungvener → Vänster förmak."
          },
          {
            title: "Vanliga sjukdomar",
            content: "Hypertoni (högt blodtryck) är en tyst sjukdom som ökar risken för stroke och hjärtinfarkt. Kranskärlssjukdom uppstår när hjärtats egna blodkärl blir förträngda. Hjärtsvikt innebär att hjärtat inte kan pumpa tillräckligt effektivt."
          }
        ]
      }
    },
    {
      id: "respiratory-system",
      title: "Andningssystemet",
      category: "Anatomi & Fysiologi", 
      icon: Brain,
      author: "Dr. Erik Lindqvist",
      readTime: "6 min",
      lastUpdated: "2024-01-12",
      views: 892,
      description: "Andningsorganens uppbyggnad, gasutbyte och vanliga andningssjukdomar",
      content: {
        overview: "Andningssystemet ansvarar för gasutbytet mellan kroppen och omgivningen - upptag av syre och avgivning av koldioxid.",
        keyPoints: [
          "Normal andningsfrekvens: 12-20 andetag per minut",
          "Gasutbyte sker i lungblåsorna (alveolerna)",
          "Diafragman är den viktigaste andningsmuskeln",
          "Vanliga sjukdomar: astma, KOL, pneumoni"
        ],
        sections: [
          {
            title: "Andningsorganens anatomi",
            content: "Luftvägarna består av näsa/mun → svalg → struphuvud → luftstrupe → bronker → bronkioler → lungblåsor. Lungorna är uppdelade i lober och omges av lungsäcken (pleura)."
          },
          {
            title: "Andningsmekanik",
            content: "Inandning: Diafragman sänks och revbenen lyfts, vilket ökar lungvolymen och skapar undertryck. Utandning: Diafragman höjs och revbenen sänks, vilket minskar lungvolymen och pressar ut luft."
          },
          {
            title: "Gasutbyte",
            content: "I lungblåsorna diffunderar syre från luften till blodet och koldioxid från blodet till luften. Detta sker genom den tunna alveolokapillära membranet."
          }
        ]
      }
    },
    {
      id: "infection-control-summary",
      title: "Hygien och smittskydd",
      category: "Vårdrutiner",
      icon: Stethoscope,
      author: "Hygiensjuksköterska Maria Holm",
      readTime: "5 min",
      lastUpdated: "2024-01-18",
      views: 1456,
      description: "Grundläggande principer för hygien, smittskydd och säker vård",
      content: {
        overview: "Hygien och smittskydd är fundamentalt för patientsäkerhet och förebyggande av vårdrelaterade infektioner.",
        keyPoints: [
          "Handhygien är den viktigaste åtgärden för att förebygga smitta",
          "Använd skyddsutrustning vid risk för kontakt med kroppsvätskor",
          "Följ basala hygienrutiner för alla patienter",
          "Isolering kan behövas vid vissa smittsamma sjukdomar"
        ],
        sections: [
          {
            title: "WHO:s 5 moment för handhygien",
            content: "1. Före patientkontakt 2. Före ren/aseptisk åtgärd 3. Efter risk för kontakt med kroppsvätskor 4. Efter patientkontakt 5. Efter kontakt med patientens omgivning"
          },
          {
            title: "Skyddsutrustning",
            content: "Handskar skyddar mot kontakt med kroppsvätskor. Förkläde skyddar kläder från kontamination. Munskydd och skyddsglasögon används vid risk för stänk. Viktigt att ta av utrustningen i rätt ordning."
          },
          {
            title: "Isoleringstyper",
            content: "Kontaktisolering: vid risk för kontaktsmitta. Droppsisolering: vid droppsmitta. Luftburen isolering: vid luftburen smitta. Skyddsisolering: för immunsupprimerade patienter."
          }
        ]
      }
    }
  ];

  const categories = [
    { id: "all", label: "Alla", count: summaries.length },
    { id: "Anatomi & Fysiologi", label: "Anatomi & Fysiologi", count: summaries.filter(s => s.category === "Anatomi & Fysiologi").length },
    { id: "Vårdrutiner", label: "Vårdrutiner", count: summaries.filter(s => s.category === "Vårdrutiner").length },
    { id: "Läkemedel", label: "Läkemedel", count: summaries.filter(s => s.category === "Läkemedel").length },
    { id: "Patientgrupper", label: "Patientgrupper", count: summaries.filter(s => s.category === "Patientgrupper").length }
  ];

  const filteredSummaries = summaries.filter(summary => {
    const matchesSearch = summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         summary.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || summary.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-3xl font-bold text-foreground">Sammanfattningar</h1>
            <p className="text-muted-foreground">Djupgående genomgångar av viktiga ämnen</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Sök sammanfattningar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Summaries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSummaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>

        {filteredSummaries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Inga sammanfattningar hittades för din sökning.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ summary }: { summary: Summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = summary.icon;

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{summary.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {summary.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardDescription className="mt-2">
          {summary.description}
        </CardDescription>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {summary.author}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {summary.readTime}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {summary.views}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Dölj innehåll' : 'Läs sammanfattning'}
        </Button>

        {isExpanded && (
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Översikt</h4>
              <p className="text-sm text-muted-foreground">{summary.content.overview}</p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Viktiga punkter</h4>
              <ul className="space-y-1">
                {summary.content.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {summary.content.sections.map((section: SummarySection, index: number) => (
              <div key={index} className="border-l-4 border-primary/20 pl-4">
                <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                <p className="text-sm text-muted-foreground">{section.content}</p>
              </div>
            ))}

            <div className="flex gap-2 pt-4">
              <Button size="sm" className="flex-1">
                <BookOpen className="mr-2 h-4 w-4" />
                Läs fullständig artikel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Summaries;
