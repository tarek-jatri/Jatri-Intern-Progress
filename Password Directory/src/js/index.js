// <<<<<<<<<<<<<<<<<< Regex for From >>>>>>>>>>>>>>>>>>>
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[-_.]{2})[^-_.].*[^-_.]$/g;

const update = {
    value: false,
    key: 0
};


// <<<<<<<<<<<<<<<<<< Form Validation >>>>>>>>>>>>>>>>>>>
function validateInput() {
    const name = document.querySelector("[name=name]").value.trim();
    const url = document.querySelector("[name=url]").value.trim();
    const username = document.querySelector("[name=username]").value.trim();
    const password = document.querySelector("[name=password]").value.trim();
    const hint = document.querySelector("[name=hint]").value.trim();

    if (!name.match(nameRegex)) {
        alert("Invalid Name");
        return false;
    } else if (!url.match(urlRegex)) {
        alert("Invalid URL");
        return false;
    } else if (!username.match(usernameRegex)) {
        alert("Invalid Username");
        return false;
    } else if (password.length < 8) {
        alert("Password must have atleast 8 characters");
        return false;
    }

    return true;
}

function clearInputFields() {
    const name = document.querySelector("[name=name]");
    const url = document.querySelector("[name=url]");
    const username = document.querySelector("[name=username]");
    const password = document.querySelector("[name=password]");
    const hint = document.querySelector("[name=hint]");
    name.value = "";
    url.value = "";
    username.value = "";
    password.value = "";
    hint.value = "";
}


// <<<<<<<<<<<<<<<<<< CRUD - Create >>>>>>>>>>>>>>>>>>>
function insertToDB(key) {
    if (!validateInput())
        return;
    if (!localStorage.getItem(key))
        localStorage.setItem(key, '[{}]');

    const prevObj = JSON.parse(localStorage.getItem(key));
    const obj = createObject(prevObj.length);
    prevObj.push(obj);

    const strObj = JSON.stringify(prevObj);
    // console.log(update);
    localStorage.setItem(key, strObj);
    readAllFromDB(key);
}

function createObject(id) {
    const name = document.querySelector("[name=name]").value.trim();
    const url = document.querySelector("[name=url]").value.trim();
    const username = document.querySelector("[name=username]").value.trim();
    const password = document.querySelector("[name=password]").value.trim();
    const hint = document.querySelector("[name=hint]").value.trim();
    const obj = {};
    obj.id = id;
    obj.name = name;
    obj.url = url;
    obj.username = username;
    obj.password = password;
    obj.hint = hint;
    clearInputFields();
    return obj;
}





// <<<<<<<<<<<<<<<<<< CRUD - Read >>>>>>>>>>>>>>>>>>>
function readAllFromDB(key) {
    const objects = JSON.parse(localStorage.getItem(key));
    objects.shift();
    const objectsStr = objects
        .map(function (obj) {
            return `<tr>
        <td>${obj.name}</td>
        <td>${obj.url}</td>
        <td>${obj.username}</td>
        <td>${obj.password}</td>
        <td>${obj.hint}</td>
        <td><button id="key" onclick="updateToDB('${key}', ${obj.id})">Edit</button></td>
        <td><button id="key" onclick="deleteFromDB('${key}', ${obj.id})">Delete</button></td>
      </tr>`;
        })
        .join("");

    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = objectsStr;
}


// <<<<<<<<<<<<<<<<<< CRUD - Update >>>>>>>>>>>>>>>>>>>
function updateToDB(key, id) {
    setInputFields(key, id);
    // update.value = true;
    // update.key = key;
}


function setInputFields(key, id) {
    const obj = JSON.parse(localStorage.getItem(key));
    document.querySelector("[name=name]").value = obj[id].name;
    document.querySelector("[name=url]").value = obj[id].url;
    document.querySelector("[name=username]").value = obj[id].username;
    document.querySelector("[name=password]").value = obj[id].password;
    document.querySelector("[name=hint]").value = obj[id].hint;
}


// <<<<<<<<<<<<<<<<<< CRUD - Delete >>>>>>>>>>>>>>>>>>>
function deleteFromDB(key, id) {
    const obj = JSON.parse(localStorage.getItem(key));
    console.log(obj);
    obj.splice(id, 1);
    console.log(obj);
    const objStr = JSON.stringify(obj);
    localStorage.setItem(key, objStr);
    readAllFromDB(key);
}

readAllFromDB('abir_hossain');
