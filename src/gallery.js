const esc = text => String(text).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function photoTile(photo, index) {
  return `<a class="gallery-tile" href="${esc(photo.image)}" data-photo-index="${index}" aria-label="Ingrandisci: ${esc(photo.caption)}">
    <span class="gallery-tile-image"><img src="${esc(photo.thumbnail)}" alt="" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"><span class="gallery-zoom" aria-hidden="true"><i data-lucide="plus"></i></span></span>
    <span class="gallery-tile-caption">${esc(photo.caption)}</span>
  </a>`;
}

export function galleryMarkup(photos, {
  eyebrow = 'FATTO DA NOI, PER TE',
  title = 'I nostri lavori',
  description = 'Una selezione di manicure realizzate da Bealab.',
  previewCount = 3,
  containImages = false,
  columns = 3,
  expandLabel = 'Vedi tutti i lavori',
} = {}) {
  return `<section class="treatment-gallery${containImages ? ' gallery-contain' : ''}" aria-labelledby="gallery-title">
    <span class="eyebrow">${esc(eyebrow)}</span>
    <h3 id="gallery-title">${esc(title)}</h3>
    <p>${esc(description)}<br>Tocca una foto per guardarla da vicino.</p>
    <div class="treatment-gallery-grid${photos.length === 2 || previewCount === 4 || columns === 2 ? ' gallery-pair' : ''}">${photos.slice(0, previewCount).map(photoTile).join('')}</div>
    ${photos.length > previewCount ? `<details class="gallery-more" data-preview-count="${previewCount}" data-expand-label="${esc(expandLabel)}">
      <summary class="text-link gallery-toggle"><span class="gallery-toggle-label">${esc(expandLabel)}</span><span class="gallery-total">${photos.length}</span><i data-lucide="arrow-down" aria-hidden="true"></i></summary>
      <div class="treatment-gallery-grid gallery-extra"></div>
    </details>` : ''}
  </section>`;
}

export function initPhotoGallery(contentDialog, refreshIcons, photoRegion = contentDialog) {
  let photos = [];
  let currentIndex = 0;
  let galleryTitle = 'Manicure · Bealab';
  const viewer = document.createElement('dialog');
  viewer.className = 'photo-dialog';
  viewer.setAttribute('aria-labelledby', 'photo-title');
  viewer.setAttribute('aria-describedby', 'photo-count');
  viewer.innerHTML = `<div class="photo-toolbar"><span class="eyebrow">MANICURE · BEALAB</span><button class="photo-close" type="button" aria-label="Chiudi foto"><i data-lucide="x" aria-hidden="true"></i></button></div>
    <div class="photo-stage"><img class="photo-image" alt="" decoding="async"></div>
    <div class="photo-navigation">
      <button class="photo-previous" type="button" aria-label="Foto precedente"><i data-lucide="arrow-left" aria-hidden="true"></i></button>
      <div class="photo-caption"><p id="photo-title"></p><span id="photo-count" aria-live="polite" aria-atomic="true"></span></div>
      <button class="photo-next" type="button" aria-label="Foto successiva"><i data-lucide="arrow-right" aria-hidden="true"></i></button>
    </div>`;
  document.body.append(viewer);
  refreshIcons();

  const image = viewer.querySelector('.photo-image');
  const caption = viewer.querySelector('#photo-title');
  const count = viewer.querySelector('#photo-count');
  const syncScrollLock = () => document.body.classList.toggle('dialog-open', contentDialog.open || viewer.open);

  function showPhoto(index) {
    if (!photos.length) return;
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    image.alt = `${galleryTitle}: ${photo.caption}`;
    image.src = photo.image;
    image.width = photo.width;
    image.height = photo.height;
    caption.textContent = photo.caption;
    count.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  photoRegion.addEventListener('click', event => {
    const trigger = event.target.closest('[data-photo-index]');
    if (!trigger || !photos.length || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    photoRegion.querySelectorAll('video').forEach(video => video.pause());
    showPhoto(Number(trigger.dataset.photoIndex));
    viewer.showModal();
    syncScrollLock();
  });
  photoRegion.addEventListener('toggle', event => {
    const details = event.target;
    if (!details.matches('.gallery-more')) return;
    const extra = details.querySelector('.gallery-extra');
    if (details.open && !extra.children.length) {
      const previewCount = Number(details.dataset.previewCount);
      extra.innerHTML = photos.slice(previewCount).map((photo, index) => photoTile(photo, index + previewCount)).join('');
      refreshIcons();
    }
    details.querySelector('.gallery-toggle-label').textContent = details.open ? 'Mostra meno' : details.dataset.expandLabel;
  }, true);

  viewer.querySelector('.photo-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.photo-previous').addEventListener('click', () => showPhoto(currentIndex - 1));
  viewer.querySelector('.photo-next').addEventListener('click', () => showPhoto(currentIndex + 1));
  viewer.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  let swipeStart;
  viewer.querySelector('.photo-stage').addEventListener('pointerdown', event => {
    swipeStart = event.pointerType === 'touch' ? { x: event.clientX, y: event.clientY } : null;
  });
  viewer.querySelector('.photo-stage').addEventListener('pointerup', event => {
    if (!swipeStart) return;
    const x = event.clientX - swipeStart.x;
    const y = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(x) > 45 && Math.abs(x) > Math.abs(y) * 1.3) showPhoto(currentIndex + (x < 0 ? 1 : -1));
  });
  viewer.querySelector('.photo-stage').addEventListener('pointercancel', () => { swipeStart = null; });
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const bounds = viewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    image.removeAttribute('src');
    syncScrollLock();
  });
  contentDialog.addEventListener('close', () => { if (viewer.open) viewer.close(); });

  return (nextPhotos, title = 'Manicure · Bealab') => {
    if (viewer.open) viewer.close();
    photos = nextPhotos;
    currentIndex = 0;
    galleryTitle = title;
    viewer.querySelector('.photo-toolbar .eyebrow').textContent = title.toLocaleUpperCase('it-IT');
    const singlePhoto = photos.length < 2;
    viewer.querySelector('.photo-navigation').classList.toggle('is-single', singlePhoto);
    viewer.querySelector('.photo-previous').hidden = singlePhoto;
    viewer.querySelector('.photo-next').hidden = singlePhoto;
  };
}
