const refs = {
  formSearch: document.querySelector(".form-search"),
  users: document.querySelector(".users"),
  postsList: document.querySelector(".posts__list"),
  usersList: document.querySelector(".users-list"),
  btnPrevious: document.querySelector(".btns-line__btn-previous"),
  btnNext: document.querySelector(".btns-line__btn-next"),
};

// refs.usersListBtn.addEventListener("click");

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

refs.formSearch.addEventListener("input", sort);

function sort(event) {
  const userslist = document.querySelectorAll(".users-list__user-name");
  const r = [...userslist];
  console.log(r[0].textContent);

  const markupSorted = [...r].sort((firstElem, secondElem) =>
    firstElem.textContent.localeCompare(secondElem.textContent)
  );
  refs.usersList.append(...markupSorted);
}

window.addEventListener("load", () => {
  const links = `<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
/>
<link rel="stylesheet" href="./css/main.min.css" />`;
  document.head.insertAdjacentHTML("beforeend", links);
});
