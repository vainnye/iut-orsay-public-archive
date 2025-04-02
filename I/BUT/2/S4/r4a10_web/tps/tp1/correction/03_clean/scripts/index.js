"use strict";

/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", (event) => {
   document.querySelectorAll("aside span").forEach((btn) => {
	   btn.addEventListener( 'click', set_color )
   });
});

function set_color(ev){
	console.log(ev);
	let couleur_voulue = ev.target.dataset.btcol;
	console.log('couleur_voulue = '+couleur_voulue);
	let paragraphes = document.querySelectorAll("aside p");
	paragraphes.forEach((p) => {
		console.log(`traite paragraphe : ${p.innerText.substring(0,10)}...`);
		p.style.color = couleur_voulue;
	});
	console.log('fait');
}

/* ------------------------------------------------------------ */
