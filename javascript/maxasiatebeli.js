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
const radio = document.querySelector(".radio");
const imageContainer = document.querySelector(".image_container");
const url = "https://pcfy.redberryinternship.ge/api/laptop/create";
//const mdgomareoba = document.querySelector("");
//const mexsierebisTipi = document.querySelector("");
////////////////////////////////////////////////////
let uploaded_image = "";
const realFileBtn = document.getElementById("image_input");
const custumBtn = document.getElementById("custom-button");
const laptopBrandContainer = document.querySelector(".brand-container");
const laptopCpuContainer = document.querySelector(".cpu-container");
let x = false;
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
  formValidation();

  if (checkIsFormValid() == true) {
    let data = new FormData();
    data.append("name", "ani");
    data.append("surname", "ssdsad");
    data.append("team_id", 1);

    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data,
    }).then(function (res) {
      console.log(res);
    });
    form.submit();
  } else {
    e.preventDefault();
  }
});

const formValidation = function () {
  const laptopCPU = document.querySelector("#cpu");
  const laptopBrand = document.querySelector("#brand");
  const imageContainer = document.querySelector(".image_container");

  //PHOTO Validation
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
    removeError(laptopName);
  }
  //LaptopBrand
  if (laptopBrand.value == "") {
    addError(laptopBrand);
  } else {
    removeError(laptopBrand);
  }
  //CPU
  if (laptopCPU.value == "") {
    addError(laptopCPU);
  } else {
    removeError(laptopCPU);
  }
  //CPU BIRTVI
  onlyNumbers(cpuBirtvi.value) ? removeError(cpuBirtvi) : addError(cpuBirtvi);
  //CPU NAKADI
  onlyNumbers(nakadi.value) ? removeError(nakadi) : addError(nakadi);
  //RAM
  onlyNumbers(laptopRAM.value) ? removeError(laptopRAM) : addError(laptopRAM);
  //PRICE
  onlyNumbers(price.value) ? removeError(price) : addError(price);
  //MDGOMAREOBA
  if (mdgomareobaValidate() == false) {
    document.querySelector(".second").style.color = "red";
    addError(imageContainer);
  } else {
    removeError(imageContainer);
    document.querySelector(".second").style.color = "var(--black)";
  }
  //Mexsierebis tipi
  if (mexsierebaValidate() == false) {
    document.querySelector(".first").style.color = "red";
    addError(imageContainer);
  } else {
    removeError(imageContainer);
    document.querySelector(".first").style.color = "var(--black)";
  }
};

const checkIsFormValid = function () {
  const inputContainers = secondForm.querySelectorAll(".elem");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
};

const mexsierebaValidate = function () {
  let x = document.myform.mexsiereba;
  for (let i = 0; i < x.length; i++) {
    if (x[i].checked) {
      return true;
    } else {
      return false;
    }
  }
};
const mdgomareobaValidate = function () {
  let x = document.myform.mdgomareoba;
  for (let i = 0; i < x.length; i++) {
    if (x[i].checked) {
      return true;
    } else {
      return false;
    }
  }
};
const isLaptopNameValid = function (laptopName) {
  const reg = /^[a-z][a-z0-9]*$/i;
  return reg.test(laptopName);
};
const onlyNumbers = function (value) {
  const reg = /^\d+$/;
  return reg.test(value);
};
function addError(element) {
  const parent = element.parentElement;
  parent.classList.add("error");
}
function removeError(element) {
  const parent = element.parentElement;
  parent.classList.remove("error");
}
