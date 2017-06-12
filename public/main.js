var refreshBtn = document.querySelector('#refreshBtn'),
    myHeaders = new Headers(),
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2FhYy5oYXJkeUB0aGVpcm9ueWFyZC5jb20iLCJrZXkiOiIxZGViZDkzZWZmN2YyMzczNjUxNjdiNGJhNzYwMDI2MCJ9.yBv0xgmmfdzdQ2vjGRsJcPozvDQeJ2pUAXfRCfIOHg4',
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

function refresh() {
  fetch(newlineURL + '/supplementals', get)
    .then(function(res) {
      return res.json().then(function(json) {
        var list = document.querySelector('.list');
        list.innerHTML = '';

        for (var i = 0; i < json.data.length; i++) {
          var divContainer = document.createElement('div');
          var cloneBtn = document.createElement('button');

          divContainer.innerHTML = json.data[i].title;
          divContainer.id = "cont" + json.data[i].id;
          divContainer.className = 'item-container';

          cloneBtn.innerHTML = 'Clone';
          cloneBtn.id = json.data[i].id;
          cloneBtn.className = 'item-btn';

          divContainer.appendChild(cloneBtn);
          list.appendChild(divContainer);

          addBtnListeners(divContainer);
        }
      })
    });
}

function addBtnListeners(el) {
  el.children[0].addEventListener("click", function(e) {
    var id = e.target.id;

    fetch(newlineURL + '/supplementals/' + id, get)
      .then(function(res) {
        return res.json().then(function(json) {
          cloneSupplemental(json);
        });
      });
  });
}

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
