"use strict";

const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
  console.log(value, key);
});
