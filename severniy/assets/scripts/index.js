const initTabs = () => {
  const tabs = [...document.querySelectorAll(".tabs")];
  const tabsStartIndex = localStorage.getItem("tab-index") || 0;
  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      const tabContent = [...tab.querySelectorAll(".tabs__content")];
      const tabLinks = [...tab.querySelectorAll(".tabs__link")];

      const openTab = (tabIndex = 0) => {
        tabContent.forEach((element, i) => {
          const isActive = i === tabIndex;
          element.classList.toggle("active", isActive);
        });
        tabLinks.forEach((element, i) => {
          element.classList.toggle("active", i === tabIndex);
        });
      };

      openTab(+tabsStartIndex);
      localStorage.setItem("tab-index", 0);

      tabLinks.forEach((link, i) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          openTab(i);
        });
      });
    });
  }
};

const showPopup = popupId => {
  const popup = document.querySelector(popupId);
  if (!popup) return

  hideAllPopups();

  popup.classList.add('popup--active');
  document.body.classList.add('no-scroll');

  document.addEventListener('click', checkTargetOrKey);
  document.addEventListener('keyup', checkTargetOrKey);
};

const hideAllPopups = () => {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    popup.classList.remove('popup--active');
  });
  document.body.classList.remove('no-scroll');

  document.removeEventListener('click', checkTargetOrKey);
  document.removeEventListener('keyup', checkTargetOrKey);
};


const checkTargetOrKey = event => {
  if (
      event.target.classList.contains('popup__wrapper') ||
      event.key === 'Escape' ||
      event.target.closest('.popup__close')
  ) {
      event.preventDefault();
      hideAllPopups();
  }
};

document.addEventListener('DOMContentLoaded', () => {

  initTabs();

  var swiper = new Swiper(".features-nav", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });

  var heroSlider = new Swiper(".hero-slider", {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination'
    },
    effect: 'fade',
    speed: 500,
    fadeEffect: {
      crossFade: true
    },
  });

  var objectSlider = new Swiper(".place-slider", {
    spaceBetween: 10,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
    },
    speed: 700,
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
      }
    }
  });

  var featuresSlider = new Swiper(".features-slider", {
    slidesPerView: 1,
    effect: 'fade',
    speed: 500,
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: swiper,
    },
    navigation: {
      nextEl: '.features-slider-button-next',
      prevEl: '.features-slider-button-prev',
    },
  });

  const rangeArray = document.querySelectorAll('.js-range');
  if (rangeArray.length > 0) {
    rangeArray.forEach(range => {
      const rangeElement = range.querySelector('.range-slider'),
        rangeMax = rangeElement.dataset.max,
        rangeMin = rangeElement.dataset.min,
        rangeInputMin = range.querySelector('.js-range-from-input'),
        rangeInputMax = range.querySelector('.js-range-to-input');
      if (rangeInputMin && rangeInputMax) {
        const rangeSliderElement = rangeSlider(rangeElement, {
          min: rangeMin,
          max: rangeMax,
          step: rangeElement.dataset.step,
          value: [rangeMin, rangeMax],
          disabled: false,
          rangeSlideDisabled: false,
          thumbsDisabled: [false, false],
          orientation: 'horizontal',
          onInput: function (valueSet) {

            if (rangeElement.classList.contains('range-slider--price')) {
              rangeInputMin.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(valueSet[0]);
              rangeInputMax.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(valueSet[1]);
            } else {
              rangeInputMin.textContent = valueSet[0];
              rangeInputMax.textContent = valueSet[1];
            }
          },
        });

        if (rangeElement.classList.contains('range-slider--price')) {
          rangeInputMin.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(rangeSliderElement.value()[0]);
          rangeInputMax.textContent = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(rangeSliderElement.value()[1]);
        } else {
          rangeInputMin.textContent = rangeSliderElement.value()[0];
          rangeInputMax.textContent = rangeSliderElement.value()[1];
        }
      }
    });
  }


  const popupButtonArray = document.querySelectorAll('[data-popup]');

  if (popupButtonArray.length) {
    popupButtonArray.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        showPopup(`${button.dataset.popup}`);
      });
    });
  }
});