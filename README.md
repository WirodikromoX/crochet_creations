# Probleemanalyse

## 1. Beschrijving van het probleem

Voor mijn project ontwikkel ik een intern dashboard voor mijn haakbedrijf (Crochet Creations). Als solo-ondernemer beheer ik zelf alle bestellingen, materialen en klanten. Naarmate het aantal bestellingen groeit, wordt het steeds moeilijker om handmatig te bepalen welke bestelling als eerste gemaakt moet worden en welke producten dezelfde materialen gebruiken.

Het dashboard helpt bij het organiseren van deze informatie door bestellingen automatisch te sorteren op prioriteit en winstgevendheid. Daarnaast analyseert het systeem welke producten dezelfde wolsoorten gebruiken, zodat meerdere producten achter elkaar kunnen worden gemaakt zonder onnodig van materiaal te wisselen.

Hierdoor wordt de productie efficiënter, wordt tijd bespaard en wordt materiaalverspilling verminderd.

---

## 2. Waarom is dit een relevant praktijkprobleem?

Kleine ondernemingen beschikken vaak niet over uitgebreide productie- of planningssoftware. Veel beslissingen worden handmatig genomen, wat tijd kost en de kans op fouten vergroot.

Binnen een haakbedrijf kunnen meerdere producten dezelfde materialen gebruiken. Wanneer de productie niet goed wordt gepland, moet er regelmatig van wolsoort of kleur worden gewisseld. Daarnaast kan het lastig zijn om snel een specifieke bestelling terug te vinden wanneer het aantal orders groeit.

Door een dashboard te ontwikkelen dat gebruikmaakt van geschikte data structures en algoritmen kan het productieproces efficiënter worden georganiseerd. Dit leidt tot een betere planning, snellere verwerking van bestellingen en een overzichtelijk beheer van materialen.

---

## 3. Input van het systeem

Het systeem verwerkt de volgende gegevens:

* Openstaande bestellingen
* Klantgegevens
* Productinformatie
* Benodigde materialen per product
* Prioriteit van een bestelling
* Verwachte winst per bestelling

---

## 4. Gewenste output van het systeem

Het dashboard geeft de gebruiker de volgende informatie:

* Een overzicht van alle openstaande bestellingen
* Een automatisch gesorteerde lijst van bestellingen op basis van prioriteit en winstgevendheid
* Zoekresultaten voor een specifieke bestelling
* Een overzicht van de materialen die een geselecteerd product nodig heeft
* Een analyse van producten die dezelfde materialen gebruiken
* Een efficiëntere productieplanning waardoor minder tijd verloren gaat aan materiaalwissels

---

# Data Structures

## 1. Array

### Waarom gekozen?

Een Array is geschikt voor het opslaan van verzamelingen gegevens zoals bestellingen, klanten en producten. Arrays zijn eenvoudig te beheren, weer te geven in tabellen en vormen de basis voor zoek- en sorteeralgoritmen.

### Gebruik in het project

De Array wordt gebruikt voor:

* Het opslaan van alle bestellingen.
* Het opslaan van producten.
* Het weergeven van gegevens in het dashboard.
* Het sorteren van bestellingen op prioriteit.
* Het zoeken naar een specifieke bestelling.

---

## 2. Graph

### Waarom gekozen?

Een Graph is geschikt voor het weergeven van relaties tussen producten en materialen. Eén product kan meerdere materialen gebruiken en één materiaal kan door meerdere producten worden gebruikt. Deze many-to-many-relaties kunnen niet efficiënt worden weergegeven met een eenvoudige lijst.

### Gebruik in het project

De Graph wordt gebruikt voor:

* Het koppelen van producten aan materialen.
* Het analyseren van welke producten dezelfde wol gebruiken.
* Het uitvoeren van een Breadth-First Search (BFS) om alle verbonden materialen of producten te vinden.
* Het ondersteunen van de materiaalanalyse binnen het dashboard.

---

# Algoritmen

## 1. Merge Sort (Sorting)

### Hoe werkt het?

Merge Sort verdeelt een lijst steeds in kleinere delen totdat elk deel uit één element bestaat. Vervolgens worden deze delen weer samengevoegd in de juiste volgorde. Hierdoor ontstaat een volledig gesorteerde lijst.

### Waarom geschikt?

Binnen het dashboard wordt Merge Sort gebruikt om openstaande bestellingen automatisch te sorteren op prioriteit of winstgevendheid. Hierdoor ziet de gebruiker direct welke bestelling het belangrijkst is om als eerste uit te voeren.

---

## 2. Binary Search (Searching)

### Hoe werkt het?

Binary Search zoekt in een gesorteerde lijst. Het algoritme vergelijkt het gezochte element met het middelste element van de lijst. Afhankelijk van de vergelijking wordt alleen de linker- of rechterhelft verder doorzocht. Hierdoor wordt de zoekruimte telkens gehalveerd.

### Waarom geschikt?

Nadat de bestellingen zijn gesorteerd, kan Binary Search worden gebruikt om een specifieke bestelling snel terug te vinden op basis van bijvoorbeeld het ordernummer of product-ID. Dit is veel efficiënter dan alle bestellingen één voor één doorzoeken.

