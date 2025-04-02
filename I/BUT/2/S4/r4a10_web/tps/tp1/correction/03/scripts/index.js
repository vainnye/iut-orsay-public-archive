"use strict";

/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", (event) => {
   document.querySelector(
		"table"
	).addEventListener(
		'click', set_color 
	);
});

function set_color(ev){
	console.log(ev);
	let couleur_voulue = ev.target.innerText;
	console.log('couleur_voulue = '+couleur_voulue);
	let paragraphes = document.querySelectorAll("aside p");
	paragraphes.forEach((p) => {
		console.log(`traite paragraphe : ${p.innerText.substring(0,10)}...`);
		p.style.color = couleur_voulue;
	});
	console.log('fait');
}

/* ------------------------------------------------------------ */

function ajouter_deux_couleurs(){

	let prem_couleur    = document.querySelector("#prem_couleur").value;
	console.log("premiere couleur : "+prem_couleur);
	let sec_couleur     = document.querySelector("#sec_couleur").value;
	console.log("seconde couleur : "+sec_couleur);

	let prem_case       = document.createElement("td");
	prem_case.appendChild(
		document.createTextNode(prem_couleur)
	);
	prem_case.style.backgroundColor  = prem_couleur; //<- question ouverte

	let sec_case        = document.createElement("td");
	sec_case.appendChild(
		document.createTextNode(sec_couleur)
	);
	sec_case.style.backgroundColor   = sec_couleur; //<- question ouverte

	let nouvelle_ligne = document.createElement("tr");
	nouvelle_ligne.appendChild( prem_case );
	nouvelle_ligne.appendChild( sec_case  );

	document.querySelector( "table tbody" ).appendChild( nouvelle_ligne );
	
}
/* ------------------------------------------------------------ */