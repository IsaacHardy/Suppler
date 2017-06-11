var myHeaders = new Headers();
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2FhYy5oYXJkeUB0aGVpcm9ueWFyZC5jb20iLCJrZXkiOiIxZGViZDkzZWZmN2YyMzczNjUxNjdiNGJhNzYwMDI2MCJ9.yBv0xgmmfdzdQ2vjGRsJcPozvDQeJ2pUAXfRCfIOHg4';
var newlineURL = 'https://newline.theironyard.com/api';

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

var getAllSupplementals = fetch(newlineURL + '/supplementals', get)
  .then(function(res) {
    return res.json();
  });
