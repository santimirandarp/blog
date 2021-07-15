const toggler=e=>{""==e.style.display||"none"==e.style.display?e.style.display="block":e.style.display="none"},form=document.getElementById("form"),name=document.querySelector("#comments input[name=name]"),email=document.querySelector("#comments input[name=mail]"),msg=document.querySelector("#comments textarea[name=msg]"),toggleForm=document.querySelector("#comments .comments_toggleForm"),commentsList=document.getElementById("commentsList"),moreComments=document.querySelector("#comments .comments_more"),comment=({name:e,msg:t,isPublic:o})=>{return`<li class="comments_message" style="${o?"display:block":"display:none"}">`+`<h3>${e}</h3><p>${t}</p>`+"</li>"},preview=({name:e,msg:t})=>'<li class="comments_message comments_message-preview">'+`<p class="small">Success! Comment will be public shortly (this is a preview).</p> <h3>${e}</h3><p>${t}</p>`+"</li>",post=async e=>{return await fetch("/comments",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(e)})},postMsg=e=>{e.preventDefault();const t={name:name.value,email:email.value,msg:msg.value};post(t).then(e=>commentsList.insertAdjacentHTML("beforebegin",preview(t))).catch(e=>console.log(e))},skipLimit=e=>[e,e+10],get=async e=>{e=`comments/${e[0]}/${e[1]}`;const t=await fetch(e,{method:"GET",mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer"});return t.json()};window.addEventListener("load",e=>get(skipLimit(0)).then(e=>{e.forEach(e=>commentsList.insertAdjacentHTML("beforeend",comment(e)))}).catch(e=>console.error("There was a problem"))),moreComments.addEventListener("click",e=>{var t=commentList.children.length;get(skipLimit(t)).then(e=>commentList.insertAdjacentHTML("beforeend",comment(e))).catch(e=>console.error("There was a problem"))}),toggleForm.addEventListener("click",()=>toggler(form)),form.addEventListener("submit",postMsg);const spans=document.querySelectorAll(".places .reviewSpan");spans.forEach(o=>{o.addEventListener("click",e=>{var t=o.nextElementSibling;toggler(t)})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyIsImRiLmpzIiwicmV2aWV3cy5qcyJdLCJuYW1lcyI6WyJ0b2dnbGVyIiwiZWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJlbWFpbCIsIm1zZyIsInRvZ2dsZUZvcm0iLCJjb21tZW50c0xpc3QiLCJtb3JlQ29tbWVudHMiLCJjb21tZW50IiwiaXNQdWJsaWMiLCJwIiwicHJldmlldyIsInBvc3QiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJtb2RlIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsInJlZGlyZWN0IiwicmVmZXJyZXJQb2xpY3kiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBvc3RNc2ciLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInRoZW4iLCJzdWMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJza2lwTGltaXQiLCJuT2ZDb21tZW50cyIsImdldCIsImFyciIsInVybCIsInJlc3BvbnNlIiwianNvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyIiwiZm9yRWFjaCIsImRvYyIsImVycm9yIiwiY29tbWVudExpc3QiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNwYW5zIiwicXVlcnlTZWxlY3RvckFsbCIsInNwYW4iLCJpbWciLCJuZXh0RWxlbWVudFNpYmxpbmciXSwibWFwcGluZ3MiOiJBQUFBLE1BQUFBLFFBQUFDLElBQ0EsSUFBQUEsRUFBQUMsTUFBQUMsU0FBQSxRQUFBRixFQUFBQyxNQUFBQyxRQUNBRixFQUFBQyxNQUFBQyxRQUFBLFFBQUFGLEVBQUFDLE1BQUFDLFFBQUEsUUNEQUMsS0FBQUMsU0FBQUMsZUFBQSxRQUNBQyxLQUFBRixTQUFBRyxjQUFBLDhCQUNBQyxNQUFBSixTQUFBRyxjQUFBLDhCQUNBRSxJQUFBTCxTQUFBRyxjQUFBLGdDQUVBRyxXQUFBTixTQUFBRyxjQUFBLGtDQUNBSSxhQUFBUCxTQUFBQyxlQUFBLGdCQUNBTyxhQUFBUixTQUFBRyxjQUFBLDRCQUdBTSxRQUFBLENBQUEsQ0FBQVAsS0FBQUEsRUFBQUcsSUFBQUEsRUFBQUssU0FBQUMsTUFFQSw2Q0FEQUEsRUFBQSxnQkFBQSwwQkFFQVQsWUFBQUcsUUFDQSxTQUdBTyxRQUFBLENBQUEsQ0FBQVYsS0FBQUEsRUFBQUcsSUFBQUEsS0FDQSxrSkFDQUgsWUFBQUcsUUFDQSxRQUlBUSxLQUFBQyxNQUFBQSxJQVdBLGFBVkFDLE1BQUEsWUFBQSxDQUNBQyxPQUFBLE9BQ0FDLEtBQUEsT0FDQUMsTUFBQSxXQUNBQyxZQUFBLGNBQ0FDLFNBQUEsU0FDQUMsZUFBQSxjQUVBQyxLQUFBQyxLQUFBQyxVQUFBVixNQUtBVyxRQUFBQyxJQUNBQSxFQUFBQyxpQkFDQSxNQUFBYixFQUFBLENBQUFaLEtBQUFBLEtBQUEwQixNQUFBeEIsTUFBQUEsTUFBQXdCLE1BQUF2QixJQUFBQSxJQUFBdUIsT0FDQWYsS0FBQUMsR0FBQWUsS0FBQUMsR0FBQXZCLGFBQ0F3QixtQkFBQSxjQUFBbkIsUUFBQUUsS0FDQWtCLE1BQUFOLEdBQUFPLFFBQUFDLElBQUFSLEtBR0FTLFVBQUFDLEdBQUEsQ0FBQUEsRUFBQUEsRUFBQSxJQUNBQyxJQUFBQyxNQUFBQSxJQUNBQyxjQUFBRCxFQUFBLE1BQUFBLEVBQUEsS0FDQSxNQUFBRSxRQUFBekIsTUFBQXdCLEVBQUEsQ0FDQXZCLE9BQUEsTUFDQUMsS0FBQSxPQUNBQyxNQUFBLFdBQ0FDLFlBQUEsY0FDQUMsU0FBQSxTQUNBQyxlQUFBLGdCQUVBLE9BQUFtQixFQUFBQyxRQUdBQyxPQUFBQyxpQkFBQSxPQUFBakIsR0FBQVcsSUFBQUYsVUFBQSxJQUNBTixLQUFBZSxJQUNBQSxFQUFBQyxRQUFBQyxHQUFBdkMsYUFBQXdCLG1CQUFBLFlBQUF0QixRQUFBcUMsT0FFQWQsTUFBQU4sR0FBQU8sUUFBQWMsTUFBQSx5QkFFQXZDLGFBQUFtQyxpQkFBQSxRQUFBakIsSUFDQSxJQUFBVSxFQUFBWSxZQUFBQyxTQUFBQyxPQUNBYixJQUFBRixVQUFBQyxJQUNBUCxLQUFBaUIsR0FBQUUsWUFBQWpCLG1CQUFBLFlBQUF0QixRQUFBcUMsS0FDQWQsTUFBQU4sR0FBQU8sUUFBQWMsTUFBQSwwQkFHQXpDLFdBQUFxQyxpQkFBQSxRQUFBLElBQUFoRCxRQUFBSSxPQUVBQSxLQUFBNEMsaUJBQUEsU0FBQWxCLFNDNUVBLE1BQUEwQixNQUFBbkQsU0FBQW9ELGlCQUFBLHVCQUVBRCxNQUFBTixRQUFBUSxJQUNBQSxFQUFBVixpQkFBQSxRQUFBakIsSUFDQSxJQUFBNEIsRUFBQUQsRUFBQUUsbUJBQ0E1RCxRQUFBMkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2dnbGVyID0gZWxlbWVudCA9PntcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5PT1cIlwiIHx8IGVsZW1lbnQuc3R5bGUuZGlzcGxheT09XCJub25lXCI/IFxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheT1cImJsb2NrXCI6IGVsZW1lbnQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxufTtcbiIsIi8qKiBHZXQgZm9ybSBmaWVsZHMgKi9cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1cIik7XG5jb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21tZW50cyBpbnB1dFtuYW1lPW5hbWVdXCIpO1xuY29uc3QgZW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbW1lbnRzIGlucHV0W25hbWU9bWFpbF1cIik7XG5jb25zdCBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbW1lbnRzIHRleHRhcmVhW25hbWU9bXNnXVwiKTtcblxuY29uc3QgdG9nZ2xlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tbWVudHMgLmNvbW1lbnRzX3RvZ2dsZUZvcm1cIik7XG5jb25zdCBjb21tZW50c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzTGlzdFwiKVxuY29uc3QgbW9yZUNvbW1lbnRzID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbW1lbnRzIC5jb21tZW50c19tb3JlXCIpO1xuXG4vKiogUGFzcyB0aGUgZG9jdW1lbnQgY29tbWluZyBmcm9tIHRoZSBkYXRhYmFzZSAqLyBcbmNvbnN0IGNvbW1lbnQgPSAoe25hbWUsbXNnLGlzUHVibGljOnB9KSA9PiB7XG4gIGNvbnN0IGFsZXJ0ID0gcCA/ICdkaXNwbGF5OmJsb2NrJzonZGlzcGxheTpub25lJztcbiAgcmV0dXJuIGA8bGkgY2xhc3M9XCJjb21tZW50c19tZXNzYWdlXCIgc3R5bGU9XCIke2FsZXJ0fVwiPmAgXG4gICAgKyBgPGgzPiR7bmFtZX08L2gzPjxwPiR7bXNnfTwvcD5gIFxuICAgICsgXCI8L2xpPlwiXG59XG5cbmNvbnN0IHByZXZpZXcgPSAoe25hbWUsbXNnfSkgPT4ge1xuICByZXR1cm4gYDxsaSBjbGFzcz1cImNvbW1lbnRzX21lc3NhZ2UgY29tbWVudHNfbWVzc2FnZS1wcmV2aWV3XCI+YCBcbiAgICArIGA8cCBjbGFzcz1cInNtYWxsXCI+U3VjY2VzcyEgQ29tbWVudCB3aWxsIGJlIHB1YmxpYyBzaG9ydGx5ICh0aGlzIGlzIGEgcHJldmlldykuPC9wPiA8aDM+JHtuYW1lfTwvaDM+PHA+JHttc2d9PC9wPmAgXG4gICAgKyBcIjwvbGk+XCJcbn1cblxuLyoqIHRha2VzIHRoZSBAcGFyYW0gZm9ybSBhbmQgc2VuZHMgdGhlIGRhdGEgdG8gc2VydmVyIGFzIG11bHRpcGFydCAqL1xuY29uc3QgcG9zdCA9IGFzeW5jKGRhdGEpPT57XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvY29tbWVudHNcIiwgeyAgIFxubWV0aG9kOiBcIlBPU1RcIiwgXG5tb2RlOiBcImNvcnNcIiwgXG5jYWNoZTogXCJuby1jYWNoZVwiLCBcbmNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIFxucmVkaXJlY3Q6IFwiZm9sbG93XCIsIFxucmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIiwgXG4vL2JvZHk6IG5ldyBGb3JtRGF0YShmb3JtKVxuYm9keTpKU09OLnN0cmluZ2lmeShkYXRhKVxufSlcbnJldHVybiByZXNwb25zZTtcbn1cblxuY29uc3QgcG9zdE1zZyA9IChlKT0+e1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGRhdGEgPSB7bmFtZTpuYW1lLnZhbHVlLGVtYWlsOmVtYWlsLnZhbHVlLG1zZzptc2cudmFsdWV9XG4gIHBvc3QoZGF0YSkudGhlbihzdWMgPT4gY29tbWVudHNMaXN0XG4gICAgICAuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlYmVnaW5cIiwgcHJldmlldyhkYXRhKSlcbiAgICAgICkuY2F0Y2goZT0+Y29uc29sZS5sb2coZSkpO1xufVxuXG5jb25zdCBza2lwTGltaXQgPSAobk9mQ29tbWVudHMpID0+IFtuT2ZDb21tZW50cywgbk9mQ29tbWVudHMrMTBdXG5jb25zdCBnZXQgPSBhc3luYyhhcnIpPT57XG4gIGxldCB1cmwgPSBgY29tbWVudHMvJHthcnJbMF19LyR7YXJyWzFdfWBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyAgIFxubWV0aG9kOiBcIkdFVFwiLCBcbm1vZGU6IFwiY29yc1wiLCBcbmNhY2hlOiBcIm5vLWNhY2hlXCIsIFxuY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgXG5yZWRpcmVjdDogXCJmb2xsb3dcIiwgXG5yZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLCBcbn0pXG5yZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZSA9PiBnZXQoc2tpcExpbWl0KDApKVxuICAgIC50aGVuKHIgPT4ge1xuICAgICAgci5mb3JFYWNoKGRvYyA9PiBjb21tZW50c0xpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjb21tZW50KGRvYykpKVxuICAgICAgfSlcbiAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYSBwcm9ibGVtJykpKVxuXG5tb3JlQ29tbWVudHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3Qgbk9mQ29tbWVudHMgPSBjb21tZW50TGlzdC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgZ2V0KHNraXBMaW1pdChuT2ZDb21tZW50cykpXG4gICAgLnRoZW4oZG9jPT5jb21tZW50TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNvbW1lbnQoZG9jKSkpXG4gICAgLmNhdGNoKGU9PmNvbnNvbGUuZXJyb3IoJ1RoZXJlIHdhcyBhIHByb2JsZW0nKSlcbiAgICB9KVxuXG50b2dnbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHRvZ2dsZXIoZm9ybSkpO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgcG9zdE1zZyk7XG4iLCJjb25zdCBzcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VzIC5yZXZpZXdTcGFuXCIpO1xuXG5zcGFucy5mb3JFYWNoKHNwYW49PiB7XG4gICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT4ge1xuICAgICAgICBjb25zdCBpbWcgPSBzcGFuLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdG9nZ2xlcihpbWcpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiJdfQ==
