let logbtn = document.getElementById("logbtn");

logbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let uemail = document.querySelector("#uemail").value.trim();
  let upass = document.querySelector("#upass").value;

  let eerror = document.querySelector("#eerror");
  let perror = document.querySelector("#perror");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let isEmailValid = false;
  let isPassValid = false;

  if (uemail === "") {
    eerror.innerHTML = "Enter the email id!!";
  } else if (!emailRegex.test(uemail)) {
    eerror.innerHTML = "Email is invalid";
  } else {
    eerror.innerHTML = "";
    isEmailValid = true;
  }
  if (upass === "") {
    perror.innerHTML = "Please enter your password!!";
  } else if (upass.length < 8) {
    perror.innerHTML = "Password must be at least 8 characters";
  } else {
    perror.innerHTML = "";
    isPassValid = true;
  }

  if (isEmailValid && isPassValid) {
    let customer = JSON.parse(localStorage.getItem("Customers")) || [];

    let isExist = customer.filter(
      (ele) => ele.emailid.toLowerCase() === uemail.toLowerCase() && ele.password === upass
    );

    if (isExist.length === 1) {
      alert("Login Successfully");
      window.location.href = "home.html";
    } else {
      alert("You are not a registered user, please register first.");
      window.location.href = "register.html";
    }
  }
});
