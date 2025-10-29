import { useState } from "react";
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Shuffle, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

const flashcardSets = {
  anatomy: {
    title: "Anatomi & Fysiologi",
    color: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    cards: [
      { id: "1", front: "Vad är homeostas?", back: "Kroppens förmåga att upprätthålla ett stabilt inre tillstånd trots förändringar i omgivningen.", category: "Grundbegrepp" },
      { id: "2", front: "Vilka är de fyra huvudsakliga vävnadstyperna?", back: "Epitelvävnad, bindvävnad, muskelvävnad och nervvävnad.", category: "Vävnader" },
      { id: "3", front: "Vad är skillnaden mellan artärer och vener?", back: "Artärer för syrerikt blod från hjärtat, vener för syrefattigt blod till hjärtat. Artärer har tjockare vägg.", category: "Cirkulation" },
      { id: "4", front: "Namnge hjärtats fyra kammare", back: "Höger förmak, höger kammare, vänster förmak, vänster kammare.", category: "Hjärtat" },
      { id: "5", front: "Vad är diafragmans funktion?", back: "Andningsmuskel som delar brösthålan från bukhålan. Drar sig samman vid inandning.", category: "Andning" },
      { id: "6", front: "Vilket organ producerar insulin?", back: "Bukspottkörteln (pankreas)", category: "Metabolism" },
      { id: "7", front: "Vad kallas kroppens största lymfatiska organ?", back: "Mjälten", category: "Immunförsvaret" },
      { id: "8", front: "Hur många ryggkotor har människan?", back: "33 ryggkotor (7 hals, 12 bröst, 5 länd, 5 kors [sammanvuxna], 4 svans [sammanvuxna])", category: "Skelett" }
    ]
  },
  medications: {
    title: "Läkemedel",
    color: "bg-green-500/20 text-green-700 dark:text-green-400",
    cards: [
      { id: "1", front: "Vad är de 5 R:en?", back: "Rätt patient, rätt läkemedel, rätt dos, rätt tidpunkt, rätt administrationssätt.", category: "Säkerhet" },
      { id: "2", front: "Vad betyder p.o.?", back: "Per os - genom munnen (oralt)", category: "Administrationssätt" },
      { id: "3", front: "Vad betyder s.c.?", back: "Subkutant - under huden", category: "Administrationssätt" },
      { id: "4", front: "Vilken vinkel används vid i.m. injektion?", back: "90 grader mot huden", category: "Teknik" },
      { id: "5", front: "Vad är en kontraindikation?", back: "Ett tillstånd eller omständighet där ett läkemedel inte ska användas.", category: "Säkerhet" },
      { id: "6", front: "Vad betyder PRN?", back: "Pro re nata - vid behov", category: "Dosering" },
      { id: "7", front: "Vilken nålstorlek används vanligen för subkutan injektion?", back: "25G (orange nål)", category: "Utrustning" },
      { id: "8", front: "Hur länge ska händerna desinfekteras?", back: "Tills de är helt torra, cirka 20-30 sekunder", category: "Hygien" }
    ]
  },
  hygiene: {
    title: "Hygien & Basala rutiner",
    color: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
    cards: [
      { id: "1", front: "Namnge de 5 momenten för handhygien", back: "1. Före patientkontakt 2. Före ren/aseptisk åtgärd 3. Efter kontakt med kroppsvätskor 4. Efter patientkontakt 5. Efter kontakt med patientens omgivning", category: "Handhygien" },
      { id: "2", front: "Hur länge ska händerna tvättas med tvål och vatten?", back: "Minst 30 sekunder", category: "Handhygien" },
      { id: "3", front: "När ska hushållshandskar användas?", back: "Vid rengöring och städning", category: "Skyddsutrustning" },
      { id: "4", front: "Vilken typ av förkläde används vid smitta?", back: "Plastförkläde vid risk för stänk/kontakt med kroppsvätskor", category: "Skyddsutrustning" },
      { id: "5", front: "Vad är skillnaden mellan desinfektion och sterilisering?", back: "Desinfektion dödar de flesta mikroorganismer. Sterilisering dödar alla mikroorganismer inklusive sporer.", category: "Rengöring" },
      { id: "6", front: "Hur ska använt sterilt material hanteras?", back: "Kastas direkt i avfallskärl för riskavfall", category: "Avfallshantering" }
    ]
  },
  vitals: {
    title: "Vitalparametrar",
    color: "bg-red-500/20 text-red-700 dark:text-red-400",
    cards: [
      { id: "1", front: "Normalvärde puls vuxen?", back: "60-100 slag/minut", category: "Puls" },
      { id: "2", front: "Normalvärde blodtryck vuxen?", back: "120/80 mmHg", category: "Blodtryck" },
      { id: "3", front: "Normalvärde andningsfrekvens vuxen?", back: "12-20 andetag/minut", category: "Andning" },
      { id: "4", front: "Vid vilken temperatur har man feber?", back: "Över 38.0°C", category: "Temperatur" },
      { id: "5", front: "Normalvärde SpO2?", back: "95-100%", category: "Syremättnad" },
      { id: "6", front: "Vad kallas låg puls?", back: "Bradykardi (under 60 slag/min)", category: "Puls" },
      { id: "7", front: "Vad kallas hög puls?", back: "Takykardi (över 100 slag/min)", category: "Puls" },
      { id: "8", front: "Var mäts radialpuls?", back: "På handleddens insida, vid tummen", category: "Puls" }
    ]
  }
};

