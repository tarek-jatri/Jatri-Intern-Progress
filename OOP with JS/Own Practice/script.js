// Create Object using class

class Person {
    constructor(firstName, lastName, dob) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._dob = dob;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get dob() {
        return this._dob;
    }

    set firstName(x) {
        this._firstName = x;
    }
    set lastName(x) {
        this._lastName = x;
    }
    set dob(x) {
        this._dob = x;
    }

    fullName() {
        return `Full Name: ${this.firstName}  ${this.lastName}`;
    }

    currentAge() {
        let date = new Date().getFullYear();
        let birthYear = this.dob.getFullYear();
        console.log(birthYear);
        return `Age is ${date - birthYear}`;
    }
}

const persons = [];

class Eperson extends Person {
    constructor(firstName, lastName, dob, country) {
        super(firstName, lastName, dob);
        this._country = country;
    }

    get country() {
        return this._country;
    }
    set country(x) {
        this._country = x;
    }

    countryName() {
        return `Country: ${this._country}`;
    }
}

// functions

function dont(event) {
    event.preventDefault();
    document.querySelector('input[name="fname"]').value = "";
    document.querySelector('input[name="lname"]').value = "";
    document.querySelector('input[name="dob"]').value = "";
    console.log(event);
}

function insertPersonInfo(fname, lname, dob, country) {
    if (country === "")
        persons.push(new Person(fname, lname, dob));
    else
        persons.push(new Eperson(fname, lname, dob, country));
    addPersonBtn();
}


function addPersonBtn() {
    const len = persons.length;
    const addPerBtnDiv = document.querySelector(".addPersonBtn");
    const btn = document.createElement("button");
    btn.setAttribute("id", len - 1);
    btn.innerText = `Person ${len}`;
    btn.addEventListener("click", function () {
        showPersonInfo(len - 1);
    });

    addPerBtnDiv.appendChild(btn);
}

function showPersonInfo(id) {
    const showPersonDiv = document.querySelector(".showPersons");
    const person = persons[id];
    let personDiv;
    if (person.country === undefined) {
        personDiv = createPersonDiv(person);
    } else {
        console.log(person.country);
        personDiv = createEpersonDiv(person);
    }

    showPersonDiv.innerHTML = "";
    showPersonDiv.appendChild(personDiv);
}

function createPersonDiv(person) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    h4.innerHTML = `First Name: ${person.firstName} <br> Last Name: ${person.lastName} <br>
    \n ${person.fullName()}`;
    h5.innerText = person.currentAge();
    div.appendChild(h4);
    div.appendChild(h5);
    return div;
}

function createEpersonDiv(person) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    h4.innerHTML = `First Name: ${person.firstName} <br> Last Name: ${person.lastName} <br>
    \n ${person.fullName()}`;
    h5.innerHTML = person.currentAge() + "<br>";
    h5.innerHTML += person.countryName();
    div.appendChild(h4);
    div.appendChild(h5);
    return div;
}


function validateForm() {
    let fname = document.forms.myForm.fname.value;
    let lname = document.forms.myForm.lname.value;
    let dob = new Date(document.forms.myForm.dob.value);
    let country = document.forms.myForm.country.value;

    // console.log(fname, lname, dob.getFullYear());

    if (fname !== "" && lname !== "" && !isNaN(dob)) {
        dont(event);
        insertPersonInfo(fname, lname, dob, country);
    }
}