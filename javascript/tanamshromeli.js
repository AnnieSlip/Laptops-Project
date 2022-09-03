const teamDropdown = document.querySelector(".team");
const positionDropdown = document.querySelector("#position");
const teamContainer = document.querySelector(".team-container");
const positionContainer = document.querySelector(".position-container");
const form = document.querySelector(".form-container");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
//const phone = document.getElementById("phone");

//Get Teams data from api
const getTeam = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/teams");
    const data = await res.json();
    const teamsList = data.data.reverse();
    //console.log(teamsList);
    teamsList.map((team) => {
      renderData(teamContainer, team.id, team.name);
      //teamValue = team.id;
    });
  } catch (err) {
    console.log(err);
  }
};

getTeam();

//Render Data Function
const renderData = function (place, id, value) {
  let teams = `
    <option value=${id}>${value}</option>
    `;
  place.insertAdjacentHTML("afterend", teams);
};

//GET SELECT VALUE FROM TEAM AND RENDER POSITIONS DEPEND IT
function getSelectValue() {
  let selectValue = document.getElementById("team").value;

  selectValue >= 1
    ? (positionDropdown.disabled = false)
    : (positionDropdown.disabled = true);

  const getPosition = async function () {
    try {
      const res = await fetch(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      const data = await res.json();

      const positionList = data.data;
      //console.log(positionList);

      positionList.map((elem) => {
        if (elem.team_id == selectValue) {
          renderData(positionContainer, elem.id, elem.name);
          //console.log(elem);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  getPosition();
}

form.addEventListener("submit", (e) => {
  validateForm();
  if (isFormValid() == true) {
    form.submit();
  } else {
    e.preventDefault();
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll(".form-elem");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}

const validateForm = function () {
  const team = document.getElementById("team");
  const position = document.getElementById("position");
  const phone = document.getElementById("phone");
  console.log(phone.value);

  //Firstname
  if (firstName.value.trim().length < 3) {
    setError(firstName, "მინიმუმ 2 სიმბოლო");
  } else if (!geoLetters(firstName.value)) {
    setError(firstName, "გამოიყენეთ ქართული ასოები");
  } else {
    setSucces(firstName, "მინიმუმ 2 სიმბოლო, ქართული ასოები");
  }
  //Lastname
  if (lastName.value.trim().length < 3) {
    setError(lastName, "მინიმუმ 2 სიმბოლო");
  } else if (!geoLetters(lastName.value)) {
    setError(lastName, "გამოიყენეთ ქართული ასოები");
  } else {
    setSucces(lastName, "მინიმუმ 2 სიმბოლო, ქართული ასოები");
  }

  //Email
  if (email.value.trim() == "") {
    setError(email, "ველი არ უნდა იყოს ცარიელი");
  } else if (isEmailValid(email.value)) {
    setSucces(email, "უნდა მთავრდებოდეს @redberry.ge");
  } else {
    setError(email, "უნდა მთავრდებოდეს @redberry.ge");
  }

  //Phone
  if ((phone.value = "")) {
    setError(phone, "ველი არ უნდა იყოს ცარიელი");
  } else if (!isPhoneValid(phone.value)) {
    setSucces(phone, "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს");
  } else {
    setError(phone, "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს");
  }
  //team
  if (team.value == "") {
    setError(team);
  } else {
    setSucces(team);
  }
  //position
  if (position.value == "") {
    setError(position);
  } else {
    setSucces(position);
  }
};
const setError = function (element, errorMessage) {
  const parent = element.parentElement;
  const paragraph = parent.querySelector("p");

  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }

  parent.classList.add("error");

  if (paragraph) {
    paragraph.textContent = errorMessage;
  }
};

const setSucces = function (element, message) {
  const parent = element.parentElement;
  const paragraph = parent.querySelector("p");
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
    if (paragraph) {
      paragraph.textContent = message;
    }
  }

  parent.classList.add("success");
};

const isEmailValid = function (email) {
  const reg = /^([a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+)@redberry.ge$/;
  return reg.test(email);
};

function isPhoneValid(phone) {
  const reg =
    /\+\S*9\S*9\S*5\S*5\S*[976514]\S*\d\S*\d\S*\d\S*\d\S*\d\S*\d\S*\d\S*/;
  return reg.test(phone);
}

const geoLetters = function (text) {
  const reg = /^[ა-ჰ]+$/;
  return reg.test(text);
};
//Upload things in local storage
const items = [firstName, lastName, email, phone];
const setInLocalstorage = function () {
  localStorage.setItem("firstName", firstName.value);
  localStorage.setItem("lastName", lastName.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("phone", phone.value);
};

items.map((item) => item.addEventListener("keyup", setInLocalstorage));

firstName.value = localStorage.getItem("firstName");
lastName.value = localStorage.getItem("lastName");
email.value = localStorage.getItem("email");
phone.value = localStorage.getItem("phone");
