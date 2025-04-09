const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

const formValidation = () => {
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ) {
    msg.innerHTML = "Input Fields Cannot Be Empty 🙄";
  } else {
    msg.innerHTML = "";
    //!get data
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//!submit logic

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  formValidation();
})

//! getting details from the form input add storing it in data in array of object

let data = [{}]

const getData = ()=>{
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textarea.value,
  });

  // to save the data in local storage
  localStorage.setItem("data", JSON.stringify(data));
  creatTask();
};

//! create function used to get the data from local storage

const creatTask = () => {
  tasks.innerHTML = "";
  data.map((ele, y) => {
    return (
            tasks.innerHTML += `
            <div id=${y}>
            <span class="fw-bolder">${ele.text}</span>
            <span class="fw-bolder">${ele.date}</span>
            <p class="fw-bold">${ele.task}</p>
            </div>
            `)
  })
}
