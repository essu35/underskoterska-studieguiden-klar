import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Target, Clock, Trophy, BookOpen, CheckCircle, AlertCircle, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { QuizQuestion } from "@/components/QuizQuestion";

interface QuizCategory {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  color: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success" | "quiz";
  difficulty: string;
  estimatedTime: string;
  completion: number;
}

const Quiz = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Comprehensive question sets for all categories
  const sampleQuestions = {
    "anatomy-physiology": [
      {
        id: "1",
        question: "Vilket organ pumpar blod genom kroppen?",
        options: ["Lungorna", "Hjärtat", "Levern", "Njurarna"],
        correctAnswer: 1,
        explanation: "Hjärtat fungerar som en pump som driver blod genom hela kroppen via blodkärlen.",
        category: "Anatomi"
      },
      {
        id: "2", 
        question: "Vad kallas den process där syre tas upp i blodet?",
        options: ["Circulation", "Gasutbyte", "Metabolism", "Digestion"],
        correctAnswer: 1,
        explanation: "Gasutbyte sker i lungorna där syre tas upp från luften och koldioxid avges.",
        category: "Fysiologi"
      },
      {
        id: "3",
        question: "Vilken del av nervsystemet kontrollerar andning?",
        options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Ryggmärgen"],
        correctAnswer: 2,
        explanation: "Medulla oblongata i hjärnstammen kontrollerar automatiska funktioner som andning och hjärtslag.",
        category: "Neurologi"
      },
      {
        id: "4",
        question: "Hur många kammare har hjärtat?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "Hjärtat har fyra kammare: två förmak och två kammare som pumpar blod till lungorna och kroppen.",
        category: "Anatomi"
      },
      {
        id: "5",
        question: "Vad är den normala kroppstemperaturen?",
        options: ["36°C", "37°C", "38°C", "39°C"],
        correctAnswer: 1,
        explanation: "Normal kroppstemperatur är cirka 37°C, men kan variera mellan 36,1-37,2°C.",
        category: "Fysiologi"
      },
      {
        id: "6",
        question: "Vilken blodgrupp är universell givare?",
        options: ["A+", "B-", "AB+", "O-"],
        correctAnswer: 3,
        explanation: "O- kan ge blod till alla andra blodgrupper eftersom den saknar A-, B- och Rh-antigen.",
        category: "Hematologi"
      },
      {
        id: "7",
        question: "Var produceras insulin?",
        options: ["Levern", "Njurarna", "Bukspottkörteln", "Sköldkörteln"],
        correctAnswer: 2,
        explanation: "Insulin produceras av beta-celler i Langerhans öar i bukspottkörteln.",
        category: "Endokrinologi"
      },
      {
        id: "8",
        question: "Vilken del av ögat reglerar ljusinsläppet?",
        options: ["Hornhinnan", "Iris", "Linsen", "Näthinna"],
        correctAnswer: 1,
        explanation: "Iris fungerar som en bländare och reglerar pupillens storlek för att kontrollera ljusinsläppet.",
        category: "Oftalmologi"
      },
      {
        id: "9",
        question: "Vilken muskel är ansvarig för huvuddelen av andningen?",
        options: ["Intercostalmuskler", "Diafragman", "Bukmusklerna", "Ryggmusklerna"],
        correctAnswer: 1,
        explanation: "Diafragman är den viktigaste andningsmuskeln och står för cirka 75% av andningsarbetet i vila.",
        category: "Anatomi"
      },
      {
        id: "10",
        question: "Vad kallas kroppens största organ?",
        options: ["Levern", "Lungorna", "Huden", "Hjärnan"],
        correctAnswer: 2,
        explanation: "Huden är kroppens största organ och utgör cirka 16% av kroppsvikten hos vuxna.",
        category: "Anatomi"
      },
      {
        id: "11",
        question: "Vilken del av njuren filtrerar blodet?",
        options: ["Glomerulus", "Henles slinga", "Samlarrör", "Njurbäcken"],
        correctAnswer: 0,
        explanation: "Glomerulus är ett kapillärknyte där blodfiltreringen sker i njurens nefron.",
        category: "Fysiologi"
      },
      {
        id: "12",
        question: "Vad är normal pH i blodet?",
        options: ["7,0-7,2", "7,35-7,45", "7,5-7,6", "7,8-8,0"],
        correctAnswer: 1,
        explanation: "Normal blod-pH är 7,35-7,45. Värden utanför detta intervall kan vara livshotande.",
        category: "Fysiologi"
      }
    ],
    "vital-parameters": [
      {
        id: "1",
        question: "Vad är normalt vilopuls för en vuxen?",
        options: ["40-60 slag/min", "60-100 slag/min", "100-120 slag/min", "120-140 slag/min"],
        correctAnswer: 1,
        explanation: "Normal vilopuls för vuxna är 60-100 slag per minut. Tränade personer kan ha lägre puls.",
        category: "Vitalparametrar"
      },
      {
        id: "2",
        question: "Vilket blodtryck anses som förhöjt?",
        options: ["<120/80", "120-129/<80", "130-139/80-89", "≥140/90"],
        correctAnswer: 3,
        explanation: "Blodtryck ≥140/90 mmHg klassificeras som högt blodtryck (hypertoni) och kräver behandling.",
        category: "Vitalparametrar"
      },
      {
        id: "3",
        question: "Normal andningsfrekvens för vuxna är:",
        options: ["8-12 andetag/min", "12-20 andetag/min", "20-30 andetag/min", "30-40 andetag/min"],
        correctAnswer: 1,
        explanation: "Normal andningsfrekvens för vuxna är 12-20 andetag per minut i vila.",
        category: "Vitalparametrar"
      },
      {
        id: "4",
        question: "Syremättnad mäts med:",
        options: ["Termometer", "Blodtrycksmätare", "Pulsoximeter", "Stetoskop"],
        correctAnswer: 2,
        explanation: "Pulsoximeter mäter syremättnad (SpO2) genom att skicka ljus genom huden.",
        category: "Mätinstrument"
      },
      {
        id: "5",
        question: "Normal syremättnad för en frisk vuxen är:",
        options: ["85-90%", "90-95%", "95-100%", "100%"],
        correctAnswer: 2,
        explanation: "Normal syremättnad (SpO2) är 95-100%. Värden under 95% kan indikera syrebrist.",
        category: "Vitalparametrar"
      },
      {
        id: "6",
        question: "Vilken temperatur anses som feber?",
        options: ["≥37,5°C", "≥38,0°C", "≥38,5°C", "≥39,0°C"],
        correctAnswer: 1,
        explanation: "Feber definieras som kroppstemperatur ≥38,0°C. Subfebril temperatur är 37,5-37,9°C.",
        category: "Temperatur"
      },
      {
        id: "7",
        question: "Vad mäter Glasgow Coma Scale (GCS)?",
        options: ["Smärta", "Medvetandegrad", "Blodtryck", "Andning"],
        correctAnswer: 1,
        explanation: "GCS mäter medvetandegrad genom att bedöma ögonöppning, verbal respons och motorisk respons.",
        category: "Neurologi"
      },
      {
        id: "8",
        question: "Vad kallas det när hjärtat inte pumpar tillräckligt?",
        options: ["Hjärtinfarkt", "Hjärtsvikt", "Arytmi", "Angina"],
        correctAnswer: 1,
        explanation: "Hjärtsvikt innebär att hjärtat inte kan pumpa tillräckligt med blod för att täcka kroppens behov.",
        category: "Kardiologi"
      },
      {
        id: "9",
        question: "Vad är normal central venös tryck (CVP)?",
        options: ["0-2 mmHg", "2-8 mmHg", "8-12 mmHg", "12-20 mmHg"],
        correctAnswer: 1,
        explanation: "Normalt CVP är 2-8 mmHg och reflekterar höger hjärtats fyllnadstryck.",
        category: "Vitalparametrar"
      },
      {
        id: "10",
        question: "Vilken pulsoximetervärde kräver omedelbar åtgärd?",
        options: ["98%", "95%", "92%", "88%"],
        correctAnswer: 3,
        explanation: "SpO2 under 90% kräver omedelbar åtgärd då det indikerar allvarlig syrebrist.",
        category: "Akutvård"
      }
    ],
    "medications": [
      {
        id: "1",
        question: "Vad betyder förkortningen 'PO'?",
        options: ["Per os (genom munnen)", "Post operationem", "Pro re nata", "Punkt och ordination"],
        correctAnswer: 0,
        explanation: "'Per os' betyder genom munnen och är det vanligaste sättet att ge läkemedel.",
        category: "Läkemedel"
      },
      {
        id: "2",
        question: "Vilka är de '5 R:en' vid läkemedelshantering?",
        options: [
          "Rätt patient, läkemedel, dos, tid, sätt",
          "Rätt doktor, patient, medicin, plats, datum", 
          "Rätt sjuksköterska, läkemedel, dos, metod, kontroll",
          "Rätt person, preparat, mängd, tidpunkt, dokumentation"
        ],
        correctAnswer: 0,
        explanation: "De 5 R:en är: Rätt patient, rätt läkemedel, rätt dos, rätt tid och rätt administrationssätt.",
        category: "Säkerhet"
      },
      {
        id: "3",
        question: "Vad betyder 'PRN' på en läkemedelsordination?",
        options: ["Permanent", "Pro re nata (vid behov)", "Preventiv", "Primär"],
        correctAnswer: 1,
        explanation: "PRN betyder 'pro re nata' vilket betyder 'vid behov' - läkemedlet ges endast när patienten behöver det.",
        category: "Ordinationer"
      },
      {
        id: "4",
        question: "Vad betyder 'IV' administrering?",
        options: ["Intramuskulärt", "Intravenöst", "Intranasalt", "Intraossalt"],
        correctAnswer: 1,
        explanation: "IV betyder intravenöst - direkt i venen för snabb effekt.",
        category: "Administrering"
      },
      {
        id: "5",
        question: "Vilken biverkning ska alltid rapporteras?",
        options: ["Mild illamående", "Lätt huvudvärk", "Allergisk reaktion", "Trötthet"],
        correctAnswer: 2,
        explanation: "Allergiska reaktioner kan vara livshotande och måste alltid rapporteras omedelbart.",
        category: "Säkerhet"
      },
      {
        id: "6",
        question: "Vad är viktigt före läkemedelsadministrering?",
        options: ["Kontrollera identitet", "Fråga om allergier", "Kontrollera dos", "Alla ovanstående"],
        correctAnswer: 3,
        explanation: "Alla dessa kontroller är kritiska för patientsäkerhet vid läkemedelsadministrering.",
        category: "Säkerhet"
      },
      {
        id: "7",
        question: "Vad betyder 'SC' administrering?",
        options: ["Subkutant", "Sublingualt", "Systemisk cirkulation", "Sterilt koncentrat"],
        correctAnswer: 0,
        explanation: "SC betyder subkutant - injektion under huden i det subkutana fettvävnadslagret.",
        category: "Administrering"
      },
      {
        id: "8",
        question: "Vilken nålstorlek används vanligen för IM-injektioner?",
        options: ["25G", "21-23G", "18G", "16G"],
        correctAnswer: 1,
        explanation: "21-23G nålar används för IM-injektioner för att säkerställa läkemedlet når muskelvävnaden.",
        category: "Administrering"
      },
      {
        id: "9",
        question: "Vad är halveringstid för ett läkemedel?",
        options: ["Tid till maximal effekt", "Tid för eliminering av hälften", "Tid för absorption", "Tid för metabolism"],
        correctAnswer: 1,
        explanation: "Halveringstid är tiden det tar för kroppen att eliminera hälften av läkemedlet från blodet.",
        category: "Farmakokinetik"
      },
      {
        id: "10",
        question: "Vilken åtgärd vid anafylaktisk reaktion?",
        options: ["Antihistamin", "Adrenalin", "Kortison", "Vänta och se"],
        correctAnswer: 1,
        explanation: "Adrenalin är förstahandsbehandling vid anafylaxi och ska ges omedelbart intramuskulärt.",
        category: "Akutvård"
      }
    ],
    "hygiene-infection": [
      {
        id: "1",
        question: "Hur länge ska handdesinfektion pågå?",
        options: ["10 sekunder", "20-30 sekunder", "1 minut", "2 minuter"],
        correctAnswer: 1,
        explanation: "Handdesinfektion ska pågå i 20-30 sekunder för att vara effektiv mot bakterier och virus.",
        category: "Hygien"
      },
      {
        id: "2",
        question: "Vilken är den viktigaste åtgärden för att förhindra smittspridning?",
        options: ["Munskydd", "Handhygien", "Skyddsrock", "Visir"],
        correctAnswer: 1,
        explanation: "Handhygien är den enskilt viktigaste åtgärden för att förhindra smittspridning i vårdmiljö.",
        category: "Infektionskontroll"
      },
      {
        id: "3",
        question: "När ska skyddsutrustning användas?",
        options: ["Bara vid operation", "Vid misstänkt smitta", "Endast med känd smitta", "Aldrig"],
        correctAnswer: 1,
        explanation: "Skyddsutrustning ska användas som försiktighetsåtgärd vid misstänkt eller känd smitta.",
        category: "Infektionskontroll"
      },
      {
        id: "4",
        question: "Vad innebär kontaktsmittoisolering?",
        options: ["Ingen kontakt alls", "Handskar och förkläde", "Bara munskydd", "Öppen dörr"],
        correctAnswer: 1,
        explanation: "Kontaktsmittoisolering kräver handskar och förkläde vid all patientkontakt.",
        category: "Isolering"
      },
      {
        id: "5",
        question: "Hur länge efter antibiotikastart är en patient smittsam?",
        options: ["Aldrig", "24-48 timmar", "1 vecka", "Hela behandlingen"],
        correctAnswer: 1,
        explanation: "De flesta bakterieinfektioner är inte längre smittsamma efter 24-48 timmar av antibiotika.",
        category: "Smittskydd"
      },
      {
        id: "6",
        question: "Vilken typ av isolering krävs vid tuberkulos?",
        options: ["Kontaktisolering", "Droppsisolering", "Luftburen isolering", "Skyddsisolering"],
        correctAnswer: 2,
        explanation: "Tuberkulos kräver luftburen isolering med undertrycksrum och N95-mask.",
        category: "Isolering"
      },
      {
        id: "7",
        question: "Vad är korrekt ordning för att ta av skyddsutrustning?",
        options: ["Handskar, förkläde, mask, glasögon", "Förkläde, handskar, glasögon, mask", "Glasögon, förkläde, mask, handskar", "Handskar, glasögon, förkläde, mask"],
        correctAnswer: 0,
        explanation: "Korrekt ordning: handskar, förkläde, glasögon/visir, mask - från mest till minst kontaminerat.",
        category: "Skyddsutrustning"
      },
      {
        id: "8",
        question: "Vilken koncentration alkohol krävs för effektiv handdesinfektion?",
        options: ["60-70%", "70-85%", "85-95%", "95-100%"],
        correctAnswer: 1,
        explanation: "70-85% alkohol är mest effektivt för handdesinfektion - högre koncentrationer är mindre effektiva.",
        category: "Hygien"
      }
    ],
    "psychiatry-communication": [
      {
        id: "1",
        question: "Vad är aktivt lyssnande?",
        options: ["Att bara höra vad som sägs", "Att lyssna och visa förståelse", "Att avbryta ofta", "Att ge råd direkt"],
        correctAnswer: 1,
        explanation: "Aktivt lyssnande innebär att verkligen lyssna, visa förståelse och bekräfta vad personen säger.",
        category: "Kommunikation"
      },
      {
        id: "2",
        question: "Vad är empati inom vården?",
        options: ["Att känna samma sak", "Att förstå patientens känslor", "Att döma patienten", "Att ge råd"],
        correctAnswer: 1,
        explanation: "Empati innebär att förstå och känna med patienten utan att själv ta på sig deras känslor.",
        category: "Kommunikation"
      },
      {
        id: "3",
        question: "Hur bemöter man en aggressiv patient?",
        options: ["Höja rösten", "Lugnt och respektfullt", "Vända ryggen till", "Hota med konsekvenser"],
        correctAnswer: 1,
        explanation: "Lugn, respektfull kommunikation och att inte ta det personligt är viktigt vid aggression.",
        category: "Krishantering"
      },
      {
        id: "4",
        question: "Vad innebär personcentrerad vård?",
        options: ["Fokus på sjukdom", "Fokus på personen", "Fokus på personal", "Fokus på ekonomi"],
        correctAnswer: 1,
        explanation: "Personcentrerad vård sätter personen i centrum och respekterar deras värderingar och önskemål.",
        category: "Vårdfilosofi"
      },
      {
        id: "5",
        question: "Vad är SBAR-modellen?",
        options: ["Situation, Background, Assessment, Recommendation", "Safety, Behavior, Action, Result", "Support, Balance, Attention, Response", "Structure, Behavior, Analysis, Review"],
        correctAnswer: 0,
        explanation: "SBAR är en strukturerad kommunikationsmodell: Situation, Background, Assessment, Recommendation.",
        category: "Kommunikation"
      },
      {
        id: "6",
        question: "Vilken är en vanlig biverkning av antipsykotiska läkemedel?",
        options: ["Viktminskning", "Extrapyramidala symtom", "Förbättrad kognition", "Ökad energi"],
        correctAnswer: 1,
        explanation: "Extrapyramidala symtom som tremor, stelhet och tardiv dyskinesi är vanliga biverkningar.",
        category: "Psykofarmaka"
      },
      {
        id: "7",
        question: "Vad innebär suicidriskbedömning?",
        options: ["Bara fråga om tankar", "Systematisk bedömning av risk", "Vänta på att patienten berättar", "Undvika ämnet"],
        correctAnswer: 1,
        explanation: "Suicidriskbedömning kräver systematisk utvärdering av riskfaktorer, skyddsfaktorer och akut risk.",
        category: "Riskbedömning"
      }
    ],
    "laws-ethics": [
      {
        id: "1",
        question: "Vad innebär tystnadsplikt?",
        options: ["Att inte prata med patienter", "Att inte diskutera patientinformation", "Att vara tyst på jobbet", "Att inte ställa frågor"],
        correctAnswer: 1,
        explanation: "Tystnadsplikt innebär att vårdpersonal inte får diskutera eller sprida patientinformation till obehöriga.",
        category: "Juridik"
      },
      {
        id: "2",
        question: "Vad innebär informerat samtycke?",
        options: ["Muntlig överenskommelse", "Skriftligt godkännande efter information", "Tyst acceptans", "Anhörigs beslut"],
        correctAnswer: 1,
        explanation: "Informerat samtycke innebär att patienten får fullständig information innan de ger sitt skriftliga godkännande.",
        category: "Juridik"
      },
      {
        id: "3",
        question: "När får anmälan till IVO göras?",
        options: ["Aldrig", "Vid vårdskada eller missförhållanden", "Bara av chefer", "Bara av patienter"],
        correctAnswer: 1,
        explanation: "Alla har rätt och skyldighet att anmäla vårdskador eller missförhållanden till IVO.",
        category: "Tillsyn"
      },
      {
        id: "4",
        question: "Vad betyder autonomiprincipen?",
        options: ["Personalens självbestämmande", "Patientens självbestämmande", "Ledningens beslut", "Läkarens auktoritet"],
        correctAnswer: 1,
        explanation: "Autonomiprincipen innebär att patienten har rätt till självbestämmande över sin egen vård.",
        category: "Etik"
      },
      {
        id: "5",
        question: "När får tvångsvård användas?",
        options: ["När patienten inte vill", "Vid allvarlig fara för liv och hälsa", "För personalens bekvämlighet", "Aldrig"],
        correctAnswer: 1,
        explanation: "Tvångsvård får endast användas när det finns allvarlig och omedelbar fara för patientens liv och hälsa.",
        category: "Juridik"
      },
      {
        id: "6",
        question: "Vad innebär GDPR för vårdpersonal?",
        options: ["Ingen förändring", "Striktare hantering av personuppgifter", "Mindre dokumentation", "Öppnare information"],
        correctAnswer: 1,
        explanation: "GDPR kräver striktare hantering av personuppgifter med tydligt syfte och patientens samtycke.",
        category: "Juridik"
      },
      {
        id: "7",
        question: "Vad är Lex Maria?",
        options: ["Patientlag", "Anmälningsskyldighet vid vårdskador", "Medicinsk forskning", "Personallag"],
        correctAnswer: 1,
        explanation: "Lex Maria är anmälningsskyldighet till IVO vid vårdskador eller risk för vårdskador.",
        category: "Tillsyn"
      },
      {
        id: "8",
        question: "Vilken princip gäller vid etiska dilemman?",
        options: ["Personalens önskemål", "Patientens bästa", "Ekonomiska faktorer", "Rutiner"],
        correctAnswer: 1,
        explanation: "Patientens bästa ska alltid vara vägledande vid etiska dilemman i vården.",
        category: "Etik"
      }
    ],
    "emergency-care": [
      {
        id: "1",
        question: "Vad är första åtgärden vid hjärtstopp?",
        options: ["Ring 112", "Starta hjärtkompressioner", "Kontrollera puls", "Ge andningar"],
        correctAnswer: 1,
        explanation: "Starta omedelbart hjärtkompressioner - varje sekund räknas vid hjärtstopp.",
        category: "HLR"
      },
      {
        id: "2",
        question: "Vilken kompressionsfrekvens rekommenderas vid HLR?",
        options: ["80-100/min", "100-120/min", "120-140/min", "140-160/min"],
        correctAnswer: 1,
        explanation: "Kompressionsfrekvens ska vara 100-120 per minut för optimal cirkulation.",
        category: "HLR"
      },
      {
        id: "3",
        question: "Hur djupt ska hjärtkompressioner vara?",
        options: ["3-4 cm", "5-6 cm", "7-8 cm", "9-10 cm"],
        correctAnswer: 1,
        explanation: "Kompressioner ska vara 5-6 cm djupa för att skapa tillräckligt tryck.",
        category: "HLR"
      },
      {
        id: "4",
        question: "Vad är ABCDE-modellen?",
        options: ["Airway, Breathing, Circulation, Disability, Exposure", "Assessment, Blood, Care, Drugs, Emergency", "Alert, Basic, Critical, Dangerous, Emergency", "Acute, Breathing, Cardiac, Diagnosis, Evaluation"],
        correctAnswer: 0,
        explanation: "ABCDE är systematisk bedömning: Airway, Breathing, Circulation, Disability, Exposure.",
        category: "Akutbedömning"
      },
      {
        id: "5",
        question: "Vilken dos adrenalin ges vid anafylaxi?",
        options: ["0,1 mg", "0,3-0,5 mg", "1 mg", "2 mg"],
        correctAnswer: 1,
        explanation: "0,3-0,5 mg adrenalin ges intramuskulärt vid anafylaktisk reaktion.",
        category: "Läkemedel"
      }
    ],
    "geriatric-care": [
      {
        id: "1",
        question: "Vad är polyfarmaci?",
        options: ["Många sjukdomar", "Många läkemedel", "Många vårdgivare", "Många symtom"],
        correctAnswer: 1,
        explanation: "Polyfarmaci innebär att en person tar många läkemedel samtidigt, vanligt hos äldre.",
        category: "Geriatrik"
      },
      {
        id: "2",
        question: "Vilken är den vanligaste orsaken till fall hos äldre?",
        options: ["Synproblem", "Läkemedelsbiverkningar", "Muskelsvaghet", "Alla ovanstående"],
        correctAnswer: 3,
        explanation: "Fall hos äldre har ofta multifaktoriella orsaker - syn, läkemedel och muskelsvaghet.",
        category: "Fallprevention"
      },
      {
        id: "3",
        question: "Vad är delirium?",
        options: ["Permanent förvirring", "Akut förvirringstillstånd", "Demenssjukdom", "Psykisk sjukdom"],
        correctAnswer: 1,
        explanation: "Delirium är ett akut, flukturerande förvirringstillstånd som ofta är reversibelt.",
        category: "Geriatrik"
      }
    ]
      }
    ]
  };

  const startQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  if (activeQuiz && !quizCompleted) {
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={resetQuiz}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Avbryt quiz
            </Button>
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <QuizQuestion
            question={question}
            onNext={handleNextQuestion}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const questions = sampleQuestions[activeQuiz as keyof typeof sampleQuestions];
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-bg">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="bg-gradient-card shadow-strong border-0 text-center">
            <CardContent className="p-8">
              <Trophy className="h-20 w-20 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Quiz avslutad!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Du fick {score} av {questions.length} rätt ({percentage}%)
              </p>
              <div className="space-y-4">
                <Button onClick={resetQuiz} size="lg" className="w-full">
                  Tillbaka till quiz-kategorier
                </Button>
                <Button variant="outline" onClick={() => startQuiz(activeQuiz!)} size="lg" className="w-full">
                  Gör om quizet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const getQuestionCount = (categoryId: string) => {
    return sampleQuestions[categoryId as keyof typeof sampleQuestions]?.length || 0;
  };

  const quizCategories: QuizCategory[] = [
    {
      id: "anatomy-physiology",
      icon: Brain,
      title: "Anatomi & Fysiologi Quiz",
      description: "Testa dina kunskaper om kroppens organsystem",
      badge: `${getQuestionCount("anatomy-physiology")} frågor`,
      color: "default",
      difficulty: "Grundläggande",
      estimatedTime: "12 min",
      completion: 0
    },
    {
      id: "vital-parameters", 
      icon: Target,
      title: "Vitalparametrar",
      description: "Normalvärden och mätmetoder för vitalparametrar",
      badge: `${getQuestionCount("vital-parameters")} frågor`,
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
      badge: `${getQuestionCount("medications")} frågor`,
      color: "quiz",
      difficulty: "Medel",
      estimatedTime: "10 min",
      completion: 0
    },
    {
      id: "hygiene-infection",
      icon: CheckCircle,
      title: "Hygien & Infektionsprevention",
      description: "Hygienrutiner och smittskydd i vårdmiljö",
      badge: `${getQuestionCount("hygiene-infection")} frågor`,
      color: "success",
      difficulty: "Lätt",
      estimatedTime: "8 min",
      completion: 0
    },
    {
      id: "psychiatry-communication",
      icon: Brain,
      title: "Psykiatri & Kommunikation",
      description: "Bemötande och samtalsteknik inom psykiatri",
      badge: `${getQuestionCount("psychiatry-communication")} frågor`,
      color: "default",
      difficulty: "Medel",
      estimatedTime: "7 min",
      completion: 0
    },
    {
      id: "laws-ethics",
      icon: Star,
      title: "Lagar & Etik",
      description: "Juridiska aspekter och etiska principer",
      badge: `${getQuestionCount("laws-ethics")} frågor`,
      color: "quiz",
      difficulty: "Svår",
      estimatedTime: "8 min",
      completion: 0
    },
    {
      id: "emergency-care",
      icon: AlertCircle,
      title: "Akutvård & HLR",
      description: "Akuta situationer och hjärt-lungräddning",
      badge: `${getQuestionCount("emergency-care")} frågor`,
      color: "destructive",
      difficulty: "Svår",
      estimatedTime: "5 min",
      completion: 0
    },
    {
      id: "geriatric-care",
      icon: User,
      title: "Geriatrisk vård",
      description: "Specialiserad vård för äldre patienter",
      badge: `${getQuestionCount("geriatric-care")} frågor`,
      color: "secondary",
      difficulty: "Medel",
      estimatedTime: "3 min",
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
                      variant={category.color} 
                      className="w-full group-hover:shadow-medium transition-all duration-300"
                      onClick={() => startQuiz(category.id)}
                      disabled={!sampleQuestions[category.id as keyof typeof sampleQuestions]}
                    >
                      <Play className="mr-2 h-4 w-4" />
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
