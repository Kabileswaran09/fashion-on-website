let logbtn = document.querySelector("#logbtn");

logbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let uname = document.querySelector("#uname").value.trim();
  let upass = document.querySelector("#upass").value;

  let uerror = document.querySelector("#uerror");
  let perror = document.querySelector("#perror");

  let isUnameValid = false;
  let isPassValid = false;

  if (uname === "") {
    uerror.innerHTML = "Please enter your username!";
  } else {
    uerror.innerHTML = "";
    isUnameValid = true;
  }

  if (upass === "") {
    perror.innerHTML = "Please enter your password!";
  } else if (upass.length < 8) {
    perror.innerHTML = "Password must be at least 8 characters!";
  } else {
    perror.innerHTML = "";
    isPassValid = true;
  }

  if (isUnameValid && isPassValid) {
    if (uname === "admin" && upass === "admin@123") {
      alert("Admin login successful!");
      window.location.href = "dasboard.html";
    } else {
      alert("Incorrect username or password!");
    }
  }
});
