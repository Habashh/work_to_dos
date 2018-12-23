let comments_list = null;
let comment_form = null;
let comment_input = null;
let comment_remove=null;
let delete_comment;


document.addEventListener("DOMContentLoaded", (e) => {
    comments_list = document.querySelector("#comments_list");
    comment_form = document.querySelector("#comment_form");
    comment_input = document.querySelector("#comment_body");
    comment_remove = document.querySelector(".comment");

    loadComments();
    comment_form.addEventListener("submit", (e) => {
        e.preventDefault();
        let comment_text = comment_input.value;
        if(comment_text.trim() === "") {
          return  alert("Please write a comment");
        } 
        else if(comment_text.length > 28){
         return  alert("Please reduse your comment to less than 28 characters");
        } else {
            addComment(comment_text.trim());
            saveComment(comment_text.trim());
            comment_input.value = "";
        }
    })

})
function addComment(text) {
    let template = document.createElement("li");
    let template2 = document.createElement("INPUT");
    template2.setAttribute("type","submit");
    template2.setAttribute("value","");
    template2.setAttribute("id","delete_comment");
    template2.setAttribute("onclick","deleteComment() ; removeComment();");
    template.classList.add("comment");
    template.innerText = text;
    comments_list.appendChild(template);
    template.appendChild(template2);
}
var tab = [], index;
function removeComment(){
    
    delete_comment = document.querySelectorAll("#comments_list li");
    
    for(var i = 0; i < delete_comment.length; i++){
       tab.push(delete_comment[i].innerHTML);
     }
    
    for(var i = 0; i < delete_comment.length; i++)
    {
       delete_comment[i].onclick = function(){
           
           index = tab.indexOf(this.innerHTML);
          
           comments_list.removeChild(comments_list.childNodes[index]);
        };
    }
   
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
    comments.pop(text);
    localStorage.setItem("local_comments", JSON.stringify(comments));
}