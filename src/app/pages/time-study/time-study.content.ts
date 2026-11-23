// Page copy for /time-study (EN + NL).
// Rules: only claim what the product does (source: the Time Study user manual).
// Never name or show licensed standards or their code tables.

export interface TsShot { src: string; w: number; h: number; alt: string; caption: string; }
export interface TsFeature { id: string; icon: string; tag: string; title: string; text: string; points: string[]; shot: TsShot; }

const img = (src: string, w: number, h: number) => ({ src: `/time-study/${src}.webp`, w, h });

const SHOTS = {
  chart: img('station-balance-chart', 960, 675),
  element: img('element-editor', 1400, 412),
  cost: img('cost-price-per-unit', 1400, 1086),
  gantt: img('gantt-operators', 1400, 594),
  workforms: img('workform-comparison', 1400, 797),
  layout: img('layout-3d-factory', 1400, 912),
  operator: img('operator-screen', 900, 900)
};

const en = {
  tag: 'Time study & line balancing software',
  title1: 'From stopwatch to',
  title2: 'standard cost,',
  title3: 'in one workbench.',
  desc: 'Time Study turns the work on your line into one dataset. From it you get the takt time, the balance loss per station, the cost price per unit and the work instructions for the operator. Change one activity and everything updates.',
  cta1: 'Book a Demo',
  cta2: 'Watch the 2-minute film',
  hero_alt: 'Station balance chart in Time Study: bars per workstation against the takt line',
  hero_caption: 'Station balance: every station against the takt line.',
  facts: [
    { value: '3', label: 'steps: database, element, study' },
    { value: '1', label: 'dataset for time, cost and instructions' },
    { value: '2D + 3D', label: 'floor layout with walking routes' }
  ],
  video_tag: 'A P41 story',
  video_title: 'Where do the seconds go?',
  video_desc: '48,000 bike lights, 20 working days, seven people. Watch how a time study and a balanced line take the takt time from 11.3 to 7.2 seconds, with the same people and the same tasks.',
  video_note: 'English voice-over with Dutch subtitles. Illustrative simulation of a fictional line; the figures come from a demo study in the software.',
  how_tag: 'How it works',
  how_title1: 'Three parts that',
  how_title2: 'build on each other.',
  how_desc: 'You fill them in this order. Each part reuses what you entered in the one before, so nothing is typed twice.',
  steps: [
    { n: '01', icon: 'database', title: 'Database', text: 'Your master data: predetermined time codes, rates, word lists, customers, business units and users.' },
    { n: '02', icon: 'build', title: 'Elements', text: 'One action, for example "screw down circuit board with 2 screws". You build it from codes, and the time follows from them. You do not type a time.' },
    { n: '03', icon: 'bar_chart', title: 'Balance & cost study', text: 'Elements spread over workstations, with takt time, balance loss, cost price and work instructions.' }
  ],
  element_shot_alt: 'Element editor in Time Study: subject, verb and object build the element name',
  element_shot_caption: 'An element is named from fixed words (subject, verb, object), so the same action has the same name everywhere.',
  features_tag: 'What you get',
  features_title1: 'Everything a line study needs,',
  features_title2: 'in one place.',
  features: [
    {
      id: 'balance', icon: 'bar_chart', tag: 'Line balancing',
      title: 'See at once whether your line is balanced',
      text: 'Each bar is one workstation, the dashed line is the takt time. As soon as you move an activity to another station, the chart, the results and the cost are recalculated.',
      points: ['Colour per station: green below 20 % loss, orange 20 to 30 %, red above 30 %', 'Several operators on one station each get their own bar', 'Logistics and parallel stations are shown but kept out of takt and balance loss'],
      shot: { ...SHOTS.chart, alt: 'Station balance chart with takt line and balance loss per station', caption: 'Demo line: takt 7.18 s, balance loss per station.' }
    },
    {
      id: 'cost', icon: 'payments', tag: 'Cost price',
      title: 'From time to cost price and selling price per unit',
      text: 'Personnel, machines and materials come from the same study. Personnel cost is split into productive time and paid idle time from balance loss, so the cost matches the norm time.',
      points: ['Rest and personal allowance per activity, scored on physical load, mental load and environment', 'Overhead and margin on top of the direct cost', 'Compare the study with another balance before you decide'],
      shot: { ...SHOTS.cost, alt: 'Cost price per unit: personnel, machines, materials, overhead, margin and selling price', caption: 'Demo line: direct cost €0.98, selling price €1.18 per unit.' }
    },
    {
      id: 'gantt', icon: 'view_timeline', tag: 'Gantt',
      title: 'Who does what, and in which order',
      text: 'Every row is an operator, time runs from left to right and every bar is an activity. You see waiting time and the critical path that sets the station time, and you can drag a bar to another operator.',
      points: ['Waiting for another activity is shown as a hatched bar', 'The critical path is marked in red', 'Drag to reorder within a lane or move work to another operator'],
      shot: { ...SHOTS.gantt, alt: 'Gantt view of one workstation with two operators, waiting time and critical path', caption: 'Station 6 with two operators: the bottleneck stays under takt.' }
    },
    {
      id: 'workforms', icon: 'compare_arrows', tag: 'Workforms',
      title: 'Organise the same line in different ways',
      text: 'The work does not change, only who does what and when. Time Study calculates the line for each workform side by side, so you can compare output, people and idle capacity before you change anything on the floor.',
      points: ['Continuous, dephased and bucket brigade next to the current activities', 'Parts per day, cycle time, people and utilisation per workform', 'Variants with their own occurrence for a real production mix'],
      shot: { ...SHOTS.workforms, alt: 'Workform comparison: parts per day, cycle, people and utilisation for each way of working', caption: 'Demo line: 3,027 parts per day today, 4,234 with a continuous workform and 10 people instead of 9.' }
    },
    {
      id: 'layout', icon: 'view_in_ar', tag: 'Layout',
      title: 'Draw the line on the floor, in 2D and 3D',
      text: 'Stations, machines and materials come from the study. You drag them into place and see the walking routes and walking time at once. Changes in the study update both views.',
      points: ['2D floor plan and 3D factory view', 'Routes for operators and material between stations', 'Place stations in rows or a U-shape in one click'],
      shot: { ...SHOTS.layout, alt: '3D factory layout of the demo line with stations, operators and walking routes', caption: 'The demo line in the 3D factory view.' }
    },
    {
      id: 'instructions', icon: 'fact_check', tag: 'Work instructions',
      title: 'The study becomes the work instruction',
      text: 'Each station becomes a page with the steps in order, with room for photos and video. The operator follows it on a tablet or screen at the line and marks each step as done.',
      points: ['Safety, learning points and quality notes per step', 'Open a station by QR code on the shop floor', 'Export the instructions as a PDF'],
      shot: { ...SHOTS.operator, alt: 'Operator screen with the steps for one workstation and safety and quality notes', caption: 'Operator screen for one workstation.' }
    }
  ] as TsFeature[],
  more_title: 'And more',
  more: [
    { icon: 'tune', title: 'Sensitivity analysis', text: 'See what happens when the order or an element changes, without touching the study.' },
    { icon: 'groups', title: 'People & organisation losses', text: 'How many people to employ for leave, sickness and training, on top of the people the line needs every day.' },
    { icon: 'call_split', title: 'Variants & products', text: 'Record which products and options exist and how often they occur within the total volume.' },
    { icon: 'insights', title: 'Insights & plan', text: 'The same figures shown another way, grouped by high-level verbs.' },
    { icon: 'difference', title: 'Compare studies', text: 'Put two balance studies side by side before you roll out a change.' },
    { icon: 'admin_panel_settings', title: 'Users & roles', text: 'Engineers, sales, production and operators each see what they need.' }
  ],
  example_tag: 'Worked example',
  example_title: 'One demo line, start to finish',
  example_desc: 'The screenshots on this page come from a demo study. The company, customer, people and amounts are fictional.',
  example_facts: [
    { value: '48,000', label: 'LED bike lamps in 20 working days' },
    { value: '8', label: 'workstations (7 in the line, 1 logistics)' },
    { value: '7.18 s', label: 'takt time' },
    { value: '22.2 %', label: 'balance loss' },
    { value: '€1.18', label: 'selling price per unit' }
  ],
  faq_tag: 'FAQ',
  faq_title: 'Questions about time study and line balancing',
  faq: [
    { q: 'What is a time study?', a: 'A time study measures or builds up how long a task takes. In Time Study you build each action (an element) from predetermined time codes, so the time follows from the method instead of from a stopwatch reading.' },
    { q: 'What is takt time?', a: 'Takt time is the time available per unit to meet the order: the available production time divided by the number of units needed. In the demo line, 48,000 units in 20 working days give a takt time of 7.18 seconds.' },
    { q: 'What is balance loss?', a: 'Balance loss is the idle time on a line because stations do not all need the same time. Time Study shows it per station and for the whole line, and colours stations green (below 20 %), orange (20 to 30 %) or red (above 30 %).' },
    { q: 'How does Time Study calculate the cost price?', a: 'It adds personnel, machine and material cost per unit from the balanced line, including rest and personal allowance and paid idle time, then adds overhead and margin to get a selling price.' },
    { q: 'Can operators use it on the shop floor?', a: 'Yes. Each workstation becomes a work instruction that the operator follows on a tablet or screen, opened by QR code, with safety, learning and quality notes per step.' },
    { q: 'Who is Time Study for?', a: 'Industrial engineers, production managers and sales people who need a defensible time and cost price for assembly and production lines.' }
  ],
  final_cta_title: 'Ready to see your own line balanced?',
  final_cta_desc: "Bring a real work breakdown and we'll show you takt time, balance loss and unit cost on your own line.",
  final_cta_button: 'Book a Demo',
  cross_link_text: 'Looking for field-crew scheduling instead?',
  cross_link_cta: 'Explore TeamPlanner'
};

