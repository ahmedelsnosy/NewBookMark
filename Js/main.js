let nameSite = document.getElementById("nameSite");
let urlSite = document.getElementById("urlSite");
let send = document.getElementById("send");
let displayArea = document.getElementById("display");
let searchInput = document.getElementById("search");
let attention = document.getElementById("attention");
let attention2 = document.getElementById("attention2");
let index;
let mood = "create";
let bookMark = [];

if (JSON.parse(localStorage.getItem("bookmark") !== null)) {
  bookMark = JSON.parse(localStorage.getItem("bookmark"));
  clearForm();
  display();
}

send.addEventListener("click", function () {
  swal(
    `You Add BookMark for ${nameSite.value}!`,
    "You clicked the button!",
    "success"
  );

  addBookMark();

  clearForm();
});

function addBookMark() {
  let bookMarks = {
    nameSite: nameSite.value,
    urlSite: urlSite.value,
  };

  if (mood == "create") {
    bookMark.push(bookMarks);
  } else {
    bookMark[index] = bookMarks;
    mood = "create";
    send.innerHTML = "Add BookMark";
  }
  localStorage.setItem("bookmark", JSON.stringify(bookMark));
  clearForm();
  display();
}

function display() {
  let cartona = ``;
  for (let i = 0; i < bookMark.length; i++) {
    cartona += `
         
         <div class="col-md-6 p-5">
          <h3><a href="${bookMark[i].urlSite}" target="_blank" class="text-decoration-none  text-white">${bookMark[i].nameSite}</a></h3>
        </div>
        <div class="col-md-6 p-5 d-flex justify-content-evenly">
          
            <a href="${bookMark[i].urlSite}" title="GO TO URL" target="_blank"  class="btn btn-primary w-25 text-dark text-decoration-none">
            <i class="fa-sharp fa-solid fa-eye text-center"></i>
            </a>
          <button class="btn btn-warning w-25" title="Edit" onclick="update(${i})" > 
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger w-25" title="Delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        `;
  }
  displayArea.innerHTML = cartona;
}

function clearForm() {
  (nameSite.value = ""), (urlSite.value = "");
  nameSite.classList.remove("is-valid");
  urlSite.classList.remove("is-valid");
  send.disabled = "true";
}

searchInput.addEventListener("keydown", function (e) {
  search(e.target.value);
});

function search(word) {
  let cartona = ``;
  for (let i = 0; i < bookMark.length; i++) {
    if (bookMark[i].nameSite.toLowerCase().includes(word.toLowerCase())) {
      cartona += `
             <div class="col-md-6 p-5">
          <h3><a href="${bookMark[i].urlSite}" target="_blank" class="text-decoration-none  text-white">${bookMark[i].nameSite}</a></h3>
        </div>
        <div class="col-md-6 p-5 d-flex justify-content-evenly">
          <button class="btn btn-primary w-25" title="GO TO URL">
            <a target="_blank" href="${bookMark[i].urlSite}" class="text-dark text-decoration-none">
            <i class="fa-sharp fa-solid fa-eye text-center"></i>
            </a>
          </button>
          <button class="btn btn-warning w-25" title="Edit" onclick="update(${i}) "> 
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger w-25" title="Delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        `;
    }

    displayArea.innerHTML = cartona;
  }
}

function deleteBookmark(index) {
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this imaginary file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
}).then((willDelete) => {
  if (willDelete) {
    bookMark.splice(index, 1)
    localStorage.setItem("bookmark", JSON.stringify(bookMark))
    display()
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
  } else {
    swal("Your imaginary file is safe!");
  }
});
}

function update(i) {
  nameSite.value = bookMark[i].nameSite;
  urlSite.value = bookMark[i].urlSite;
  send.innerHTML = "Update";
  mood = "Update";
  index = i;
}

urlSite.addEventListener("keyup", function () {
  let urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (urlRegex.test(urlSite.value)) {
    send.removeAttribute("disabled");
    urlSite.classList.add("is-valid");
    urlSite.classList.remove("is-invalid");
    attention2.classList.add("d-none");
  } else {
    send.disabled = "true";
    urlSite.classList.remove("is-valid");
    urlSite.classList.add("is-invalid");
    attention2.classList.remove("d-none");
  }
});
urlSite.addEventListener("click", function () {
  attention2.classList.remove("d-none");
});

nameSite.addEventListener("keyup", function () {
  let nameRegx = /^[A-Z][a-z]{0,15}$/;
  if (nameRegx.test(nameSite.value)) {
    send.removeAttribute("disabled");
    nameSite.classList.add("is-valid");
    nameSite.classList.remove("is-invalid");
    attention.classList.add("d-none");
  } else {
    send.disabled = "true";
    nameSite.classList.remove("is-valid");
    nameSite.classList.add("is-invalid");
    attention.classList.remove("d-none");
  }
});

nameSite.addEventListener("click", function () {
  attention.classList.remove("d-none");
});
