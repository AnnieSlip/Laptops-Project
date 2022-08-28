const teamDropdown = document.querySelector(".team");
const positionDropdown = document.querySelector("#position");
const teamContainer = document.querySelector(".team-container");
const positionContainer = document.querySelector(".position-container");

//Get Teams data from api
const getTeam = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/teams");
    const data = await res.json();
    const teamsList = data.data;
    console.log(teamsList);
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
      console.log(positionList);

      positionList.map((elem) => {
        if (elem.team_id == selectValue) {
          renderData(positionContainer, elem.id, elem.name);
          console.log(elem);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  getPosition();
}

//const value = document.getElementById("team").value;
