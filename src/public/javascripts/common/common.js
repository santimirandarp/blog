const $ = document.querySelector;

const mytoggler = element => {
  element.style.display=="" || element.style.display=="none"? 
    element.style.display="block": element.style.display="none";
};

export {mytoggler, $};