---

## 3. Breadth-First Search (BFS)

### Hoe werkt het?

Breadth-First Search (BFS) doorloopt een Graph niveau voor niveau met behulp van een wachtrij (Queue). Eerst worden alle directe verbindingen bezocht, daarna de verbindingen van die knopen, totdat alle relevante knopen zijn onderzocht.

### Waarom geschikt?

Binnen dit project wordt BFS gebruikt om alle materialen te vinden die bij een geselecteerd product horen of om producten te identificeren die dezelfde materialen gebruiken. Hierdoor krijgt de gebruiker inzicht in materiaalafhankelijkheden en kan de productie slimmer worden gepland.

---

# 4. Implementatie

## a. De webapplicatie moet volledig werkend zijn

De applicatie is ontwikkeld als een **Single Page Application (SPA)**. Hierdoor worden verschillende onderdelen, zoals het dashboard, bestellingen, klanten en materiaalanalyse, dynamisch geladen zonder dat de volledige pagina opnieuw hoeft te worden geladen.

De applicatie bevat de volgende functionaliteiten:

* Dashboard met een overzicht van belangrijke informatie.
* Beheer van bestellingen.
* Beheer van producten.
* Materiaalanalyse van producten.
* Zoeken naar een bestelling met Binary Search.
* Sorteren van bestellingen op prioriteit met Merge Sort.
* Analyseren van materiaalrelaties met behulp van een Graph en Breadth-First Search (BFS).

---

## b. Code moet gestructureerd en leesbaar zijn

De code is modulair opgebouwd volgens een duidelijke mappenstructuur. Iedere functionaliteit heeft een eigen bestand, waardoor de code overzichtelijk en eenvoudig te onderhouden is.

### Projectstructuur

```text
css/
    style.css

js/
    app.js
    router.js
    binarysearch.js
    mergesort.js
    bfs.js
    graph.js

    data/
        sample-data.js

    views/
        dashboard.js
        orders.js
        products.js
        materials.js
```

Deze structuur zorgt ervoor dat de presentatie, data en algoritmen van elkaar gescheiden blijven.

---

## c. Gebruik functies of classes waar nodig

Binnen het project worden functies gebruikt om de verschillende onderdelen van de applicatie uit te voeren.

Voorbeelden hiervan zijn:

* `renderDashboard()`
* `renderOrders()`
* `renderProducts()`
* `renderMaterials()`
* `binarySearch()`
* `mergeSort()`
* `bfs()`

Iedere functie heeft één duidelijke verantwoordelijkheid. Hierdoor blijft de code eenvoudig te begrijpen en kunnen onderdelen gemakkelijk worden aangepast of uitgebreid.

---

## d. Vermijd overbodige complexiteit

Tijdens de ontwikkeling is gekozen voor eenvoudige en efficiënte oplossingen.

Voorbeelden hiervan zijn:

* Arrays worden gebruikt voor het opslaan van gegevens.
* Een Graph wordt uitsluitend gebruikt voor de relaties tussen producten en materialen.
* Algoritmen worden alleen toegepast waar zij daadwerkelijk een voordeel bieden.
* De applicatie bevat geen onnodige berekeningen of ingewikkelde datastructuren.

Hierdoor blijft de applicatie overzichtelijk, onderhoudbaar en efficiënt.

---

# 5. Efficiëntie (Big-O)

## a. Analyse van de tijdcomplexiteit

| Functie                    | Algoritme / Data Structure | Big-O      | Toelichting                                                              |
| -------------------------- | -------------------------- | ---------- | ------------------------------------------------------------------------ |
| Weergeven van bestellingen | Array                      | O(n)       | Alle bestellingen worden één keer doorlopen om ze weer te geven.         |
| mergeSort()                | Merge Sort                 | O(n log n) | Verdeelt de lijst en voegt deze efficiënt samen in gesorteerde volgorde. |
| binarySearch()             | Binary Search              | O(log n)   | Zoekt in een gesorteerde lijst door de zoekruimte steeds te halveren.    |
| bfs()                      | Breadth-First Search       | O(V + E)   | Bezoekt iedere knoop (Vertex) en verbinding (Edge) maximaal één keer.    |
| Router                     | Hash Router                | O(1)       | Het juiste scherm wordt direct opgehaald op basis van de hashroute.      |

---

## b. Mogelijke optimalisaties

Hoewel de applicatie goed presteert voor een kleine onderneming, zijn er verschillende uitbreidingen mogelijk wanneer de hoeveelheid gegevens groeit.

Mogelijke optimalisaties zijn:

* Bestellingen slechts opnieuw sorteren wanneer nieuwe gegevens worden toegevoegd.
* Zoekresultaten tijdelijk opslaan (caching) zodat veelgebruikte zoekopdrachten sneller worden uitgevoerd.
* Gegevens uit een database laden in plaats van uit voorbeelddata.
* De Graph automatisch genereren op basis van opgeslagen product- en materiaalinformatie.
* Paginering toevoegen wanneer het aantal bestellingen sterk toeneemt.

Door deze optimalisaties blijft de applicatie ook bij grotere datasets efficiënt en goed schaalbaar.

