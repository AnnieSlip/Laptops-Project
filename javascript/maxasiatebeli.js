"use strict";
const image_input = document.querySelector("#image_input");
let uploaded_image = "";
const realFileBtn = document.getElementById("image_input");
const custumBtn = document.getElementById("custom-button");

const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
  console.log(value, key);
});
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector(
      "#display_image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

custumBtn.addEventListener("click", function () {
  realFileBtn.click();
});
