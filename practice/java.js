let wrongCount = 0;

function validateForm() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let error = "";

    if (!email.includes("@")) {
        error = "Email must contain @";
    }
    else if (password.length < 6) {
        error = "Password must be at least 6 characters";
    }
    else if (!password.includes("#")) {
        error = "Password must contain #";
    }

    if (error !== "") {
        document.getElementById("errorMsg").innerHTML = error;

        wrongCount++;
        document.getElementById("count").innerHTML = wrongCount;

        return false;
    }

    document.getElementById("errorMsg").innerHTML = "Login Successful";
    return true;
}