"use strict";
const TDL = document.querySelector(".tdl"),
  TDLInput = document.querySelector(".tdl__input"),
  NavigationMenu = document.querySelector(".navigation__menu"),
  TDLAddButton = document.querySelector(".tdl__add-button"),
  TDLTasksCurrent = document.querySelector(".tdl__tasks-current"),
  TDLTasksDone = document.querySelector(".tdl__tasks-done");
var arr = [];

if (localStorage.getItem("current") != "") {
  arr = localStorage.getItem("current").split(",");
}

function getDone() {}

window.onload = function() {
  console.log(localStorage.getItem("current"));
  if (localStorage.getItem("current") != "") {
    var arr = localStorage.getItem("current").split(",");
    console.log(arr);
    arr.forEach((item, index) => {
      // console.log(`${item} имеет позицию ${index}`);
      let NewTask = document.createElement("div"), // ! СОЗДАЕМ НОВЫЙ БЛОК "DIV"
        NewTaskText = document.createElement("p"), // ! СОЗДАЕМ НОВЫЙ ПАРАГРАФ "P"
        NewTaskButton = document.createElement("button"); // ! СОЗДАЕМ НОВУЮ КНОПКУ "BUTTON"
      NewTask.className = "tdl__item";
      NewTaskText.className = "tdl__item-text";
      NewTaskText.innerText = item;
      NewTaskButton.className = "tdl__item-check";
      NewTask.appendChild(NewTaskText);
      NewTask.appendChild(NewTaskButton);
      TDLTasksCurrent.append(NewTask);
    });
  } else console.log("Пусто");
};

// ! Функция очищает input, создает новый элемент (  < .tdl__item > { TDLItem }  ) и передает в него введенное значение
const func = d => {
  const target = d.target,
    InputText = TDLInput.value;
  if (target.closest(".tdl__add-button") || d.code == "Enter") {
    if (InputText == "") alert("Поле не заполнено!");
    else {
      let NewTask = document.createElement("div"), // ! СОЗДАЕМ НОВЫЙ БЛОК "DIV"
        NewTaskText = document.createElement("p"), // ! СОЗДАЕМ НОВЫЙ ПАРАГРАФ "P"
        NewTaskButton = document.createElement("button"); // ! СОЗДАЕМ НОВУЮ КНОПКУ "BUTTON"
      NewTask.className = "tdl__item";
      NewTaskText.className = "tdl__item-text";
      NewTaskText.innerText = InputText;
      NewTaskButton.className = "tdl__item-check";
      NewTask.appendChild(NewTaskText);
      NewTask.appendChild(NewTaskButton);
      TDLTasksCurrent.append(NewTask);
      TDLInput.value = "";
      arr.push(InputText);
      console.log(arr);
      localStorage.setItem("current", arr);
    }
  }
};
// ! ------------------------------------------------

//? ----------Выполненные задачи ---------------------

TDL.addEventListener("click", e => {
  const target = e.target;
  if (target.closest(".tdl__item-check")) {
    // console.log("Попал");
    console.log(target.parentNode.innerText);
    const text = target.parentNode.innerText;
    let TDLItemDone = document.createElement("div"), // ! СОЗДАЕМ НОВЫЙ БЛОК "DIV"
      TDLItemTextDone = document.createElement("p"), // ! СОЗДАЕМ НОВЫЙ ПАРАГРАФ "P"
      TDLItemCheckDone = document.createElement("button"); // ! СОЗДАЕМ НОВУЮ КНОПКУ "BUTTON"
    TDLItemDone.className = "tdl__item-done";
    TDLItemTextDone.className = "tdl__item-text-done";
    TDLItemCheckDone.className = "tdl__item-check-done";
    TDLItemTextDone.innerText = text;
    TDLItemDone.appendChild(TDLItemTextDone);
    TDLItemDone.appendChild(TDLItemCheckDone);
    TDLTasksDone.appendChild(TDLItemDone);

    const ind = arr.indexOf(text, 0);

    target.parentNode.classList.add("no-shadow");
    target.classList.add("no-shadow");
    function scalefunc() {
      target.parentNode.classList.add("scale");
      clearInterval(t);
    }
    function removeFunc() {
      target.parentNode.remove();
      arr.splice(ind, 1);
      localStorage.setItem("current", arr);
      clearInterval(p);
    }
    var t = setInterval(scalefunc, 500),
      p = setInterval(removeFunc, 1200);
  } else console.log("Мимо");
});

// ! ---------------- КНОПКА МЕНЮ ----------------
NavigationMenu.addEventListener("click", () => {
  if (!NavigationMenu.classList.contains("navigation__menu_active-js")) {
    NavigationMenu.classList.add("navigation__menu_active-js");
  } else {
    NavigationMenu.classList.remove("navigation__menu_active-js");
  }
});
// ! ---------------------------------------------

//! ПОПЫТКА СДЕЛАТЬ НА JQUERY
// $(function () {
//     function myFunc() {
//         let task = $('.tdl__input').val();
//         if (task !== '') {
//             const TDLItem = $('<div class="tdl__item"></div>'),
//                 TDLItemText = $('<p class="tdl__item-text"></p>'),
//                 TDLItemCheck = $('<button class="tdl__item-check"></button>');
//             TDLItemText.text(task);
//             $(TDLItem).append(TDLItemText);
//             $(TDLItem).append(TDLItemCheck);
//             $('.tdl__tasks-current').append(TDLItem);
//             $('.tdl__input').val('');
//             $('.tdl__item-check').on('click', function () {
//                     // const TDLItemDone = $('<div class="tdl__item-done"></div>'),
//                     //     TDLItemTextDone = $('<p class="tdl__item-text-done"></p>'),
//                     //     TDLItemCheckDone = $('<div class="tdl__item-check-done"></div>'),
//                     //     taskText = $(this).prev().text();
//                     $(this).parent().remove();
//                     // TDLItemTextDone.text(taskText);
//                     // $(TDLItemDone).append(TDLItemTextDone);
//                     // $(TDLItemDone).append(TDLItemCheckDone);
//                     // $('.tdl__tasks-done').append(TDLItemDone);
//             });
//         } else alert('Поле не заполнено!');
//     }

//     $('.tdl__input').on('keydown', function (e) {
//         if (e.code == 'Enter') myFunc();
//     });
//     $('.tdl__add-button').on('click', function () {
//         myFunc();
//     });

// });

TDLAddButton.addEventListener("click", e => {
  func(e);
});

TDLInput.addEventListener("keydown", e => {
  if (e.code == "Enter") {
    func(e);
  }
});
