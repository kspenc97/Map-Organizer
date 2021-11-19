const loginForm = document.getElementById('login-form');
const emailInp = document.getElementById('email-input');
const passInp = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');



login = {
    username: 'tri.roxy83@yahoo.com',
    password: 'password'
}
const now = new moment();
console.log(now);


//checking email and password
function checkRequired(input){
    input.forEach(function(input){
        if(input.value.trim()===''){
            showError(input);
        } else {
            showSuccess(input);
        }
    });
}

//show success of input
function showSuccess(input){
    input.className = 'input success'
}

//show failure of input
function showError(input, message){
    input.className = 'input fail'

    if(message !== ""){
        input.placeholder = `${message}`
    }
}
//check email
function checkEmail (email){
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regexp.test(email.value.trim())){
        showSuccess(email);
    } else{
        emailInp.value="";
        showError(email, 'Email not Valid')
    }

}


//on submit button click
submitBtn.addEventListener('click', function(e){
e.preventDefault();
    checkRequired([emailInp, passInp]);
    checkEmail(emailInp);
    location.assign("/dashboard/dashboard.html");
})

