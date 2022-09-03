"use strict";
const laptopListBtn = document.getElementById("laptop_list");

laptopListBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "/pages/laptopList.html";
});
