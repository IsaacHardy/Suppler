var refreshBtn = document.querySelector('#refreshBtn'),
    myHeaders = new Headers(),
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2FhYy5oYXJkeUB0aGVpcm9ueWFyZC5jb20iLCJrZXkiOiIxZGViZDkzZWZmN2YyMzczNjUxNjdiNGJhNzYwMDI2MCJ9.yBv0xgmmfdzdQ2vjGRsJcPozvDQeJ2pUAXfRCfIOHg4',
    newlineURL = 'https://newline.theironyard.com/api';

myHeaders.append("Content-Type", "application/json");
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
  mode: 'cors',
  cache: 'default'
};

refreshBtn.addEventListener("click", function() {
  fetch(newlineURL + '/supplementals', get)
    .then(function(res) {
      return res.json().then(function(json) {
        console.log(json);
        for (var i = 0; i < json.data.length; i++) {
          var list = document.querySelector('.list');
          var divChild = document.createElement('div');

          divChild.innerHTML =
            json.data[i].id + " - " + 
            json.data[i].title + " - " +
            json.data[i].description;

          list.appendChild(divChild);
        }
      })

    });
});
