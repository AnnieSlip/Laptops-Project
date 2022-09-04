"use strict";
const myToken = "913e14a91f10c9fbff161b4cffa757a9";
const getLaptopListURL = `https://pcfy.redberryinternship.ge/api/laptops?token=${myToken}`;

const laptopListContainer = document.getElementById("laptopList_container");
let laptopBrand_ID;

const getLaptopList = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    const laptops = data.data;
    //console.log(laptops);
    laptops.map((laptop) => {
      const laptopBrand = laptop.laptop;
      const user = laptop.user;
      //console.log(laptopBrand);
      //console.log(laptopBrand.id);
      //console.log(user);
      //console.log(laptopBrand.image);
      laptopBrand_ID = laptopBrand.id;
      renderLaptopInfo(
        laptopBrand.image,
        user.name,
        user.surname,
        laptopBrand.name
      );

      //GET A Single laptop

      fetch(
        `https://pcfy.redberryinternship.ge/api/laptop/${laptopBrand.id}?token=${myToken}`
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
  } catch (err) {
    console.log(err);
  }
};

getLaptopList(getLaptopListURL);

const renderLaptopInfo = function (img, name, surname, laptopBrandName) {
  const laptopContainer = `<div class="laptop-box">
    <div>
      <img
        class="laptop-img"
        src="https://pcfy.redberryinternship.ge/${img}"
        alt="laptop-image"
      />
    </div>
    <div>
      <p>${name} ${surname}</p>
      <p>${laptopBrandName}</p>
      <a href="/pages/laptopInfo.html" class="laptopList_a">მეტის ნახვა</a>
    </div>
  </div>`;

  laptopListContainer.insertAdjacentHTML("beforeend", laptopContainer);
};
