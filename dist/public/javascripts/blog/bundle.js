/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/public/javascripts/blog/entry.js":
/*!**********************************************!*\
  !*** ./src/public/javascripts/blog/entry.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/common.js */ \"./src/public/javascripts/common/common.js\");\n\n\n// When the /blog page loads we call the database for the metadata and display a grid.\nconst ULOfPosts = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#listOfPosts\");\n\nconst listOfPostsToHTML= (postsMetadata, HTMLel) => {\n//takes array of posts' metadata \n//adds each element to HTML element 'el'\npostsMetadata.forEach(post => {\nconst {title,tags,brief,date,path} = post;\nconst listing = `\n<div class=\"postGridElement\">\n<h2>${title}</h2>\n<p>${brief}</p>\n<p>${date}</p>\n<p>${tags}</p>\n<a href=${path}> Read Full Post </a>\n</div>\n`;\nHTMLel.insertAdjacentHTML(\"afterstart\",listing);\n});};\n\nwindow.addEventListener(\"load\", async() => {\nconst response = await fetch(\"postsMetadata\");\nconst postsMetadata = response.json();\nlistOfPostsToHTML(postsMetadata, ULOfPosts);\n});\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/blog/entry.js?");

/***/ }),

/***/ "./src/public/javascripts/common/common.js":
/*!*************************************************!*\
  !*** ./src/public/javascripts/common/common.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mytoggler\": function() { return /* binding */ mytoggler; },\n/* harmony export */   \"$\": function() { return /* binding */ $; }\n/* harmony export */ });\nconst $ = document.querySelector;\n\nconst mytoggler = element => {\n  element.style.display==\"\" || element.style.display==\"none\"? \n    element.style.display=\"block\": element.style.display=\"none\";\n};\n\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/common/common.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/public/javascripts/blog/entry.js");
/******/ 	
/******/ })()
;