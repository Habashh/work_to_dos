let comments_list = null;
let comment_form = null;
let comment_input = null;


document.addEventListener("DOMContentLoaded", (e) => {
    comments_list = document.querySelector("#comments_list");
    comment_form = document.querySelector("#comment_form");
    comment_input = document.querySelector("#comment_body");
   
    loadComments();
    comment_form.addEventListener("submit", (e) => {
        e.preventDefault();
       let comment_text = comment_input.value;
            addComment(comment_text.trim());
            saveComment(comment_text.trim());
            comment_input.value = "";
    })
})

function addComment(text) {
    let template = document.createElement("li");
    let template2 = document.createElement("INPUT");
    template2.setAttribute("type","submit");
    template2.setAttribute("value","");
    template2.setAttribute("id","delete_comment");
    template.classList.add("comment");
    template.innerText = text;
    comments_list.insertBefore(template, comments_list.childNodes[0]);
    template.appendChild(template2);
    template.onclick = function() {this.parentNode.removeChild(this), deleteComment(text);}
    }

   
function saveComment(text) {
    let comments = localStorage.getItem("local_comments");
    if(comments == null) {
        comments = [];
    } else {
        comments = JSON.parse(comments);
    }
    comments.push(text);
    localStorage.setItem("local_comments", JSON.stringify(comments));
}

function loadComments() {
    let comments = localStorage.getItem("local_comments");
    if(comments == null) return;
    comments = JSON.parse(comments);
    for(let comment of comments) {
        addComment(comment);
    }
} 
function deleteComment(text) {
    let comments = localStorage.getItem("local_comments");
    if(comments == null) {
        comments = [];
    } else {
        comments = JSON.parse(comments);
    }
    
   var index1 = comments.indexOf(text); 
   var index2 = comments.lastIndexOf(text); 
if (index1 !== -1 || index1==null) {
    comments.splice(index1, 1);
         }else if (index2 !== -1 || index2==null) {
            comments.splice(index2, 1);}
       localStorage.setItem("local_comments", JSON.stringify(comments));
}