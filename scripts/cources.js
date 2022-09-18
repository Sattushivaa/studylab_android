console.log("cources.js");


const search_btn = $("#search-btn")[0];
const search_inp = $("input#search_inp")[0];

search_btn.addEventListener("click", (e) => {
    // $("#clear_search")[0].style.display = "inline-block";
    // $("#search_inp")[0].value = "";
    courcesServer.send(JSON.stringify({
        type: "findCource",
        keywords: search_inp.value
    }));
    load();
})

courcesServer.onmessage = (e) => {
    //console.log(e.data);
    loaded();
    const data = JSON.parse(e.data);
    if (data.type == "search result") handleSearchResult(data.list);
    if (data.type == "courceitems") handleCourceItems(data.items);
    if (data.type == "edit cource") addMyCourceItems(data.items);
    if (data.type == "success") {
        yeah(data);
        if (data.description == "cource created successfully") {
            $("#newCourcePrompt")[0].style.left = "-100vw";
        }
    }
    if (data.type == "a cource") {
        if (data.reply_of == "my_cource") addToMyCources(data.cource);
    }
}

function handleSearchResult(list) {
    let container = $("#search-result")[0];
    $("#action_suggestion")[0].style.display = "none";
    container.innerHTML = "";
    list.forEach(cource => {
        let dv = document.createElement("div");
        dv.className = "cource_cont";
        dv.innerHTML = `<span class="cource_name">${cource.name}</span>
        <span class="cource_desc">${cource.description}</span>`;
        container.appendChild(dv);
        dv.addEventListener("click",()=>{ showCource(cource); load() });
    });
}
function showCource(cource) {
    let container = $("#courceDetails")[0];
    container.style.left = "0px";
    let name = $("#courceDetails .cource_name")[0];
    let author = $("#courceDetails .cource_author")[0];
    name.innerText = cource.name;
    temp.to_bookmark = cource.name;
    author.innerText = cource.authorname;
    courcesServer.send(JSON.stringify({
        type: "getCourceData",
        courceid: cource.cource_id
    }))
}
function handleCourceItems(items) {
    let container = $("#courceItems")[0];
    container.innerHTML = "";
    items.forEach((item) => {
        let dv = document.createElement("div");
        dv.className = "courceItem";
        dv.innerText = item.item_name;
        container.appendChild(dv);
        dv.addEventListener("click", (e) => {
            playCourceItem(item);
            // load();
        })
    })
}
function playCourceItem(item) {
    let type = item.type;
    $("#content")[0].innerHTML = "";
    $("#contentBox")[0].style.left = "0px";
    if (type == "text") {
        $("#contentName")[0].innerText = item.item_name;
        $("#content")[0].innerText = item.content;
    } else if (type == "video"){
        let vd = document.createElement("video");
        vd.controls = true;
        vd.src = item.content;
        vd.style.maxWidth = screen.availWidth - 20 + "px";
        vd.style.margin = "-10px";
        $("#content")[0].appendChild(vd);
    }
}
function addToMyCources(cource) {
    let container = $("#myCourcesListBox")[0];
    let dv = document.createElement("div");
    dv.className = "mycource";
    dv.innerHTML = `
        <span class="mycource_name">${cource.name}</span>
        <span class="mycource_description">${cource.description}</span>
        `;
    container.appendChild(dv);
    dv.addEventListener("click", editCource.bind(null, cource));
}
function editCource(cource){
    temp.parentCource = cource.cource_id;
    courcesServer.send(JSON.stringify({
        type : "getCourceData",
        courceid : cource.cource_id,
        msg : "need for editing"
    }));
}
function addMyCourceItems(items){
    let container = $("#edit_cource_items")[0];
    $("#edit_cource")[0].style.left = "0px";
    $("#edit_cource h2")[0].innerText = items[0]?.name || "no items yet"
    container.innerHTML = "";
    items.forEach((item) => {
        let dv = document.createElement("div");
        dv.className = "courceItem";
        dv.innerText = item.item_name;
        container.appendChild(dv);
        dv.addEventListener("click", (e) => {
            //playCourceItem(item);
        })
    })
}

//=========================================================================================================================
$("#cutcource")[0].addEventListener("click", () => { $("#courceDetails")[0].style.left = "-100vw" });
// $("#clear_search")[0].addEventListener("click", (e) => { search_inp.value = ""; e.target.style.display = "none"; $("#search-result")[0].innerHTML = "" });
$("#contentBox button")[0].addEventListener("click",(e)=>{ $("#contentBox")[0].style.left = "-100vw"; });
$("#newCourceItemPrompt .cancel")[0].addEventListener("click",()=>{$("#newCourceItemPrompt")[0].style.display = "none"});
$("#cancel_edit_cource")[0].addEventListener("click",(e)=>{$("#edit_cource")[0].style.left = "-100vw"});
$("#edit_cource_okay")[0].addEventListener("click",(e)=>{$("#edit_cource")[0].style.left = "-100vw"});
$("#refresh")[0].addEventListener("click",()=>{location.reload()});