import images from "../gallery-items.js";

const gallery = document.querySelector(".js-gallery");

const cardsMarkup = createImagesCardMarkup(images);

const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

const lightBoxImage = document.querySelector(".lightbox__image");
const lightBox = document.querySelector(".lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");

let index = 0;
// індекс для роботи з стрілками


gallery.insertAdjacentHTML("beforeend", cardsMarkup);

function createImagesCardMarkup(images) {
  return images
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
      data-index = ${index}
    />
  </a>
</li>`;
    })
    .join("");
}

gallery.addEventListener("click", openModalWindow);
closeModalBtn.addEventListener("click", onCloseModalWindow);
lightboxOverlay.addEventListener("click", onCloseModalWindow);

function openModalWindow(event) {
  event.preventDefault();
  window.addEventListener("keydown", pressHandler);

  lightBox.classList.add("is-open");
  lightBoxImage.src = event.target.dataset.source;
  lightBoxImage.index = +event.target.dataset.index;
  // при відкритті призначаємо перший індекс з data - index;
  // console.log(lightBoxImage.index (повертає інд. фото на який ми нажали при відкритті.це строка - запис +event.target.dataset.index; + перетворює в число));
}


function onCloseModalWindow() {
  window.removeEventListener("keydown", pressHandler);
  lightBox.classList.remove("is-open");
  lightBoxImage.src = "";
}

// функція для прослухов. клавіатури.
function pressHandler(event) {
  if (event.code === "Escape") onCloseModalWindow();
  if (event.code === 'ArrowRight') next()
  if (event.code === 'ArrowLeft') prev()
}
// функ. для гортання стілки в перед
function next() {
  const nextIndex = ++index;
  // збільшуємо і перевіряємо чи є такий елемент, якщо є, то міняємо значення на наступний елемент, якщо немає, то починаємо з першого
  images[nextIndex] ?
    lightBoxImage.srs = images[nextIndex].original
    : index = 0, lightBoxImage.src = images[index].original
}

// функ. для гортання стілки в назад
function prev() {
  const prevIndex = --index;
  console.log(prevIndex);
  images[prevIndex] ? lightBoxImage.src = images[prevIndex].original :
    index = images.length - 1, lightBoxImage.src = images[index].original
}



