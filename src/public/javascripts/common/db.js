import {$,formatDate} from "./common.js";

///** Called from postMsg, asynchronous call to DB using data from form.*/
//Returns a promise
const post = async(data)=>{
return fetch("/comments", {   
method: "POST", 
headers: { "Content-Type": "application/json" },
body:JSON.stringify(data)
});
};


const postMsg = e => {
  e.preventDefault();
  const removeOldClasses = (theList,element) => theList.forEach(cl=>element.removeClass(cl));
  //get the elements
  const form = $("#form");
  const commentsList = $("#commentsList");
  const info = $("#comments .comments_info");
  const boxClasses = ["success","warning","info"];

  const name = form.find("input[name='name']").val();
  const email = form.find("input[name='email']").val();
  const msg = form.find("textarea[name='msg']").val();
  const data = {name,email,msg};

  info.html("Sending Data to server...");
  removeOldClasses(boxClasses,info);
  info.addClass("info"); info.show();
  post(data).then(r=>r.json()).then(suc => { 
      form.hide(); 
      console.log(suc);
      commentsList.prepend(commentToHTML(data));
      info.html(`<happy/>; ${suc.msg}. (The Message is a preview).`);
      info.removeClass("info"); info.addClass("success");
      info.hide(3000);})
      .catch( (e) => {
console.log(e);
removeOldClasses(boxClasses,info);
info.html("There was an error. Try again Later");
info.show();

}); //still need to deal with this error.
};

///** pass array of objects from database */
const commentFromDBToDOM = docsArray => {
  const info = $("#comments .comments_info");
  const commentsList= $("#commentsList");
  if(Array.isArray(docsArray)){
    if(docsArray.length==0){
      //displays alert to user
      info.html("All comments were loaded.");
      info.show();
      info.hide(3000);
      return 0;
    } else {
      //inserts the comments
      docsArray.forEach( doc => commentsList.append(commentToHTML(doc)));
      return 0;
    }} else {
      //If it is not an array
      info.html("There was an error. Please try again.");
      return 0;
    }};

/** document => HTML elements */ 
const commentToHTML = ({name,msg,date}, preview=true) => {
  preview = preview ? "comments_message-preview": null;
  return `
    <li class="comments_message ${preview}">
    <h1><span style="font-size:1rem">by&nbsp;</span>${name}</h1>
    <p>${msg}</p>
    <small>${formatDate(date||(new Date()).toISOString())}</small>
    </li>
`;
};



const skipLimit = (nOfComments) => [nOfComments, nOfComments+10];

const getComments = async(arr) => {
  const thatsIt = $("#comments .comments_thatsIt");
  thatsIt.innerHTML = "Fetching Comments from Database...";
  let url = `comments/${arr[0]}/${arr[1]}`;
  const response = await fetch(url);
  return response.json();
};

const enableComments = ()=> {
//Comments Area, contains the list of comments, 
//the post-comment form, and other buttons.
const comments = $("#comments");
const loadOlderComments = comments.find("#loadOlderComments");
const toggleFormBtn = comments.find("#comments_toggleForm");
const form = $("#form");

  window.addEventListener("load", () => getComments(skipLimit(0))
      .then(dArr => commentFromDBToDOM(dArr))
      .catch( () => console.error("There was a problem")));
//same as loadOlderComments.addEventListener('click',()=>...)
    loadOlderComments.click(() => {

      const commentsList= $("#commentsList");
      const nOfComments = commentsList.children.length;
      getComments(skipLimit(nOfComments))
      .then(dArr=> commentFromDBToDOM(dArr))
      .catch( () =>console.error("There was a problem"));
      });

  toggleFormBtn.click(()=> $("#form").toggle());
  form.submit(postMsg);
  return 0;
};

export {enableComments};
