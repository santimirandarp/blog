/* every JS target should be targeted from the section */
const comments = document.getElementById("#comments");
const form = comments.querySelector("form");
const name = form.querySelector("input[name='name']");
const email = form.querySelector("input[name='email']");
const msg = form.querySelector("textarea[name='msg']");

const toggleForm = document.getElementById("toggleForm");

const info = comments.querySelector(".comments_info");
const thatsIt = comments.querySelector(".comments_thatsIt");

info.style.display="none";
thatsIt.style.display="none";

const commentsList = comments.getElementById("commentsList");
const loadOlderComments = comments.getElementById("loadOlderComments");

const loadDocsArray = (docsArray) => {
     console.log(docsArray);
      if(docsArray.length!=0){
      docsArray.forEach(doc => commentsList.insertAdjacentHTML("beforeend", comment(doc)));
      } else { 
thatsIt.innerHTML = "All comments were loaded.";
thatsIt.style.display="block";
setTimeout(()=>thatsIt.style.display="none",3000);
}
      };
/** Pass the document comming from the database */ 
const comment = ({name,msg}, preview=true) => {
  preview = preview ? "comments_message-preview": null;
    return `<li class="comments_message ${preview}" style="${alert}">` 
    + `<h3>${name}</h3><p>${msg}</p>` 
    + "</li>";
};

const post = async(data)=>{
const response = await fetch("/comments", {   
method: "POST", 
headers: { "Content-Type": "application/json" },
body:JSON.stringify(data)
});
return response.json();
};

const postMsg = (e)=>{
  e.preventDefault();
  const data = {name:name.value,email:email.value,msg:msg.value};
  post(data).then(suc => { 
      form.style.display="none";
      info.style.display="block";
      info.innerHTML=`&#x2705; ${suc.msg}. Comment will be public shortly (we show a preview).`; 
      commentsList.insertAdjacentHTML("afterbegin", comment(data));
      setTimeout( ()=>{ info.style.display="none"; info.innerHTML="";},3000);
      }).catch(e => console.log(e));
};

const skipLimit = (nOfComments) => [nOfComments, nOfComments+10];
const get = async(arr) => {
  let url = `comments/${arr[0]}/${arr[1]}`;
  const response = await fetch(url, {   
method: "GET", 
});
return response.json();
};

window.addEventListener("load", () => get(skipLimit(0))
    .then(dArr => loadDocsArray(dArr))
    .catch( () => console.error("There was a problem")));

loadOlderComments.addEventListener("click", () => {
    const nOfComments = commentsList.children.length;
    get(skipLimit(nOfComments))
    .then(dArr=> loadDocsArray(dArr))
    .catch( () =>console.error("There was a problem"));
        });

toggleForm.addEventListener("click", ()=> mytoggler(form));

form.addEventListener("submit", postMsg);
