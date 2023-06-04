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
const profileUpdateButton = document.getElementById("profile-update-button");
const profileEdit = document.getElementById("profile-edit");
const profileSection = document.getElementById("profile-section");
const submitProfile = document.getElementById("submit-profile");
const submitPassword = document.getElementById("submit-profile-password");
const profileCountry = document.getElementById("profileCountry");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePC = document.getElementById("profilePC");
const profilePassword = document.getElementById("profilePassword");
const profilePasswordCheck = document.getElementById("profilePasswordCheck");
const adminIcon = document.getElementById("admin-icon");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSenha =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
const modal = document.getElementById("modal-box");
const alertPassword = document.getElementById("alertPassword");
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

const profileCreator = (data) => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const address = document.getElementById("address");
  const pc = document.getElementById("pc");
  const country = document.getElementById("country");

  let hiddenPassord = "*".repeat(data.password.length);

  name.textContent += `  ${data.nome}`;
  email.textContent += `  ${data.email}`;
  password.textContent += `  ${hiddenPassord}`;
  address.textContent += `  ${data.morada}`;
  pc.textContent += `  ${data["código postal"]}`;
  country.textContent += `  ${data.país}`;
};

fetch(`http://localhost:3000/users/${storedUserId}`)
  .then((response) => response.json())
  .then((data) => {
    if (storedUserId) {
      userLogged = true;
      logged();
      boasVindas(data.nome);
      isAdmin(data.admin);
      profileCreator(data);
    } else {
      userLogged = false;
    }
  });

profileUpdateButton.addEventListener("click", (evt) => {
  profileSection.style.display = "none";
  profileEdit.style.display = "flex";
});

// Submissão do formulário geral

submitProfile.addEventListener("click", (evt) => {
  evt.preventDefault();
  let emailsRegistered = [""];

  fetch(`http://localhost:3000/users/`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        emailsRegistered.push(data[i].email);
      }

      if (profileName.value === "") {
        profileName.value = data[storedUserId].nome;
      }

      if (
        profileEmail.value === "" ||
        !emailRegex.test(profileEmail.value) ||
        emailsRegistered.includes(profileEmail.value)
      ) {
        profileEmail.value = data[storedUserId].email;
      }

      if (profileAddress.value === "") {
        profileAddress.value = data[storedUserId].morada;
      }

      if (profilePC.value === "") {
        profilePC.value = data[storedUserId]["código postal"];
      }

      if (profileCountry.value === "") {
        profileCountry.value = data[storedUserId]["país"];
      }

      let newData = {
        nome: profileName.value,
        email: profileEmail.value,
        morada: profileAddress.value,
        "código postal": profilePC.value,
        país: profileCountry.value,
        password: data[storedUserId].password,
        activo: data[storedUserId].activo,
        admin: data[storedUserId].admin,
      };

      fetch(`http://localhost:3000/users/${storedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }).then((response) => {
        console.log("Dados enviados com sucesso: ", response);
        alert("Dados submetidos com sucesso").catch((error) => {
          console.error("Erro ao enviar os dados: ", error);
        });
      });
    });
});

//Controla o aparecimento e desaparecimento do parágrafo a vermelho para preenchimento da confirmação da password

profilePasswordCheck.addEventListener("input", (evt) => {
  if (profilePasswordCheck.value != "") {
    alertPassword.innerHTML = "";
  } else {
    alertPassword.innerHTML =
      "É obrigatório confirmar a senha atual ou alterada";
  }
});

// Submissão do formulário de password

submitPassword.addEventListener("click", (evt) => {
  evt.preventDefault();

  fetch(`http://localhost:3000/users/`)
    .then((response) => response.json())
    .then((data) => {
      if (profilePassword.value === profilePasswordCheck.value) {
        if (regexSenha.test(profilePassword.value) === false) {
          profilePassword.value = "";
          alertPassword.innerHTML =
            "A senha deve incluir pelo menos uma letra maiúscula, uma minúscula, um algarismo e um simbolo";
        } else {
          let newData = {
            nome: data[storedUserId].nome,
            email: data[storedUserId].email,
            morada: data[storedUserId].morada,
            "código postal": data[storedUserId]["código postal"],
            país: data[storedUserId]["país"],
            password: profilePassword.value,
            activo: data[storedUserId].activo,
            admin: data[storedUserId].admin,
          };

          fetch(`http://localhost:3000/users/${storedUserId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }).then((response) => {
            console.log("Dados enviados com sucesso: ", response);
            alert("Dados submetidos com sucesso").catch((error) => {
              console.error("Erro ao enviar os dados: ", error);
            });
          });
        }
      } else {
        otherAlerts.classList.add("otherAlertsActive");
        otherAlerts.innerHTML =
          "As duas senhas não coincidem. Coloque duas senhas iguais";
      }
    });
});
