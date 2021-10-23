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

/***/ "./src/public/javascripts/common/common.js":
/*!*************************************************!*\
  !*** ./src/public/javascripts/common/common.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mytoggler\": function() { return /* binding */ mytoggler; },\n/* harmony export */   \"$\": function() { return /* binding */ $; }\n/* harmony export */ });\nconst $ = document.querySelector;\n\nconst mytoggler = element => {\n  element.style.display==\"\" || element.style.display==\"none\"? \n    element.style.display=\"block\": element.style.display=\"none\";\n};\n\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/common/common.js?");

/***/ }),

/***/ "./src/public/javascripts/home/db.js":
/*!*******************************************!*\
  !*** ./src/public/javascripts/home/db.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/common.js */ \"./src/public/javascripts/common/common.js\");\n\n\nconst comments = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#comments\");\nconst commentsList = comments.getElementById(\"commentsList\");\nconst form = comments.getElementById(\"form\");\nconst loadOlderComments = comments.getElementById(\"loadOlderComments\");\n\nconst thatsIt = comments.querySelector(\".comments_thatsIt\");\nthatsIt.style.display=\"none\";\n\nconst info = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#comments .comments_info\");\ninfo.style.display=\"none\";\n\n/** Called from postMsg, asynchronous call to DB using data from form.*/\nconst post = async(data)=>{\nconst response = await fetch(\"/comments\", {   \nmethod: \"POST\", \nheaders: { \"Content-Type\": \"application/json\" },\nbody:JSON.stringify(data)\n});\nreturn response.json();\n};\n\n\nconst postMsg = e => {\n  //get the elements\n  const form = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#comments form\");\n  const name = form.querySelector(\"input[name='name']\");\n  const email = form.querySelector(\"input[name='email']\");\n  const msg = form.querySelector(\"textarea[name='msg']\");\n\n  e.preventDefault();\n  const data = {name:name.value,email:email.value,msg:msg.value};\n  post(data).then(suc => { \n      form.style.display=\"none\";\n      info.style.display=\"block\";\n      info.innerHTML=`<happy/>; ${suc.msg}. Comment will be public shortly (we show a preview).`; \n      commentsList.insertAdjacentHTML(\"afterbegin\", commentToHTML(data));\n      setTimeout( ()=>{ info.style.display=\"none\"; info.innerHTML=\"\";},3000);\n      }).catch( () => console.log(\"There was an error\"));\n};\n\n/** pass array of objects from database */\nconst commentToDOM = docsArray => {\n  if(docsArray.length!=0){ docsArray.forEach(\n      doc => commentsList.insertAdjacentHTML(\"beforeend\", commentToHTML(doc)));\n  } else { \n    thatsIt.innerHTML = \"All comments were loaded.\";\n    thatsIt.style.display = \"block\";\n    setTimeout(() => thatsIt.style.display = \"none\",3000);\n  } };\n\n\n/** document => HTML elements */ \nconst commentToHTML = ({name,msg,date}, preview=true) => {\n  preview = preview ? \"comments_message-preview\": null;\n  return `<li class=\"comments_message ${preview}\">` \n    + `<h3>${name}</h3><p>${msg}</p><p>${date}</p>` \n    + \"</li>\";\n};\n\n\nconst skipLimit = (nOfComments) => [nOfComments, nOfComments+10];\nconst getComments = async(arr) => {\n  let url = `comments/${arr[0]}/${arr[1]}`;\n  const response = await fetch(url);\n    return response.json();\n};\n\nwindow.addEventListener(\"load\", () => getComments(skipLimit(0))\n    .then(dArr => commentToDOM(dArr))\n    .catch( () => console.error(\"There was a problem\")));\n\nloadOlderComments.addEventListener(\"click\", () => {\n    const nOfComments = commentsList.children.length;\n    getComments(skipLimit(nOfComments))\n    .then(dArr=> commentToDOM(dArr))\n    .catch( () =>console.error(\"There was a problem\"));\n    });\n\ncommentsList.addEventListener(\"click\", ()=> (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.mytoggler)((0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#comments form\")));\nform.addEventListener(\"submit\", postMsg);\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/db.js?");

/***/ }),

/***/ "./src/public/javascripts/home/entry.js":
/*!**********************************************!*\
  !*** ./src/public/javascripts/home/entry.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./db.js */ \"./src/public/javascripts/home/db.js\");\n/* harmony import */ var _gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.js */ \"./src/public/javascripts/home/gallery.js\");\n/* harmony import */ var _reviews_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reviews.js */ \"./src/public/javascripts/home/reviews.js\");\n\n\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/entry.js?");

/***/ }),

/***/ "./src/public/javascripts/home/gallery.js":
/*!************************************************!*\
  !*** ./src/public/javascripts/home/gallery.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/common.js */ \"./src/public/javascripts/common/common.js\");\n\nconst gallery = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(\"#gallery .imgGal\");\n\nwindow.addEventListener(\"load\", async()=>{\nconst response = await fetch(\"/gallery\");\nconst images = response.json().images;\nimages.forEach(img => {\nconst bigImageName = img.slice(8,);\nconst text= bigImageName.replace(/_/g, \" \").split(\".\")[0];\nconst imageHTML = `<a href=\"images/gallery/${bigImageName}\">\n    <figure class=\"pictures\">\n    <img loading='lazy' src='images/gallery/${img}' alt='${text}'/>\n    <figcaption>${text}</figcaption>\n    </figure></a>`;\ngallery.insertAdjacentHTML(\"beforeend\", imageHTML);\n});\n});\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/gallery.js?");

/***/ }),

/***/ "./src/public/javascripts/home/reviews.js":
/*!************************************************!*\
  !*** ./src/public/javascripts/home/reviews.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/common.js */ \"./src/public/javascripts/common/common.js\");\n\nconst spans = document.querySelectorAll(\".places .reviewSpan\");\n\nspans.forEach(span => {\n    span.addEventListener(\"click\", () => {\n        const img = span.nextElementSibling();\n        (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.mytoggler)(img);\n        });\n    });\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/reviews.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/public/javascripts/home/entry.js");
/******/ 	
/******/ })()
;