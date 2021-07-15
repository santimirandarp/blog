const spans = document.querySelectorAll(".places .reviewSpan");

spans.forEach(span=> {
    span.addEventListener("click", (e)=> {
        const img = span.nextElementSibling;
        toggler(img);
        });
    });

