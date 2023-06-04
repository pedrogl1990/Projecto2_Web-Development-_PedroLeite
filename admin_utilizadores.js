const userIcon = document.getElementById("user-icon");
const addUserIconLink = document.getElementById("addUser-icon-link");
const loginIcon = document.getElementById("login-icon");
const iconDiv = document.getElementById("icon-div");
const iconDivFirstChild = iconDiv.firstChild;
const profileInfo = document.getElementById("profile-info");
const searchIcon = document.getElementById("search-icon");
const searchBar = document.querySelector(".search-bar");
const searchBarMobile = document.querySelector("#search-bar-mobile");
const navbar = document.getElementById("menu-nav");
const header = document.getElementById("header");
const adminIcon = document.getElementById("admin-icon");
const userInfo = document.getElementById("user-info");
const userUpdateButton = document.getElementById("user-update-button");
let previousUser = document.getElementById("user-nome");
let storedUserId = sessionStorage.getItem("id");
let userLogged = true;

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

const isAdmin = (admin) => {
  if (admin === "sim") {
    adminIcon.style.display = "block";
  } else {
    adminIcon.style.display = "none";
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
  window.location.href = "index.html";
  sessionStorage.removeItem("id");
  userLogged = false;
  logged();
  previousUser.remove();
});

//Contrução da listagem de users

const profileCreator = (data) => {
  data.forEach((element) => {
    let br = document.createElement("br");
    let nome = document.createElement("p");
    let nomeSpan = document.createElement("span");
    nomeSpan.textContent = "Nome: ";
    nomeSpan.style.fontWeight = "800";
    nome.style.marginBottom = "3px";
    nome.append(nomeSpan);
    nome.append(element.nome);

    let email = document.createElement("p");
    let emailSpan = document.createElement("span");
    emailSpan.textContent = "Email: ";
    emailSpan.style.fontWeight = "800";
    email.style.marginBottom = "3px";
    email.append(emailSpan);
    email.append(element.email);

    let morada = document.createElement("p");
    let moradaSpan = document.createElement("span");
    moradaSpan.textContent = "Morada: ";
    moradaSpan.style.fontWeight = "800";
    morada.style.marginBottom = "3px";
    morada.append(moradaSpan);
    morada.append(element.morada);

    let cp = document.createElement("p");
    let cpSpan = document.createElement("span");
    cpSpan.textContent = "Código Postal: ";
    cpSpan.style.fontWeight = "800";
    cp.style.marginBottom = "3px";
    cp.append(cpSpan);
    cp.append(element["código postal"]);

    let pais = document.createElement("p");
    let paisSpan = document.createElement("span");
    paisSpan.textContent = "País: ";
    paisSpan.style.fontWeight = "800";
    pais.style.marginBottom = "3px";
    pais.append(paisSpan);
    pais.append(element["país"]);

    let activo = document.createElement("input");
    let activoLabel = document.createElement("label");
    let activoSpan = document.createElement("span");
    activoSpan.style.fontWeight = "800";
    activo.style.marginBottom = "3px";
    activo.type = "checkbox";
    activo.className = "active-status";
    activo.id = "active" + element.id;
    activo.disabled = "true";
    activoLabel.textContent = "Activo?";

    if (element.activo === "sim") {
      activo.checked = true;
    } else {
      activo.checked = false;
    }

    activoSpan.append(activoLabel);
    activoSpan.append(activo);

    let admin = document.createElement("input");
    let adminLabel = document.createElement("label");
    let adminSpan = document.createElement("span");
    adminSpan.style.fontWeight = "800";
    admin.style.marginBottom = "3px";
    admin.type = "checkbox";
    admin.className = "admin-status";
    admin.id = "admin" + element.id;
    admin.disabled = "true";
    adminLabel.textContent = "Admin?";

    if (element.admin === "sim") {
      admin.checked = true;
    } else {
      admin.checked = false;
    }

    adminSpan.append(adminLabel);
    adminSpan.append(admin);

    userInfo.append(nome);
    userInfo.append(email);
    userInfo.append(morada);
    userInfo.append(cp);
    userInfo.append(pais);
    userInfo.append(activoSpan);
    userInfo.append(adminSpan);
    userInfo.append(br);
  });
};

// Controlo de gestão do administrador

userUpdateButton.addEventListener("click", () => {
  activo = [...document.getElementsByClassName("active-status")];
  admin = [...document.getElementsByClassName("admin-status")];
  if (userUpdateButton.textContent == "Salvar Permissões") {
    userUpdateButton.textContent = "Alterar Permissões";

    activo.forEach((element) => {
      element.disabled = true;
    });

    admin.forEach((element) => {
      element.disabled = true;
    });

    for (let i = 0; i < activo.length; i++) {
      const dadosAtualizados = {
        id: i,
        activo: activo[i].checked ? "sim" : "não",
        admin: admin[i].checked ? "sim" : "não",
      };

      fetch(`http://localhost:3000/users/${i}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((dadosExistentes) => {
          const dadosCompletos = {
            ...dadosExistentes,
            ...dadosAtualizados,
          };

          fetch(`http://localhost:3000/users/${i}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosCompletos),
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error("Erro ao atualizar:", error);
            });
        })
        .catch((error) => {
          console.error("Erro ao atualizar:", error);
        });
    }
  } else {
    userUpdateButton.textContent = "Salvar Permissões";

    activo.forEach((element) => {
      element.disabled = false;
    });

    admin.forEach((element) => {
      element.disabled = false;
    });
  }
});

//Controlo de menus e informações exibidas

fetch(`http://localhost:3000/users`)
  .then((response) => response.json())
  .then((data) => {
    if (storedUserId) {
      userLogged = true;
      logged();
      boasVindas(data[storedUserId].nome);
      isAdmin(data[storedUserId].admin);
      profileCreator(data);
    } else {
      userLogged = false;
    }
  });
