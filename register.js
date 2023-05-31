const newUserPasswordCheck = document.getElementById("newUserPasswordCheck");
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
