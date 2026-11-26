import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import { createIcons, ArrowUpRight, ArrowRight, ArrowLeft, ArrowDown, Menu, X, Phone, MapPin, Clock3, Plus, Sparkles, Flower2, HeartHandshake, Fingerprint, ExternalLink, Instagram } from 'lucide';
import { studio, treatments, team } from './content.js';
import { esc, external, icon, waIcon, legal, emailLink } from './page.js';
import { consultationMarkup, servicesMarkup, treatmentStory } from './treatment-markup.js';
import './style.css';
import './treatment-page.css';
import { initMotion, animateDialog } from './motion.js';
import { galleryMarkup, initPhotoGallery } from './gallery.js';

const icons = { ArrowUpRight, ArrowRight, ArrowLeft, ArrowDown, Menu, X, Phone, MapPin, Clock3, Plus, Sparkles, Flower2, HeartHandshake, Fingerprint, ExternalLink, Instagram };
const drawIcons = () => createIcons({ icons, attrs: { 'stroke-width': 1.4 } });
drawIcons();

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Apri menu'); mobileNav.classList.remove('is-open'); mobileNav.inert = true; document.body.classList.remove('menu-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open?'Chiudi menu':'Apri menu'); mobileNav.classList.toggle('is-open',open); mobileNav.inert = !open; document.body.classList.toggle('menu-open',open); });
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
matchMedia('(min-width: 1001px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

const contentDialog = document.querySelector('#content-dialog');
const content = document.querySelector('#dialog-content');
const treatmentPage = document.querySelector('[data-page-treatment]');
const setGalleryPhotos = initPhotoGallery(contentDialog, drawIcons, treatmentPage || contentDialog);
if (treatmentPage) {
  const treatment = treatments.find(item => item.id === treatmentPage.dataset.pageTreatment);
  setGalleryPhotos(treatment.gallery || [], treatment.galleryTitle);
}
function pauseTreatmentVideos() { content.querySelectorAll('video').forEach(video => video.pause()); }
function openContent(html, gallery = [], galleryTitle) {
  pauseTreatmentVideos();
  if (!treatmentPage) setGalleryPhotos(gallery, galleryTitle);
  content.innerHTML = html;
  contentDialog.classList.toggle('has-gallery', gallery.length > 0);
  drawIcons();
  contentDialog.showModal();
  contentDialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  animateDialog(contentDialog);
}
function openTreatment(treatment, pageHref) {
  const gallery = treatment.gallery || [];
  const coverIndex = gallery.findIndex(photo => photo.thumbnail === treatment.image);
  const cover = `<img class="dialog-treatment-image" src="${esc(treatment.image)}" alt="${esc(treatment.alt)}" style="object-position:${esc(treatment.coverPosition || 'center 44%')}">`;
  openContent(`
    ${coverIndex >= 0 ? `<button class="gallery-cover" type="button" data-photo-index="${coverIndex}" aria-label="Ingrandisci la foto di copertina">${cover}<span class="gallery-cover-hint">Guarda da vicino ${icon('plus')}</span></button>` : cover}
    <div class="dialog-body">
      <span class="eyebrow">IL TUO RITUALE BEALAB</span>
      <h2 id="dialog-title">${esc(treatment.name)}</h2>
      <p>${esc(treatment.description)}</p>
      ${treatment.intro ? `<p>${esc(treatment.intro)}</p>` : ''}
      ${servicesMarkup(treatment)}
      <p class="dialog-note">${esc(treatment.note || 'Questa è una selezione dimostrativa. Contatta il centro per confermare servizi disponibili, modalità e prezzi.')}</p>
      <a class="button button-dark" href="${studio.whatsapp}" ${external}>${esc(treatment.ctaLabel || 'Richiedi informazioni')} ${waIcon}</a>
      ${consultationMarkup(treatment.consultation)}
      ${treatmentStory(treatment)}
      ${gallery.length > 1 && !treatment.recognition ? galleryMarkup(gallery, treatment.galleryOptions) : ''}
      <a class="text-link treatment-page-link" href="${esc(pageHref)}">Apri la pagina del trattamento ${icon('arrow-up-right')}</a>
    </div>`, gallery, treatment.galleryTitle);
}
document.querySelectorAll('[data-treatment]').forEach(button => button.addEventListener('click', event => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openTreatment(treatments.find(treatment => treatment.id === button.dataset.treatment), button.getAttribute('href'));
}));
document.querySelectorAll('[data-team-profile]').forEach(button => {
  button.addEventListener('click', () => {
    const person = team[Number(button.dataset.teamProfile)];
    openContent(`<div class="dialog-body team-bio">
      <h2 id="dialog-title">${esc(person.name)}</h2>
      <p class="team-bio-role">${esc(person.role)}</p>
      ${person.bio.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
    </div>`);
  });
});

