const teamDropdown = document.querySelector(".team");

//Get Teams data from api
const getTeam = async function () {
  try {
    const res = await fetch("https://pcfy.redberryinternship.ge/api/teams");
    const data = await res.json();
    const teamsList = data.data;
    //console.log(teamsList);
    teamsList.map((team) => {
      renderData(team.id, team.name);
    });
  } catch (err) {
    console.log(err);
  }
};

getTeam();

//Render Data Function
const renderData = function (id, value) {
  let teams = `
    <option value=${id}>${value}</option>
    `;

  document
    .querySelector(".team-container")
    .insertAdjacentHTML("afterend", teams);
};
