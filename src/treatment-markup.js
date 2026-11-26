import { studio } from './content.js';
import { esc, external, icon, waIcon } from './page.js';

export function treatmentStory(treatment) {
  if (!treatment.recognition && !treatment.video) return '';
  const recognition = treatment.recognition;
  const photoIndex = recognition ? treatment.gallery.findIndex(photo => photo.id === recognition.photoId) : -1;
  const photo = treatment.gallery?.[photoIndex];
  const video = treatment.video;
  return `<section class="treatment-story${!photo ? ' video-only' : ''}" aria-label="${esc(treatment.storyLabel || `${treatment.name} da Bealab`)}">
    ${photo ? `<figure class="recognition-card">
      <button class="treatment-story-frame recognition-photo" type="button" data-photo-index="${photoIndex}" aria-label="Ingrandisci: ${esc(photo.caption)}"><img src="${esc(photo.thumbnail)}" alt="${esc(photo.caption)}" width="${photo.width}" height="${photo.height}" loading="lazy"><span class="gallery-zoom" aria-hidden="true">${icon('plus')}</span></button>
      <figcaption><span class="eyebrow">NEL ${recognition.year} SIAMO DIVENTATE</span><h3>${esc(recognition.title)}</h3></figcaption>
    </figure>` : ''}
    ${video ? `<figure class="treatment-video-card">
      <div class="treatment-story-frame"><video class="treatment-video" controls playsinline preload="none" poster="${esc(video.poster)}" aria-label="${esc(video.title)}" aria-describedby="treatment-video-description"><source src="${esc(video.src)}" type="video/mp4">Il tuo browser non supporta questo video. <a href="${esc(video.src)}">Apri il video: ${esc(video.title)}</a>.</video></div>
      <figcaption><span class="eyebrow">UNO SGUARDO NEL NOSTRO STUDIO</span><h3>${esc(video.title)}</h3><p>${esc(video.description)}</p><p class="video-accessibility" id="treatment-video-description">${esc(video.accessibleDescription)}</p></figcaption>
    </figure>` : ''}
  </section>`;
}
export function consultationMarkup(consultation) {
  if (!consultation) return '';
  return `<section class="treatment-consultation" aria-labelledby="consultation-title">
    <span class="eyebrow">CONSULENZA GRATUITA</span>
    <h3 id="consultation-title">${esc(consultation.title)}</h3>
    <p class="consultation-lead">${esc(consultation.lead)}</p>
    <p>${esc(consultation.description)}</p>
    <a class="button button-dark" href="${studio.whatsapp}" ${external}>${esc(consultation.ctaLabel)} ${waIcon}</a>
  </section>`;
}
export function servicesMarkup(treatment) {
  if (treatment.pathway) {
    const pathway = treatment.pathway;
    return `<section class="treatment-pathway" aria-labelledby="pathway-title">
      <h3 id="pathway-title">${esc(pathway.title)}</h3>
      <p class="pathway-introduction">${esc(pathway.introduction)}</p>
      <ol class="pathway-steps">${pathway.steps.map(step => `<li><h4>${esc(step.name)}</h4><p>${esc(step.description)}</p></li>`).join('')}</ol>
    </section>`;
  }
  const groups = treatment.serviceGroups || [{ title: treatment.servicesTitle, services: treatment.services }];
  return groups.map(group => `
    ${group.title ? `<h3 class="service-heading">${esc(group.title)}</h3>` : ''}
    <ul class="service-list">${group.services.map(service => {
      const name = typeof service === 'string' ? service : service.name;
      const description = typeof service === 'string' ? '' : service.description;
      return `<li><span>${esc(name)}${description ? `<small class="service-description">${esc(description)}</small>` : ''}</span>${icon('sparkles')}</li>`;
    }).join('')}</ul>`).join('');
}
