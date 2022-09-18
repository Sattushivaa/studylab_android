$("#cancel_new_cource")[0].addEventListener("click",()=>{
    $("#newCourcePrompt")[0].style.left = "-100vw";
    $("#new_courcce_name")[0].value = "";
    $("#new_cource_description")[0].innerText = "";
    $("#new_cource_tags")[0].value = "";
})
$("#create_new_cource")[0].addEventListener("click",()=>{
    let name = $("#new_courcce_name")[0].value;
    let description = $("#new_cource_description")[0].innerText;
    let tags = $("#new_cource_tags")[0].value;
    courcesServer.send(JSON.stringify({
        type : "createCource",
        name,
        description,
        author : credentials.username,
        cource_id : credentials.username + "."+ name.replaceAll(" ","_"),
        time : new Date().toLocaleString(),
        tags
    }));
})
$("#new_cource_form")[0].addEventListener("submit",(e)=>e.preventDefault());
$("#teacher_access")[0].addEventListener("click",(e)=>{$("#teacherControlls")[0].style.display = "block"})
$("#createNewCource")[0].addEventListener("click",()=>{ $("#newCourcePrompt")[0].style.left = "0px";})
$("#add_cource_item")[0].addEventListener("click",()=>{
    $("#newCourceItemPrompt")[0].style.left = "0px";
})
$("#upload_item")[0].addEventListener("click",()=>{
    $("#fileUpload")[0].click();
});
$("#fileUpload")[0].onchange = (e)=>{
    let file = $("#fileUpload")[0].files[0];
    if(file){
        console.log("yes");
        $("#file_name")[0].innerText = file.name
        let filereader = new FileReader();
        filereader.onload = () =>{
            console.log("loaded");
            temp.uploadItemContent = filereader.result;
        }
        if ($("#contentType")[0].value == "video" || $("#contentType")[0].value == "image" || $("#contentType")[0].value == "note"){
            filereader.readAsDataURL(file);
        } else if ($("#contentType")[0].value == "text"){
            filereader.readAsText(file)
        }

    } else console.log("no");
}
$("#new_cource_item_form .okay")[0].addEventListener("click",()=>{
    $("#newCourceItemPrompt")[0].style.display = "none";
    courcesServer.send(JSON.stringify({
        type : "addCourceItems",
        itemname : $("#new_item_name")[0].value,
        parent : temp.parentCource,
        item_id : `${temp.parentCource}.${ $("#new_item_name")[0].value.replaceAll(" ","_") }`,
        content : temp.uploadItemContent,
        c_type : $("#contentType")[0].value,
    }))
})

$("#account_btn")[0].addEventListener("click",()=>{
    $("#home")[0].click();
    $("#my_account_page")[0].style.left = "0px";
})