type TsContent = typeof en;

const nl: TsContent = {
  tag: 'Software voor tijdstudie & lijnbalancering',
  title1: 'Van stopwatch tot',
  title2: 'standaardkost,',
  title3: 'in één workbench.',
  desc: 'Time Study zet het werk op uw lijn in één dataset. Daaruit volgen de takttijd, het balansverlies per station, de kostprijs per eenheid en de werkinstructies voor de operator. Pas één activiteit aan en alles werkt mee.',
  cta1: 'Boek een Demo',
  cta2: 'Bekijk de film van 2 minuten',
  hero_alt: 'Stationsbalans in Time Study: staven per werkstation tegenover de taktlijn',
  hero_caption: 'Stationsbalans: elk station tegenover de taktlijn.',
  facts: [
    { value: '3', label: 'stappen: database, element, studie' },
    { value: '1', label: 'dataset voor tijd, kost en instructies' },
    { value: '2D + 3D', label: 'vloerplan met looproutes' }
  ],
  video_tag: 'Een P41-verhaal',
  video_title: 'Waar gaan de seconden naartoe?',
  video_desc: '48.000 fietslampen, 20 werkdagen, zeven mensen. Zie hoe een tijdstudie en een gebalanceerde lijn de takttijd van 11,3 naar 7,2 seconden brengen, met dezelfde mensen en dezelfde taken.',
  video_note: 'Engelse voice-over met Nederlandse ondertitels. Illustratieve simulatie van een fictieve lijn; de cijfers komen uit een demostudie in de software.',
  how_tag: 'Hoe het werkt',
  how_title1: 'Drie delen die',
  how_title2: 'op elkaar bouwen.',
  how_desc: 'U vult ze in deze volgorde in. Elk deel hergebruikt wat u in het vorige invulde, dus niets wordt twee keer getypt.',
  steps: [
    { n: '01', icon: 'database', title: 'Database', text: 'Uw stamgegevens: vooraf bepaalde tijdcodes, tarieven, woordenlijsten, klanten, bedrijfsunits en gebruikers.' },
    { n: '02', icon: 'build', title: 'Elementen', text: 'Eén handeling, bijvoorbeeld "printplaat vastschroeven met 2 schroeven". U bouwt ze op uit codes en de tijd volgt daaruit. U typt geen tijd.' },
    { n: '03', icon: 'bar_chart', title: 'Balans- & kostenstudie', text: 'Elementen verdeeld over werkstations, met takttijd, balansverlies, kostprijs en werkinstructies.' }
  ],
  element_shot_alt: 'Elementeditor in Time Study: subject, werkwoord en object vormen de naam van het element',
  element_shot_caption: 'Een element krijgt zijn naam uit vaste woorden (subject, werkwoord, object), zodat dezelfde handeling overal dezelfde naam heeft.',
  features_tag: 'Wat u krijgt',
  features_title1: 'Alles wat een lijnstudie nodig heeft,',
  features_title2: 'op één plek.',
  features: [
    {
      id: 'balance', icon: 'bar_chart', tag: 'Lijnbalancering',
      title: 'Zie meteen of uw lijn in balans is',
      text: 'Elke staaf is één werkstation, de stippellijn is de takttijd. Zodra u een activiteit naar een ander station verplaatst, worden grafiek, resultaten en kost opnieuw berekend.',
      points: ['Kleur per station: groen onder 20 % verlies, oranje 20 tot 30 %, rood boven 30 %', 'Meerdere operatoren op één station krijgen elk hun eigen staaf', 'Logistieke en parallelle stations worden getoond maar tellen niet mee voor takt en balansverlies'],
      shot: { ...SHOTS.chart, alt: 'Stationsbalans met taktlijn en balansverlies per station', caption: 'Demolijn: takt 7,18 s, balansverlies per station.' }
    },
    {
      id: 'cost', icon: 'payments', tag: 'Kostprijs',
      title: 'Van tijd naar kostprijs en verkoopprijs per eenheid',
      text: 'Personeel, machines en materialen komen uit dezelfde studie. De personeelskost wordt gesplitst in productieve tijd en betaalde wachttijd door balansverlies, zodat de kost aansluit op de normtijd.',
      points: ['Rust- en persoonlijke toeslag per activiteit, gescoord op fysieke belasting, mentale belasting en omgeving', 'Overhead en marge bovenop de directe kost', 'Vergelijk de studie met een andere balans voor u beslist'],
      shot: { ...SHOTS.cost, alt: 'Kostprijs per eenheid: personeel, machines, materialen, overhead, marge en verkoopprijs', caption: 'Demolijn: directe kost € 0,98, verkoopprijs € 1,18 per eenheid.' }
    },
    {
      id: 'gantt', icon: 'view_timeline', tag: 'Gantt',
      title: 'Wie doet wat, en in welke volgorde',
      text: 'Elke rij is een operator, de tijd loopt van links naar rechts en elke balk is een activiteit. U ziet wachttijd en het kritieke pad dat de stationstijd bepaalt, en u sleept een balk naar een andere operator.',
      points: ['Wachten op een andere activiteit verschijnt als gearceerde balk', 'Het kritieke pad is rood gemarkeerd', 'Sleep om de volgorde te wijzigen of werk naar een andere operator te verplaatsen'],
      shot: { ...SHOTS.gantt, alt: 'Gantt van één werkstation met twee operatoren, wachttijd en kritiek pad', caption: 'Station 6 met twee operatoren: het knelpunt blijft onder de takt.' }
    },
    {
      id: 'workforms', icon: 'compare_arrows', tag: 'Werkvormen',
      title: 'Organiseer dezelfde lijn op verschillende manieren',
      text: 'Het werk verandert niet, alleen wie wat doet en wanneer. Time Study berekent de lijn voor elke werkvorm naast elkaar, zodat u output, mensen en onbenutte capaciteit vergelijkt voor u iets verandert op de vloer.',
      points: ['Continu, gefaseerd en bucket brigade naast de huidige activiteiten', 'Stuks per dag, cyclustijd, mensen en bezetting per werkvorm', 'Varianten met hun eigen voorkomen voor een echte productiemix'],
      shot: { ...SHOTS.workforms, alt: 'Vergelijking van werkvormen: stuks per dag, cyclus, mensen en bezetting', caption: 'Demolijn: 3.027 stuks per dag nu, 4.234 met een continue werkvorm en 10 mensen in plaats van 9.' }
    },
    {
      id: 'layout', icon: 'view_in_ar', tag: 'Layout',
      title: 'Teken de lijn op de vloer, in 2D en 3D',
      text: 'Stations, machines en materialen komen uit de studie. U sleept ze op hun plaats en ziet meteen de looproutes en looptijd. Wijzigingen in de studie werken in beide weergaven door.',
      points: ['2D-plattegrond en 3D-fabrieksweergave', 'Routes voor operatoren en materiaal tussen stations', 'Stations in rijen of in U-vorm plaatsen met één klik'],
      shot: { ...SHOTS.layout, alt: '3D-fabrieksweergave van de demolijn met stations, operatoren en looproutes', caption: 'De demolijn in de 3D-fabrieksweergave.' }
    },
    {
      id: 'instructions', icon: 'fact_check', tag: 'Werkinstructies',
      title: 'De studie wordt de werkinstructie',
      text: 'Elk station wordt een pagina met de stappen in volgorde, met ruimte voor foto\'s en video. De operator volgt ze op een tablet of scherm aan de lijn en vinkt elke stap af.',
      points: ['Veiligheid, leerpunten en kwaliteit per stap', 'Open een station met een QR-code op de werkvloer', 'Exporteer de instructies als PDF'],
      shot: { ...SHOTS.operator, alt: 'Operatorscherm met de stappen van één werkstation en veiligheids- en kwaliteitsnotities', caption: 'Operatorscherm voor één werkstation.' }
    }
  ],
  more_title: 'En meer',
  more: [
    { icon: 'tune', title: 'Sensitiviteitsanalyse', text: 'Zie wat er gebeurt als de order of een element verandert, zonder de studie aan te passen.' },
    { icon: 'groups', title: 'Mensen & organisatieverliezen', text: 'Hoeveel mensen u moet tewerkstellen voor verlof, ziekte en opleiding, bovenop wie de lijn elke dag nodig heeft.' },
    { icon: 'call_split', title: 'Varianten & producten', text: 'Leg vast welke producten en opties er zijn en hoe vaak ze voorkomen binnen het totale volume.' },
    { icon: 'insights', title: 'Inzichten & planning', text: 'Dezelfde cijfers op een andere manier getoond, gegroepeerd per hoog werkwoord.' },
    { icon: 'difference', title: 'Studies vergelijken', text: 'Zet twee balansstudies naast elkaar voor u een wijziging uitrolt.' },
    { icon: 'admin_panel_settings', title: 'Gebruikers & rollen', text: 'Engineers, sales, productie en operatoren zien elk wat ze nodig hebben.' }
  ],
  example_tag: 'Rekenvoorbeeld',
  example_title: 'Eén demolijn, van begin tot einde',
  example_desc: 'De schermafbeeldingen op deze pagina komen uit een demostudie. Bedrijf, klant, personen en bedragen zijn fictief.',
  example_facts: [
    { value: '48.000', label: 'LED-fietslampen in 20 werkdagen' },
    { value: '8', label: 'werkstations (7 in de lijn, 1 logistiek)' },
    { value: '7,18 s', label: 'takttijd' },
    { value: '22,2 %', label: 'balansverlies' },
    { value: '€ 1,18', label: 'verkoopprijs per eenheid' }
  ],
  faq_tag: 'FAQ',
  faq_title: 'Vragen over tijdstudie en lijnbalancering',
  faq: [
    { q: 'Wat is een tijdstudie?', a: 'Een tijdstudie meet of bouwt op hoe lang een taak duurt. In Time Study bouwt u elke handeling (een element) op uit vooraf bepaalde tijdcodes, zodat de tijd volgt uit de methode in plaats van uit een stopwatchmeting.' },
    { q: 'Wat is takttijd?', a: 'Takttijd is de beschikbare tijd per eenheid om de order te halen: de beschikbare productietijd gedeeld door het aantal nodige eenheden. In de demolijn geven 48.000 eenheden in 20 werkdagen een takttijd van 7,18 seconden.' },
    { q: 'Wat is balansverlies?', a: 'Balansverlies is de wachttijd op een lijn omdat niet alle stations even lang nodig hebben. Time Study toont het per station en voor de hele lijn, en kleurt stations groen (onder 20 %), oranje (20 tot 30 %) of rood (boven 30 %).' },
    { q: 'Hoe berekent Time Study de kostprijs?', a: 'Het telt personeels-, machine- en materiaalkost per eenheid op uit de gebalanceerde lijn, inclusief rust- en persoonlijke toeslag en betaalde wachttijd, en voegt overhead en marge toe voor een verkoopprijs.' },
    { q: 'Kunnen operatoren het op de werkvloer gebruiken?', a: 'Ja. Elk werkstation wordt een werkinstructie die de operator volgt op een tablet of scherm, geopend via een QR-code, met veiligheid, leerpunten en kwaliteit per stap.' },
    { q: 'Voor wie is Time Study?', a: 'Voor industrieel ingenieurs, productieverantwoordelijken en verkopers die een verdedigbare tijd en kostprijs nodig hebben voor assemblage- en productielijnen.' }
  ],
  final_cta_title: 'Klaar om uw eigen lijn gebalanceerd te zien?',
  final_cta_desc: 'Breng een echte werkverdeling mee en wij tonen u takttijd, balansverlies en eenheidskost op uw eigen lijn.',
  final_cta_button: 'Boek een Demo',
  cross_link_text: 'Op zoek naar planning voor veldploegen?',
  cross_link_cta: 'Ontdek TeamPlanner'
};

export const TIME_STUDY_CONTENT = { en, nl };
export const TIME_STUDY_SHOTS = SHOTS;