document.querySelector('[data-privacy]').addEventListener('click', () => openContent(`
  <div class="dialog-body privacy-body">
    <h2 id="dialog-title">Informativa privacy</h2>
    <p class="privacy-status">Informativa del sito in revisione.</p>
    <h3>Titolare del trattamento</h3>
    <dl class="legal-fields">
      <dt>Attività</dt><dd>${esc(legal.owner)} · ${esc(legal.businessType)}</dd>
      <dt>Sede legale</dt><dd>${esc(legal.registeredOffice)}</dd>
      <dt>Sede del centro</dt><dd>${esc(studio.address)}, ${esc(studio.postalCode)} ${esc(studio.city)}</dd>
      <dt>Partita IVA</dt><dd>${esc(legal.vatNumber)}</dd>
      <dt>REA</dt><dd>${esc(legal.rea)}</dd>
      <dt>Contatto privacy</dt><dd>${emailLink}</dd>
    </dl>
    <h3>Navigazione</h3>
    <p>Il sito non usa moduli, strumenti di analisi o cookie di profilazione. Si serve della memoria di sessione del browser per mostrare l’animazione introduttiva una sola volta per scheda. Il gestore dell’hosting, <a href="https://vercel.com/legal/privacy-policy" ${external}>Vercel</a>, può trattare dati tecnici di connessione.</p>
    <h3>Contatti e servizi esterni</h3>
    <p>Puoi contattare il centro per informazioni e appuntamenti tramite email, telefono o i collegamenti a <a href="https://www.whatsapp.com/legal/privacy-policy?lang=it" ${external}>WhatsApp</a> e <a href="https://privacycenter.instagram.com/policy/" ${external}>Instagram</a>.</p>
    <p>La mappa si collega a Google quando premi «Carica Google Maps». Google può trattare dati tecnici di connessione secondo la propria <a href="https://policies.google.com/privacy?hl=it" ${external}>informativa privacy</a>.</p>
    <h3>Richieste sui tuoi dati</h3>
    <p>Per esercitare i diritti previsti dal GDPR puoi scrivere a ${emailLink}. Puoi anche presentare un reclamo al <a href="https://www.garanteprivacy.it/" ${external}>Garante per la protezione dei dati personali</a>.</p>
  </div>`));

contentDialog.querySelector('.dialog-close').addEventListener('click',()=>contentDialog.close());
contentDialog.addEventListener('click',e=>{if(e.target===contentDialog){const r=contentDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)contentDialog.close();}});
contentDialog.addEventListener('close',()=>{pauseTreatmentVideos();document.body.classList.remove('dialog-open');});

document.querySelector('#load-map')?.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.title='Google Maps: Bealab Beauty Studio, Corso Giovanni Agnelli 52/C, Torino';frame.src='https://www.google.com/maps?q=Bealab+Beauty+Studio+Corso+Giovanni+Agnelli+52%2FC+Torino&output=embed';frame.referrerPolicy='no-referrer';frame.allowFullscreen=true;const panel=document.querySelector('#map-panel');panel.classList.add('map-loaded');panel.replaceChildren(frame);const fallback=document.createElement('a');fallback.href=studio.maps;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.className='map-fallback';fallback.textContent='Mappa non disponibile? Apri le indicazioni su Google';panel.append(fallback);});

initMotion();
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}}),{rootMargin:'-20% 0px -60% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>sectionObserver.observe(s));

// Il contatto resta accessibile in testata; in basso il pulsante flottante
// lascia liberi gli orari e le azioni della sezione appuntamenti.
const floatingContact = document.querySelector('.floating-whatsapp');
const visibleContactSections = new Set();
function updateFloatingContact() {
  const hide = visibleContactSections.size > 0 && document.activeElement !== floatingContact;
  floatingContact.classList.toggle('is-hidden', hide);
  floatingContact.inert = hide;
}
const contactVisibility = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) visibleContactSections.add(entry.target);
    else visibleContactSections.delete(entry.target);
  });
  updateFloatingContact();
}, { threshold: 0 });
document.querySelectorAll('#prenota, #contatti').forEach(section => contactVisibility.observe(section));
floatingContact.addEventListener('blur', updateFloatingContact);
