"use strict";

const url = "https://pcfy.redberryinternship.ge/api/laptop/create";

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

/*
fetch(url, {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "ani",
    surname: "dfdf",
    team_id: 1,
    position_id: 1,
    phone_number: "995555555555",
    email: "gela.gelashvili@redberry.ge",
    token: "jnvc",
    laptop_name: "HP",
    laptop_image: "1111 0000 1111 0000",
    laptop_brand_id: 3,
    laptop_cpu: "sds",
    laptop_cpu_cores: 8,
    laptop_cpu_threads: 4,
    laptop_ram: 4,
    laptop_hard_drive_type: "sds",
    laptop_state: "sdd",
    laptop_purchase_date: "ss",
    laptop_price: 9,
  }),
});
*/
