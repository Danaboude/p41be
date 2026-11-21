// Page copy for /teamplanner (EN + NL, NL in Flemish with informal "je").
// Source of truth: teamplanner-page-handoff/BRIEF.md (claims guardrails §4 and §6).
// Say "warns you", never "prevents all errors" or an absolute "never blocks". No competitor names.
// All screenshots come from the fictional demo tenant "Groenteam Demo".

export interface TpShot { src: string; w: number; h: number; alt: string; }

const img = (name: string, w: number, h: number, alt: string): TpShot => ({ src: `/teamplanner/${name}.webp`, w, h, alt });

const shots = (l: 'en' | 'nl') => {
  const a = (en: string, nl: string) => (l === 'en' ? en : nl);
  return {
    day: img('day-view', 1440, 1420, a('TeamPlanner day view: one lane per team with jobs, crew, vans and a red now-line', 'TeamPlanner dagweergave: één baan per ploeg met jobs, ploeg, busjes en een rode nu-lijn')),
    card: img('job-card', 625, 525, a('One job card with team, customer, task, van, start time, duration and numbered crew', 'Eén jobkaart met ploeg, klant, taak, busje, starttijd, duur en genummerde ploeg')),
    drag: img('drag-to-replan', 1200, 1016, a('Dragging a job shows the new time live', 'Een job slepen toont live het nieuwe uur')),
    insert: img('insert-and-push', 1200, 729, a('Insert and push: the job takes the slot and the other job moves after it', 'Invoegen en opschuiven: de job neemt de plaats in en de andere job schuift op')),
    tray: img('tray-undo', 1200, 686, a('Placing a person from the unassigned tray, with an undo message', 'Iemand uit de lade plaatsen, met een melding om ongedaan te maken')),
    partial: img('partial-shift', 1200, 712, a('Assigning a partial shift to someone already booked that day', 'Een deelshift toewijzen aan iemand die die dag al ingepland is')),
    absent: img('absent-one-click', 1200, 583, a('Marking a crew member absent in one click', 'Een ploeglid met één klik afwezig zetten')),
    problems: img('problem-box', 700, 525, a('Problem box listing every planning issue in the visible period', 'Probleemvak met elk planningsprobleem in de zichtbare periode')),
    competence: img('competence-matrix', 1440, 900, a('Competence matrix per person and task: training, beginner or professional', 'Competentiematrix per persoon en taak: opleiding, beginner of professional')),
    conflicts: img('conflict-grid', 1440, 800, a('Conflict and affinity grid: who should not or likes to work together', 'Conflict- en affiniteitsrooster: wie niet of graag samenwerkt')),
    rules: img('rule-checks', 1440, 560, a('The five rule checks with their order and on/off switch', 'De vijf regelcontroles met volgorde en aan/uit-schakelaar')),
    team: img('team-edit', 1440, 671, a('Team settings: coach, crew order and van', 'Ploeginstellingen: coach, volgorde van de ploeg en busje')),
    workdays: img('employee-work-days', 1440, 699, a('Employee work days, alternating weeks and absence periods', 'Werkdagen, wisselende weken en afwezigheden van een medewerker')),
    hr: img('attendance-hr', 1440, 900, a('Attendance tab with days present and absent', 'Aanwezigheidstab met dagen aanwezig en afwezig')),
    evening: img('evening-close', 1440, 640, a('Evening procedure: mark jobs completed or not completed', 'Avondprocedure: jobs afgewerkt of niet afgewerkt markeren')),
    invoices: img('draft-invoices', 1440, 640, a('Draft invoices created from completed jobs', 'Conceptfacturen aangemaakt uit afgewerkte jobs')),
    capacity: img('capacity-week', 1440, 520, a('Capacity per day: planned versus available', 'Capaciteit per dag: gepland tegenover beschikbaar')),
    map: img('map', 1440, 760, a('Map with jobs, crews and vehicles', 'Kaart met jobs, ploegen en voertuigen')),
    instructions: img('work-instructions', 1440, 720, a('Work instructions per team as PDF', 'Werkinstructies per ploeg als PDF')),
    vocab: img('vocabulary-elements', 1440, 520, a('Your own vocabulary: elements built from code, verb and object', 'Je eigen woordenschat: elementen uit code, werkwoord en object')),
    layout: img('board-layout', 1440, 720, a('Board and wall monitor layout', 'Indeling van het bord en de wandmonitor')),
    feedback: img('feedback-draw', 1440, 872, a('Feedback: take a screenshot, draw on it and send it', 'Feedback: neem een schermafbeelding, teken erop en verstuur'))
  };
};

