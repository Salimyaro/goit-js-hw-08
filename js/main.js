import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.js-lightbox img'),
};

galleryItems.forEach(({ preview, original, description }, index) =>
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
			<a
				class="gallery__link"
				href="${original}"
			>
				<img
					class="gallery__image"
					src="${preview}"
					data-source="${original}"
					data-index="${index}"
					alt="${description}"
				/>
			</a>
		</li>`,
  ),
);

let activeIndex;

refs.gallery.addEventListener('click', galleryClickCb);
refs.lightbox.addEventListener('click', lightboxClickCb);

function openModal() {
  refs.lightbox.classList.add('is-open');
}
function closeModal() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
  window.removeEventListener('keydown', windowKeydownCb);
}
function galleryClickCb(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightboxImg.src = event.target.dataset.source;
  openModal();
  window.addEventListener('keydown', windowKeydownCb);
  activeIndex = +event.target.dataset.index;
}
function lightboxClickCb(event) {
  if (
    event.target.nodeName === 'DIV' ||
    event.target.dataset.action === 'close-lightbox'
  ) {
    closeModal();
  }
}
function windowKeydownCb({ key }) {
  if (key === 'Escape') {
    closeModal();
  }
  if (key === 'ArrowLeft') {
    if (activeIndex >= 1) {
      refs.lightboxImg.src = galleryItems[activeIndex - 1].original;
      activeIndex -= 1;
    } else {
      refs.lightboxImg.src = galleryItems[galleryItems.length - 1].original;
      activeIndex = galleryItems.length - 1;
    }
  }
  if (key === 'ArrowRight') {
    if (activeIndex < galleryItems.length - 1) {
      refs.lightboxImg.src = galleryItems[activeIndex + 1].original;
      activeIndex += 1;
    } else {
      refs.lightboxImg.src = galleryItems[0].original;
      activeIndex = 0;
    }
  }
}
