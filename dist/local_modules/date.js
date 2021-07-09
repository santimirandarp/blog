//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let date = new Date() // Date() constructor, instaces date object inherits many methods and props
const dayNum = date.getDate()//days[date.getDate()]
const mon = months[date.getMonth()]
const year = date.getFullYear()

date= `${dayNum}/${mon}/${year}`

module.exports = date
