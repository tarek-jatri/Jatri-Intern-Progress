
function authenticateInfo() {
    const username = document.forms.loginForm.username.value.trim();
    const password = document.forms.loginForm.password.value.trim();
    const infos = JSON.parse(localStorage.getItem('userInfo'));
    if (!match(username, password, infos)) {
        alert("Wrong credentials inserted!!!!!!!");
        return false;
    } else {
        alert("credentials inserted!!!!!!!");
        window.location.replace('http://127.0.0.1:5500/Password%20Directory/index.html');
        return true;
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