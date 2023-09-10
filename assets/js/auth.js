import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

import {
    getDatabase,
    set,
    ref,
    onValue,
    child,
    update,
    remove
     // onChildAdded, onChildRemoved, onChildChanged, on, get,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const database = getDatabase();

const signup = () => {

    let username = document.getElementById("username").value;
    let email = document.getElementById("signup-email").value; 
    let password = document.getElementById("signup-password").value; 
    let rollno = document.getElementById("signup-rollno").value; 
    let course = document.getElementById("signup-course").value; 
    let batch = document.getElementById("signup-batch").value; 

    createUserWithEmailAndPassword(auth, email, password).then((resolve) => {

            alert("Signup Sucessful");
            console.log(resolve);

            let userId = auth.currentUser.uid;
            console.log(userId);

            let usersReference = ref(database, "users/" + userId);
            let usersObj = {
                username: username,
                email: email,
                password: password,
                rollno: rollno,
                course,
                batch
            };
            set(usersReference, usersObj);
        })
        .catch((reject) => {
            alert("Signup failed!");
            console.log(reject);
        });
};

let signup_btn = document.getElementById("signup-btn");

if (signup_btn) {
    signup_btn.addEventListener("click", signup);
} else {
    const login = () => {

        let email = document.getElementById("login-email");
        let password = document.getElementById("login-password");

        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((resolve) => {
                alert("Login Successful");
                let userId = auth.currentUser.uid;
                let usernameRef = ref(database, "users/" + userId);
                onValue(usernameRef, (data) => {
                    let userData = data.val().username;
                    console.log(userData);
                    document.getElementById("username").innerHTML = userData;
                })
            })
            .catch((reject) => {
                alert(reject);
            });
    };

    let login_btn = document.getElementById("login-btn");
    login_btn.addEventListener("click", login);
}