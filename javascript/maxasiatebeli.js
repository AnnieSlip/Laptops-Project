"use strict";
const secondForm = document.getElementById("second-container");
//INPUTS
const image_input = document.querySelector("#image_input");
const laptopName = document.querySelector("#laptopname");
const cpuBirtvi = document.querySelector("#birtvi");
const nakadi = document.querySelector("#nakadi");
const laptopRAM = document.querySelector("#ram");
const date = document.querySelector("#date");
const price = document.querySelector("#price");
//const mdgomareoba = document.querySelector("");
//const mexsierebisTipi = document.querySelector("");
////////////////////////////////////////////////////
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
//FORM SUBMIT AND VALIDATION
secondForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = function () {
  const laptopCPU = document.querySelector("#cpu");
  const laptopBrand = document.querySelector("#brand");
  const imageContainer = document.querySelector(".image_container");

  //PHOTO
  if (image_input.value.trim() == "") {
    addError(image_input);
    imageContainer.style.border = "dashed 2px var(--red)";
    imageContainer.style.backgroundColor = "#FFF1F1";
    document.querySelector("#photo-description").style.color = "var(--red)";
  } else {
    removeError(image_input);
    imageContainer.style.border = "dashed 2px var(--blue)";
    imageContainer.style.backgroundColor = "var(--gray)";
    document.querySelector("#photo-description").style.color = "var(--blue)";
  }
  //LaptopName
  if (laptopName.value == "") {
    addError(laptopName);
  } else if (isLaptopNameValid()) {
  }
  //LaptopBrand
  //CPU
  //CPU BIRTVI
  //CPU NAKADI
  //RAM
  //MEXSIEREBIS TIPI
  //DATE
  //PRICE
  //MDGOMAREOBA
};

const isLaptopNameValid = function (laptopName) {
  const reg = /^[a-z][a-z0-9]*$/i;
  return reg.test(laptopName);
};

function addError(element) {
  const parent = element.parentElement;
  parent.classList.add("error");
}

function removeError(element) {
  const parent = element.parentElement;
  parent.classList.remove("error");
}
