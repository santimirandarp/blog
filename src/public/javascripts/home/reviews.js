import {$} from "./../common/common.js";
const spans = $(".places .reviewSpan");
const loadReviews = ()=>{
spans.each((index,span) => {
    span = $(span);
    span.click(() => {
        const img = span.next();
        img.toggle();
        });
    });};

export {loadReviews};
