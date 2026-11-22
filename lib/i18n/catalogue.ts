import type { Category, Product } from "@/lib/products";
import type { Locale } from "./config";
import { dictionaries } from "./dictionaries";

type CategoryText = { name: string; short: string; description: string };
type ProductText = {
  name: string;
  subcategory: string;
  material: string;
  detail: string;
};

const categoryTranslations: Record<Exclude<Locale, "en">, Record<string, CategoryText>> = {
  de: {
    clothing: {
      name: "Sicherheits-Poloshirts & Uniformhemden",
      short: "Polos & Uniformhemden",
      description:
        "Alltagstaugliche Oberteile für eine einheitliche Team-Uniform im Sicherheitsdienst.",
    },
    jackets: {
      name: "Sicherheitsjacken, Parkas & Westen",
      short: "Jacken & Westen",
      description:
        "Schichten für Ihre Uniformkollektion im Sicherheitsdienst.",
    },
    trousers: {
      name: "Diensthosen für den Sicherheitsdienst",
      short: "Diensthosen",
      description: "Dienst- und Formhosen für eine professionelle Uniform.",
    },
    identification: {
      name: "Armbinden & Kennzeichnungsstreifen",
      short: "Armbinden & Kennzeichnung",
      description:
        "Armbinden „Sécurité privée“, Brust- und Rückenstreifen, Namensbänder und Kennzeichnungsträger.",
    },
    holders: {
      name: "Abzeichen-, Ausweis- & Kartenhalter",
      short: "Abzeichen- & Kartenhalter",
      description:
        "PVC-Kartenhalter, Halsbänder und professionelle Ausweismappen.",
    },
    badges: {
      name: "Sicherheitsabzeichen & Insignien",
      short: "Sicherheitsabzeichen",
      description:
        "Abzeichen-Patches, bestickte Insignien und Ausweisroller zur Uniformkennzeichnung.",
    },
    belts: {
      name: "Dienstgürtel & Gürtelzubehör",
      short: "Gürtel & Zubehör",
      description:
        "Gürtel, Funkgerätehalter und Handschuhhalter für die tägliche Organisation.",
    },
    tactical: {
      name: "Taktische Telefonhalter & Taschen",
      short: "Telefonhalter & Taschen",
      description:
        "Telefonhalter für Gürtel und Weste, MOLLE-Taschen und praktisches Dienstzubehör.",
    },
    headwear: {
      name: "Sicherheitscaps & Beanies",
      short: "Caps & Beanies",
      description:
        "Schwarze Kopfbedeckungen für eine einheitliche Uniform im Sicherheitsdienst.",
    },
    gloves: {
      name: "Uniformhandschuhe für den Sicherheitsdienst",
      short: "Uniformhandschuhe",
      description:
        "Schlichte schwarze Handschuhe zur Vervollständigung der Uniform.",
    },
    footwear: {
      name: "Dienstschuhe für den Sicherheitsdienst",
      short: "Dienstschuhe",
      description:
        "Schwarze Dienststiefel und formelle Uniformschuhe.",
    },
  },
  fr: {
    clothing: {
      name: "Polos et chemises d’uniforme de sécurité",
      short: "Polos et chemises",
      description:
        "Hauts du quotidien pour une tenue d’équipe coordonnée en sécurité privée.",
    },
    jackets: {
      name: "Vestes, parkas et gilets de sécurité",
      short: "Vestes et gilets",
      description:
        "Des couches pour votre collection d’uniformes de sécurité privée.",
    },
    trousers: {
      name: "Pantalons de service de sécurité",
      short: "Pantalons de service",
      description:
        "Pantalons de service et de ville pour un uniforme professionnel.",
    },
    identification: {
      name: "Brassards et bandeaux d’identification",
      short: "Brassards et identification",
      description:
        "Brassards « Sécurité privée », bandeaux poitrine et dos, bandes patronymiques et supports d’identifiant.",
    },
    holders: {
      name: "Porte-badges, porte-cartes et porte-identifiants",
      short: "Porte-badges et cartes",
      description:
        "Porte-cartes PVC, cordons de cou et portefeuilles d’identification professionnels.",
    },
    badges: {
      name: "Écussons et insignes de sécurité",
      short: "Écussons de sécurité",
      description:
        "Patchs d’écusson, insignes brodés et enrouleurs de badge pour l’identification de l’uniforme.",
    },
    belts: {
      name: "Ceintures de service et accessoires",
      short: "Ceintures et accessoires",
      description:
        "Ceintures, porte-radios et porte-gants pour l’organisation quotidienne.",
    },
    tactical: {
      name: "Porte-téléphones et pochettes tactiques",
      short: "Porte-téléphones et pochettes",
      description:
        "Porte-téléphones de ceinture et de gilet, pochettes MOLLE et accessoires de service pratiques.",
    },
    headwear: {
      name: "Casquettes et bonnets de sécurité",
      short: "Casquettes et bonnets",
      description:
        "Couvre-chefs noirs pour un uniforme de sécurité privée coordonné.",
    },
    gloves: {
      name: "Gants d’uniforme de sécurité",
      short: "Gants d’uniforme",
      description:
        "Gants noirs unis pour compléter la sélection d’uniforme.",
    },
    footwear: {
      name: "Chaussures de service de sécurité",
      short: "Chaussures de service",
      description:
        "Bottes de service noires et chaussures de ville pour uniforme.",
    },
  },
};

