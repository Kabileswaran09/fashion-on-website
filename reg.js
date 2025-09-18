const subbtn = document.getElementById("subbtn");

let isDataExist = JSON.parse(localStorage.getItem("Customers"));
let customers = Array.isArray(isDataExist) ? isDataExist : [];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

subbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let uname = document.querySelector("#uname").value.trim();
  let uemail = document.querySelector("#uemail").value.trim();
  let upass = document.querySelector("#upass").value;
  let ucpass = document.querySelector("#ucpass").value;

  let uerror = document.querySelector("#uerror");
  let eerror = document.querySelector("#eerror");
  let perror = document.querySelector("#perror");
  let cperror = document.querySelector("#cperror");

  let isEmailValid = false,
    isUname = false,
    isPass = false,
    isCPass = false;

  if (uname === "") {
    uerror.innerHTML = "Enter the user name!!";
  } else {
    uerror.innerHTML = "";
    isUname = true;
  }

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
    perror.innerHTML = "Password must be 8 characters";
  } else {
    perror.innerHTML = "";
    isPass = true;
  }

  if (ucpass === "") {
    cperror.innerHTML = "Please enter your confirm password!!";
  } else if (ucpass.length < 8) {
    cperror.innerHTML = "Confirm Password must be 8 characters";
  } else if (ucpass !== upass) {
    cperror.innerHTML = "Passwords do not match!";
  } else {
    cperror.innerHTML = "";
    isCPass = true;
  }

  if (isEmailValid && isUname && isPass && isCPass) {
    let isExist = customers.filter(
      (ele) => ele.emailid.toLowerCase() === uemail.toLowerCase()
    );

    if (isExist.length > 0) {
      alert("This email is already registered!");
    window.location.href = "index.html";

    document.getElementById("uname").value = "";
    document.getElementById("uemail").value = "";
    document.getElementById("upass").value = "";
    document.getElementById("ucpass").value = "";
      return;
    }

    let cust = {
      username: uname,
      emailid: uemail,
      password: upass,
    };

    customers.push(cust);
    localStorage.setItem("Customers", JSON.stringify(customers));

    alert("Registered successfully!!");
    window.location.href = "index.html";

    document.getElementById("uname").value = "";
    document.getElementById("uemail").value = "";
    document.getElementById("upass").value = "";
    document.getElementById("ucpass").value = "";
  }
});
