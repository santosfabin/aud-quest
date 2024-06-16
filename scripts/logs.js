document.addEventListener("DOMContentLoaded", async function () {
	const email = localStorage.getItem("email")

	const user = await fetch(`https://auditoria.onrender.com/resposta/${email}`)
	const data = await user.json()

    console.log(data)

	/* console.log(data) */

	document.getElementById("logs").textContent = data


});
