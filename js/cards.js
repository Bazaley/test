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
       <li class="users-list__item swiper-slide">
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
