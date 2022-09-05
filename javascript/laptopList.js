"use strict";
//Main constants
const myToken = "913e14a91f10c9fbff161b4cffa757a9";
const getLaptopListURL = `https://pcfy.redberryinternship.ge/api/laptops?token=${myToken}`;
//Query Selectors
const laptopListContainer = document.getElementById("laptopList_container");
const singleLaptopContainer = document.getElementById(
  "single_laptop_container"
);
const userDataValues = document.getElementById("userData");
const laptopDataValues = document.getElementById("laptopData");
const cpuValues = document.getElementById("cpu_values");
const laptopState = document.getElementById("laptop_state");
const purchaseDate = document.getElementById("purchase-date");

//GET LAPTOP LIST DATA FROM API
const getLaptopList = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const laptops = data.data;
    laptops.map((laptop) => {
      const laptopBrand = laptop.laptop;
      const user = laptop.user;

      renderLaptopInfo(
        laptopBrand.image,
        user.name,
        user.surname,
        laptopBrand.name,
        laptopBrand.id
      );
    });
  } catch (err) {
    console.log(err);
  }
};
getLaptopList(getLaptopListURL);
//RENDER LAPTOP CONTAINERS IN THE LIST
const renderLaptopInfo = function (img, name, surname, laptopBrandName, id) {
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
    
      <button id=${id} class="laptopList-btn" type="button" function="onclick">მეტის ნახვა</button>
    </div>
  </div>`;
  laptopListContainer.insertAdjacentHTML("beforeend", laptopContainer);

  //GET A SINGLE LAPTOP DATA ACCORDING TO LAPTOP_ID
  const laptopList_btn = document.getElementById(`${id}`);
  laptopList_btn.addEventListener("click", function () {
    laptopListContainer.remove();
    singleLaptopContainer.classList.remove("hidden");
    //Get a single laptop data
    fetch(
      `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=${myToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        //RENDER A SINGLE LAPTOP INFO
        const userInfo = data.data.user;
        const laptopInfo = data.data.laptop;
        const cpu = data.data.laptop.cpu;
        console.log(userInfo);
        console.log(laptopInfo);
        const userData = ` <p>${userInfo.name} ${userInfo.surname}</p>
        <p>${userInfo.team_id}</p>
        <p>${userInfo.position_id}</p>
        <p>${userInfo.email}</p>
        <p>${userInfo.phone_number}</p>`;

        const laptopData = `
        <p>${laptopInfo.name} </p>
        <p>${laptopInfo.brand_id}</p>
        <p>${laptopInfo.ram} </p>
        <p>${laptopInfo.hard_drive_type}</p>
        `;
        const cpuData = `<p>${cpu.name}</p>
        <p>${cpu.cores}</p>
        <p>${cpu.threads}</p>`;

        const laptopStateData = `<p>${(laptopInfo.state = "new"
          ? "ახალი"
          : "მეორადი")}</p>
        <p>${laptopInfo.price}</p>`;

        const purchaseData = `<p>${laptopInfo.purchase_date}</p>`;

        document.getElementById(
          "laptop__photo"
        ).src = `https://pcfy.redberryinternship.ge/${laptopInfo.image}`;
        userDataValues.insertAdjacentHTML("afterbegin", userData);
        laptopDataValues.insertAdjacentHTML("afterbegin", laptopData);
        cpuValues.insertAdjacentHTML("afterbegin", cpuData);
        laptopState.insertAdjacentHTML("afterbegin", laptopStateData);
        purchaseDate.insertAdjacentHTML("afterbegin", purchaseData);
        document.getElementById("list_description").textContent =
          "ლეპტოპის ინფო";
      });
  });
};
