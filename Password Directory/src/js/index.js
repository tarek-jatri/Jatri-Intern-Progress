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
function insertToDB() {
    if (!validateInput())
        return;
    const obj = createObject();
    const strObj = JSON.stringify(obj);
    // console.log(update);

    if (update.value) {
        localStorage.setItem(update.key, strObj);
        update.value = false;
        update.key = 0;
    } else {
        const id = Object.keys(localStorage).length + 1;
        localStorage.setItem(id, strObj);
    }
    readAllFromDB();
}

function createObject() {
    const name = document.querySelector("[name=name]").value.trim();
    const url = document.querySelector("[name=url]").value.trim();
    const username = document.querySelector("[name=username]").value.trim();
    const password = document.querySelector("[name=password]").value.trim();
    const hint = document.querySelector("[name=hint]").value.trim();
    const obj = {};
    obj.name = name;
    obj.url = url;
    obj.username = username;
    obj.password = password;
    obj.hint = hint;
    clearInputFields();
    return obj;
}





// <<<<<<<<<<<<<<<<<< CRUD - Read >>>>>>>>>>>>>>>>>>>
function readAllFromDB() {
    const keys = Object.keys(localStorage).sort(function (a, b) {
        return a - b;
    });
    console.log(keys);
    const objects = keys
        .map(function (key) {
            const obj = JSON.parse(localStorage.getItem(key));
            return `<tr>
        <td>${obj.name}</td>
        <td>${obj.url}</td>
        <td>${obj.username}</td>
        <td>${obj.password}</td>
        <td>${obj.hint}</td>
        <td><button id="key" onclick="updateToDB(${key})">Edit</button></td>
        <td><button id="key" onclick="deleteFromDB(${key})">Delete</button></td>
      </tr>`;
        })
        .join("");

    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = objects;
}


// <<<<<<<<<<<<<<<<<< CRUD - Update >>>>>>>>>>>>>>>>>>>
function updateToDB(key) {
    console.log(key);
    setInputFields(key);
    update.value = true;
    update.key = key;
}


function setInputFields(key) {
    const obj = JSON.parse(localStorage.getItem(key));
    document.querySelector("[name=name]").value = obj.name;
    document.querySelector("[name=url]").value = obj.url;
    document.querySelector("[name=username]").value = obj.username;
    document.querySelector("[name=password]").value = obj.password;
    document.querySelector("[name=hint]").value = obj.hint;
}


// <<<<<<<<<<<<<<<<<< CRUD - Delete >>>>>>>>>>>>>>>>>>>
function deleteFromDB(key) {
    localStorage.removeItem(key);
    readAllFromDB();
}

readAllFromDB();
