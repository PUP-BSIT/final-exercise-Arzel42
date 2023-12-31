function search() {
    removeHighlight();

    var searchInput = document.getElementById("searchInput").
		value.toLowerCase();

    function wrapTextNodes(node) {
        if (node.nodeType !== Node.TEXT_NODE) {
            node.childNodes.forEach(childNode => wrapTextNodes(childNode));
            return;
        }

        var text = node.nodeValue;
        var replacedText = text.replace(new RegExp(searchInput, 'gi'), 
			match => `<span class="highlight">${match}</span>`);
        if (replacedText !== text) {
            var span = document.createElement('span');
            span.innerHTML = replacedText;
            node.parentNode.replaceChild(span, node);
        }
    }

    wrapTextNodes(document.body);
}

function removeHighlight() {
    var highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        var parent = element.parentNode;
        parent.replaceChild(document.createTextNode(element.textContent), 
			element);
    });
}

function scrollToContent() {
    var contentSection = document.getElementById('content');
    contentSection.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  var welcomeHeader = document.querySelector('.welcome-header');
  
  if (window.scrollY > welcomeHeader.offsetHeight) {
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  } else {
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});

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