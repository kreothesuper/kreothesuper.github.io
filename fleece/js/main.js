/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/import/components.js":
/*!*************************************!*\
  !*** ./src/js/import/components.js ***!
  \*************************************/
/***/ (() => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var initTabs = function initTabs() {
  var tabs = _toConsumableArray(document.querySelectorAll(".tabs"));
  if (tabs.length > 0) {
    tabs.forEach(function (tab) {
      var tabContent = _toConsumableArray(tab.querySelectorAll(".tabs__content"));
      var tabLinks = _toConsumableArray(tab.querySelectorAll(".tabs__link"));
      var openTab = function openTab() {
        var tabIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        tabContent.forEach(function (element, i) {
          var isActive = i === tabIndex;
          element.classList.toggle("active", isActive);
        });
        tabLinks.forEach(function (element, i) {
          element.classList.toggle("active", i === tabIndex);
        });
      };
      openTab(0);
      tabLinks.forEach(function (link, i) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          openTab(i);
        });
      });
    });
  }
};

// select functions
var selectInit = function selectInit() {
  var selectArray = document.querySelectorAll('.custom-select');
  if (selectArray.length > 0) {
    selectArray.forEach(function (element, index) {
      var selectTag = element.querySelector('select'),
        selectOption = selectTag.querySelectorAll('option');
      var selectWrapper = document.createElement('div'),
        selectLabel = document.createElement('div'),
        selectItemList = document.createElement('div'),
        selectLabelSpan = document.createElement('span');
      var selectItemArray = [];
      selectWrapper.classList.add('select__wrapper');
      selectLabel.classList.add('select__label');
      selectLabelSpan.classList.add('select__name');
      selectLabelSpan.textContent = selectTag[selectTag.selectedIndex].textContent;
      selectLabel.append(selectLabelSpan);
      selectItemList.classList.add('select__content', 'select__content--hidden');
      selectWrapper.append(selectLabel);
      element.append(selectWrapper);
      selectOption.forEach(function (element, index) {
        var selectItem = document.createElement('div');
        selectItem.classList.add('select__item');
        selectItem.textContent = element.textContent;

        // Check if the delegated event is triggered properly
        selectItem.addEventListener('click', function (e) {
          var selectItemTag = e.target.closest('.select').querySelector('select'),
            selectItemOptions = selectItemTag.querySelectorAll('option'),
            selectItems = e.target.closest('.select').querySelectorAll('.select__item');
          selectItemOptions.forEach(function (element, index) {
            if (element.textContent === selectItem.textContent) {
              selectItemTag.selectedIndex = index;
              selectLabelSpan.textContent = element.textContent;
              selectItems.forEach(function (item, itemIndex) {
                if (itemIndex === index) {
                  item.classList.add('select__item--hidden');
                } else {
                  item.classList.remove('select__item--hidden');
                }
              });

              // Trigger change event when selectIndex is changed
              var event = new Event('change', {
                bubbles: true
              });
              selectItemTag.dispatchEvent(event);
            }
          });
          selectLabel.click();
        });
        selectItemArray.push(selectItem);
        var selectItems = selectItemList.querySelectorAll('.select__item');
        selectItems.forEach(function (item, itemIndex) {
          if (itemIndex === selectTag.selectedIndex) {
            item.classList.add('select__item--hidden');
          } else {
            item.classList.remove('select__item--hidden');
          }
        });
        selectItemList.append(selectItem);
      });
      selectWrapper.append(selectItemList);

      // Check if the click event is properly handled
      selectLabel.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllSelect(selectLabel);
        window.innerHeight - selectItemList.getBoundingClientRect().bottom < 100 ? (selectItemList.classList.add('select__content--top'), selectLabel.classList.add('select__label--top')) : (selectItemList.classList.remove('select__content--top'), selectLabel.classList.remove('select__label--top'));
        selectItemList.classList.toggle('select__content--hidden');
        selectLabel.classList.toggle('select__label--active');
        element.classList.toggle('select--active');
      });
      selectTag.addEventListener('change', function () {
        var selectItemOptions = selectTag.options,
          selectedItem = selectItemOptions[selectTag.selectedIndex];
        selectLabelSpan.textContent = selectedItem.textContent;
      });
    });
    document.addEventListener('click', closeAllSelect);
  }
};
var showPopup = function showPopup(popupId) {
  var popup = document.querySelector(popupId);
  if (!popup) return;
  hideAllPopups();
  popup.classList.add('popup--active');
  document.body.classList.add('no-scroll');
  document.addEventListener('click', checkTargetOrKey);
  document.addEventListener('keyup', checkTargetOrKey);
};
var hideAllPopups = function hideAllPopups() {
  var popups = document.querySelectorAll('.popup');
  popups.forEach(function (popup) {
    popup.classList.remove('popup--active');
  });
  document.body.classList.remove('no-scroll');
  document.removeEventListener('click', checkTargetOrKey);
  document.removeEventListener('keyup', checkTargetOrKey);
};
var checkTargetOrKey = function checkTargetOrKey(event) {
  if (event.target.classList.contains('popup__wrapper') || event.key === 'Escape' || event.target.closest('.popup__close')) {
    event.preventDefault();
    hideAllPopups();
  }
};
var closeAllSelect = function closeAllSelect(select) {
  var selectContentArray = document.querySelectorAll('.select__content'),
    selectLabelArray = document.querySelectorAll('.select__label');
  selectLabelArray.forEach(function (element, index) {
    element !== select ? (element.classList.remove('select--active'), selectContentArray[index].classList.add('select__content--hidden')) : null;
  });
};
document.addEventListener('DOMContentLoaded', function () {
  selectInit();
  initTabs();
  var formArray = document.querySelectorAll('.form');
  if (formArray.length) {
    formArray.forEach(function (form) {
      var formInputArray = document.querySelectorAll('.form-input');
      if (!formInputArray.length) return;
      formInputArray.forEach(function (formInput) {
        var input = formInput.querySelector('input');
        if (!input) return;
        input.addEventListener('input', function () {
          formInput.classList.remove('form-input--error');
        });
        input.addEventListener('change', function () {
          if (!input.checkValidity()) formInput.classList.add('form-input--error');
        });
      });
    });
  }
  var burger = document.querySelector('.burger');
  var aside = document.querySelector('.aside');
  if (burger && aside) {
    burger.addEventListener('click', function (e) {
      e.preventDefault();
      burger.classList.toggle('burger--active');
      aside.classList.toggle('aside--active');
    });
    aside.addEventListener('click', function (e) {
      if (e.target.classList.contains('aside')) {
        burger.classList.remove('burger--active');
        aside.classList.remove('aside--active');
      }
    });
  }
  var notification = document.querySelector('.notification');
  if (notification) {
    var notificationLink = notification.querySelector('.notification-link');
    notificationLink.addEventListener('click', function (e) {
      e.preventDefault();
      notification.classList.toggle('notification--active');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.notification')) {
        notification.classList.remove('notification--active');
      }
    });
  }
  var lanugageSelect = document.querySelector('.language-select');
  if (lanugageSelect) {
    var lanugageSelectLink = lanugageSelect.querySelector('.language-select__current');
    lanugageSelectLink.addEventListener('click', function (e) {
      e.preventDefault();
      lanugageSelect.classList.toggle('language-select--active');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.language-select')) {
        lanugageSelect.classList.remove('language-select--active');
      }
    });
  }
  var faqItemArray = document.querySelectorAll('.faq-item');
  if (faqItemArray.length) {
    faqItemArray.forEach(function (faqItem) {
      var faqItemHeader = faqItem.querySelector('.faq-item__header');
      faqItemHeader.addEventListener('click', function (e) {
        e.preventDefault();
        faqItem.classList.toggle('faq-item--active');
      });
    });
  }
  var popupButtonArray = document.querySelectorAll('[data-popup]');
  if (popupButtonArray.length) {
    popupButtonArray.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        showPopup("".concat(button.dataset.popup));
      });
    });
  }
});

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=main.js.map