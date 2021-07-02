const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const lastUpdated=document.getElementById("lastUpdated")

var date = new Date() // Date() constructor, instaces date object inherits many methods and props
lastUpdated.innerHTML = `${months[date.getMonth()]} ${days[date.getDay()]}, ${date.getYear()}`

