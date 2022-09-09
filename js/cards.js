const refs = {
  formSearch: document.querySelector(".form-search"),
  usersListBtn: document.querySelectorAll(".users-list users-list__btn"),
  btnPrevious: document.querySelector(".btns-line__btn-previous"),
  btnNext: document.querySelector(".btns-line__btn-next"),
  usersList: document.querySelector(".users-list"),
};

// refs.formSearch.addEventListener("input");
// refs.usersListBtn.addEventListener("click");
refs.btnPrevious.addEventListener("click", onBtnPreviousClick);
refs.btnNext.addEventListener("click", onBtnNextClick);

function fetchResponseUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((users) =>
    users.json()
  );
}
fetchResponseUsers().then((users) => renderUsersList(users));

function fetchResponsePosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((posts) =>
    posts.json()
  );
}
fetchResponsePosts().then((post) => console.log(post));

function renderUsersList(users) {
  const murkup = users
    .map(({ name, email, phone, website }) => {
      return `
       <li class="users-list__item">
             <p class="users-list__user-name text">${name}</p>
            <p class="users-list__user-email text">${email}</p>
            <p class="users-list__user-number text">${phone}</p>
            <p class="users-list__user-site text">${website}</p>
            <button type="button" class="users-list__btn">All posts</button>
          </li>
        `;
    })
    .join("");

  refs.usersList.insertAdjacentHTML("beforeend", murkup);
}

let value = 0;

function onBtnNextClick() {
  value -= 800;
  if (value < -1600) {
    value = -1600;
  }
  refs.usersList.style.transform = `translateY(${value + "px"})`;
}

function onBtnPreviousClick() {
  value += 800;
  if (value > 0) {
    value = 0;
  }
  refs.usersList.style.transform = `translateY(${value + "px"})`;
}
