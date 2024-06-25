const brands_slider = new Swiper(".brands_slider", {
  slidesPerView: 5,
  spaceBetween: 44,
  speed: 2500,
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    enabled: true,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    500: {
      slidesPerView: 4,
      spaceBetween: 44,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 44,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 44,
    },
    1200: {
      slidesPerView: 4,
    },
    1520: {
      slidesPerView: 5,
    },
  },
});

/***contact_slider***/
const contactSlider = new Swiper(".contact_slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 5000,
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    enabled: true,
    disableOnInteraction: false,
  },
});
/***servis***/
const servicesSwiper = new Swiper(".services__swiper", {
  // Optional parameters
  direction: "horizontal",
  spaceBetween: 20,
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
/***popular***/
const popularSwiperOpt = {
  // Optional parameters
  direction: "horizontal",
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 'auto',
  slidesPerClick: 1,
  loop: false,
  // If we need pagination
  breakpoints: {
    1024: {
      slidesPerView: 4,
    }
  }
};
const popularSwiper = new Swiper(".popular__slider", popularSwiperOpt);

/***coopaeration****/
$(function () {
  const cooperateSwiperOpt = {
    // Optional parameters
    direction: "horizontal",
    spaceBetween: 20,
    loop: false,
    autoHeight: true,
    enabled: false,
    observer: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    }
  };
  var cooperateSwiper = new Swiper(".cooperation__slider", cooperateSwiperOpt);
  let $window = $(window);
  function reloadCoopSlider(init) {
    if ($window.width() > 767) {
      init.disable();
    } else {
      init.enable();
    }
  }
  reloadCoopSlider(cooperateSwiper);
  $window.on('resize', function (){
    reloadCoopSlider(cooperateSwiper);
  });

});
/***servis***/
const weworkSwiper = new Swiper(".we-work__swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
