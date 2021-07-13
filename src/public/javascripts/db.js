const form = document.getElementById("comments_form");
const toggleForm = document.getElementById("comments_toggleForm");
const commentList = document.getElementById("comments_commentList")
const moreComments =document.getElementById("comments_moreComments");


/** Pass the document comming from the database */ 
const comment = ({name,msg,isPublic}) => {
const preview = isPublic ? 'comments_message-preview':null;
const alert = !isPublic ? 'display:none':'display:block';
return `<li class="comments_message ${preview}">` 
+ `<p class="small" style="${alert}">Success! Comment will be public shortly (this is a preview).</p> <h3>${name}</h3><p>${msg}</p>` 
+ "</li>"
}

/** takes the @param form and sends the data to server as multipart */
const post = async(form)=>{
  const response = await fetch("/comments", {   
method: "POST", 
mode: "cors", 
cache: "no-cache", 
credentials: "same-origin", 
redirect: "follow", 
referrerPolicy: "no-referrer", 
body: new FormData(form)
})
return response.json();
}

const postMsg = (e)=>{
  e.preventDefault();
  post(form)
    .then(doc=>{
        commentList.insertAdjacentHTML("beforebegin", comment(doc))
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