const enShots = shots('en');
const nlShots = shots('nl');

const en = {
  tag: 'TeamPlanner',
  title1: 'Plan people,',
  title2: 'not blocks.',
  desc: 'Day planning to the quarter hour for crews in the field: who, where, which van, trained or not, here today or not. All on one card.',
  cta1: 'Book a demo with your own teams',
  cta2: 'See how it works',
  hero_shot: enShots.day,
  hero_caption: 'The day view: one lane per team, a red line for now.',
  contrast_tag: 'The difference',
  contrast_title1: 'Most tools plan blocks.',
  contrast_title2: 'TeamPlanner plans people.',
  contrast_left: 'A typical planning tool',
  contrast_right: 'TeamPlanner',
  contrast: [
    ['Blocks on a timeline', 'People, teams and vans, to the quarter hour'],
    ['Drag a block', 'Drag jobs and people: insert & push, partial shifts, swap, undo'],
    ['Mistakes show up in the field', 'Warns ahead: training, conflicts, absence, double booking, full van'],
    ['Same product for everyone', 'Your tasks, rules, layout and language'],
    ['Planning stops at the planning', 'Evening close → draft invoice']
  ],
  card_tag: 'One card',
  card_title: 'One card tells the whole story',
  card_desc: 'Every job is one card on the team\'s own lane, in the same spot every day.',
  card_shot: enShots.card,
  card_points: [
    'Team and coach, customer and address',
    'The task, the van, the start time and the duration',
    'Numbered crew: position 0 is the coach',
    'Someone absent is struck through, but stays visible',
    'A green dot when the job is fully staffed',
    'A connector line when a crew moves on to its next job'
  ],
  drag_tag: 'Drag, drop, done',
  drag_title: 'Replanning is dragging',
  drag_desc: 'Change the day the way you think about it: move the job, move the person.',
  drag: [
    { icon: 'drag_pan', title: 'Drag to replan', text: 'The new time shows live and snaps to the quarter hour.', shot: enShots.drag },
    { icon: 'vertical_align_bottom', title: 'Insert & push', text: 'Hold ↑ and drop a job onto another: it takes that slot and the other job moves after it.', shot: enShots.insert },
    { icon: 'inbox', title: 'From the tray', text: 'Unassigned people wait in a tray. Drag them onto a crew, for this day only or for good. Undo sits in the message.', shot: enShots.tray },
    { icon: 'schedule', title: 'Partial shifts', text: 'Already booked? Assign part of the shift with hours and a start time. Ctrl-drag adds someone to a second job.', shot: enShots.partial },
    { icon: 'person_off', title: 'Present / absent', text: 'One click takes someone off the job. They stay visible, struck through.', shot: enShots.absent },
    { icon: 'swap_horiz', title: 'Swap & undo', text: 'Tap two crew numbers to swap places. Ctrl+Z or Undo for mistakes.', shot: enShots.card }
  ],
  warn_tag: 'Before the field finds out',
  warn_title: 'It warns you. You decide.',
  warn_desc: 'TeamPlanner checks every plan and shows you what needs attention, before the crew is on the road.',
  warn: [
    { icon: 'report', title: 'One problem list', text: 'Every issue in the visible period in one list: not trained, two jobs at once, coach absent, conflict, van full. Click a line to go there. Solved issues disappear.', shot: enShots.problems },
    { icon: 'school', title: 'Competence matrix', text: 'Per person and per task: training, beginner or professional. It highlights who masters fewer than three tasks professionally.', shot: enShots.competence },
    { icon: 'diversity_3', title: 'Conflicts & affinity', text: 'Record who should not work together, and who likes to.', shot: enShots.conflicts },
    { icon: 'rule', title: 'Five rule checks', text: 'Competence, conflict, presence, hours and van capacity. Switch each on or off, set their order and choose sequenced or parallel.', shot: enShots.rules }
  ],
  crews_tag: 'Built for real crews',
  crews_title: 'For crews with a coach, a fixed order and a van',
  crews: [
    { icon: 'groups', title: 'Teams', text: 'A team is a coach, a fixed crew order and a van with seats, so a whole crew goes on a job in one click.', shot: enShots.team },
    { icon: 'event_available', title: 'Work days & absences', text: 'Work days per person, alternating weeks and absence periods, also for part of a day: the job splits itself.', shot: enShots.workdays },
    { icon: 'badge', title: 'Attendance for HR', text: 'Days present and absent and the attendance rate per person.', shot: enShots.hr }
  ],
  crews_extra: 'Also: a reserve crew, alternation between teams per day, week or month, and interns with a start and end date.',
  invoice_tag: 'From plan to invoice',
  invoice_title: 'The day ends with a draft invoice',
  invoice: [
    { icon: 'nightlight', title: 'Evening close', text: 'Mark each job completed or not completed, and pick a new date right away for what is left.', shot: enShots.evening },
    { icon: 'receipt_long', title: 'Draft invoices', text: 'A completed job becomes a draft invoice when invoicing is on, priced with your resource and role rates.', shot: enShots.invoices },
    { icon: 'monitoring', title: 'Capacity', text: 'Planned versus available per day, as a percentage. Around 80 to 85 % is the ideal.', shot: enShots.capacity },
    { icon: 'map', title: 'Map & work instructions', text: 'Jobs, crews and vehicles on a map, and work instructions per team as PDF with estimated travel time between jobs.', shot: enShots.map }
  ],
  you_tag: 'Built around you',
  you_title: 'We adapt to you. Not the other way round.',
  you: [
    { icon: 'translate', title: 'Your words, your rules', text: 'Your tasks, objects, elements and seasons, your rules, your capacity margin, in Dutch or English.', shot: enShots.vocab },
    { icon: 'dashboard_customize', title: 'Your board', text: 'Your board layout, which also drives the wall monitor.', shot: enShots.layout },
    { icon: 'rate_review', title: 'Your feedback', text: 'Take a screenshot, draw on it and send it. Your feedback becomes features.', shot: enShots.feedback }
  ],
  roles_title: 'Roles',
  roles: [
    ['Admin', 'Full access'],
    ['Planner', 'Plans jobs, people and vans'],
    ['Coach', 'Sees own jobs on the smartphone'],
    ['HR', 'Attendance, without prices, cannot move jobs'],
    ['Monitor', 'Read-only wall screen']
  ],
  timeline_title: 'Recent updates',
  timeline: [
    ['Sept 2026', 'Client feedback update: presence board, HR role, job filters'],
    ['Oct 2026', 'New planning and attendance: numbered crew slots, attendance board'],
    ['Nov 2026', 'NL/EN manual and in-app help']
  ],
  faq_tag: 'FAQ',
  faq_title: 'Questions about TeamPlanner',
  faq: [
    { q: 'What is TeamPlanner?', a: 'TeamPlanner is day planning software for crews in the field. It plans people, teams and vans to the quarter hour, and shows on one card who works where, with which van, whether they are trained and whether they are here today.' },
    { q: 'Who is TeamPlanner for?', a: 'Planners and dispatchers, coordinators of sheltered workplaces, green maintenance and cleaning companies, and the directors, finance and HR people who work with them.' },
    { q: 'Does TeamPlanner stop planning mistakes?', a: 'It warns you before they reach the field: missing training, conflicts, absences, double bookings and full vans all appear in one problem list. You decide what to do.' },
    { q: 'Can coaches use it on their phone?', a: 'Yes. Coaches see their own jobs on the smartphone. Planners work on the full board, and a read-only view can run on a wall monitor.' },
    { q: 'Can TeamPlanner create invoices?', a: 'When invoicing is switched on, a job marked completed in the evening close becomes a draft invoice, priced with your resource and role rates.' },
    { q: 'Which languages does it support?', a: 'Dutch and English.' }
  ],
  final_cta_title: 'Book a demo with your own teams.',
  final_cta_desc: 'Bring your crews, your vans and your week. We show you how it looks in TeamPlanner.',
  final_cta_button: 'Book a demo',
  contact_line: 'Ives De Saeger · ives@p41.be · +32 496/16.65.54',
  cross_link_text: 'Balancing an assembly line instead?',
  cross_link_cta: 'Explore Time Study'
};

