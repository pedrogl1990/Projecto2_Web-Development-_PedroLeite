const header = document.getElementById("header");
const addUserIconLink = document.getElementById("addUser-icon-link");
const loginIconLink = document.getElementById("login-icon-link");
const userIcon = document.getElementById("user-icon");
const loginIcon = document.getElementById("login-icon");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.querySelector(".search-bar");
const searchBarMobile = document.querySelector("#search-bar-mobile");
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("menu-nav");
const modal = document.querySelector("#modal");
const html = [...document.getElementsByTagName("html")];
const modalCloseBtn = document.getElementById("modal-close-button");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const submitCredentialsBtn = document.getElementById("submitCredentials");
const formMessage = document.getElementById("form-message");
const iconDiv = document.getElementById("icon-div");
const iconDivFirstChild = iconDiv.firstChild;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let previousUser = document.getElementById("user-nome");

let userLogged = false;
let isSearchBarClicked = false;

// Controla a alternância dos icones a aparecer conforme o user está registado / logado

const logged = () => {
  if (userLogged) {
    userIcon.setAttribute("src", "imagens/user.png");
    userIcon.setAttribute("alt", "perfil do user");
    userIcon.setAttribute("title", "Perfil");
    addUserIconLink.setAttribute("href", "profile.html");
    loginIcon.setAttribute("src", "imagens/logout.png");
    loginIcon.setAttribute("alt", "botão de logout");
    loginIcon.setAttribute("title", "Logout");
  } else {
    userIcon.setAttribute("src", "imagens/add-user.png");
    userIcon.setAttribute("alt", "adicionar user");
    userIcon.setAttribute("title", "Registar");
    addUserIconLink.setAttribute("href", "register.html");
    loginIcon.setAttribute("src", "imagens/login.png");
    loginIcon.setAttribute("alt", "botão de login");
    loginIcon.setAttribute("title", "Login");
  }
};

const boasVindas = (name) => {
  if (previousUser) {
    previousUser.remove();
  } else {
    let userBoasVindas = document.createElement("p");
    userBoasVindas.textContent = `Bem-vindo(a), ${name}`;
    userBoasVindas.setAttribute("id", "user-nome");
    iconDiv.insertBefore(userBoasVindas, iconDivFirstChild);
  }
};

//Controla o aparecimento/desaparecimento/formatação da searchbar ao clicar na lupa ou em qualquer outro ponto da página

document.addEventListener("click", (evt) => {
  if (evt.target.id === "search-icon" && window.innerWidth > 800) {
    if (searchBar.classList.contains("active-bar")) {
      searchBar.classList.remove("active-bar");
    } else {
      searchBar.classList.add("active-bar");
      setTimeout(() => {
        searchBar.focus();
        searchBar.classList.add("active-bar:focus-visible");
        searchBar.classList.add("active-bar");
      }, 500);
    }
  } else if (
    (evt.target.id === "search-icon" && window.innerWidth <= 800) ||
    (evt.target.id === "menu-icon" && window.innerWidth <= 800)
  ) {
    if (navbar.classList.contains("menu-nav-active")) {
      navbar.classList.remove("menu-nav-active");
      header.style.height = "80px";
    } else {
      navbar.classList.add("menu-nav-active");
      header.style.height = "325px";
      if (evt.target.id === "search-icon") {
        searchBarMobile.style.display = "block";
        searchBarMobile.focus();
      }
    }
  } else {
    searchBar.classList.remove("active-bar");
  }
});

const adjustNavbarHeight = () => {
  if (window.innerWidth > 800) {
    header.style.height = "80px";
    searchBarMobile.style.display = "none";
    navbar.classList.remove("menu-nav-active");
  }
};

window.addEventListener("resize", adjustNavbarHeight);

//Controlo de aparecimento da modal ao clicar no icone de login

loginIcon.addEventListener("click", (evt) => {
  if (loginIcon.title === "Login") {
    modal.style.display = "flex";
    html[0].style.overflow = "hidden";
  } else {
    location.reload();
    sessionStorage.clear();
    userLogged = false;
    logged();
    previousUser.remove();
  }
});

//Fecho da modal ao carregar no botão de fecho

modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
  html[0].style.overflow = "auto";
});

//Controlo do preenchimento dos campos de controlo de acessos

const checkData = (email, password) => {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      for (let userIndex = 0; userIndex < data.length; userIndex++) {
        if (
          data[userIndex].email === email &&
          data[userIndex].password === password
        ) {
          if (data[userIndex].activo === "sim") {
            userLogged = true;
            logged();
            boasVindas(data[userIndex].nome);
            let userId = data[userIndex].id;
            sessionStorage.clear();
            sessionStorage.setItem("id", userId);
            modal.style.display = "none";
            html[0].style.overflow = "auto";
          } else {
            formMessage.style.display = "block";
            formMessage.innerHTML = "Conta não ativa";
          }
        } else {
          formMessage.style.display = "block";
          formMessage.innerHTML = "Utilizador inexistente";
        }
      }
    });
};

submitCredentialsBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (userEmail.value === "" || userPassword.value === "") {
    console.log(formMessage);
    formMessage.style.display = "block";
    formMessage.innerHTML = "Os dois campos são de preenchimento obrigatório!";
  } else {
    if (emailRegex.test(userEmail.value)) {
      checkData(userEmail.value, userPassword.value);
    } else {
      formMessage.style.display = "block";
      formMessage.innerHTML = "O email tem um formato incorreto!";
    }
  }
});

// Recuperação da sessão logada com o ultimo user logado

let storedUserId = sessionStorage.getItem("id");

fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    if (storedUserId) {
      userLogged = true;
      logged();
      boasVindas(data[storedUserId].nome);
    } else {
      // O usuário não está autenticado
      userLogged = false;
    }
  });
