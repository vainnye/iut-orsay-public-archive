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

function cherche_dans_paragraphes_de_main(ze_input){
	let chaine = ze_input.value;
	console.log(`recherche >${chaine}<`);
	let paragraphes = document.querySelectorAll("main p");
	if(chaine===''){
		paragraphes.forEach((p) => {
			p.classList.remove("found_here");
		});	
	}else{
		//pour l'instant, aucun 'hit'
		ze_input.setCustomValidity("n'apparait pas dans les paragraphes");
		paragraphes.forEach((p) => {
			let p_txt = p.innerText;
			//console.log(`traite paragraphe : ${p_txt.substring(0,10)}...`);
			if(p_txt.includes(chaine)){
				console.log(` !!! found in : ${p_txt.substring(0,10)}...`);
				p.classList.add("found_here");
				//au moins un 'hit' a ete trouvé
				ze_input.setCustomValidity("");
			}else{
				p.classList.remove("found_here");
			}
		});	
		
	}
}


document.addEventListener("DOMContentLoaded", (event) => {
   document.querySelectorAll("main p").forEach((p) => {
	   p.dataset.txt_orig = p.innerText;
   });
});

function highlight( chaine, sous_chaine ){
	return chaine.replaceAll(
		sous_chaine,
		`<span class="found_here">${sous_chaine}</span>`
	);
}


function cherche_dans_paragraphes_de_main_v2(ze_input){
	let chaine = ze_input.value;
	console.log(`recherche >${chaine}<`);
	let paragraphes = document.querySelectorAll("main p");
	if(chaine===''){
		paragraphes.forEach((p) => {
			p.classList.remove("found_here");
		});	
	}else{
		//pour l'instant, aucun 'hit'
		ze_input.setCustomValidity("n'apparait pas dans les paragraphes");
		paragraphes.forEach((p) => {
			let p_txt = p.dataset.txt_orig;
			//console.log(`traite paragraphe : ${p_txt.substring(0,10)}...`);
			if(p_txt.includes(chaine)){
				console.log(` !!! found in : ${p_txt.substring(0,10)}...`);
				p.innerHTML = highlight(p_txt,chaine);
				//au moins un 'hit' a ete trouvé
				ze_input.setCustomValidity("");
			}else{
				p.innerHTML = p_txt;
			}
		});	
		
	}
}


/* ------------------------------------------------------------ */
