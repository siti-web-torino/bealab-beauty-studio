import { manicurePhotos } from './manicure-photos.js';

// Tutti i dati commerciali da aggiornare prima della pubblicazione sono qui.
export const assetUrl = path => path.startsWith('data:') ? path : import.meta.env.BASE_URL + path.replace(/^\/+/, '');

export const studio = {
  name: 'Bealab – Beauty Studio',
  openingYear: 2022,
  phone: '+39 351 112 8616',
  phoneHref: 'tel:+393511128616',
  whatsapp: 'https://wa.me/393511128616',
  address: 'Corso Giovanni Agnelli 52/C',
  postalCode: '10137',
  city: 'Torino',
  maps: 'https://www.google.com/maps/search/?api=1&query=Bealab+Beauty+Studio+Torino',
  // Scheda Google Maps verificata: Bealab, Corso Giovanni Agnelli 52/c e +39 351 112 8616.
  googleReviewsUrl: 'https://www.google.com/maps/place/Bealab+-+Beauty+Studio/@45.040123,7.6464334,17z/data=!4m8!3m7!1s0x478813decc410729:0xf3af2fa468d469c9!8m2!3d45.040123!4d7.6464334!9m1!1b1!16s%2Fg%2F11rvdccdp6?hl=it',
  hours: [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì', time: '9:30 – 19:00' },
    { day: 'Mercoledì', time: '9:30 – 19:00' },
    { day: 'Giovedì', time: '8:30 – 19:30' },
    { day: 'Venerdì', time: '8:30 – 19:30' },
    { day: 'Sabato', time: '9:30 – 13:30' },
    { day: 'Domenica', time: 'Chiuso' },
  ],
  socials: [
    { label: 'Instagram', handle: '@bealab_beautystudio', icon: 'instagram', url: 'https://www.instagram.com/bealab_beautystudio/' },
  ],
  legal: { owner: '', vatNumber: '', contact: '', providers: '' },
  // Trascritte dagli screenshot Google Maps forniti dall’utente. Cognomi abbreviati su sua richiesta.
  reviews: [
    {
      author: 'Elena F.',
      rating: 5,
      text: 'Un centro che consiglio davvero! Ho fatto diversi trattamenti e sono sempre rimasta molto soddisfatta. Le quattro ragazze sono bravissime, gentili e sempre disponibili. Ti fanno sentire a tuo agio dal primo momento e lavorano con grande professionalità. Entrare qui è sempre una piacevole coccola ✨',
      sourceUrl: null,
    },
    {
      author: 'Jessica P.',
      rating: 5,
      text: 'Andare da Bealab è una coccola, tutto lo staff è super gentile ma trovare Ilenia ad accogliermi è sempre un piacere. Non potrei affidarmi a nessun altro per i trattamenti corpo che faccio. Assolutamente consigliato come centro.',
      sourceUrl: null,
    },
    {
      author: 'Laura D.',
      rating: 5,
      text: 'Ormai una garanzia da anni, mi affido a loro per trattamenti corpo, laser e unghie e mi trovo davvero bene. Professionali, preparate e cordiali, un piccolo angolo di paradiso.',
      sourceUrl: null,
    },
  ],
};

export const team = [
  { name: 'Giulia', role: 'Titolare', image: '/images/team-giulia.webp', alt: 'Giulia, titolare di Bealab' },
  { name: 'Alessia', role: 'Il team Bealab', image: '/images/team-alessia.webp', alt: 'Alessia, della squadra Bealab' },
  { name: 'Ilenia', role: 'Il team Bealab', image: '/images/team-ilenia.webp', alt: 'Ilenia, della squadra Bealab' },
  { name: 'Marika', role: 'Il team Bealab', image: '/images/team-marika.webp', alt: 'Marika, della squadra Bealab' },
].map(person => ({ ...person, image: assetUrl(person.image) }));

