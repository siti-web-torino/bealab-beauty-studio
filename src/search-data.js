import { studio } from './content.js';

export const treatmentSlugs = {
  mani: 'manicure',
  pedicure: 'pedicure',
  viso: 'trattamenti-viso',
  sguardo: 'ciglia-e-sopracciglia',
  epilazione: 'epilazione',
  laser: 'epilazione-laser',
  corpo: 'massaggi-e-trattamenti-corpo',
};

const treatmentSummaries = {
  mani: {
    title: 'Manicure e ricostruzione unghie',
    description: 'Manicure classica, semipermanente, smaltogel, copertura e ricostruzione unghie in gel o acrilico. Scopri i servizi di Bealab a Torino Santa Rita.',
  },
  pedicure: {
    title: 'Pedicure estetico',
    description: 'Pedicure estetico, con smalto classico o semipermanente e taglio unghie. Scopri i servizi per la cura dei piedi di Bealab a Torino Santa Rita.',
  },
  viso: {
    title: 'Pulizia e trattamenti viso',
    description: 'Pulizia viso Basic e Superior Experience, rituali esfolianti, purificanti e illuminanti. Prenota una consulenza gratuita da Bealab a Torino.',
  },
  sguardo: {
    title: 'Laminazione ciglia e sopracciglia',
    description: 'Laminazione coreana di ciglia e sopracciglia, extension ciglia, definizione e tinta sopracciglia da Bealab a Torino Santa Rita.',
  },
  epilazione: {
    title: 'Ceretta tradizionale e brasiliana CocoCera',
    description: 'Epilazione con cera tradizionale o ceretta brasiliana CocoCera. Bealab è Exclusive Point CocoCera a Torino Santa Rita.',
  },
  laser: {
    title: 'Epilazione laser a diodo',
    description: 'Epilazione laser a diodo Esthelogue da Bealab a Torino Santa Rita. Il percorso inizia con una consulenza e una prova gratuita.',
  },
  corpo: {
    title: 'Massaggi e trattamenti corpo',
    description: 'Massaggi relax, decontratturanti, drenanti e ayurvedici del piede. Bealab propone percorsi corpo personalizzati a Torino Santa Rita.',
  },
};

const schemaDays = {
  Lunedì: 'Monday',
  Martedì: 'Tuesday',
  Mercoledì: 'Wednesday',
  Giovedì: 'Thursday',
  Venerdì: 'Friday',
  Sabato: 'Saturday',
  Domenica: 'Sunday',
};

function businessSchema(siteUrl, description) {
  return {
    '@type': 'BeautySalon',
    '@id': new URL('#bealab', siteUrl).href,
    url: siteUrl,
    name: studio.name,
    legalName: studio.legal.owner,
    description,
    image: new URL('images/bealab-squadra.webp', siteUrl).href,
    telephone: studio.phoneHref.replace(/^tel:/, ''),
    email: studio.legal.contact,
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.address,
      postalCode: studio.postalCode,
      addressLocality: studio.city,
      addressCountry: 'IT',
    },
    hasMap: studio.googleReviewsUrl || studio.maps,
    sameAs: studio.socials.map(({ url }) => url),
    openingHoursSpecification: studio.hours.map(({ day, time }) => {
      const [opens, closes] = time === 'Chiuso' ? ['00:00', '00:00'] : time.split(' – ');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${schemaDays[day]}`,
        opens,
        closes,
      };
    }),
  };
}

export function searchMetadata(siteUrl, treatment) {
  const context = 'https://schema.org';
  const homeDescription = 'Bealab è un centro estetico a Torino Santa Rita, in corso Giovanni Agnelli 52/C. Manicure, pedicure, viso, ciglia, massaggi ed epilazione laser.';
  const salon = businessSchema(siteUrl, homeDescription);

  if (!treatment) {
    return {
      title: 'Centro estetico a Torino Santa Rita | Bealab Beauty Studio',
      description: homeDescription,
      canonical: siteUrl,
      image: salon.image,
      imageAlt: 'La squadra di Bealab Beauty Studio a Torino',
      schema: { '@context': context, ...salon },
    };
  }

  const summary = treatmentSummaries[treatment.id];
  const canonical = new URL(`trattamenti/${treatmentSlugs[treatment.id]}/`, siteUrl).href;
  const cover = treatment.gallery?.find(photo => photo.thumbnail === treatment.image);
  const imagePath = (cover?.image || treatment.image).replace(/^.*\/images\//, 'images/');
  const image = new URL(imagePath, siteUrl).href;

  return {
    title: `${summary.title} a Torino | Bealab`,
    description: summary.description,
    canonical,
    image,
    imageAlt: treatment.alt,
    schema: {
      '@context': context,
      '@graph': [
        salon,
        {
          '@type': 'Service',
          '@id': `${canonical}#trattamento`,
          name: treatment.name,
          serviceType: summary.title,
          description: summary.description,
          url: canonical,
          image,
          provider: { '@id': salon['@id'] },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: treatment.name, item: canonical },
          ],
        },
      ],
    },
  };
}