type TpContent = typeof en;

const nl: TpContent = {
  tag: 'TeamPlanner',
  title1: 'Plan mensen,',
  title2: 'niet blokjes.',
  desc: 'Dagplanning tot op het kwartier voor ploegen op het terrein: wie, waar, welk busje, opgeleid of niet, vandaag aanwezig of niet. Alles op één kaart.',
  cta1: 'Vraag een demo, met jouw eigen ploegen',
  cta2: 'Zie hoe het werkt',
  hero_shot: nlShots.day,
  hero_caption: 'De dagweergave: één baan per ploeg, een rode lijn voor nu.',
  contrast_tag: 'Het verschil',
  contrast_title1: 'De meeste tools plannen blokjes.',
  contrast_title2: 'TeamPlanner plant mensen.',
  contrast_left: 'Een typische planningstool',
  contrast_right: 'TeamPlanner',
  contrast: [
    ['Blokjes op een tijdlijn', 'Mensen, ploegen en busjes, tot op het kwartier'],
    ['Een blokje verslepen', 'Jobs én mensen slepen: invoegen & opschuiven, deelshifts, wisselen, ongedaan maken'],
    ['Fouten zie je pas op het terrein', 'Waarschuwt vooraf: opleiding, conflicten, afwezig, dubbel geboekt, busje vol'],
    ['Hetzelfde product voor iedereen', 'Jouw taken, jouw regels, jouw indeling, jouw taal'],
    ['De planning stopt bij de planning', 'Afgewerkt → conceptfactuur']
  ],
  card_tag: 'Eén kaart',
  card_title: 'Eén kaart vertelt het hele verhaal',
  card_desc: 'Elke job is één kaart op de eigen baan van de ploeg, elke dag op dezelfde plek.',
  card_shot: nlShots.card,
  card_points: [
    'Ploeg en coach, klant en adres',
    'De taak, het busje, het startuur en de duur',
    'Genummerde ploeg: positie 0 is de coach',
    'Wie afwezig is, wordt doorstreept maar blijft zichtbaar',
    'Een groen bolletje als de job volledig bemand is',
    'Een verbindingslijn als een ploeg naar de volgende job gaat'
  ],
  drag_tag: 'Slepen, loslaten, klaar',
  drag_title: 'Slepen = herplannen',
  drag_desc: 'Pas de dag aan zoals je erover denkt: verplaats de job, verplaats de persoon.',
  drag: [
    { icon: 'drag_pan', title: 'Slepen om te herplannen', text: 'Het nieuwe uur verschijnt live en klikt vast op het kwartier.', shot: nlShots.drag },
    { icon: 'vertical_align_bottom', title: 'Invoegen & opschuiven', text: 'Hou ↑ ingedrukt en laat een job op een andere vallen: hij neemt die plaats in en de andere job schuift erachter.', shot: nlShots.insert },
    { icon: 'inbox', title: 'Uit de lade', text: 'Niet-ingeplande mensen wachten in een lade. Sleep ze op een ploeg, voor vandaag of voorgoed. Ongedaan maken staat in de melding.', shot: nlShots.tray },
    { icon: 'schedule', title: 'Deelshifts', text: 'Al ingepland? Wijs een deel van de shift toe met uren en een startuur. Ctrl-slepen zet iemand op een tweede job.', shot: nlShots.partial },
    { icon: 'person_off', title: 'Aanwezig / afwezig', text: 'Eén klik haalt iemand van de job. Die blijft zichtbaar, doorstreept.', shot: nlShots.absent },
    { icon: 'swap_horiz', title: 'Wisselen & ongedaan maken', text: 'Tik op twee ploegnummers om van plaats te wisselen. Ctrl+Z of Ongedaan maken bij een fout.', shot: nlShots.card }
  ],
  warn_tag: 'Voor het terrein het merkt',
  warn_title: 'Het waarschuwt je. Jij beslist.',
  warn_desc: 'TeamPlanner controleert elke planning en toont wat aandacht nodig heeft, nog voor de ploeg vertrekt.',
  warn: [
    { icon: 'report', title: 'Eén probleemlijst', text: 'Elk probleem in de zichtbare periode in één lijst: niet opgeleid, twee jobs tegelijk, coach afwezig, conflict, busje vol. Klik op een lijn om erheen te gaan. Opgeloste problemen verdwijnen.', shot: nlShots.problems },
    { icon: 'school', title: 'Competentiematrix', text: 'Per persoon en per taak: opleiding, beginner of professional. Ze toont wie minder dan drie taken professioneel beheerst.', shot: nlShots.competence },
    { icon: 'diversity_3', title: 'Conflicten & affiniteit', text: 'Leg vast wie niet samen mag werken, en wie graag samenwerkt.', shot: nlShots.conflicts },
    { icon: 'rule', title: 'Vijf regelcontroles', text: 'Competentie, conflict, aanwezigheid, uren en capaciteit van het busje. Zet elke regel aan of uit, kies de volgorde en kies sequentieel of parallel.', shot: nlShots.rules }
  ],
  crews_tag: 'Gebouwd voor echte ploegen',
  crews_title: 'Voor ploegen met een coach, een vaste volgorde en een busje',
  crews: [
    { icon: 'groups', title: 'Ploegen', text: 'Een ploeg is een coach, een vaste volgorde en een busje met zitplaatsen, zodat een hele ploeg met één klik op een job staat.', shot: nlShots.team },
    { icon: 'event_available', title: 'Werkdagen & afwezigheden', text: 'Werkdagen per persoon, wisselende weken en afwezigheden, ook voor een deel van de dag: de job splitst zichzelf.', shot: nlShots.workdays },
    { icon: 'badge', title: 'Aanwezigheid voor HR', text: 'Dagen aanwezig en afwezig en de aanwezigheidsgraad per persoon.', shot: nlShots.hr }
  ],
  crews_extra: 'Ook: een reserveploeg, wisselen tussen ploegen per dag, week of maand, en stagiairs met een start- en einddatum.',
  invoice_tag: 'Van planning tot factuur',
  invoice_title: 'De dag eindigt met een conceptfactuur',
  invoice: [
    { icon: 'nightlight', title: 'Avondafsluiting', text: 'Markeer elke job als afgewerkt of niet afgewerkt, en kies meteen een nieuwe datum voor wat overblijft.', shot: nlShots.evening },
    { icon: 'receipt_long', title: 'Conceptfacturen', text: 'Een afgewerkte job wordt een conceptfactuur als facturatie aan staat, geprijsd met jouw tarieven per middel en rol.', shot: nlShots.invoices },
    { icon: 'monitoring', title: 'Capaciteit', text: 'Gepland tegenover beschikbaar per dag, als percentage. Rond 80 tot 85 % is ideaal.', shot: nlShots.capacity },
    { icon: 'map', title: 'Kaart & werkinstructies', text: 'Jobs, ploegen en voertuigen op een kaart, en werkinstructies per ploeg als PDF met geschatte reistijd tussen jobs.', shot: nlShots.map }
  ],
  you_tag: 'Rond jou gebouwd',
  you_title: 'Wij passen ons aan jou aan. Niet omgekeerd.',
  you: [
    { icon: 'translate', title: 'Jouw woorden, jouw regels', text: 'Jouw taken, objecten, elementen en seizoenen, jouw regels, jouw capaciteitsmarge, in het Nederlands of Engels.', shot: nlShots.vocab },
    { icon: 'dashboard_customize', title: 'Jouw bord', text: 'Jouw indeling van het bord, die ook de wandmonitor stuurt.', shot: nlShots.layout },
    { icon: 'rate_review', title: 'Jouw feedback', text: 'Neem een schermafbeelding, teken erop en verstuur. Jouw feedback wordt nieuwe functies.', shot: nlShots.feedback }
  ],
  roles_title: 'Rollen',
  roles: [
    ['Admin', 'Volledige toegang'],
    ['Planner', 'Plant jobs, mensen en busjes'],
    ['Coach', 'Ziet de eigen jobs op de smartphone'],
    ['HR', 'Aanwezigheid, zonder prijzen, kan geen jobs verplaatsen'],
    ['Monitor', 'Alleen-lezen wandscherm']
  ],
  timeline_title: 'Recente updates',
  timeline: [
    ['sept 2026', 'Update na klantenfeedback: aanwezigheidsbord, HR-rol, jobfilters'],
    ['okt 2026', 'Nieuwe planning en aanwezigheid: genummerde plaatsen in de ploeg, aanwezigheidsbord'],
    ['nov 2026', 'Handleiding NL/EN en hulp in de app']
  ],
  faq_tag: 'FAQ',
  faq_title: 'Vragen over TeamPlanner',
  faq: [
    { q: 'Wat is TeamPlanner?', a: 'TeamPlanner is software voor dagplanning van ploegen op het terrein. Het plant mensen, ploegen en busjes tot op het kwartier en toont op één kaart wie waar werkt, met welk busje, of die opgeleid is en of die vandaag aanwezig is.' },
    { q: 'Voor wie is TeamPlanner?', a: 'Voor planners en dispatchers, coördinatoren van maatwerkbedrijven, groenonderhoud- en schoonmaakbedrijven, en de directie, financiën en HR die met hen samenwerken.' },
    { q: 'Voorkomt TeamPlanner planningsfouten?', a: 'Het waarschuwt je voor ze het terrein bereiken: ontbrekende opleiding, conflicten, afwezigheden, dubbele boekingen en volle busjes staan in één probleemlijst. Jij beslist wat je doet.' },
    { q: 'Kunnen coaches het op hun gsm gebruiken?', a: 'Ja. Coaches zien hun eigen jobs op de smartphone. Planners werken op het volledige bord, en een alleen-lezen weergave kan op een wandmonitor draaien.' },
    { q: 'Kan TeamPlanner facturen maken?', a: 'Als facturatie aan staat, wordt een job die bij de avondafsluiting als afgewerkt is gemarkeerd een conceptfactuur, geprijsd met jouw tarieven per middel en rol.' },
    { q: 'Welke talen ondersteunt het?', a: 'Nederlands en Engels.' }
  ],
  final_cta_title: 'Vraag een demo, met jouw eigen ploegen.',
  final_cta_desc: 'Breng je ploegen, je busjes en je week mee. Wij tonen hoe het eruitziet in TeamPlanner.',
  final_cta_button: 'Vraag een demo',
  contact_line: 'Ives De Saeger · ives@p41.be · +32 496/16.65.54',
  cross_link_text: 'Wil je eerder een assemblagelijn balanceren?',
  cross_link_cta: 'Ontdek Time Study'
};

export const TEAMPLANNER_CONTENT = { en, nl };
