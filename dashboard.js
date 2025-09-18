let customers = JSON.parse(localStorage.getItem("Customers")) || [];

let tableBody = document.querySelector("#customerTable tbody");

if (customers.length === 0) {
  tableBody.innerHTML = `<tr>
                            <td colspan="4" style="text-align:center; color:red;">
                              No Customers Found
                            </td>
                        </tr>`;
} else {
  tableBody.innerHTML = "";  // clear before adding
  customers.forEach((ele, index) => {
    let row = `
      <tr>
        <td>${index + 1}</td>
        <td>${ele.username}</td>
        <td>${ele.emailid}</td>
       
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

let lgbtn = document.querySelector(".logout");
lgbtn.addEventListener("click", () => {
  let logoutCheck = confirm("Do you want to logout ?");
  setTimeout(() => {
    if (logoutCheck) {
      window.location.href = "index.html";
    }
  }, 1000);
});

let dashboardLink = document.querySelector(".dashboardLink");
let customerTableSection = document.getElementById("customerTable");
let products = document.querySelector(".products");
let dashboardcontent = document.querySelector(".dashboardcontent");

customerTableSection.style.display = "none";
products.style.display = "none";

dashboardLink.addEventListener("click", (e) => {
  e.preventDefault();
  customerTableSection.style.display = "none";
  products.style.display = "none";
  dashboardcontent.style.display = "block";
});

let productslink = document.querySelector(".productslink");
productslink.addEventListener("click", (e) => {
  e.preventDefault();
  customerTableSection.style.display = "none";
  products.style.display = "block";
  dashboardcontent.style.display = "none";
});

let CustomerDisplay = document.querySelector(".CustomerDisplay");
CustomerDisplay.addEventListener("click", (e) => {
  e.preventDefault();
  customerTableSection.style.display = "block";
  products.style.display = "none";
  dashboardcontent.style.display = "none";
});

let productdetails = [];

function renderProducts() {
  productdetails = JSON.parse(localStorage.getItem("productdetails")) || [];

  let tableBody2 = document.querySelector(".products tbody");
  tableBody2.innerHTML = "";

  if (productdetails.length == 0) {
    tableBody2.innerHTML = `<tr> 
                                 <td colspan="5" style="text-align:center; color:red;">
                                          No Products Found
                                 </td>      
                              </tr>`;
  } else {
    productdetails.forEach((ele, index) => {
      let row = `
              <tr>
              <td>${index + 1}</td>
              <td>
                  <img src ="${ele.productimg}" alt="" width="100px" height="100px">
              </td>
              <td>${ele.pname}</td>
              <td>${ele.poldprice}</td>
                 <td> <button type="button" class="btns" onclick="edit(${index})">Edit</button>
                      <button type="button" id="deletebtn" onclick="deleteItem(${index})">Delete</button>
                  </td>
              </tr>`;

      tableBody2.innerHTML += row;
    });
  }
}
renderProducts();

function deleteItem(id) {
  let c = confirm("Do you want to delete this item ?");
  if (c) {
    let productdetails = JSON.parse(localStorage.getItem("productdetails")) || [];
    let remaining = productdetails.filter((ele, index) => index != id);
    localStorage.setItem("productdetails", JSON.stringify(remaining));
    alert("Your Product is deleted");
    renderProducts();
  } else {
    alert("Thank you, Your data is safe.");
  }
}

let a = JSON.parse(localStorage.getItem("productdetails")) || [];

let btn = document.querySelector(".smtbtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let productname = document.querySelector(".productname").value.trim();
  let ogprice = document.querySelector(".ogprice").value.trim();
  let pimg = document.querySelector(".pimg").value.trim();

  let pimgerror = document.querySelector("#pimgerror");
  let productnameerror = document.querySelector("#productnameerror");
  let ogpriceerror = document.querySelector("#ogpriceerror");
  
  // if (!productname || !ogprice || !pimg) {
  //   alert("Please fill all the fields.");
  //   return;
  // }

    // const urlPattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9-._~:/?#[\]@!$&'()+,;=])?$/;

  // ✅ Properly named flags
  let ispimg = false,
    isproductname = false,
    isogprice = false;

  // Image URL validation
  if (pimg === "") {
    pimgerror.innerText = "Enter the url";
    ispimg = false;
  }  else {
    pimgerror.innerText = "";
    ispimg = true;
  }
  
  // Product name validation
  if (productname === "") {
    productnameerror.innerText = "Enter the product name";
    isproductname = false;
  } else {
    productnameerror.innerText = "";
    isproductname = true;
  }

   if (ogprice === "") {
    ogpriceerror.innerText = "Enter the price";
    isogprice = false;
  } else {
    ogpriceerror.innerText = "";
    isogprice = true;
  }

    if (ispimg && isproductname && isogprice) {
  let details = {
    productimg: pimg,
    pname: productname,
    poldprice: ogprice,
  };

  a.push(details);
  localStorage.setItem("productdetails", JSON.stringify(a));

  document.querySelector(".productname").value = "";
  document.querySelector(".ogprice").value = "";
  document.querySelector(".pimg").value = "";
  renderProducts();
}
});

document.getElementById("totalCustomers").innerText = customers.length;
document.getElementById("totalProducts").innerText = (productdetails.length || 0) + 12;

document.querySelector(".uptbtn").style.display = "none";

// Edit function
function edit(id) {
  let pdetails = JSON.parse(localStorage.getItem("productdetails")) || [];

  let filterproducts = pdetails.find((ele, index) => index == id);
  if (!filterproducts) return;

  document.querySelector(".productname").value = filterproducts.pname;
  document.querySelector(".ogprice").value = filterproducts.poldprice;
  document.querySelector(".pimg").value = filterproducts.productimg;
  document.querySelector(".pindex").value = id;

  // Show update button, hide submit button
  document.querySelector(".uptbtn").style.display = "block";
  document.querySelector(".smtbtn").style.display = "none";
}

// Update function
let updatebtn = document.querySelector(".uptbtn");
updatebtn.addEventListener("click", (e) => {
  e.preventDefault();

  let productname = document.querySelector(".productname").value.trim();
  let ogprice = document.querySelector(".ogprice").value.trim();
  let pimg = document.querySelector(".pimg").value.trim();
  let pindex = document.querySelector(".pindex").value;

  if (!productname || !ogprice || !pimg) {
    alert("Please fill all the fields.");
    return;
  }

  let updatedproducts = JSON.parse(localStorage.getItem("productdetails")) || [];

  let setproducts = updatedproducts.map((ele, index) =>
    index == pindex ? { pname: productname, productimg: pimg, poldprice: ogprice } : ele
  );

  localStorage.setItem("productdetails", JSON.stringify(setproducts));
  alert("Update Successfully");
  renderProducts();

  document.querySelector(".uptbtn").style.display = "none";
  document.querySelector(".smtbtn").style.display = "block";

  document.querySelector(".form").reset();
});


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const aside = document.querySelector("aside");

  menuToggle.addEventListener("click", () => {
    aside.classList.toggle("active");
  });
});
