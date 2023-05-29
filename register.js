const newUserPasswordCheck = document.getElementById("newUserPasswordCheck");
const alertPassword = document.getElementById("alertPassword");
const otherAlerts = document.getElementById("otherAlerts");
const newUserEmail = document.getElementById("newUserEmail");
const newUserPassword = document.getElementById("newUserPassword");
const submitNewUser = document.getElementById("submit-new-user");
const modal = document.getElementById("modal");

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

const checkData = (email) => {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      let duplicatedEmail = false;

      for (let userI = 0; userI < data.length; userI++) {
        if (data[userI].email === email) {
          duplicatedEmail = true;
          otherAlerts.classList.add("otherAlertsActive");
          otherAlerts.innerHTML = "O email colocado já se encontra registado!";
          newUserEmail.value = "";
          break;
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
    });
};

// Submissão do formulário, aparecimento da modal e reencaminhamento para a homepage

submitNewUser.addEventListener("click", (evt) => {
  checkData(newUserEmail.value);
  evt.preventDefault();
  modal.style.display = "flex";
  const modalCloseButton = document.getElementById("modal-close-button");
  modalCloseButton.addEventListener("click", (evt) => {
    window.location.href = "index.html";
  });
});

// ************ FAZER - Submissão dos dados obtidos para a BD ******************
