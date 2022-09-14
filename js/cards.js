const refs = {
  formSearch: document.querySelector(".form-search"),
  users: document.querySelector(".users"),
  postsList: document.querySelector(".posts__list"),
  usersList: document.querySelector(".users-list"),
  sortBtn: document.querySelector(".top-line__btn"),
  btnPrevious: document.querySelector(".btns-line__btn-previous"),
  btnNext: document.querySelector(".btns-line__btn-next"),
  modal: document.querySelector(".modal"),
  backdrop: document.querySelector(".backdrop"),
};

// ======================= users =============================

function fetchResponseUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((respons) =>
    respons.json().then((users) => renderUsersList(users))
  );
}
fetchResponseUsers();

function renderUsersList(users) {
  const murkup = users
    .map(({ id, name, email, phone, website }) => {
      return `
       <li class="swiper-slide users-list__item">
             <p class="users-list__user-name text">${name}</p>
            <p class="users-list__user-email text">${email}</p>
            <p class="users-list__user-number text">${phone}</p>
            <p class="users-list__user-site text">${website}</p>
            <a href='#users'class='users-list__btn' onclick='getPostsByUserId(${id})'>All post</a>
          </li>
        `;
    })
    .join("");

  refs.usersList.insertAdjacentHTML("beforeend", murkup);
}

// ======================= posts =============================

window.getPostsByUserId = function (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(
    (respons) => respons.json().then((posts) => renderPostsList(posts))
  );
};

function renderPostsList(posts) {
  const murkup = posts
    .map(({ title, body }) => {
      return `
      <li class="posts__item">
        <p class="posts__title">${title}</p>
        <p class="posts__description">${body}</p>
      </li>
      `;
    })
    .join("");
  refs.users.lastElementChild.classList.add("posts");

  refs.postsList.innerHTML = "";
  refs.postsList.insertAdjacentHTML("beforeend", murkup);
}

// ======================= sort =============================

refs.sortBtn.addEventListener("click", onSortBrnClick);

function onSortBrnClick(event) {
  const userslist = [...document.querySelectorAll(".users-list__item")];
  userslist.forEach((elem) => console.log(elem.firstElementChild.textContent));
  const user = [...userslist].sort((a, b) =>
    a.firstElementChild.textContent.localeCompare(
      b.firstElementChild.textContent
    )
  );
  console.log(user);
  refs.usersList.innerHTML = "";
  refs.usersList.append(...user);
}

// ======================= search =============================

refs.formSearch.addEventListener("submit", onFormSearchSubmit);

function onFormSearchSubmit(event) {
  event.preventDefault();

  const { search } = event.target;

  const userslist = [...document.querySelectorAll(".users-list__item")];

  const element = userslist.find(
    (elem) => elem.firstElementChild.textContent === search.value
  );

  if (element === undefined) {
    alert("User not found");
  } else {
    openModal();
    refs.modal.append(...element.children);
  }
}

// ======================= modal =============================

function openModal() {
  refs.backdrop.classList.remove("is-hidden");
  window.addEventListener("keydown", closeModalByESC);
}

function closeModal() {
  refs.backdrop.classList.add("is-hidden");
  window.removeEventListener("keydown", closeModalByESC);
}

function closeModalByESC(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

window.addEventListener("load", () => {
  const links = `<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
/>
<link rel="stylesheet" href="./css/main.min.css" />`;
  document.head.insertAdjacentHTML("beforeend", links);
});
