/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./src/public/javascripts/common/common.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "$": () => (/* binding */ $),\n/* harmony export */   "mytoggler": () => (/* binding */ mytoggler),\n/* harmony export */   "formatTags": () => (/* binding */ formatTags),\n/* harmony export */   "formatDate": () => (/* binding */ formatDate)\n/* harmony export */ });\nconst $ = document.querySelector.bind(document);\n\nconst mytoggler = element => {\n  element.style.display == "" || element.style.display == "none" ? element.style.display = "block" : element.style.display = "none";\n};\n\nconst formatTags = tags => {\n  let newTags = [];\n\n  const randomRGB = () => {\n    let vals = [];\n\n    for (let i = 0; i < 3; i++) {\n      vals.push(Math.floor(Math.random() * 256) + 1);\n    }\n\n    return vals;\n  };\n\n  tags.forEach(tag => newTags.push("<span \\nstyle=\\"background-color:rgba(".concat(randomRGB().toString(","), ",0.5)\\" \\nclass=\\"small\\">").concat(tag, "</span>")));\n  return newTags;\n};\n\nconst formatDate = date => date.slice(0, 10).replace(/-/g, "/");\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/common/common.js?')},"./src/public/javascripts/common/db.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "enableComments": () => (/* binding */ enableComments)\n/* harmony export */ });\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/public/javascripts/common/common.js");\n ///** Called from postMsg, asynchronous call to DB using data from form.*/\n//Returns a promise\n\nconst post = async data => {\n  const response = await fetch("/comments", {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json"\n    },\n    body: JSON.stringify(data)\n  });\n  return response.json();\n};\n\nconst postMsg = e => {\n  e.preventDefault(); //get the elements\n\n  const form = document.getElementById("#form");\n  const commentsList = document.getElementById("#commentsList");\n  const info = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#comments .comments_info");\n  const name = form.querySelector("input[name=\'name\']");\n  const email = form.querySelector("input[name=\'email\']");\n  const msg = form.querySelector("textarea[name=\'msg\']");\n  const data = {\n    name: name.value,\n    email: email.value,\n    msg: msg.value\n  };\n  post(data).then(suc => {\n    form.style.display = "none";\n    info.style.display = "block";\n    info.innerHTML = "<happy/>; ".concat(suc.msg, ". Your comment will be public shortly (we show a preview).");\n    commentsList.insertAdjacentHTML("afterbegin", commentToHTML(data));\n    setTimeout(() => {\n      info.style.display = "none";\n      info.innerHTML = "";\n    }, 3000);\n  }).catch(() => console.log("There was an error")); //still need to deal with this error.\n}; ///** pass array of objects from database */\n\n\nconst commentToDOM = docsArray => {\n  const thatsIt = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#comments .comments_thatsIt");\n  const commentsList = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#commentsList");\n\n  if (Array.isArray(docsArray)) {\n    if (docsArray.length == 0) {\n      //displays alert to user\n      thatsIt.innerHTML = "All comments were loaded.";\n      thatsIt.style.display = "block";\n      setTimeout(() => thatsIt.style.display = "none", 3000);\n      return 0;\n    } else {\n      //inserts the comments\n      docsArray.forEach(doc => commentsList.insertAdjacentHTML("beforeend", commentToHTML(doc)));\n      return 0;\n    }\n  } else {\n    //If it is not an array\n    thatsIt.innerHTML = "There was an error. Please try again.";\n    return 0;\n  }\n};\n/** document => HTML elements */\n\n\nconst commentToHTML = ({\n  name,\n  msg,\n  date\n}, preview = true) => {\n  preview = preview ? "comments_message-preview" : null;\n  return "\\n    <li class=\\"comments_message ".concat(preview, "\\">\\n    <h1><span style=\\"font-size:1rem\\">by&nbsp;</span>").concat(name, "</h1><p>").concat(msg, "</p><p>").concat((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.formatDate)(date), "</p>\\n    </li>\\n");\n};\n\nconst skipLimit = nOfComments => [nOfComments, nOfComments + 10];\n\nconst getComments = async arr => {\n  const thatsIt = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#comments .comments_thatsIt");\n  thatsIt.innerHTML = "Fetching Comments from Database...";\n  let url = "comments/".concat(arr[0], "/").concat(arr[1]);\n  const response = await fetch(url);\n  return response.json();\n};\n\nconst enableComments = () => {\n  //Comments Area, contains the list of comments, \n  //the post-comment form, and other buttons.\n  const comments = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#comments");\n  const loadOlderComments = comments.querySelector("#loadOlderComments");\n  const toggleFormBtn = comments.querySelector("#comments_toggleForm");\n  const form = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#form");\n  window.addEventListener("load", () => getComments(skipLimit(0)).then(dArr => commentToDOM(dArr)).catch(() => console.error("There was a problem")));\n  loadOlderComments.addEventListener("click", () => {\n    const commentsList = (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#commentsList");\n    const nOfComments = commentsList.children.length;\n    getComments(skipLimit(nOfComments)).then(dArr => commentToDOM(dArr)).catch(() => console.error("There was a problem"));\n  });\n  toggleFormBtn.addEventListener("click", () => (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.mytoggler)((0,_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#form")));\n  form.addEventListener("submit", postMsg);\n  return 0;\n};\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/common/db.js?')},"./src/public/javascripts/home/entry.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_db_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/db.js */ "./src/public/javascripts/common/db.js");\n/* harmony import */ var _gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.js */ "./src/public/javascripts/home/gallery.js");\n/* harmony import */ var _reviews_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reviews.js */ "./src/public/javascripts/home/reviews.js");\n\n\n\n(0,_common_db_js__WEBPACK_IMPORTED_MODULE_0__.enableComments)();\n(0,_gallery_js__WEBPACK_IMPORTED_MODULE_1__.loadImages)();\n(0,_reviews_js__WEBPACK_IMPORTED_MODULE_2__.loadReviews)();\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/entry.js?')},"./src/public/javascripts/home/gallery.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "loadImages": () => (/* binding */ loadImages)\n/* harmony export */ });\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common.js */ "./src/public/javascripts/common/common.js");\n\nconst gallery = (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.$)("#gallery .imgGal");\n\nconst insertImg = imgName => {\n  //name for the big scale image\n  const bigImageName = imgName.slice(8); //build the description text.\n\n  const text = bigImageName.replace(/_/g, " ").split(".")[0];\n  const imageHTML = " <a href=\\"images/gallery/".concat(bigImageName, "\\">\\n    <figure class=\\"pictures\\">\\n    <img loading=\'lazy\' src=\'images/gallery/").concat(imgName, "\' alt=\'").concat(text, "\'/>\\n    <figcaption>").concat(text, "</figcaption>\\n    </figure></a>");\n  gallery.insertAdjacentHTML("beforeend", imageHTML);\n};\n\nconst loadImages = () => {\n  window.addEventListener("load", () => {\n    fetch("/gallery").then(r => r.json()).then(imgFilenames => imgFilenames.images.forEach(imgName => insertImg(imgName))).catch(e => {\n      gallery.innerHTML = "We couldn\'t load the images. Please refresh the page or try again later.";\n      console.error(e);\n    });\n  });\n};\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/gallery.js?')},"./src/public/javascripts/home/reviews.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "loadReviews": () => (/* binding */ loadReviews)\n/* harmony export */ });\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../common/common.js */ "./src/public/javascripts/common/common.js");\n\nconst spans = document.querySelectorAll(".places .reviewSpan");\n\nconst loadReviews = () => {\n  spans.forEach(span => {\n    span.addEventListener("click", () => {\n      const img = span.nextElementSibling;\n      (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.mytoggler)(img);\n    });\n  });\n};\n\n\n\n//# sourceURL=webpack://website/./src/public/javascripts/home/reviews.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var _=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.d=(e,n)=>{for(var _ in n)__webpack_require__.o(n,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:n[_]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/public/javascripts/home/entry.js")})();