const productTranslations: Record<
  Exclude<Locale, "en">,
  Record<string, ProductText>
> = {
  de: {
    "private-security-short-sleeve-polo": {
      name: "Sicherheits-Poloshirt, Kurzarm",
      subcategory: "Kurzarm-Polos",
      material: "Polyester/Baumwoll-Piqué",
      detail:
        "Kurzarm-Polo-Konzept mit kleiner Kennzeichnungsfläche auf der Brust. Besprechen Sie Brust- und Rückenmarkierungen für Ihr Team.",
    },
    "private-security-long-sleeve-polo": {
      name: "Sicherheits-Poloshirt, Langarm",
      subcategory: "Langarm-Polos",
      material: "Polyester/Baumwoll-Piqué",
      detail:
        "Langarm-Polo-Konzept für eine einheitliche Uniform im Sicherheitsdienst. Fragen Sie Firmen- und Funktionsmarkierungen an.",
    },
    "white-pilot-uniform-shirt": {
      name: "Weißes Pilot-Uniformhemd",
      subcategory: "Uniformhemden",
      material: "Polyester/Baumwoll-Popeline",
      detail:
        "Weißes Kurzarm-Uniformhemd-Konzept mit schlichten Schulterklappen. Geeignet als Ausgangspunkt für Empfangs- und formelle Uniformanfragen.",
    },
    "private-security-softshell-jacket": {
      name: "Sicherheits-Softshelljacke",
      subcategory: "Softshelljacken",
      material: "Polyester-Softshell-Gewebe",
      detail:
        "Schwarzes Softshelljacken-Konzept mit durchgehendem Reißverschluss und Platz für Kennzeichnung und Firmenbranding.",
    },
    "private-security-windbreaker": {
      name: "Sicherheits-Windbreaker",
      subcategory: "Windbreaker",
      material: "Polyester-Obergewebe",
      detail:
        "Leichtes Zip-Jacken-Konzept. Teilen Sie Ihr bevorzugtes Futter, die Platzierung der Kennzeichnung und die Größenverteilung mit.",
    },
    "hooded-security-service-parka": {
      name: "Sicherheits-Dienstparka mit Kapuze",
      subcategory: "Parkas",
      material: "Polyester-Außengewebe",
      detail:
        "Dienstparka-Konzept mit Kapuze für die Uniformbeschaffung. Futter, Stoffspezifikation und Markierungsoptionen müssen bestätigt werden.",
    },
    "padded-sleeveless-security-gilet": {
      name: "Gesteppte ärmellose Sicherheitsweste",
      subcategory: "Ärmellose Westen",
      material: "Polyester-Oberstoff / synthetische Füllung",
      detail:
        "Schlichtes gestepptes ärmelloses Kleidungsstück mit Frontreißverschluss. Dies ist eine Uniformschicht; es wird keine Schutz- oder Panzerungswirkung behauptet.",
    },
    "black-security-service-cargo-trousers": {
      name: "Schwarze Dienst-Cargohose für den Sicherheitsdienst",
      subcategory: "Diensthosen",
      material: "Polyester/Baumwoll-Twill",
      detail:
        "Schwarzes Diensthosen-Konzept mit seitlichen Aufbewahrungstaschen. Bestätigen Sie Taschenaufteilung, Passform und Maße in Ihrer Anfrage.",
    },
    "private-security-uniform-trousers": {
      name: "Uniformhose für den Sicherheitsdienst",
      subcategory: "Uniformhosen",
      material: "Polyester/Baumwoll-Twill",
      detail:
        "Uniformhosen-Anfragekonzept. Das Kollektionsbild zeigt eine Diensthose; der endgültige Schnitt und die Taschenaufteilung müssen vereinbart werden.",
    },
    "securite-privee-identification-armband": {
      name: "Kennzeichnungsarmbinde Sécurité Privée",
      subcategory: "Sicherheitsarmbinden",
      material: "Polyester/Elastikband",
      detail:
        "Oranges Armbinden-Konzept für den Sicherheitsdienst mit verstellbarem Band und Fläche für die Funktionsbezeichnung. Endgültiger Text und Maße richten sich nach den Anforderungen des Käufers.",
    },
    "securite-privee-chest-back-strip-set": {
      name: "Brust- & Rückenstreifen-Set Sécurité Privée",
      subcategory: "Brust- & Rückenstreifen",
      material: "Gewebter Textil / Klettverschluss",
      detail:
        "Zwei Kennzeichnungsstreifen-Konzepte in unterschiedlichen Größen für Brust- und Rückenposition. Text, Schrift und Befestigung werden individuell bestätigt.",
    },
    "private-security-name-tape": {
      name: "Namensband für den Sicherheitsdienst",
      subcategory: "Namensbänder",
      material: "Besticktes Textil",
      detail:
        "Namensband-Konzept. Das Bild verwendet das Beispielwort NAME; Ihr freigegebener Text und Ihre Befestigungswünsche müssen angegeben werden.",
    },
    "numeric-identification-strip-holder": {
      name: "Halter für numerische Kennzeichnungsstreifen",
      subcategory: "Kennzeichnungsträger",
      material: "Gewebter Textil / Klettverschluss",
      detail:
        "Leeres Kennzeichnungsträger-Konzept für einen vom Käufer gelieferten Zahlenstreifen. Es wird keine offizielle Kennung geliefert und keine regulatorische Konformität zugesichert.",
    },
    "rigid-pvc-professional-badge-holder": {
      name: "Professioneller Ausweishalter aus Hart-PVC",
      subcategory: "PVC-Abzeichenhalter",
      material: "Hart-PVC / Textilband",
      detail:
        "Transparentes Hartkartenhalter-Konzept für einen professionellen Ausweis. Kartenmaße, Ausrichtung und Befestigung müssen angegeben werden.",
    },
    "neck-lanyard-id-card-holder": {
      name: "Halsband mit Ausweiskartenhalter",
      subcategory: "Halsbänder & Kartenhalter",
      material: "Polyester-Halsband / PVC-Halter",
      detail:
        "Konzept aus Halsband und Kartenhalter. Besprechen Sie die Bedruckung des Halsbands, Befestigungswünsche und Ihre Kartenmaße.",
    },
    "leather-professional-id-wallet": {
      name: "Professionelle Leder-Ausweismappe",
      subcategory: "Ausweismappen",
      material: "Leder / transparente Kartenfenster",
      detail:
        "Schwarzes zweiteiliges Ausweismappen-Konzept mit zwei Kartenfenstern. Es sind keine Behördeninsignien oder offiziellen Abzeichen enthalten.",
    },
    "adjustable-black-security-duty-belt": {
      name: "Verstellbarer schwarzer Dienstgürtel",
      subcategory: "Dienstgürtel",
      material: "Gewebtes Nylon / Kunststoffschnalle",
      detail:
        "Schlichtes schwarzes Dienstgürtel-Konzept mit verstellbarer Schnalle. Geben Sie die gewünschte Breite und den Taillenumfang in Ihrer Anfrage an.",
    },
    "belt-mounted-radio-holder": {
      name: "Gürtel-Funkgerätehalter",
      subcategory: "Funkgerätehalter",
      material: "Gewebtes Nylon",
      detail:
        "Leeres Gürtel-Funkgerätehalter-Konzept. Teilen Sie Gerätemaße und bevorzugte Halterungsdetails mit; es ist kein Funkgerät enthalten.",
    },
    "belt-glove-keeper": {
      name: "Gürtel-Handschuhhalter",
      subcategory: "Handschuhhalter",
      material: "Gewebtes Nylon / Kunststoffclip",
      detail:
        "Kompaktes schwarzes Handschuhhalter-Konzept mit Gürtelschlaufe und Clip. Bestätigen Sie Bandbreite, Befestigung und Handschuhkompatibilität.",
    },
    "securite-privee-uniform-cap": {
      name: "Uniformkappe Sécurité Privée",
      subcategory: "Sicherheitscaps",
      material: "Baumwoll-Twill",
      detail:
        "Schwarzes Kappen-Konzept mit Frontmarkierung für den Sicherheitsdienst. Firmenkennzeichnung und Verstellmöglichkeiten können besprochen werden.",
    },
    "black-security-uniform-beanie": {
      name: "Schwarze Dienstmütze (Beanie)",
      subcategory: "Uniform-Beanies",
      material: "Acryl-Strick",
      detail:
        "Schlichtes schwarzes Strickmützen-Konzept für eine einheitliche Uniformauswahl. Besprechen Sie Passform und Platzierung der Markierung.",
    },
    "black-security-uniform-gloves": {
      name: "Schwarze Uniformhandschuhe",
      subcategory: "Uniformhandschuhe",
      material: "Synthetisches Textil",
      detail:
        "Schlichtes schwarzes Handschuh-Konzept mit vollem Fingerbereich. Es werden keine Schnittfestigkeit, Aufprallschutz oder Sicherheitszertifizierung zugesichert.",
    },
    "black-lace-up-security-duty-boots": {
      name: "Schwarze Schnür-Dienststiefel",
      subcategory: "Dienststiefel",
      material: "Leder / Textil-Obermaterial",
      detail:
        "Schwarzes Schnürstiefel-Konzept für den Dienst. Sohlenaufbau, Materialien und Passform müssen bestätigt werden; es wird kein zertifizierter Schutz zugesichert.",
    },
    "black-formal-uniform-shoes": {
      name: "Schwarze formelle Uniformschuhe",
      subcategory: "Formelle Uniformschuhe",
      material: "Leder-Obermaterial",
      detail:
        "Halbschuh-Konzept in Schwarz mit Schnürung für formelle Uniformen im Sicherheitsdienst. Bestätigen Sie Ausführung, Passform und endgültige Materialien in Ihrer Anfrage.",
    },
    "woven-security-badge-patch": {
      name: "Gewebter Sicherheitsabzeichen-Patch",
      subcategory: "Gewebte Abzeichen",
      material: "Gewebter Textil / Klettverschluss",
      detail:
        "Gewebtes Sicherheitsabzeichen-Konzept für Arm- oder Brustbefestigung. Endgültiger Text, Maße und Befestigung werden für jede Anfrage bestätigt. Es werden keine offiziellen Behördeninsignien geliefert.",
    },
    "embroidered-security-badge": {
      name: "Besticktes Sicherheitsabzeichen",
      subcategory: "Bestickte Abzeichen",
      material: "Besticktes Textil / Klettverschluss",
      detail:
        "Besticktes Abzeichen-Konzept zur Uniformkennzeichnung. Teilen Sie Ihren freigegebenen Text, Farben und Befestigungsposition mit; es sind keine offiziellen Insignien enthalten.",
    },
    "retractable-id-badge-reel": {
      name: "Einziehbarer Ausweisroller",
      subcategory: "Ausweisroller",
      material: "ABS-Gehäuse / Nylonschnur",
      detail:
        "Einziehbares Ausweisroller-Konzept für einen Ausweis oder Zugangsbadge. Bestätigen Sie Clip-Typ, Schnurlänge und Kartengewicht in Ihrer Anfrage.",
    },
    "belt-mounted-tactical-phone-holder": {
      name: "Taktischer Telefonhalter für den Gürtel",
      subcategory: "Gürtel-Telefonhalter",
      material: "Gewebtes Nylon / Klettverschluss",
      detail:
        "Gürtelmontiertes Telefonhalter-Konzept mit Schutzklappe. Teilen Sie Gerätemaße und bevorzugte Gürtelbreite für eine passende Montage mit.",
    },
    "molle-tactical-phone-pouch": {
      name: "Taktische MOLLE-Telefontasche",
      subcategory: "MOLLE-Taschen",
      material: "Gewebtes Nylon / MOLLE-Gurte",
      detail:
        "MOLLE-kompatibles Telefontaschen-Konzept für Gürtel- oder Westenmontage. Gerätepassform, Halt und Befestigungsaufteilung werden individuell bestätigt.",
    },
    "universal-utility-duty-pouch": {
      name: "Universelle Dienst-Utensilientasche",
      subcategory: "Utensilientaschen",
      material: "Gewebtes Nylon",
      detail:
        "Allgemeines Diensttaschen-Konzept für kleine Ausrüstung. Inhalt, Maße und Montagewünsche werden per Anfrage vereinbart.",
    },
  },
  fr: {
    "private-security-short-sleeve-polo": {
      name: "Polo sécurité privée à manches courtes",
      subcategory: "Polos manches courtes",
      material: "Piqué polyester / coton",
      detail:
        "Concept de polo à manches courtes avec une petite zone d’identification poitrine. Discutez des marquages poitrine et dos pour votre équipe.",
    },
    "private-security-long-sleeve-polo": {
      name: "Polo sécurité privée à manches longues",
      subcategory: "Polos manches longues",
      material: "Piqué polyester / coton",
      detail:
        "Concept de polo à manches longues pour un uniforme de sécurité privée coordonné. Renseignez-vous sur les marquages d’entreprise et de fonction.",
    },
    "white-pilot-uniform-shirt": {
      name: "Chemise d’uniforme pilote blanche",
      subcategory: "Chemises d’uniforme",
      material: "Popeline polyester / coton",
      detail:
        "Concept de chemise d’uniforme blanche à manches courtes avec pattes d’épaule unies. Un bon point de départ pour les demandes d’uniformes d’accueil et formels.",
    },
    "private-security-softshell-jacket": {
      name: "Veste softshell sécurité privée",
      subcategory: "Vestes softshell",
      material: "Textile softshell polyester",
      detail:
        "Concept de veste softshell noire à zip intégral, avec un espace pour l’identification de sécurité privée et le marquage de l’entreprise.",
    },
    "private-security-windbreaker": {
      name: "Coupe-vent sécurité privée",
      subcategory: "Coupe-vents",
      material: "Textile extérieur polyester",
      detail:
        "Concept de veste légère à zip. Partagez la doublure souhaitée, l’emplacement de l’identification et la répartition des tailles.",
    },
    "hooded-security-service-parka": {
      name: "Parka de service sécurité avec capuche",
      subcategory: "Parkas",
      material: "Textile extérieur polyester",
      detail:
        "Concept de parka de service avec capuche pour l’approvisionnement d’uniformes. La doublure, la spécification du tissu et les options de marquage doivent être confirmées.",
    },
    "padded-sleeveless-security-gilet": {
      name: "Gilet de sécurité sans manches matelassé",
      subcategory: "Gilets sans manches",
      material: "Enveloppe polyester / rembourrage synthétique",
      detail:
        "Concept de vêtement sans manches matelassé ordinaire avec zip frontal. Il s’agit d’une couche d’uniforme ; aucune performance de protection ou de blindage n’est revendiquée.",
    },
    "black-security-service-cargo-trousers": {
      name: "Pantalon cargo de service noir",
      subcategory: "Pantalons de service",
      material: "Twill polyester / coton",
      detail:
        "Concept de pantalon de service noir avec poches latérales. Confirmez la disposition des poches, la coupe et les mesures dans votre demande.",
    },
    "private-security-uniform-trousers": {
      name: "Pantalon d’uniforme sécurité privée",
      subcategory: "Pantalons d’uniforme",
      material: "Twill polyester / coton",
      detail:
        "Concept de demande de pantalon d’uniforme. L’image de collection illustre un pantalon de service ; la coupe finale et la disposition des poches doivent être convenues.",
    },
    "securite-privee-identification-armband": {
      name: "Brassard d’identification Sécurité Privée",
      subcategory: "Brassards de sécurité",
      material: "Polyester / sangle élastique",
      detail:
        "Concept de brassard orange pour la sécurité privée avec sangle réglable et zone de marquage de fonction. Le texte final et les dimensions dépendent des exigences de l’acheteur.",
    },
    "securite-privee-chest-back-strip-set": {
      name: "Ensemble de bandeaux poitrine et dos Sécurité Privée",
      subcategory: "Bandeaux poitrine et dos",
      material: "Textile tissé / support auto-agrippant",
      detail:
        "Deux concepts de bandeaux d’identification de tailles différentes pour les positions poitrine et dos. Le texte, les caractères et la fixation sont confirmés individuellement.",
    },
    "private-security-name-tape": {
      name: "Bande patronymique sécurité",
      subcategory: "Bandes patronymiques",
      material: "Textile brodé",
      detail:
        "Concept de bande patronymique. L’image utilise le mot d’exemple NAME ; votre texte approuvé et vos préférences de fixation doivent être fournis.",
    },
    "numeric-identification-strip-holder": {
      name: "Support de bandeau d’identification numérique",
      subcategory: "Supports d’identifiant",
      material: "Textile tissé / support auto-agrippant",
      detail:
        "Concept de support d’identifiant vierge pour un bandeau numérique fourni par l’acheteur. Aucun identifiant officiel n’est fourni et aucune conformité réglementaire n’est affirmée.",
    },
    "rigid-pvc-professional-badge-holder": {
      name: "Porte-badge professionnel en PVC rigide",
      subcategory: "Porte-badges PVC",
      material: "PVC rigide / cordon textile",
      detail:
        "Concept de porte-carte rigide transparent pour une carte d’identité professionnelle. Les dimensions, l’orientation et la fixation doivent être précisées.",
    },
    "neck-lanyard-id-card-holder": {
      name: "Cordon de cou avec porte-carte",
      subcategory: "Cordons et porte-cartes",
      material: "Cordon polyester / porte-carte PVC",
      detail:
        "Concept de cordon de cou avec porte-carte. Discutez de l’impression du cordon, des préférences de fixation et des dimensions de votre carte.",
    },
    "leather-professional-id-wallet": {
      name: "Portefeuille d’identification professionnel en cuir",
      subcategory: "Portefeuilles d’identification",
      material: "Cuir / fenêtres transparentes",
      detail:
        "Concept de portefeuille d’identification noir à deux volets avec deux fenêtres à carte. Aucune insigne d’agence ni badge officiel n’est inclus.",
    },
    "adjustable-black-security-duty-belt": {
      name: "Ceinture de service noire réglable",
      subcategory: "Ceintures de service",
      material: "Nylon tissé / boucle polymère",
      detail:
        "Concept de ceinture de service noire unie avec boucle réglable. Précisez la largeur souhaitée et la plage de tour de taille dans votre demande.",
    },
    "belt-mounted-radio-holder": {
      name: "Porte-radio de ceinture",
      subcategory: "Porte-radios",
      material: "Nylon tissé",
      detail:
        "Concept de porte-radio de ceinture vide. Partagez les dimensions de l’appareil et les détails de rétention souhaités ; aucune radio n’est incluse.",
    },
    "belt-glove-keeper": {
      name: "Porte-gants de ceinture",
      subcategory: "Porte-gants",
      material: "Nylon tissé / clip polymère",
      detail:
        "Concept compact de porte-gants noir avec sangle de ceinture et clip. Confirmez la largeur de sangle, la fixation et la compatibilité avec les gants.",
    },
    "securite-privee-uniform-cap": {
      name: "Casquette d’uniforme Sécurité Privée",
      subcategory: "Casquettes de sécurité",
      material: "Twill de coton",
      detail:
        "Concept de casquette noire avec marquage frontal de sécurité privée. L’identification de l’entreprise et les détails de réglage peuvent être discutés.",
    },
    "black-security-uniform-beanie": {
      name: "Bonnet de service noir",
      subcategory: "Bonnets d’uniforme",
      material: "Tricot acrylique",
      detail:
        "Concept de bonnet tricoté noir uni pour une sélection d’uniforme coordonnée. Discutez de la coupe souhaitée et de l’emplacement du marquage.",
    },
    "black-security-uniform-gloves": {
      name: "Gants d’uniforme de sécurité noirs",
      subcategory: "Gants d’uniforme",
      material: "Textile synthétique",
      detail:
        "Concept de gant d’uniforme noir uni à doigts complets. Aucune résistance à la coupure, protection contre les chocs ou certification de sécurité n’est revendiquée.",
    },
    "black-lace-up-security-duty-boots": {
      name: "Bottes de service noires à lacets",
      subcategory: "Bottes de service",
      material: "Dessus cuir / textile",
      detail:
        "Concept de botte de service noire à lacets. La construction de la semelle, les matériaux et la coupe doivent être confirmés ; aucune protection certifiée n’est revendiquée.",
    },
    "black-formal-uniform-shoes": {
      name: "Chaussures de ville noires pour uniforme",
      subcategory: "Chaussures de ville",
      material: "Dessus en cuir",
      detail:
        "Concept de chaussure noire basse à lacets pour uniformes formels de sécurité privée. Confirmez la finition, la coupe et les matériaux finaux dans votre demande.",
    },
    "woven-security-badge-patch": {
      name: "Patch d’écusson de sécurité tissé",
      subcategory: "Écussons tissés",
      material: "Textile tissé / support auto-agrippant",
      detail:
        "Concept d’écusson de sécurité tissé pour fixation au bras ou à la poitrine. Le texte, les dimensions et la fixation finaux sont confirmés pour chaque demande. Aucune insigne d’agence officielle n’est fournie.",
    },
    "embroidered-security-badge": {
      name: "Écusson de sécurité brodé",
      subcategory: "Écussons brodés",
      material: "Textile brodé / support auto-agrippant",
      detail:
        "Concept d’écusson brodé pour l’identification de l’uniforme. Partagez votre texte approuvé, vos couleurs et la position de fixation ; aucune insigne officielle n’est incluse.",
    },
    "retractable-id-badge-reel": {
      name: "Enrouleur de badge rétractable",
      subcategory: "Enrouleurs de badge",
      material: "Boîtier ABS / cordon nylon",
      detail:
        "Concept d’enrouleur de badge rétractable pour une carte d’identité ou un badge d’accès. Confirmez le type de clip, la longueur du cordon et le poids de la carte dans votre demande.",
    },
    "belt-mounted-tactical-phone-holder": {
      name: "Porte-téléphone tactique de ceinture",
      subcategory: "Porte-téléphones de ceinture",
      material: "Nylon tissé / auto-agrippant",
      detail:
        "Concept de porte-téléphone monté sur ceinture avec rabat de protection. Partagez les dimensions de votre appareil et la largeur de ceinture souhaitée pour un ajustement adapté.",
    },
    "molle-tactical-phone-pouch": {
      name: "Pochette téléphone tactique MOLLE",
      subcategory: "Pochettes MOLLE",
      material: "Nylon tissé / sangles MOLLE",
      detail:
        "Concept de pochette téléphone compatible MOLLE pour montage sur ceinture ou gilet. L’ajustement de l’appareil, la rétention et la disposition de fixation sont confirmés individuellement.",
    },
    "universal-utility-duty-pouch": {
      name: "Pochette utilitaire de service universelle",
      subcategory: "Pochettes utilitaires",
      material: "Nylon tissé",
      detail:
        "Concept de pochette de service polyvalente pour petits équipements. Le contenu, les dimensions et les préférences de montage sont convenus sur demande.",
    },
  },
};

