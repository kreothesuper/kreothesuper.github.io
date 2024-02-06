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
            selectItemOptions = selectItemTag.querySelectorAll('option');
          selectItemOptions.forEach(function (element, index) {
            if (element.textContent === selectItem.textContent) {
              selectItemTag.selectedIndex = index;
              selectLabelSpan.textContent = element.textContent;

              // Trigger change event when selectIndex is changed
              var event = new Event('change', {
                bubbles: true
              });
              selectItemTag.dispatchEvent(event);
            }
          });
          selectLabel.click();
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
var closeAllSelect = function closeAllSelect(select) {
  var selectContentArray = document.querySelectorAll('.select__content'),
    selectLabelArray = document.querySelectorAll('.select__label');
  selectLabelArray.forEach(function (element, index) {
    element !== select ? (element.classList.remove('select__label--active'), selectContentArray[index].classList.add('select__content--hidden')) : null;
  });
};
document.addEventListener('DOMContentLoaded', function () {
  selectInit();
  var blockArray = document.querySelectorAll('.block');
  if (blockArray.length) {
    blockArray.forEach(function (element) {
      var elementWrapper = element.querySelector('.block__wrapper');
      elementWrapper.addEventListener('scroll', function () {
        var isScrolledHorizontally = elementWrapper.scrollWidth - elementWrapper.clientWidth <= elementWrapper.scrollLeft;
        var isScrolledVertically = elementWrapper.scrollHeight - elementWrapper.clientHeight <= elementWrapper.scrollTop;
        if (isScrolledHorizontally && isScrolledVertically) {
          element.classList.add('block--scrolled');
        } else {
          element.classList.remove('block--scrolled');
        }
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