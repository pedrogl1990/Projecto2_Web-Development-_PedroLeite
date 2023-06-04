const searchIcon = document.getElementById("search-icon");
const searchBar = document.querySelector(".search-bar");
const searchBarMobile = document.querySelector("#search-bar-mobile");
const newUserPasswordCheck = document.getElementById("newUserPasswordCheck");
const modalLog = document.getElementById("modalLog");
const modalLogBtnClose = document.getElementById("modal-close-button-log");
const userIcon = document.getElementById("user-icon");
const addUserIconLink = document.getElementById("addUser-icon-link");
const loginIcon = document.getElementById("login-icon");
const submitCredentialsLog = document.getElementById("submitCredentialsLog");
let previousUser = document.getElementById("user-nome");
const iconDiv = document.getElementById("icon-div");
const iconDivFirstChild = iconDiv.firstChild;
const formMessageLog = document.getElementById("form-message-log");
const userEmailLog = document.getElementById("userEmailLog");
const userPasswordLog = document.getElementById("userPasswordLog");
const html = [...document.getElementsByTagName("html")];
const navbar = document.getElementById("menu-nav");
const header = document.getElementById("header");
const alertPassword = document.getElementById("alertPassword");
const otherAlerts = document.getElementById("otherAlerts");
const newUserName = document.getElementById("newUserName");
const newUserEmail = document.getElementById("newUserEmail");
const newUserPassword = document.getElementById("newUserPassword");
const newUserAddress = document.getElementById("newUserAddress");
const newUserPC = document.getElementById("newUserPC");
const newUserCountry = document.getElementById("newUserCountry");
const submitNewUser = document.getElementById("submit-new-user");
const newRegisterForm = document.getElementById("new-register-form");
const adminIcon = document.getElementById("admin-icon");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const modal = document.getElementById("modal");

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

loginIcon.addEventListener("click", (evt) => {
  if (loginIcon.title === "Login") {
    modalLog.style.display = "flex";
    html[0].style.overflow = "hidden";
  } else {
    window.location.href = "index.html";
    sessionStorage.removeItem("id");
    userLogged = false;
    logged();
    previousUser.remove();
  }
});

//Fecho da modal ao carregar no botão de fecho

modalLogBtnClose.addEventListener("click", () => {
  modalLog.style.display = "none";
  html[0].style.overflow = "auto";
});

//Controlo do preenchimento dos campos de controlo de acessos

const checkLog = (email, password) => {
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
            isAdmin(data[userIndex].admin);
            let userId = data[userIndex].id;
            sessionStorage.setItem("id", userId);
            modalLog.style.display = "none";
            html[0].style.overflow = "auto";
            window.location.href = "profile.html";
          } else {
            formMessageLog.style.display = "block";
            formMessageLog.innerHTML = "Conta não ativa";
          }
        } else {
          formMessageLog.style.display = "block";
          formMessageLog.innerHTML = "Utilizador inexistente";
        }
      }
    });
};

submitCredentialsLog.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (userEmailLog.value === "" || userPasswordLog.value === "") {
    formMessageLog.style.display = "block";
    formMessageLog.innerHTML =
      "Os dois campos são de preenchimento obrigatório!";
  } else {
    if (emailRegex.test(userEmailLog.value)) {
      checkLog(userEmailLog.value, userPasswordLog.value);
    } else {
      formMessageLog.style.display = "block";
      formMessageLog.innerHTML = "O email tem um formato incorreto!";
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

//Controla o aparecimento e desaparecimento do parágrafo a vermelho para preenchimento da confirmação da password

newUserPasswordCheck.addEventListener("input", (evt) => {
  if (newUserPasswordCheck.value != "") {
    alertPassword.innerHTML = "";
  } else {
    alertPassword.innerHTML =
      "É obrigatório confirmar a senha atual ou alterada";
  }
});

//Verificação da validade da senha e se existem dois users com o mesmo email
let duplicatedEmail = false;

const checkData = (email) => {
  return new Promise((resolve, reject) => {
    if (
      newUserName.value.trim() === "" ||
      newUserEmail.value.trim() === "" ||
      newUserPassword.value.trim() === "" ||
      newUserAddress.value.trim() === "" ||
      newUserPC.value.trim() === "" ||
      newUserCountry.value.trim() === ""
    ) {
      otherAlerts.classList.add("otherAlertsActive");
      otherAlerts.innerHTML =
        "Por favor, preencha todos os campos obrigatórios.";
      reject();
      return;
    }

    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        for (let userI = 0; userI < data.length; userI++) {
          if (data[userI].email === email) {
            duplicatedEmail = true;
            otherAlerts.classList.add("otherAlertsActive");
            otherAlerts.innerHTML =
              "O email colocado já se encontra registado!";
            newUserEmail.value = "";
            return reject(new Error("Email duplicado"));
          }
        }
        if (!duplicatedEmail) {
          if (newUserPassword.value === newUserPasswordCheck.value) {
            const regexSenha =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
            if (regexSenha.test(newUserPassword.value) === false) {
              newUserPassword.value = "";
              otherAlerts.classList.add("otherAlertsActive");
              otherAlerts.innerHTML =
                "A senha deve incluir pelo menos uma letra maiúscula, uma minúscula, um algarismo e um simbolo";
            }
          } else {
            otherAlerts.classList.add("otherAlertsActive");
            otherAlerts.innerHTML =
              "As duas senhas não coincidem. Coloque duas senhas iguais";
          }
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Submissão do formulário, aparecimento da modal e reencaminhamento para a homepage

const redirectHomepage = () => {
  window.location.href = "index.html";
};

submitNewUser.addEventListener("click", (evt) => {
  evt.preventDefault();
  duplicatedEmail = false;
  checkData(newUserEmail.value).then(() => {
    if (duplicatedEmail) {
      return Promise.reject(
        new Error("O email colocado já se encontra registado!")
      );
    }

    if (newUserPassword.value !== newUserPasswordCheck.value) {
      return Promise.reject(
        new Error("As duas senhas não coincidem. Coloque duas senhas iguais")
      );
    }

    const regexSenha =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!regexSenha.test(newUserPassword.value)) {
      return Promise.reject(
        new Error(
          "A senha deve incluir pelo menos uma letra maiúscula, uma minúscula, um algarismo e um símbolo"
        )
      );
    }
    let name = newUserName.value;
    let email = newUserEmail.value;
    let password = newUserPassword.value;
    let address = newUserAddress.value;
    let pc = newUserPC.value;
    let country = newUserCountry.value;
    let active = "não";
    let newData = {
      nome: name,
      email: email,
      password: password,
      morada: address,
      "código postal": pc,
      país: country,
      activo: active,
    };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        modal.style.display = "flex";
        const modalCloseButton = document.getElementById("modal-close-button");
        modalCloseButton.addEventListener("click", (evt) => {
          redirectHomepage();
        });
        console.log("Dados enviados com sucesso: ", response);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados: ", error);
      });
  });
});

// ************ Melhorar os links dos menus - devem ser todos <a> e os que
// não levarem a lado nenhum coloco um prentDefault() ******************
