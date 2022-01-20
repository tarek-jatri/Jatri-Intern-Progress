function authenticateInfo() {
    const key = document.querySelector("[name=username]").value.trim();
    const pass = document.querySelector("[name=password]").value.trim();
    // console.log(key, pass);
    const infos = JSON.parse(localStorage.getItem('userInfo'));
    if (!match(key, pass, infos)) {
        alert("Wrong credentials inserted!!!!!!!");
        return false;
    } else {
        alert("credentials inserted!!!!!!!");

        // setTimeout(() => {
        console.log("YOYO");
        setSubmitKey(key);
        // }, 1000);
        window.location.href = "http://127.0.0.1:5500/Password%20Directory/index.html";
        // return true;
    }
}


function match(username, password, infos) {
    for (let i = 0; i < infos.length; i++) {
        if (username === infos[i].name && password === infos[i].password) {
            return true;
        }
    };
    return false;
}