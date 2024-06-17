document.addEventListener("DOMContentLoaded", async function () {
	const email = localStorage.getItem("email");

	if (!email) {
		console.log("nao logado");
	}else if(email){

        var content = `
        <li><a href="./pageUser.html">Perfil</a></li>
        `;
    
        document.getElementById("signup-login").innerHTML  = content;


    }

});
