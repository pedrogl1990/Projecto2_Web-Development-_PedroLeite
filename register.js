const newUserPasswordCheck = document.getElementById("newUserPasswordCheck");
const alertaSenha = document.getElementById("alerta-senha");

newUserPasswordCheck.addEventListener("input", (evt) => {
  if (newUserPasswordCheck.value != "") {
    alertaSenha.innerHTML = "";
  } else {
    alertaSenha.innerHTML = "É obrigatório confirmar a senha atual ou alterada";
  }
});
