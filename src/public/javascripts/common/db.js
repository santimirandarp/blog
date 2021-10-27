import {$,mytoggler} from "./common.js";

//Comments Area, contains the list of comments, 
//the post-comment form, and other buttons.
const comments = $("#comments");
const loadOlderComments = comments.querySelector("#loadOlderComments");
const toggleFormBtn = comments.querySelector("#comments_toggleForm");

const thatsIt = comments.querySelector(".comments_thatsIt");
thatsIt.style.display="none";

const info = comments.querySelector(".comments_info");
info.style.display="none";

//
///** Called from postMsg, asynchronous call to DB using data from form.*/
//Returns a promise
const post = async(data)=>{
  const response = await fetch("/comments", {   
method: "POST", 
headers: { "Content-Type": "application/json" },
body:JSON.stringify(data)
});
return response.json();
};
//
//
const postMsg = e => {
  //get the elements
  const form = document.getElementById("#form");//it's ok even though it is defined above also.
  const name = form.querySelector("input[name='name']");
  const email = form.querySelector("input[name='email']");
  const msg = form.querySelector("textarea[name='msg']");
  const commentsList = document.getElementById("#commentsList");
  const info = $("#comments .comments_info");

  e.preventDefault();
  const data = {name:name.value,email:email.value,msg:msg.value};
  post(data).then(suc => { 
      form.style.display="none";
      info.style.display="block";
      info.innerHTML=`<happy/>; ${suc.msg}. Your comment will be public shortly (we show a preview).`; 
      commentsList.insertAdjacentHTML("afterbegin", commentToHTML(data));
      setTimeout( ()=>{ info.style.display="none"; info.innerHTML="";},3000);
      }).catch( () => console.log("There was an error")); //still need to deal with this error.
};
//
///** pass array of objects from database */
const commentToDOM = docsArray => {
  if(Array.isArray(docsArray)){
    const commentsList= $("#commentsList");
    if(docsArray.length==0){
      //displays alert to user
      const thatsIt = $("#comments .comments_thatsIt");
      thatsIt.innerHTML = "All comments were loaded.";
      thatsIt.style.display = "block";
      setTimeout(() => thatsIt.style.display = "none",3000);
      return 0;
    } else {
      //inserts the comments
      docsArray.forEach( doc => commentsList
          .insertAdjacentHTML("beforeend", commentToHTML(doc)));
      return 0;
    }} else {
      //If it is not an array
      thatsIt.innerHTML = "There was an error. Please try again.";
    }};
///** document => HTML elements */ 
const commentToHTML = ({name,msg,date}, preview=true) => {
  preview = preview ? "comments_message-preview": null;
  return `<li class="comments_message ${preview}">` 
    + `<h3>${name}</h3><p>${msg}</p><p>${date}</p>` 
    + "</li>";
};
//
//
const skipLimit = (nOfComments) => [nOfComments, nOfComments+10];
const getComments = async(arr) => {
  thatsIt.innerHTML = "Fetching Comments from Database...";
  let url = `comments/${arr[0]}/${arr[1]}`;
  const response = await fetch(url);
  return response.json();
};

const enableComments = ()=> {
const form= $("#form");
  window.addEventListener("load", () => getComments(skipLimit(0))
      .then(dArr => commentToDOM(dArr))
      .catch( () => console.error("There was a problem")));

  loadOlderComments.addEventListener("click", () => {

      const commentsList= $("#commentsList");
      const nOfComments = commentsList.children.length;
      getComments(skipLimit(nOfComments))
      .then(dArr=> commentToDOM(dArr))
      .catch( () =>console.error("There was a problem"));
      });

  toggleFormBtn.addEventListener("click", ()=> mytoggler($("#form")));
  form.addEventListener("submit", postMsg);
  return 0;
};

export {enableComments};
