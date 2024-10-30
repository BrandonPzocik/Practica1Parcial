// ! REALIZAR LA LÓGICA DE REGISTRO DE USUARIOS AQUÍ
import "./style.css";
const $form = document.getElementById("register-form");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const $username = document.getElementById("username");
  const $email = document.getElementById("email");
  const $password = document.getElementById("password");

  const user = {
    username: $username.value,
    email: $email.value,
    password: $password.value,
  };

  console.log(user);

  const response = await fetch("http://localhost:4321/auth/sign-up", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    window.location.href = "/pages/login";
    alert("Usuario registrado exitosamente");
  } else {
    const error = await response.json();
    alert(error.message);
    console.log(error);
  }
});
