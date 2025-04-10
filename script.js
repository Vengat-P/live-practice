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
            <span class="options">
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-square-pen fa-beat-fade" style="color: #FFD43B;"></i>
            <i onclick="deleteTask(this)" class="fa-solid fa-trash-can fa-beat-fade" style="color: #FFD43B;"></i>
            </span>
            </div>
            `
          )
  })
  resetform();
}


//!RESETTING THE FORM AFTER DISPLAYING THE TASK

const resetform=()=>{
  textInput.value="";
  dateInput.value="";
  textarea.value="";
}
(()=>{
  data = JSON.parse(localStorage.getItem("data")) || [ ]
  creatTask();
}) ();

//!edit task function for created TODOS

const editTask = (e)=>{
  let result = e.parentElement.parentElement;
  textInput.value = result.children[0].innerHTML;
  dateInput.value = result.children[1].innerHTML;
  textarea.value = result.children[2].innerHTML;
  deleteTask(e)
}

const deleteTask = (e)=>{
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1)
  localStorage.setItem("data",JSON.stringify(data))
}