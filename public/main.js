var refreshBtn = document.querySelector('#refreshBtn'),
    myHeaders = new Headers(),
    token = '', // Enter your token here
    newlineURL = 'https://newline.theironyard.com/api';

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer " + token);

var get = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

var post = {
  method: 'POST',
  headers: myHeaders,
  body: {},
  mode: 'cors',
  cache: 'default'
};

// GET request to refresh Page with Supplementals
function refresh() {
  fetch(newlineURL + '/supplementals', get)
    .then(function(res) {
      return res.json().then(function(json) {
        var list = document.querySelector('.list');
        list.innerHTML = '';

        for (var i = 0; i < json.data.length; i++) {
          var divContainer = document.createElement('div');
          var cloneBtn = document.createElement('button');
          var copyMarkdownBtn = document.createElement('button');

          divContainer.innerHTML = json.data[i].title;
          divContainer.id = "cont" + json.data[i].id;
          divContainer.className = 'item-container';

          cloneBtn.innerHTML = 'Clone';
          cloneBtn.id = json.data[i].id;
          cloneBtn.className = 'item-btn';
          cloneBtn.disabled = true; // disabled until API fix

          copyMarkdownBtn.innerHTML = 'Copy Markdown';
          copyMarkdownBtn.id = json.data[i].id;
          copyMarkdownBtn.className = 'item-btn';

          divContainer.appendChild(copyMarkdownBtn);
          divContainer.appendChild(cloneBtn);
          list.appendChild(divContainer);

          addBtnListeners(divContainer);
        }
      })
    });
}

// Add event listeners to clone buttons
function addBtnListeners(el) {

  for (let i = 0; i < el.children.length; i++) {
    el.children[i].addEventListener("click", function(e) {
      var id = e.target.id;

      fetch(newlineURL + '/supplementals/' + id, get)
        .then(function(res) {
          return res.json().then(function(json) {
            if (i === 0) {
              copyToClipboard(json.body);
            } else {
              cloneSupplemental(json);
            }
          });
        });
    });
  }

}

// POST request to clone
function cloneSupplemental(data) {
  var title = data.title,
      description = data.description,
      body = data.body;

  post.body = JSON.stringify({
    title: title,
    description: description,
    body: body
  });

  fetch(newlineURL + '/supplementals', post)
    .then(function(res) {
      return res.json().then(function(json) {
        refresh();
      });
    });
}

// Prompt window to allow coping to clipboard
function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Command ⌘ + C", text);
}
