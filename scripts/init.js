const $ = (e) => document.querySelectorAll(e);
var temp = {};
// let bookmarks = localStorage.getItem("studylab_bookmarks");
// if(!bookmarks){
//     localStorage.setItem("studylab_bookmarks",JSON.stringify({lists:[]}));
// } else {
//     bookmarks = JSON.parse(bookmarks);
//     bookmarks.lists.forEach
// }
const courcesServer = new WebSocket("wss://studylab-courses-server.glitch.me",["wss"]);
courcesServer.onopen = () => console.log("server opened");


const loginServer = new WebSocket("wss://studylab-login-server.glitch.me",["wss"]);

$("#home")[0].addEventListener("click",()=>{
    $("#edit_cource")[0].style.left = "-100vw";
    $("#teacherControlls")[0].style.display = "none";
    $("#contentBox")[0].style.left = "-100vw";
    $("#search-result")[0].innerHTML = "";
    $("#courceDetails")[0].style.left = "-100vw";
    $("#my_account_page")[0].style.left = "-100vw";
    $("#action_suggestion")[0].style.display = "block";
        $("#search_inp")[0].value = "";

})

function yeah(success){
    let dv = document.createElement("div");
    dv.innerText = success.description;
    dv.className = "successribbon";
    document.body.appendChild(dv);
    console.log(dv);
    setTimeout(()=>dv.remove(),2000);
}
$("#signout")[0].addEventListener("click",()=>{
    localStorage.clear();
    location.reload();
})
// $("#bookmark_btn")[0].addEventListener("click",()=>{
//     let x = localStorage.getItem("studylab_bookmarks");
//     x = JSON.parse(x);
//     x.list.push(temp.to_bookmark);
//     localStorage.setItem("studylab_bookmarks",JSON.stringify(x));
// })

function load(){
    $("#loader")[0].style.display = "block";
}
function loaded(){
    $("#loader")[0].style.display = "none";
}