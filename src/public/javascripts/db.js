const form = document.getElementById("comments_form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const theComment = document.getElementById("comment");
const toggleForm = document.getElementById("comments_toggleForm");
const commentList = document.getElementById("comments_commentList")
const moreComments =document.getElementById("comments_moreComments");

/** Pass the document comming from the database */ 
const comment = ({name,msg,isPublic:p}) => {
const alert = p ? 'display:block':'display:none';
return `<li class="comments_message" style="${alert}">` 
+ `<h3>${name}</h3><p>${msg}</p>` 
+ "</li>"
}

const preview = ({name,msg}) => {
return `<li class="comments_message comments_message-preview">` 
+ `<p class="small">Success! Comment will be public shortly (this is a preview).</p> <h3>${name}</h3><p>${msg}</p>` 
+ "</li>"
}

/** takes the @param form and sends the data to server as multipart */
const post = async(data)=>{
  const response = await fetch("/comments", {   
method: "POST", 
mode: "cors", 
cache: "no-cache", 
credentials: "same-origin", 
redirect: "follow", 
referrerPolicy: "no-referrer", 
//body: new FormData(form)
body:JSON.stringify(data)
})
return response;
}

const postMsg = (e)=>{
  e.preventDefault();
  const pp = {name:name,email:email,msg:theComment}
  post(pp)
    .then(c=>{
        commentList.insertAdjacentHTML("beforebegin", preview(pp))
    return })
    .catch(e=>console.log(e));
}

const skipLimit = (nOfComments) => [nOfComments, nOfComments+10]
const get = async(arr)=>{
let url = `comments/${arr[0]}/${arr[1]}`
  const response = await fetch(url, {   
method: "GET", 
mode: "cors", 
cache: "no-cache", 
credentials: "same-origin", 
redirect: "follow", 
referrerPolicy: "no-referrer", 
})
return response.json();
}

window.addEventListener("load", (e)=> get(skipLimit(0))
.then(r=> {
r.forEach(doc => {console.log(doc);commentList.insertAdjacentHTML('beforeend', comment(doc))})
})
.catch(e=>console.log(e)))

moreComments.addEventListener("click", (e) => {
    const nOfComments = commentList.children.length;
    console.log('nOfComments is ', nOfComments);
    get(skipLimit(nOfComments))
    .then(doc=>commentList.insertAdjacentHTML('beforeend', comment(doc)))
    .catch(e=>console.log(e))
    })

toggleForm.addEventListener("click", ()=> toggler(form));

form.addEventListener("submit", postMsg);
