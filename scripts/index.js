document.addEventListener("DOMContentLoaded", async function () {
	const email = localStorage.getItem("email")

    if (!email){
        console.log("logado")
        window.location.href = "../pages/index.html";
    }
	const user = await fetch(`https://auditoria.onrender.com/user/${email}`)
	const data = await user.json()

	/* console.log(data) */

	document.getElementById("user").textContent = data.username
	document.getElementById("email").textContent = data.email
	document.getElementById("nome_da_empresa").textContent = data.nome_da_empresa


});
