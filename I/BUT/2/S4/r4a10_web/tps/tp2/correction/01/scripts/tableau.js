"use strict";

/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", (event) => {
	document.querySelectorAll('tbody td').forEach( 
		marque_pas_moyenne
	);
});

function marque_pas_moyenne(el_td){
	if(parseInt(el_td.innerText)<10){
		el_td.classList.add('pas_la_moyenne');
	}
}

/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", (event) => {
	calcul_moyennes();
});

function calcul_moyennes(){
	
	document.querySelectorAll('thead tr:nth-child(2) th').forEach( (une_col,idx_col)=>{
		//console.log(`!!!col ${idx_col} -> ${une_col.innerText}!!!`)
		let total = 0;
		let nb    = 0;
		document.querySelectorAll('tbody tr').forEach( (el_tr)=>{
			//console.log(el_tr)
			let sel = `td:nth-child(${idx_col+2})`
			//console.log(sel)
			total += parseInt(el_tr.querySelector(sel).innerText)
			nb    += 1;
		});
		document.querySelector(`tfoot tr:nth-child(1) td:nth-child(${idx_col+2})`).innerText 
			= (total / nb).toFixed(2);
		
	});

	document.querySelector(`tfoot tr:nth-child(2) td:nth-child(2)`).innerText 
		= 	document.querySelector(`tfoot tr:nth-child(1) td:nth-child(2)`).innerText 
	for(let idx=0; idx<4; idx++) {
		//console.log(`${3+idx} -> ${document.querySelector(`tfoot tr:nth-child(1) td:nth-child(${3+2*idx})`).innerText} + ${document.querySelector(`tfoot tr:nth-child(1) td:nth-child(${3+2*idx+1})`).innerText}`)
		document.querySelector(`tfoot tr:nth-child(2) td:nth-child(${3+idx})`).innerText
			= 	((
					parseFloat(document.querySelector(`tfoot tr:nth-child(1) td:nth-child(${3+2*idx})`).innerText)
					+ 
					parseFloat(document.querySelector(`tfoot tr:nth-child(1) td:nth-child(${3+2*idx+1})`).innerText)
				)/2).toFixed(2)
	}
}

/* ------------------------------------------------------------ */
