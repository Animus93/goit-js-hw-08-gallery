// Создай галерею с возможностью клика по ее элементам и просмотра 
// полноразмерного изображения в модальном окне.

// Создание и рендер разметки по массиву данных galleryItems из app.js и 
// предоставленному шаблону.

// Реализация делегирования на галерее ul.js-gallery и получение url 
// большого изображения.

// Открытие модального окна по клику на элементе галереи.

// Подмена значения атрибута src элемента img.lightbox__image.

// Закрытие модального окна по клику на кнопку 
// button[data-action="close-lightbox"].

// Очистка значения атрибута src элемента img.lightbox__image. Это 
// необходимо для того, чтобы при следующем открытии модального окна, пока 
// грузится изображение, мы не видели предыдущее.

// Следующий функционал не обязателен при сдаче задания, но будет хорошей 
// практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.

// Закрытие модального окна по нажатию клавиши ESC.

// Пролистывание изображений галереи в открытом модальном окне 
// клавишами "влево" и "вправо".

// Ссылка на оригинальное изображение должна храниться в data-атрибуте 
// source на элементе img, и указываться в href ссылки (это необходимо 
// для доступности).

import galleryItems from './source.js';

const refs = {
    ulGallery: document.querySelector('.js-gallery'),
    divLightbox: document.querySelector('.js-lightbox'),
    divLightboxContent: document.querySelector('.lightbox__content'),
    divLightboxImg: document.querySelector('.lightbox__image'),
};

galleryItems.forEach((item, index) => 
refs.ulGallery.insertAdjacentHTML('beforeEnd',`<li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
    <img
      data-index = ${index}
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`
));
refs.ulGallery.addEventListener('click', openModal);

function openModal (event) {
  event.preventDefault();
  event.target.nodeName === "IMG"?
    onOpenModal(event.target.dataset.source, event.target.dataset.index) 
    : null;
};

function onOpenModal (url, index) {
  window.addEventListener('keydown',onEscape);
  refs.divLightbox.addEventListener('click',onEscape);
  refs.divLightboxImg.dataset.index = index;
  refs.divLightboxImg.src = url;
  refs.divLightbox.classList.add("is-open");
};

function onEscape (event) {
  if(event.target.dataset.action === "close-lightbox" || event.target.className === "lightbox__overlay" || event.code === 'Escape' ){
    closeModal();
  }};

function closeModal () {
  refs.divLightbox.classList.remove("is-open");
  updateSource();
  window.removeEventListener('keydown',onEscape);
  refs.divLightbox.removeEventListener('click',onEscape);
};

function updateSource(index = '') {
  refs.divLightboxImg.dataset.index = index;
  if(index === ''){
    return refs.divLightboxImg.src = index;
  };
  refs.divLightboxImg.src = refs.ulGallery.children[index].firstElementChild.href;
};

window.addEventListener('keydown', (event)=>{
  if(refs.divLightbox.classList.contains('is-open')){
    let currentIndex = Number(refs.divLightboxImg.dataset.index);
      if(event.code === 'ArrowRight'){
        currentIndex += 1;
        if(currentIndex > galleryItems.length-1){
          currentIndex = 0;
        }
          updateSource(currentIndex);
        } 
      if(event.code === 'ArrowLeft'){
      currentIndex -= 1;
        if(currentIndex < 0){
          currentIndex = galleryItems.length-1;
        };
          updateSource(currentIndex);
        };
  };
});
