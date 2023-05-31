const userIcon = document.getElementById("user-icon");
const addUserIconLink = document.getElementById("addUser-icon-link");
const loginIcon = document.getElementById("login-icon");
const iconDiv = document.getElementById("icon-div");
const iconDivFirstChild = iconDiv.firstChild;
const profileInfo = document.getElementById("profile-info");
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

const profileCreator = (data) => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const address = document.getElementById("address");
  const pc = document.getElementById("pc");
  const country = document.getElementById("country");

  let hiddenPassord = "";

  for (let letter of data.password) {
    letter = "*";
    hiddenPassord += letter;
  }

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
      profileCreator(data);
    } else {
      userLogged = false;
    }
  });