export const treatments = [
  {
    id: 'mani', name: 'Manicure & nail care',
    short: 'Piccoli dettagli, grande bellezza.',
    description: 'Un momento dedicato alle tue mani, con la cura che meritano. Dai colori più delicati alla nail art, troviamo insieme il tuo stile.',
    services: [
      'Manicure classica',
      'Manicure con semipermanente',
      'Manicure con smaltogel',
      'Manicure con copertura in gel o acrilico',
      'Ricostruzione unghie con gel o acrilico',
    ],
    note: 'Per informazioni sui servizi manicure, modalità e prezzi, contatta il centro.',
    image: '/images/manicure/lattiginoso-zebrato-thumb.webp',
    alt: 'Manicure Bealab nei toni rosa lattiginoso con un dettaglio zebrato',
    position: 'center',
    gallery: manicurePhotos.map(photo => ({ ...photo, image: assetUrl(photo.image), thumbnail: assetUrl(photo.thumbnail) })),
  },
  {
    id: 'viso', name: 'Viso & benessere',
    short: 'Ritrova la tua luce naturale.',
    description: 'Ascoltiamo la tua pelle e le dedichiamo un rituale di bellezza pensato intorno a te.',
    serviceGroups: [
      { title: 'Pulizia del viso', services: ['Pulizia viso Basic', 'Pulizia viso Superior Experience'] },
      { title: 'Rituali viso', services: [
        'Rituale viso Antigravità',
        'Rituale viso Esfoliante',
        'Rituale viso Occhi & Labbra',
        'Rituale viso Illuminante',
        'Rituale viso Purificante',
      ] },
    ],
    note: 'Contattaci per informazioni sui trattamenti viso, modalità e prezzi.',
    ctaLabel: 'Informazioni sui trattamenti',
    detailsLabel: 'Pulizia e rituali',
    consultation: {
      title: 'Il tuo percorso viso',
      lead: 'Prima di tutto, le tue esigenze.',
      description: 'Per il viso partiamo sempre da una consulenza gratuita, per studiare insieme il percorso migliore per te.',
      ctaLabel: 'Prenota la consulenza gratuita',
    },
    image: '/images/viso/rituale-viso-thumb.webp',
    alt: 'Prodotti e accessori per i rituali viso nello spazio benessere di Bealab',
    position: 'center 70%',
    coverPosition: 'center 76%',
    galleryTitle: 'Viso & benessere · Bealab',
    gallery: [
      { id: 'rituale-viso', caption: 'Lo spazio e gli accessori per i rituali viso da Bealab', image: assetUrl('/images/viso/rituale-viso.webp'), thumbnail: assetUrl('/images/viso/rituale-viso-thumb.webp'), width: 960, height: 1280 },
    ],
  },
  { id: 'sguardo', name: 'Ciglia & sguardo', short: 'La bellezza, al primo sguardo.', description: 'Un’attenzione speciale ai dettagli che rendono il tuo sguardo unico.', services: ['Trattamenti per valorizzare lo sguardo', 'Laminazione ciglia'], image: '/images/eyes.webp', alt: 'Dettaglio dimostrativo di occhi chiusi e ciglia naturali', position: 'center' },
  {
    id: 'epilazione', name: 'Epilazione',
    short: 'La leggerezza sulla pelle.',
    description: 'Cura e delicatezza, con il trattamento di epilazione più adatto alla tua pelle.',
    services: [
      { name: 'Cera tradizionale' },
      { name: 'CocoCera, l’originale ceretta brasiliana', description: 'Per tutti i tipi di pelle, anche quelle più delicate.' },
    ],
    note: 'Per informazioni sui trattamenti di epilazione, modalità e prezzi, contatta il centro.',
    detailsLabel: 'Scopri CocoCera',
    image: '/images/epilazione/prodotti-cococera-thumb.webp',
    alt: 'Prodotti e attrezzatura CocoCera nel centro Bealab',
    position: 'center 65%',
    coverPosition: 'center 72%',
    galleryTitle: 'Epilazione · Bealab',
    gallery: [
      { id: 'prodotti-cococera', caption: 'Prodotti e attrezzatura CocoCera da Bealab', image: assetUrl('/images/epilazione/prodotti-cococera.webp'), thumbnail: assetUrl('/images/epilazione/prodotti-cococera-thumb.webp'), width: 1200, height: 1600 },
      { id: 'team-exclusive-point', caption: 'La squadra Bealab con il riconoscimento Exclusive Point CocoCera 2026', image: assetUrl('/images/epilazione/team-exclusive-point-2026.webp'), thumbnail: assetUrl('/images/epilazione/team-exclusive-point-2026-thumb.webp'), width: 1200, height: 1600 },
    ],
    recognition: { year: 2026, title: 'Exclusive Point CocoCera', photoId: 'team-exclusive-point' },
    video: {
      src: assetUrl('/videos/cococera-preparazione.mp4'),
      poster: assetUrl('/images/epilazione/cococera-video-poster.webp'),
      title: 'CocoCera, da vicino',
      description: 'Un momento della preparazione di CocoCera nel nostro studio.',
      accessibleDescription: 'Video senza audio: la cera CocoCera viene versata nel recipiente per la preparazione.',
    },
  },
  {
    id: 'corpo', name: 'Corpo & benessere',
    short: 'Rallenta. Respira. Ritrovati.',
    description: 'Lascia spazio al relax con un momento dedicato al tuo corpo e al tuo benessere.',
    servicesTitle: 'Massaggi',
    services: [
      { name: 'Massaggio relax', description: 'Sciogli le tensioni e ritrova la tua armonia interiore.' },
      { name: 'Massaggio decontratturante schiena & cervicale', description: 'Stop a rigidità e tensioni.' },
      { name: 'Massaggio drenante', description: 'Leggerezza e depurazione profonda per le tue gambe.' },
      { name: 'Massaggio ayurvedico del piede “Padabhyanga”', description: 'Il benessere di tutto il corpo parte dai nostri piedi.' },
    ],
    note: 'Contattaci per scegliere il massaggio più adatto a te e conoscere modalità e prezzi.',
    ctaLabel: 'Informazioni sui massaggi',
    detailsLabel: 'Massaggi e percorsi',
    consultation: {
      title: 'Trattamenti corpo',
      lead: 'Drenare, sciogliere, rimodellare, snellire.',
      description: 'Da Bealab, con una consulenza gratuita, studiamo insieme un percorso personalizzato, su misura per te e per l’obiettivo che vuoi raggiungere.',
      ctaLabel: 'Prenota la consulenza gratuita',
    },
    image: '/images/corpo/ambiente-massaggi-thumb.webp',
    alt: 'Il lettino e lo spazio dedicato al corpo e al benessere nel centro Bealab',
    position: 'center 67%',
    coverPosition: 'center 72%',
    galleryTitle: 'Corpo & benessere · Bealab',
    galleryOptions: {
      eyebrow: 'IL NOSTRO SPAZIO',
      title: 'Un angolo di benessere',
      description: 'L’ambiente e i dettagli che accompagnano i tuoi momenti di relax da Bealab.',
    },
    gallery: [
      { id: 'ambiente-massaggi', caption: 'Il lettino e lo spazio dedicato al benessere da Bealab', image: assetUrl('/images/corpo/ambiente-massaggi.webp'), thumbnail: assetUrl('/images/corpo/ambiente-massaggi-thumb.webp'), width: 960, height: 1280 },
      { id: 'dettagli-relax', caption: 'Asciugamano, ciotola e luci soffuse nel nostro angolo di relax', image: assetUrl('/images/corpo/dettagli-relax.webp'), thumbnail: assetUrl('/images/corpo/dettagli-relax-thumb.webp'), width: 960, height: 1280 },
    ],
  },
].map(treatment => ({ ...treatment, image: assetUrl(treatment.image) }));

export const values = [
  { icon: 'sparkles', title: 'Cura dei dettagli', text: 'Nei piccoli gesti, tutta l’attenzione che ci piace dedicarti.' },
  { icon: 'flower-2', title: 'Professionalità', text: 'Cura e serietà nel lavoro, spontaneità nel modo di accoglierti.' },
  { icon: 'heart-handshake', title: 'Accoglienza', text: 'Una chiacchiera, una risata e la libertà di essere te.' },
  { icon: 'fingerprint', title: 'Bellezza personalizzata', text: 'Ti ascoltiamo per trovare insieme quello che fa per te.' },
];
