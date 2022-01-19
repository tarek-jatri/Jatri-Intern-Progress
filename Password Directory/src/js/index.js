const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g;


function validateInput() {
    const name = document.querySelector('[name=name]');
    const url = document.querySelector('[name=url]');
    const username = document.querySelector('[name=username]');
    const password = document.querySelector('[name=password]');
    const hint = document.querySelector('[name=hint]');

    if (!name.value.match(nameRegex)) {
        alert("Invalid Name");
        return;
    } else if (!url.value.match(urlRegex)) {
        alert("Invalid URL"); return;
    } else if (!username.value.match(usernameRegex)) {
        alert("Invalid Username"); return;
    } else if (password.value.length < 8) {
        alert("Password must have atleast 8 characters"); return;
    }


    createObject(name.value, url.value, username.value, password.value, hint.value);
}


function createObject(name, url, username, password, hint) {
    const obj = {};
    obj.name = name;
    obj.url = url;
    obj.username = username;
    obj.password = password;
    obj.hint = hint;
    insertToDB(obj);
}


function insertToDB(obj) {
    const strObj = JSON.stringify(obj);
    console.log(strObj);
    const id = Object.keys(localStorage).length + 1;
    localStorage.setItem(id, strObj);

    readFromDB(id);
}

function readFromDB(id) {
    const object = JSON.parse(localStorage.getItem(id));
    const keys = Object.keys(localStorage);
    console.log(keys);
}


function readAllFromDB() {
    const keys = Object.keys(localStorage);
    const objects = keys.map(function (key) {
        const obj = JSON.parse(localStorage.getItem(key));

        return `<tr>
        <td>${obj.name}</td>
        <td>${obj.url}</td>
        <td>${obj.username}</td>
        <td>${obj.password}</td>
        <td>${obj.hint}</td>
      </tr>`;

    }).join("");

    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = objects;
}

readAllFromDB();