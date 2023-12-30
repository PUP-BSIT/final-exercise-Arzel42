let comments = [];

function displayComments() {
    let commentList = document.getElementById('comment_list');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.innerText = 
        `Name: ${comment.name}  
        Comment: "${comment.text}"  
        Date: ${comment.date.toDateString()}`;
        commentList.appendChild(li);
    });
}

function onTextChange() {
    let userName = document.getElementById("user_name");
    let userComment = document.getElementById("user_comment");
    if (userName.value.length && userComment.value.length ){ 
            document.getElementById("comment").disabled = false;
    } else {
    document.getElementById("comment").disabled = true;
    }
}

function addComment() {
    let userName = document.getElementById('user_name').value;
    let userComment = document.getElementById('user_comment').value;

    const newComment = {
        name: userName,
        text: userComment,
        date: new Date()
    };
    comments.push(newComment);
    displayComments();

    document.getElementById('user_name').value = "";
    document.getElementById('user_comment').value = "";
}

function sortCommentsByDate(sort) {
    if (sort === 'asc') {
        comments.sort((a, b) => a.date - b.date);
    } else if (sort === 'desc') {
        comments.sort((a, b) => b.date - a.date);
    }
    displayComments();
}

document.getElementById('comment').addEventListener('click', addComment);
displayComments();