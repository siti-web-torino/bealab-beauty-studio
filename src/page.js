import { studio, treatments, values, team, assetUrl } from './content.js';
import { treatmentSlugs } from './search-data.js';

export const esc = (text) => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl = (url) => { try { const u = new URL(url); return u.protocol === 'https:' ? esc(u.href) : '#'; } catch { return '#'; } };
export const icon = (name, cls = '') => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;
export const waIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.3 7.6c-.6 0-1.1.7-.9 1.5.5 2.8 2.8 5.1 5.6 5.8.9.2 1.9-.6 1.9-1.2l-2-1-1 .7a6.7 6.7 0 0 1-2.8-2.7l.6-1-1-2.1Z"/></svg>`;
export const external = 'target="_blank" rel="noopener noreferrer"';
export const legal = studio.legal;
export const emailLink = `<a href="mailto:${esc(legal.contact)}">${esc(legal.contact)}</a>`;
const mark = `<img class="brand-logo" src="${assetUrl('/images/logo-bealab-600.webp')}" width="600" height="300" alt="BEALAB BeautyStudio di Giulia Salis">`;
const instagram = studio.socials.find(s => s.icon === 'instagram');
const socialLinks = studio.socials.map(s => `<a class="social-link" href="${safeUrl(s.url)}" aria-label="Bealab su ${esc(s.label)} (si apre in una nuova scheda)" ${external}><span class="social-icon">${icon(s.icon)}</span><span class="social-label"><span>Seguici su ${esc(s.label)}</span><small>${esc(s.handle)}</small></span>${icon('arrow-up-right', 'social-arrow')}</a>`).join('');

export function treatmentHref(id) {
  return assetUrl(`/trattamenti/${treatmentSlugs[id]}/`);
}

export function renderHeader(homePath = '') {
  return `
  <a class="skip-link" href="#main">Vai al contenuto</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="${homePath}#home" aria-label="Bealab, inizio pagina">${mark}</a>
    <nav class="desktop-nav" aria-label="Navigazione principale">
      <a href="${homePath}#filosofia">Il nostro mondo</a><a href="${homePath}#squadra">La squadra</a><a href="${homePath}#trattamenti">Trattamenti</a><a href="${homePath}#contatti">Dove siamo</a>
    </nav>
    <a class="button button-dark header-book" href="${studio.whatsapp}" aria-label="Prenota un appuntamento su WhatsApp" ${external}><span class="book-label-long">Prenota un momento per te</span><span class="book-label-short">Prenota</span> ${icon('arrow-up-right')}</a>
    <button class="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded="false" aria-label="Apri menu">${icon('menu', 'menu-open-icon')}${icon('x', 'menu-close-icon')}</button>
  </header>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Navigazione mobile" inert>
    <span class="eyebrow">IL MONDO BEALAB</span>
    <a href="${homePath}#filosofia">Il nostro mondo</a><a href="${homePath}#squadra">Quelle di Bealab</a><a href="${homePath}#trattamenti">I trattamenti</a><a href="${homePath}#recensioni">La vostra fiducia</a><a href="${homePath}#contatti">Dove siamo</a>
    <a class="button button-dark" href="${studio.whatsapp}" ${external}>Prenota su WhatsApp ${waIcon}</a>
  </nav>`;
}

export function renderFooter(homePath = '') {
  return `
  <footer class="footer"><div class="footer-main"><div class="footer-brand"><a class="brand" href="${homePath}#home" aria-label="Bealab, inizio pagina">${mark}</a><p>Professionalità, una chiacchiera<br>e un momento per te. A Torino, dal ${studio.openingYear}.</p></div><div class="footer-links"><span class="eyebrow">ESPLORA</span><a href="${homePath}#filosofia">Il nostro mondo</a><a href="${homePath}#squadra">Quelle di Bealab</a><a href="${homePath}#trattamenti">I trattamenti</a><a href="${homePath}#contatti">Dove siamo</a></div><div class="footer-links"><span class="eyebrow">RESTIAMO IN CONTATTO</span><a href="${studio.phoneHref}">${studio.phone}</a><a href="${studio.whatsapp}" ${external}>Scrivici su WhatsApp ${icon('arrow-up-right')}</a><p>${studio.address}<br>${studio.postalCode} ${studio.city}</p>${socialLinks ? `<div class="footer-socials">${socialLinks}</div>` : ''}</div><a class="back-top" href="${homePath}#home" aria-label="Torna all’inizio">${icon('arrow-up-right')}</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Bealab – Beauty Studio</span><div class="footer-legal"><span>${esc(legal.owner)} · ${esc(legal.businessType)}</span><span>P. IVA ${esc(legal.vatNumber)} · REA ${esc(legal.rea)}</span><span>Sede legale · ${esc(legal.registeredOffice)}</span></div><button class="privacy-link" data-privacy>Informativa privacy</button></div></footer>
  <a class="floating-whatsapp" href="${studio.whatsapp}" ${external} aria-label="Contatta Bealab su WhatsApp">${waIcon}<span>Parliamone</span></a>`;
}

