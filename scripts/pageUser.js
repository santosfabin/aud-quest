document.addEventListener("DOMContentLoaded", function () {
	const sair = document.getElementById("sair");
	sair.addEventListener("click", function () {
		localStorage.removeItem("email");
		localStorage.removeItem("usuario");
		window.location.href = "../pages/index.html";
	});
});
