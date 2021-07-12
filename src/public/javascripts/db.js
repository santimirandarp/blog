const form = document.getElementById("comments_form");
const toggleForm = document.getElementById("comments_toggleForm");

const commentList = document.getElementById("comments_commentList")
const moreComments =document.getElementById("comments_moreComments");

/** takes the @param form and sends the data */
const post = async(form)=>{
  const response = await fetch("comments", {   
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
    .then(r=>{
        form.insertAdjacentHtml("beforebegin", 
            `<p style='background-color:rgba(0,125,0,0.1);border:1px solid rgba(0,125,0,0.6)'>${JSON.stringify(r)}</p>`)
        console.log(r); return })
    .catch(e=>console.log(e));
}

const skipLimit = (nOfComments) => [nOfComments, nOfComments+10]
const get = async(arr)=>{
  let url = "comments/"
    arr? url+=`${arr[0]}/${arr[1]}`:url+="0/10"
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

window.addEventListener("load", (e)=> get().then(r=>console.log(r)).catch(e=>console.log(e)))

moreComments.addEventListener("click", (e) => {
    const nOfComments = commentList.children.length;
    console.log('nOfComments is ', nOfComments);
    get(skipLimit(nOfComments))
    .then(r=>console.log(r))
    .catch(r=>console.log(r))
    })

toggleForm.addEventListener("click", ()=> toggler(form));

form.addEventListener("submit", postMsg);
//window.addEventListener("load", getMsgs)
