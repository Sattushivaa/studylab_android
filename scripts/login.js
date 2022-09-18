let role;
let cources_completed = 0;
let starts = 0;
let experience = "level 1";
let COURCES = 0;
let cources = [];
let credentials = localStorage.getItem("studylab_credentials");


//==========================================================================================================

console.log("login.js");

loginServer.onopen = () => {
    console.log("opened");
    if (credentials) {
        credentials = JSON.parse(credentials);
        $("#login_username")[0].value = credentials.username;
        $("#login_password")[0].value = credentials.password;
        console.log(credentials);
        loginServer.send(JSON.stringify({
            type : "login",
            username : credentials.username,
            password : credentials.password
        }))
    } else sayToLogin();
};

//==============================****************************************======================================

loginServer.onmessage = (e) => {
    loaded();
    let data = JSON.parse(e.data);
    if (data.type == "your info") handleLoginSuccess(data.userdata);
    if (data.type == "signup success") handleSignupSuccess(data);
    if (data.type == "success" || data.type == "failure") yeah(data);
};

//========================================================================================================



function sayToLogin(){
    //alert("you have not logged in yet");
    $("#login")[0].style.left = "0px";
}


//===========================================================================================================


$("#login_btn")[0].addEventListener("click",(e)=>{ $("#login_form")[0].style.left = "0px"; })
$("#login_form")[0].addEventListener("submit",(e)=>e.preventDefault());
$("#signup_form")[0].addEventListener("submit",(e)=>e.preventDefault());
$("#closeLoginForm")[0].addEventListener("click",()=>{ $("#login_form")[0].style.left = "-100vw";});
$("#closeSignupForm")[0].addEventListener("click",()=>{ $("#signup_form")[0].style.left = "-100vw"; })
$("#signup_btn")[0].addEventListener("click",()=>{$("#signup_form")[0].style.left = "0px"});
$("#roll_student")[0].addEventListener("click",()=>{$("#teachers_signup_input")[0].style.display = "none"; role="student"});
$("#roll_teacher")[0].addEventListener("click",()=>{$("#teachers_signup_input")[0].style.display = "block"; role="teacher"});



//============================================================================================================

$("#login_form_submit")[0].addEventListener("click",(e)=>{
    loginServer.send(JSON.stringify({
        type : "login",
        username : $("#login_username")[0].value,
        password : $("#login_password")[0].value
    }));
    load();
});

$("#signup_form_submit")[0].addEventListener("click",(e)=>{
    loginServer.send(JSON.stringify({
        type : "signup",
        name : $("#signup_name")[0].value,
        username : $("#signup_username")[0].value,
        password : $("#signup_password")[0].value,
        role,
        school_name : $("#signup_schoolname")[0].value || null
    }));
    load();
})


//============================================================================================================

function handleLoginSuccess(userdata) {

    localStorage.setItem("studylab_credentials",JSON.stringify({
        username : $("#login_username")[0].value,
        password : $("#login_password")[0].value
    }));
    credentials = localStorage.getItem("studylab_credentials");
    credentials = JSON.parse(credentials);

    $("#my_name")[0].innerText = "hello "+ credentials.username;

    $("#login_form")[0].style.display = "none";
    $("#login")[0].style.display = "none";

    role = userdata.role;
    COURCES = userdata.courses;
    console.log(userdata);

    if (userdata.role == "teacher"){

        $("#teacher_access")[0].style.display = "block";

        for(let i=1;i<COURCES+1;i++){
            let cource_id = "cource";
            courcesServer.send(JSON.stringify({
                type : "getACource",
                msg : "my_cource",
                cource_id : userdata[cource_id+i]
            }));
        }
    };
}


//============================================================================================================


function handleSignupSuccess(userdata){
    localStorage.setItem("studylab_credentials",JSON.stringify({
        username : userdata.username,
        password : $("#signup_password")[0].value,
    }));
    credentials = JSON.parse(localStorage.getItem("studylab_credentials"));
    $("#signup_form")[0].style.display = "none";
    $("#login")[0].style.display = "none";
}


//============================================================================================================


// function handleACource(data) {
//     let container = $("#myCourcesListBox")[0];
//     if (data.reply_of == "my_cource"){
//         let dv = document.createElement("div");
//         dv.className = "mycource";
//         dv.innerHTML = `
//         <span class="mycource_name">${data.cource.name}</span>
//         <span class="mycource_description">${data.cource.description}</span>
//         `;
//         dv.addEventListener("click", editCource.bind(null,data.cource));
//     }
// }