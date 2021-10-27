import {mytoggler} from "./../common/common.js";
const spans = document.querySelectorAll(".places .reviewSpan");

const loadReviews = ()=>{spans.forEach(span => {
    span.addEventListener("click", () => {
        const img = span.nextElementSibling;
        mytoggler(img);
        });
    });};

export {loadReviews};
