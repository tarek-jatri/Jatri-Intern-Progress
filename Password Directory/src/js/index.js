// <<<<<<<<<<<<<<<<<< Regex for From >>>>>>>>>>>>>>>>>>>
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
const urlRegex =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[-_.]{2})[^-_.].*[^-_.]$/g;

const update = {
    value: false,
    key: '',
    id: 0

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
    if (update.value) {
        updateTheObject(update.key, update.id);
        update.value = false;
        update.key = '';
        update.id = 0;
        return;
    }
    const prevObj = JSON.parse(localStorage.getItem(key));
    const obj = createObject(prevObj.length);
    prevObj.push(obj);

    const strObj = JSON.stringify(prevObj);
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
    if (!localStorage.getItem(key))
        localStorage.setItem(key, '[{}]');
    console.log(key);
    const str = localStorage.getItem(key);
    console.log(str);
    const objects = JSON.parse(str);
    // console.log("asdasd ", JSON.parse(str)[1]);
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
    console.log("Set timeout");
    console.log("Asdasda");
    const tableBody = document.getElementById("tbody");
    console.log(tableBody);
    tableBody.innerHTML = objectsStr;
}


// <<<<<<<<<<<<<<<<<< CRUD - Update >>>>>>>>>>>>>>>>>>>
function updateToDB(key, id) {
    setInputFields(key, id);
    update.value = true;
    update.key = key;
    update.id = id;
}


function setInputFields(key, id) {
    const obj = JSON.parse(localStorage.getItem(key));
    document.querySelector("[name=name]").value = obj[id].name;
    document.querySelector("[name=url]").value = obj[id].url;
    document.querySelector("[name=username]").value = obj[id].username;
    document.querySelector("[name=password]").value = obj[id].password;
    document.querySelector("[name=hint]").value = obj[id].hint;
}

function updateTheObject(key, id) {
    const objects = JSON.parse(localStorage.getItem(key));
    const name = document.querySelector("[name=name]").value.trim();
    const url = document.querySelector("[name=url]").value.trim();
    const username = document.querySelector("[name=username]").value.trim();
    const password = document.querySelector("[name=password]").value.trim();
    const hint = document.querySelector("[name=hint]").value.trim();

    objects.forEach(obj => {
        if (parseInt(obj.id) === parseInt(id)) {
            obj.name = name;
            obj.url = url;
            obj.username = username;
            obj.password = password;
            obj.hint = hint;
        }
    });

    const objStr = JSON.stringify(objects);
    localStorage.setItem(key, objStr);
    clearInputFields();
    readAllFromDB(key);
}

// <<<<<<<<<<<<<<<<<< CRUD - Delete >>>>>>>>>>>>>>>>>>>
function deleteFromDB(key, id) {
    const objects = JSON.parse(localStorage.getItem(key));
    const objects2 = objects.filter(obj => {
        if (parseInt(obj.id) === parseInt(id)) {
            return false;
        }
        return true;
    });
    const objStr = JSON.stringify(objects2);
    localStorage.setItem(key, objStr);
    readAllFromDB(key);
}

function setSubmitKey(key) {
    console.log(key);
    console.dir(document);
    document.addEventListener('DOMContentLoaded', function () {
        console.log("ASDASD ", key);
        document.querySelector("[name=submit]").addEventListener('click', function () {
            insertToDB(key);
        });
        readAllFromDB(key);
    });
}

// setSubmitKey("abir_hossain");