const Flashcards = () => {
  const [selectedSet, setSelectedSet] = useState<keyof typeof flashcardSets | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());

  const currentSet = selectedSet ? flashcardSets[selectedSet] : null;
  const currentCard = currentSet?.cards[currentCardIndex];
  const progress = currentSet ? ((studiedCards.size / currentSet.cards.length) * 100) : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (currentCard && !studiedCards.has(currentCard.id)) {
      setStudiedCards(new Set([...studiedCards, currentCard.id]));
    }
  };

  const handleNext = () => {
    if (currentSet && currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    if (currentSet) {
      const newIndex = Math.floor(Math.random() * currentSet.cards.length);
      setCurrentCardIndex(newIndex);
      setIsFlipped(false);
    }
  };

  const resetSet = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
  };

  if (!selectedSet || !currentSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Tillbaka
            </Button>
          </Link>

          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Flashcards
            </h1>
            <p className="text-muted-foreground text-lg">
              Lär dig snabbt med interaktiva flashcards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(flashcardSets).map(([key, set], index) => (
              <Card
                key={key}
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-2 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedSet(key as keyof typeof flashcardSets)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <BookMarked className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className={set.color}>
                    {set.cards.length} kort
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {set.title}
                </h3>

                <Button className="w-full mt-4" variant="outline">
                  Börja studera
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedSet(null)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Byt set
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={resetSet}>
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">{currentSet.title}</h2>
            <span className="text-sm text-muted-foreground">
              Kort {currentCardIndex + 1} av {currentSet.cards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">
            {studiedCards.size} av {currentSet.cards.length} kort studerade
          </p>
        </div>

        <div className="mb-8 perspective-1000">
          <div
            className={`relative h-[400px] cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front */}
            <Card className={`absolute inset-0 backface-hidden p-8 flex flex-col items-center justify-center text-center ${
              isFlipped ? 'invisible' : ''
            } bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-colors`}>
              <Badge className="mb-4 bg-primary/20 text-primary">
                Fråga
              </Badge>
              <h3 className="text-2xl font-bold mb-4">{currentCard?.front}</h3>
              <p className="text-sm text-muted-foreground">Klicka för att se svaret</p>
            </Card>

            {/* Back */}
            <Card className={`absolute inset-0 backface-hidden rotate-y-180 p-8 flex flex-col items-center justify-center text-center ${
              !isFlipped ? 'invisible' : ''
            } bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 hover:border-success/40 transition-colors`}>
              <Badge className="mb-4 bg-success/20 text-success">
                Svar
              </Badge>
              <h3 className="text-xl font-bold mb-4">{currentCard?.back}</h3>
              <Badge variant="outline" className="mt-4">
                {currentCard?.category}
              </Badge>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Föregående
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleNext}
            disabled={currentCardIndex === currentSet.cards.length - 1}
            className="gap-2"
          >
            Nästa
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
