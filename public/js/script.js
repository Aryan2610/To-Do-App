"use strict";
const addBtn = document.querySelector(".add");
const marker = document.querySelector(".marker");
const task = document.querySelector(".task");

const create = async (task) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/create-task",
      data: {
        task,
      },
    });
    if (res.data.status === "success") {
      location.assign("/");
    }
  } catch (err) {
    console.log("No data received");
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const task = document.querySelector(".input").value;
  create(task);
});