const colourName = (locale: Locale, colour: string) => {
  if (locale === "en") return colour;
  const names = dictionaries[locale].product.colourNames as Record<string, string>;
  return names[colour] ?? colour;
};

const sizeName = (locale: Locale, size: string) => {
  if (locale === "en") return size;
  if (size === "One size") return dictionaries[locale].product.oneSize;
  if (size === "Adjustable") return dictionaries[locale].product.adjustable;
  return size;
};

export const localizedCategory = (
  category: Category,
  locale: Locale,
): Category => {
  if (locale === "en") return category;
  const text = categoryTranslations[locale][category.slug];
  if (!text) return category;
  return { ...category, ...text };
};

export const localizedProduct = (product: Product, locale: Locale): Product => {
  if (locale === "en") return product;
  const text = productTranslations[locale][product.slug];
  if (!text) return product;
  const t = dictionaries[locale];
  return {
    ...product,
    name: text.name,
    subcategory: text.subcategory,
    material: text.material,
    colours: product.colours.map((colour) => colourName(locale, colour)),
    sizes: product.sizes.map((size) => sizeName(locale, size)),
    description: `${text.detail} ${t.product.descriptionSuffix}`,
    specs: {
      [t.product.specLabels.frenchTerm]: product.frenchName,
      [t.product.specLabels.material]: text.material,
      [t.product.specLabels.colours]: product.colours
        .map((colour) => colourName(locale, colour))
        .join(", "),
      [t.product.specLabels.marking]: t.product.specLabels.markingValue,
      [t.product.specLabels.orderRoute]: t.product.specLabels.orderRouteValue,
    },
  };
};

export const localizeCategories = (categories: Category[], locale: Locale) =>
  categories.map((category) => localizedCategory(category, locale));

export const localizeProducts = (products: Product[], locale: Locale) =>
  products.map((product) => localizedProduct(product, locale));

/**
 * Quote lines are stored with canonical (English) variant values so the basket
 * survives a language switch. These helpers translate in both directions.
 */
export const canonicalColour = (locale: Locale, value: string) => {
  if (locale === "en") return value;
  const names = dictionaries[locale].product.colourNames as Record<string, string>;
  const found = Object.entries(names).find(
    ([, translated]) => translated.toLowerCase() === value.toLowerCase(),
  );
  return found?.[0] ?? value;
};

export const canonicalSize = (locale: Locale, value: string) => {
  if (locale === "en") return value;
  const t = dictionaries[locale].product;
  if (value.toLowerCase() === t.oneSize.toLowerCase()) return "One size";
  if (value.toLowerCase() === t.adjustable.toLowerCase()) return "Adjustable";
  return value;
};

export const displayColour = (locale: Locale, value: string) =>
  colourName(locale, canonicalColour(locale, value));

export const displaySize = (locale: Locale, value: string) =>
  sizeName(locale, canonicalSize(locale, value));
