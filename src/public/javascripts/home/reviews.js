import mytoggler from "./../common/index.js";
const spans = document.querySelectorAll(".places .reviewSpan");

spans.forEach(span => {
    span.addEventListener("click", () => {
        const img = span.nextElementSibling();
        mytoggler(img);
        });
    });

