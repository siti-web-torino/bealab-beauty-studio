import { assetUrl, studio, treatments } from './content.js';
import { galleryMarkup } from './gallery.js';
import { esc, external, icon, renderDialog, renderFooter, renderHeader, treatmentHref, waIcon } from './page.js';
import { consultationMarkup, servicesMarkup, treatmentStory } from './treatment-markup.js';

export function renderTreatmentPage(treatment) {
  const homePath = assetUrl('/');
  const photos = treatment.gallery || [];
  const coverIndex = photos.findIndex(photo => photo.thumbnail === treatment.image);
  const cover = photos[coverIndex];
  const coverImage = `<img src="${esc(treatment.image)}" alt="${esc(treatment.alt)}" fetchpriority="high"
    style="object-position:${esc(treatment.coverPosition || treatment.position || 'center')}">`;

  return `${renderHeader(homePath)}
    <main class="treatment-page" id="main" data-page-treatment="${esc(treatment.id)}">
      <nav class="treatment-breadcrumb" aria-label="Percorso">
        <a href="${esc(homePath)}">Bealab</a><span aria-hidden="true">/</span><span aria-current="page">${esc(treatment.name)}</span>
      </nav>
      <div class="treatment-page-hero">
        <div class="treatment-page-intro">
          <p class="eyebrow">BEALAB BEAUTY STUDIO · SANTA RITA, TORINO</p>
          <h1>${esc(treatment.name)}</h1>
          <p>${esc(treatment.description)}</p>
          ${treatment.intro ? `<p>${esc(treatment.intro)}</p>` : ''}
          <a class="button button-dark" href="${esc(studio.whatsapp)}" ${external}>${esc(treatment.ctaLabel || 'Prenota su WhatsApp')} ${waIcon}</a>
        </div>
        ${cover ? `<a class="treatment-page-photo" href="${esc(cover.image)}" data-photo-index="${coverIndex}" aria-label="Ingrandisci la foto di ${esc(treatment.name)}">
          ${coverImage}<span class="gallery-cover-hint">Guarda da vicino ${icon('plus')}</span>
        </a>` : `<div class="treatment-page-photo">${coverImage}</div>`}
      </div>

      <section class="treatment-page-services" aria-labelledby="treatment-services-title">
        <h2 id="treatment-services-title">Servizi e percorso</h2>
        ${servicesMarkup(treatment)}
        ${treatment.note ? `<p class="treatment-page-note">${esc(treatment.note)}</p>` : ''}
        ${consultationMarkup(treatment.consultation)}
        ${treatmentStory(treatment)}
        ${photos.length > 1 && !treatment.recognition ? galleryMarkup(photos, treatment.galleryOptions) : ''}
      </section>

      <section class="treatment-page-location" aria-labelledby="treatment-location-title">
        <div>
          <h2 id="treatment-location-title">Dove siamo</h2>
          <address>${esc(studio.address)} · ${esc(studio.postalCode)} ${esc(studio.city)}<br>
            <a href="${esc(studio.phoneHref)}">${esc(studio.phone)}</a>
          </address>
        </div>
        <a class="text-link" href="${esc(homePath)}#contatti">Orari e indicazioni ${icon('arrow-up-right')}</a>
      </section>

      <nav class="treatment-page-related" aria-labelledby="related-treatments-title">
        <h2 id="related-treatments-title">Altri trattamenti</h2>
        <ul>${treatments.filter(other => other.id !== treatment.id).map(other => `
          <li><a href="${esc(treatmentHref(other.id))}">${esc(other.name)} ${icon('arrow-up-right')}</a></li>`).join('')}
        </ul>
      </nav>
    </main>
${renderFooter(homePath)}
    ${renderDialog()}`;
}
