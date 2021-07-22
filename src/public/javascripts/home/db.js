const comments = $("#comments");

const commentsList = comments.getElementById("commentsList");
const loadOlderComments = comments.getElementById("loadOlderComments");

const thatsIt = comments.querySelector(".comments_thatsIt");
thatsIt.style.display="none";

const info = $("#comments .comments_info");
info.style.display="none";

/** Called from postMsg, asynchronous call to DB using data from form.*/
const post = async(data)=>{
const response = await fetch("/comments", {   
method: "POST", 
headers: { "Content-Type": "application/json" },
body:JSON.stringify(data)
});
return response.json();
};


const postMsg = e => {
  //get the elements
  const form = $("#comments form");
  const name = form.querySelector("input[name='name']");
  const email = form.querySelector("input[name='email']");
  const msg = form.querySelector("textarea[name='msg']");

  e.preventDefault();
  const data = {name:name.value,email:email.value,msg:msg.value};
  post(data).then(suc => { 
      form.style.display="none";
      info.style.display="block";
      info.innerHTML=`<happy/>; ${suc.msg}. Comment will be public shortly (we show a preview).`; 
      commentsList.insertAdjacentHTML("afterbegin", commentToHTML(data));
      setTimeout( ()=>{ info.style.display="none"; info.innerHTML="";},3000);
      }).catch( () => console.log("There was an error"));
};

/** pass array of objects from database */
const commentToDOM = docsArray => {
  if(docsArray.length!=0){ docsArray.forEach(
      doc => commentsList.insertAdjacentHTML("beforeend", commentToHTML(doc)));
  } else { 
    thatsIt.innerHTML = "All comments were loaded.";
    thatsIt.style.display = "block";
    setTimeout(() => thatsIt.style.display = "none",3000);
  } };


/** document => HTML elements */ 
const commentToHTML = ({name,msg,date}, preview=true) => {
  preview = preview ? "comments_message-preview": null;
  return `<li class="comments_message ${preview}">` 
    + `<h3>${name}</h3><p>${msg}</p><p>${date}</p>` 
    + "</li>";
};


const skipLimit = (nOfComments) => [nOfComments, nOfComments+10];
const getComments = async(arr) => {
  let url = `comments/${arr[0]}/${arr[1]}`;
  const response = await fetch(url);
    return response.json();
};

window.addEventListener("load", () => getComments(skipLimit(0))
    .then(dArr => commentToDOM(dArr))
    .catch( () => console.error("There was a problem")));

loadOlderComments.addEventListener("click", () => {
    const nOfComments = commentsList.children.length;
    get(skipLimit(nOfComments))
    .then(dArr=> commentToDOM(dArr))
    .catch( () =>console.error("There was a problem"));
    });

toggleForm.addEventListener("click", ()=> mytoggler($("#comments form")));
form.addEventListener("submit", postMsg);

