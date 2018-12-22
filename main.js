let comments_list = null;
let comments_list2;
let comment_form = null;
let comment_input = null;
let comment_remove=null;
var tab = [];
var index;

document.addEventListener("DOMContentLoaded", (e) => {
    comments_list = document.querySelector("#comments_list");
    comments_list2 = document.querySelectorAll("#comments_list li");
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
// remove comment

comments_list.addEventListener('click', function() {
  deleteComment();
removeComment()
   });
})
function addComment(text) {
    let template = document.createElement("li");
    template.classList.add("comment");
    template.innerText = text;
    comments_list.appendChild(template);
}

function removeComment(){
     
    comments_list.removeChild(comments_list.childNodes[0]);
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