export function renderDialog() {
  return `<dialog class="content-dialog" id="content-dialog" aria-labelledby="dialog-title"><div class="dialog-toolbar"><button class="dialog-close" aria-label="Chiudi finestra">${icon('x')}</button></div><div id="dialog-content"></div></dialog>`;
}

export function renderHome() {
  return `
  <div class="brand-intro" hidden>
    <div class="intro-flower" aria-hidden="true">${Array.from({ length: 8 }, (_, i) => `<span class="intro-petal" style="--petal-angle:${i * 45}deg;--petal-delay:${i * 35}ms"></span>`).join('')}</div>
    <div class="intro-identity" aria-hidden="true"><span class="eyebrow">BENVENUTA NEL MONDO BEALAB</span>${mark}<p>Un momento <em>per te.</em></p></div>
    <span class="intro-caption" aria-hidden="true">CURA. EQUILIBRIO. BELLEZZA.</span>
    <button class="intro-skip" type="button" aria-label="Salta l’introduzione ed entra nel sito">Entra ${icon('arrow-right')}</button>
  </div>
${renderHeader()}
  <main id="main">
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero-copy">
        <span class="eyebrow"><span class="small-line"></span> CENTRO ESTETICO A TORINO · DAL ${studio.openingYear}</span>
        <h1 id="hero-title">La bellezza<br>di sentirsi<br><em>bene.</em></h1>
        <p>A Santa Rita, Bealab è il tuo centro estetico per manicure, pedicure, trattamenti viso e corpo, ciglia, sopracciglia ed epilazione laser.</p>
        <a class="button button-dark" href="#trattamenti">Scopri i trattamenti ${icon('arrow-up-right')}</a>
        <a class="hero-book text-link" href="${studio.whatsapp}" ${external}>Prenota un appuntamento ${icon('arrow-up-right')}</a>
        <a class="hero-scroll" href="#filosofia"><span class="circle-arrow">${icon('arrow-down')}</span> PRENDITI IL TUO TEMPO</a>
      </div>
      <div class="hero-visual">
        <div class="hero-image-frame"><img class="hero-photo" src="${assetUrl('/images/bealab-squadra.webp')}" srcset="${assetUrl('/images/bealab-squadra-720.webp')} 720w, ${assetUrl('/images/bealab-squadra.webp')} 1440w" sizes="(max-width: 700px) calc(100vw - 76px), 50vw" width="1440" height="1440" alt="Le quattro componenti della squadra Bealab" fetchpriority="high"></div>
        <div class="hero-image-shade"></div>
        <div class="hero-image-note"><span>BEAUTY IS A FEELING.</span><p>Entra, rilassati.<br>Sei da Bealab.</p></div>
        <div class="round-seal"><span>UN MOMENTO</span>${icon('flower-2')}<span>SOLO PER TE</span></div>
        <span class="hero-side-note">CURA. EQUILIBRIO. BELLEZZA.</span>
      </div>
    </section>
    <div class="manifesto-strip"><span>Professionalità, senza formalità.</span><span class="strip-flower">${icon('flower-2')}</span><span>Una chiacchiera. Una coccola.</span><span class="strip-flower">${icon('flower-2')}</span><span>Sentiti come a casa.</span></div>

    <section class="about section-pad" id="filosofia" aria-labelledby="about-title">
      <div class="about-visual reveal"><img src="${assetUrl('/images/bealab-cabina.webp')}" alt="La cabina trattamenti Bealab con il lettino, gli accessori e la lampada accesa" loading="lazy" width="960" height="1280"><div class="about-image-note">Una chiacchiera.<br><em>Un momento per te.</em></div></div>
      <div class="about-copy reveal"><span class="eyebrow">IL MONDO BEALAB</span><h2 id="about-title">Professionalità sì.<br><em>Senza troppe formalità.</em></h2><p>Nel ${studio.openingYear} abbiamo aperto le porte di Bealab con un’idea semplice: prenderci cura di te con professionalità, facendoti sentire a tuo agio fin dal primo momento.</p><p>Qui si ride, si chiacchiera e ci si rilassa. Ci piace conoscerti, ascoltare quello che cerchi e rendere ogni appuntamento un momento piacevole, con la leggerezza di sentirsi a casa.</p><a class="text-link" href="#squadra">Conosci quelle di Bealab ${icon('arrow-up-right')}</a><div class="about-signature">Ti aspettiamo, Giulia e la squadra.</div></div>
    </section>

    <section class="team-section section-pad" id="squadra" aria-labelledby="team-title">
      <div class="section-heading reveal"><div><span class="eyebrow">LA NOSTRA SQUADRA</span><h2 id="team-title">Siamo noi.<br><em>Quelle di Bealab.</em></h2></div><div class="heading-aside team-intro"><p>Giulia, Alessia, Ilenia e Marika.<br>Energie diverse, la stessa missione: farti sentire bene, in relax e a tuo agio.</p></div></div>
      <div class="team-grid">${team.map((person, index) => `
        <article class="team-card reveal">
          <div class="team-photo"><img src="${person.image}" alt="${esc(person.alt)}" width="800" height="1000" loading="lazy"></div>
          <div class="team-person">
            <h3>${esc(person.name)}</h3>
            <span>${esc(person.role)}</span>
            <button class="text-link team-profile-link" type="button" data-team-profile="${index}">Conosci ${esc(person.name)} ${icon('arrow-up-right')}</button>
          </div>
        </article>`).join('')}</div>
      <p class="team-note reveal">${icon('heart-handshake')} Qui si ride, si chiacchiera e ci si sente come a casa.</p>
    </section>

    <section class="treatments section-pad" id="trattamenti" aria-labelledby="treatments-title">
      <div class="section-heading reveal"><div><span class="eyebrow">I NOSTRI TRATTAMENTI</span><h2 id="treatments-title">Ogni bellezza ha<br><em>il suo rituale.</em></h2></div><div class="heading-aside"><p>Dalle mani al viso, un’attenzione speciale<br>per ogni parte di te.</p><a href="${studio.whatsapp}" class="text-link" ${external}>Troviamo il tuo trattamento ${icon('arrow-up-right')}</a></div></div>
      <div class="treatment-grid">${treatments.map(treatment => {
        const href = treatmentHref(treatment.id);
        return `<article class="treatment-card reveal">
          <a class="treatment-image" href="${href}" data-treatment="${esc(treatment.id)}" aria-label="Scopri ${esc(treatment.name)}">
            <img src="${esc(treatment.cardImage || treatment.image)}" alt="${esc(treatment.cardAlt || treatment.alt)}" style="object-position:${esc(treatment.cardPosition || treatment.position)}" loading="lazy" width="700" height="850">
            <span class="treatment-open">${icon('plus')}</span>
          </a>
          <div class="treatment-info">
            <h3>${esc(treatment.name)}</h3><p>${esc(treatment.short)}</p>
            <a class="text-link" href="${href}" data-treatment="${esc(treatment.id)}">${esc(treatment.detailsLabel || 'Servizi e lavori')} ${icon('arrow-up-right')}</a>
          </div>
        </article>`;
      }).join('')}</div>
      <p class="section-footnote">Contatta il centro per informazioni sui trattamenti, modalità e prezzi.</p>
    </section>

    <section class="values section-pad" id="valori" aria-labelledby="values-title"><div class="values-title reveal"><span class="eyebrow">LA DIFFERENZA È NELLA CURA</span><h2 id="values-title">La differenza è nei dettagli.<br><em>E nel modo di accoglierti.</em></h2></div><div class="values-grid">${values.map(v=>`<article class="value-item reveal">${icon(v.icon)}<h3>${v.title}</h3><p>${v.text}</p></article>`).join('')}</div></section>

    <section class="reviews section-pad" id="recensioni" aria-labelledby="reviews-title"><div class="reviews-symbol">“</div><span class="eyebrow reveal">LA VOSTRA FIDUCIA</span><h2 id="reviews-title" class="reveal">La vostra fiducia è<br><em>la nostra soddisfazione.</em></h2>${studio.reviews.length ? `<p class="reviews-intro reveal">Esperienze condivise su Google Maps.</p><div class="reviews-grid">${studio.reviews.map(r=>`<blockquote class="review-card"><div class="review-rating" role="img" aria-label="${r.rating} su 5 stelle"><span aria-hidden="true">${'★'.repeat(r.rating)}</span></div><p>“${esc(r.text)}”</p><footer class="review-attribution"><cite>${esc(r.author)}</cite>${r.sourceUrl ? `<a class="review-source" href="${safeUrl(r.sourceUrl)}" ${external}>Leggi la recensione originale ${icon('external-link')}</a>` : '<span class="review-source">Google Maps</span>'}</footer></blockquote>`).join('')}</div>` : `<p class="reviews-intro reveal">Il racconto più bello è quello di chi ci sceglie.<br>Scopri le esperienze condivise su Google.</p><div class="review-placeholder reveal"><span class="eyebrow">UNO SPAZIO PER LE VOSTRE PAROLE</span><p>Le recensioni autentiche saranno aggiunte dopo la verifica e l’autorizzazione alla pubblicazione.</p><span class="demo-tag">ANTEPRIMA DEMO</span></div>`}<a class="text-link" href="${safeUrl(studio.googleReviewsUrl||studio.maps)}" ${external}>${studio.googleReviewsUrl ? 'Leggi le recensioni su Google Maps' : 'Trova Bealab su Google'} ${icon('arrow-up-right')}</a></section>

    <section class="booking section-pad" id="prenota" aria-labelledby="booking-title"><div class="booking-orbit orbit-one"></div><div class="booking-orbit orbit-two"></div><div class="booking-content reveal"><span class="eyebrow">NON È SOLO UN APPUNTAMENTO. È IL TUO MOMENTO.</span><h2 id="booking-title">Il tuo momento di<br>benessere <em>ti aspetta.</em></h2><p>Per informazioni o per un appuntamento, scrivici.<br class="desktop-break"> Troviamo insieme il tuo momento, con la semplicità di una chiacchiera.</p><div class="booking-buttons"><a class="button button-ivory" href="${studio.whatsapp}" ${external}>${waIcon} Prenota su WhatsApp ${icon('arrow-up-right')}</a><a class="button button-outline-light" href="${studio.phoneHref}">${icon('phone')} Chiama il centro</a>${instagram ? `<a class="button button-outline-light booking-instagram" href="${safeUrl(instagram.url)}" ${external}>${icon('instagram')} Scrivici su Instagram ${icon('arrow-up-right')}</a>` : ''}</div><span class="booking-small">UN MESSAGGIO, IL PRIMO GESTO DI CURA.</span></div></section>

    <section class="contact section-pad" id="contatti" aria-labelledby="contact-title"><div class="contact-copy reveal"><span class="eyebrow">CI TROVI QUI</span><h2 id="contact-title">Un angolo di bellezza,<br><em>a Torino.</em></h2><p>Passa a trovarci in Corso Giovanni Agnelli,<br>nel quartiere Santa Rita. Ti aspettiamo!</p><div class="contact-details"><div>${icon('map-pin')}<div><h3>Vieni a trovarci</h3><p>${studio.address}<br>${studio.postalCode} ${studio.city}</p></div></div><div>${icon('phone')}<div><h3>Parliamone</h3><a href="${studio.phoneHref}">${studio.phone}</a>${emailLink}</div></div><div class="contact-hours">${icon('clock-3')}<div class="contact-hours-content"><h3>I nostri orari</h3>${studio.hours.length ? `<table class="opening-hours" aria-label="Orari di apertura"><tbody>${studio.hours.map(h=>`<tr><th scope="row">${esc(h.day)}</th><td>${esc(h.time)}</td></tr>`).join('')}</tbody></table>` : `<p>Contattaci per conoscere gli orari<br>e concordare il tuo appuntamento.</p>`}</div></div></div><a class="text-link" href="${studio.maps}" ${external}>Indicazioni stradali ${icon('arrow-up-right')}</a>${socialLinks ? `<div class="contact-socials">${socialLinks}</div>` : ''}</div><div class="map-panel reveal" id="map-panel"><div class="map-illustration" aria-hidden="true"><span class="map-block block-a"></span><span class="map-block block-b"></span><span class="map-block block-c"></span><span class="map-block block-d"></span><span class="map-road road-one"></span><span class="map-road road-two"></span><span class="map-road road-three"></span><span class="map-road-label">CORSO GIOVANNI AGNELLI</span><span class="map-pin">${icon('map-pin')}</span></div><div class="map-card"><span class="map-card-brand">Bealab</span><p>Corso Giovanni Agnelli 52/C · Torino</p><button id="load-map" class="text-link">Carica Google Maps ${icon('arrow-up-right')}</button><small>Schema illustrativo. Caricando la mappa ti colleghi a Google.</small></div></div></section>
  </main>
${renderFooter()}
  ${renderDialog()}`;
}
