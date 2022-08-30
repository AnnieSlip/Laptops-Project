"use strict";
const image_input = document.querySelector("#image_input");
let uploaded_image = "";
const realFileBtn = document.getElementById("image_input");
const custumBtn = document.getElementById("custom-button");
const laptopBrandContainer = document.querySelector(".brand-container");
const laptopCpuContainer = document.querySelector(".cpu-container");
//Recieve data from previous page
const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
  console.log(value, key);
});
//File upload and display
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
//Custom radio buttons click
custumBtn.addEventListener("click", function () {
  realFileBtn.click();
});
//get LaptopBrand data from api
const getLaptopBrands = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/brands");
    const data = await res.json();
    const laptopBrands = data.data.reverse();
    laptopBrands.map((brand) => {
      renderData(laptopBrandContainer, brand.id, brand.name);
    });
  } catch (err) {
    console.log(err);
  }
};
getLaptopBrands();
//Get CPU data from Api
const getCPU = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/cpus");
    const data = await res.json();
    const laptopCPU = data.data.reverse();
    laptopCPU.map((cpu) => {
      renderData(laptopCpuContainer, cpu.id, cpu.name);
    });
  } catch (err) {
    console.log(err);
  }
};
getCPU();
//Render Function
const renderData = function (place, id, value) {
  let data = `
    <option value=${id}>${value}</option>
    `;
  place.insertAdjacentHTML("afterend", data);
};
