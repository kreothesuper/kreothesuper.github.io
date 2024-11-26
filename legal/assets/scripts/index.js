// popup control function
const checkTargetOrKey = event => {
	if (
		event.target.classList.contains('popup__wrapper') ||
		event.key === 'Escape' ||
		event.target.closest('.popup__close')
	) {
		hideAllPopups();
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

const initTabs = () => {
	const tabs = [...document.querySelectorAll(".tabs")];

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
			}

			openTab(0)

			tabLinks.forEach((link, i) => {
				link.addEventListener("click", (e) => {
					e.preventDefault();
					openTab(i);
				});
			});
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initTabs();
	AOS.init({
		disable: "phone",
		duration: 800,
		delay: 100,
		once: true,
	});
	gsap.registerPlugin(ScrollToPlugin);
	const anchors = document.querySelectorAll('a[href*="#"]');
	for (let anchor of anchors) {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			if(!anchor.hash.length > 0) return
			const blockID = anchor.getAttribute("href");
			gsap.to(window, { duration: 1.2, scrollTo: blockID });
		});
	}
	const servicesSwiper = new Swiper(".services-swiper", {
		slidesPerView: "auto",
		speed: 800,
		spaceBetween: 40,
		a11y: {
			slideRole: "button",
		},
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".services-btn__next",
			prevEl: ".services-btn__prev",
			disabledClass: "btn-disabled",
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		breakpoints: {
			1: {
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 30,
			},
			1050: {
				spaceBetween: 40,
			},
		},
		observer: true,
		observeSlideChildren: true,
		observeParents: true,
	});
	const popupSwiper = new Swiper(".popup-swiper", {
		slidesPerView: 1,
		speed: 800,
		spaceBetween: 40,
		allowTouchMove: false,
		pagination: {
			el: ".popup-swiper__pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".popup-btn__next",
			prevEl: ".popup-btn__prev",
			disabledClass: "btn-disabled",
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
		breakpoints: {
			1: {
				autoHeight: true,
				spaceBetween: 20,
			},
			768: {
				autoHeight: true,
				spaceBetween: 30,
			},
			1050: {
				autoHeight: true,
				spaceBetween: 40,
			},
			1440: {
				autoHeight: false,
			},
		},
		observer: true,
		observeSlideChildren: true,
		observeParents: true,
	});
	let checkScroll = false;
	function disableScroll() {
		if (!checkScroll) {
			checkScroll = true;
			let pagePosition = window.scrollY;
			document.body.classList.add("disable-scroll");
			document.body.dataset.position = pagePosition;
			document.body.style.top = -pagePosition + "px";
			document.querySelector(".body-wrapper").setAttribute("tabindex", -1);
		}
	}
	function enableScroll() {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		document.body.style.top = "auto";
		document.body.classList.remove("disable-scroll");
		window.scroll({ top: pagePosition, left: 0 });
		document.body.removeAttribute("data-position");
		document.querySelector(".body-wrapper").setAttribute("tabindex", 0);
		checkScroll = false;
	}
	const servicesCards = document.querySelectorAll(".services-card");
	servicesCards.forEach((card) => {
		card.addEventListener("click", () => {
			disableScroll();
			document.querySelector(".popup").classList.add("open");
			popupSwiper.slideTo(servicesSwiper.clickedIndex, 0);
		});
	});
	const popups = document.querySelectorAll(".popup:not(.js-popup)");
	popups.forEach((popup) => {
		popup.addEventListener("click", (e) => {
			if (
				e.target.classList.contains("popup") ||
				e.target.classList.contains("popup-close")
			) {
				popup.classList.remove("open");
				enableScroll();
			}
		});
	});
	if (window.innerWidth < 577) {
		const servicesBtns = document.querySelector(".services-btns");
		document.querySelector(".services-swiper").after(servicesBtns);
	}


	// popup buttons init
	const popupButtons = document.querySelectorAll('[data-popup]');
	const popupsArray = document.querySelectorAll('.js-popup');

	if (popupsArray.length) {
		popupButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				e.preventDefault();

				const popupId = button.dataset.popup
				showPopup(popupId);
			});
		});
	}
});
