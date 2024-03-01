
$('header.header').clone().addClass('header_fixed').prependTo('body');

$(window).scroll(function () {
  if ($(this).scrollTop() > 250) {
    $('.header_fixed').addClass('header_show');
  } else {
    $('.header_fixed').removeClass('header_show');
  }
});





/***burger***/
function openMenu() {
  $menuTab.addClass("active");
}

function closeMenu() {
  $menuTab.removeClass("active");
}

var $burgerOpen = $(".navigation__inner > img");
var $menuTab = $(".mobile-menu");
var $burgerClose = $(".mobile-menu__burger");

$burgerOpen.on("click", openMenu);

$burgerClose.on("click", closeMenu);

var catButton = document.querySelector(".mobile-menu__catalog");
var catMenuOpen = document.querySelector(".mobile-menu__catalog-list");
var buttonMobMen = document.querySelector(".mobile-footer__button-hidden");
var catArrow = document.querySelector(".mob-arrow");

catButton.addEventListener("click", function() {
  catMenuOpen.classList.toggle("active");
  buttonMobMen.classList.toggle("active");
  catArrow.classList.toggle("active");
});

var menuSearch = document.querySelector(".search__menu");
var buttonSearch = document.querySelector(".button-search");
document.querySelector(".white-button-search").onclick = function () {
  menuSearch.classList.toggle("active");
};


var resultSearch = document.querySelector(".search__result");
document.querySelector(".button-search-menu").onclick = function () {
  resultSearch.classList.toggle("active");
};
document.querySelector(".button-search").onclick = function () {
  menuSearch.classList.toggle("active");
};


document.addEventListener('click', function( event ) {
  if (
    menuSearch !== event.target
    && !menuSearch.contains(event.target)
    && buttonSearch !== event.target
    && !buttonSearch.contains(event.target)
  ) {    
    menuSearch.classList.remove('active');
  }
});


var catalogList = document.querySelector(".catalog__popup");
var catalogFiltrIcon = document.querySelector(".catalog__filter-icon");
var catalogFilter = document.querySelector(".catalog__filter");

if (catalogList && catalogFiltrIcon && catalogFilter) {
  catalogFilter.onclick = function () {
    catalogList.classList.toggle("active");
    catalogFiltrIcon.classList.toggle("active");
  };
}

var list1 = document.querySelector(".list1");
var listRow = document.querySelector(".catalog-hover");
var tab1 = document.getElementById("tab1");

if (list1 && listRow && tab1) {
  tab1.onclick = function () {
    list1.classList.toggle("active");
    listRow.classList.toggle("active");
  };
}

var list2 = document.querySelector(".list2");
var listRow2 = document.querySelector(".catalog-hover2");
var tab2 = document.getElementById("tab2")

if (list2 && listRow2 && tab2) {
  tab2.onclick = function () {
    list2.classList.toggle("active");
    listRow2.classList.toggle("active");
  };
}



$(function () {
  // var controller = new ScrollMagic.Controller({
  //   globalSceneOptions: {
  //     triggerHook: 'onLeave',
  //     duration: "200%"
  //   }
  // });

  // var slides = document.querySelectorAll(".about_history__item");

  // for (var i=0; i<slides.length; i++) {
  //   new ScrollMagic.Scene({
  //       triggerElement: slides[i]
  //     })
  //     .setPin(slides[i], {pushFollowers: false})
  //     // .addIndicators() // add indicators (requires plugin)
  //     .addTo(controller);
  // }


  var serviceSlider = new Swiper('.service_slider', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true
  });


  var breakpoint = window.matchMedia( '(min-width:769px)' );
  var breakpoint2 = window.matchMedia( '(min-width:1025px)' );
  var mySwiperAbout;
  var mySwiperServices1;
  var mySwiperServices2;


  var breakpointChecker = function() {
    if ( breakpoint.matches === true ) {
      if ( mySwiperAbout !== undefined ) mySwiperAbout.destroy( true, true );
      if ( mySwiperServices2 !== undefined ) mySwiperServices2.destroy( true, true );
      return;
    } else if ( breakpoint.matches === false ) {
      return enableSwiper();
    }
  };

  var enableSwiper = function() {
    mySwiperAbout = new Swiper ('.partner_instruments__list_wrap', {
      grid: {
        rows: 2,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      mousewheel: false,
      pagination: {
        el: ".swiper-pagination",
      },
    });

    mySwiperServices2 = new Swiper ('.services_bottom_list', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      mousewheel: false,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  var breakpointChecker2 = function() {
    if ( breakpoint2.matches === true ) {
      if ( mySwiperServices1 !== undefined ) mySwiperServices1.destroy( true, true );
      return;
    } else if ( breakpoint2.matches === false ) {
      return enableSwiper2();
    }
  };

  var enableSwiper2 = function() {
    mySwiperServices1 = new Swiper ('.service-types', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      mousewheel: false,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  };

  breakpoint2.addListener(breakpointChecker2);
  breakpointChecker2();
});



