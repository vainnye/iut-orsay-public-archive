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
	calcul_moyennes('table_unique');
});

function calcul_moyennes(id_tab){
	
	//simplification impacte => document.querySelectorAll(`#${id_tab} thead tr:nth-child(2) th`).forEach( (une_col,idx_col)=>{
	document.querySelectorAll(`#${id_tab} thead tr:nth-child(1) th`).forEach( (une_col,idx_col)=>{
		//console.log(`!!!col ${idx_col} -> ${une_col.innerText}!!!`)
		let total = 0;
		let nb    = 0;
		document.querySelectorAll(`#${id_tab} tbody tr`).forEach( (el_tr)=>{
			//console.log(el_tr)
			let sel = `td:nth-child(${idx_col+2})`
			//console.log(sel)
			total += parseInt(el_tr.querySelector(sel).innerText)
			nb    += 1;
		});
		document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(${idx_col+2})`).innerText 
			= (total / nb).toFixed(2);
		
	});
	
	/* simplification impacte => 
	document.querySelector(`#${id_tab} tfoot tr:nth-child(2) td:nth-child(2)`).innerText 
		= 	document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(2)`).innerText 
	for(let idx=0; idx<4; idx++) {
		//console.log(`${3+idx} -> ${document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(${3+2*idx})`).innerText} + ${document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(${3+2*idx+1})`).innerText}`)
		document.querySelector(`#${id_tab} tfoot tr:nth-child(2) td:nth-child(${3+idx})`).innerText
			= 	((
					parseFloat(document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(${3+2*idx})`).innerText)
					+ 
					parseFloat(document.querySelector(`#${id_tab} tfoot tr:nth-child(1) td:nth-child(${3+2*idx+1})`).innerText)
				)/2).toFixed(2)
	}
	*/
}

/* ------------------------------------------------------------ */


function table_to_mobile(id_table_desktop,id_table_mobile){
	let contenu = {};
	//extraction des colonnes
	{
		let sel = `#${id_table_desktop} thead tr th`;
		contenu.colonnes = [];
		//console.log(`get : >${sel}<`);
		document.querySelectorAll(sel).forEach((el_tr)=>{
			//console.log(el_tr);
			contenu.colonnes.push(el_tr.innerText);
		})
		//console.log( contenu.colonnes );
	}
	//extractions des notes
	{
		contenu.lignes = [];
		let sel = `#${id_table_desktop} tbody tr`;
		//console.log("get : >"+sel+"<");
		document.querySelectorAll(sel).forEach((el_tr) => {
			let ligne = [];
			el_tr.querySelectorAll('td').forEach((el_td)=>{
				ligne.push(el_td.innerText);
			})
			contenu.lignes.push( ligne );
		});
	}
	//extractions des noms
	{
		contenu.noms = [];
		let sel = `#${id_table_desktop} tbody tr`;
		//console.log("get : >"+sel+"<");
		document.querySelectorAll(sel).forEach((el_tr) => {
			contenu.noms.push( 
				el_tr.querySelector('th').innerText
			);
		});
	}
	console.log( JSON.stringify(contenu) );
	//trash contenu de table mobile (au cas où) et reconstruction de thead
	{
		let table = document.getElementById(id_table_mobile);
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
		let thead =	document.createElement (  "thead"     );
		let tr    = document.createElement (  "tr"        );
		let th_c  = document.createElement (  "th"        );
		let td_l  = document.createElement (  "td"        );
		let c_n   = document.createTextNode( "Discipline" );
		let l_n   = document.createTextNode( "Note"       );
		th_c  .appendChild( c_n   );
		td_l  .appendChild( l_n   );
		tr    .appendChild( th_c  );
		tr    .appendChild( td_l  );
		thead .appendChild( tr    );
		table .appendChild( thead );
	}
	//reconstruction de tbody
	{
		let table        =	document.getElementById(id_table_mobile);
		let tbody        =	document.createElement("tbody");
		//for(const ligne of contenu.lignes ){
		for(let j=0 ; j<contenu.lignes.length ; j++ ){
			let nom   = contenu.noms[j];
			let tr   =	document.createElement("tr");
			let th   =	document.createElement("th");
			let c_n  =	document.createTextNode( nom );
			th.colSpan = "2"; 
			//tr.dataset.is_nom = "true";
			th    .appendChild( c_n   );
			tr    .appendChild( th    );
			tbody .appendChild( tr    );
			
			let ligne = contenu.lignes[j];
			for(let i=0 ; i<contenu.colonnes.length ; i++ ){
				let tr   =	document.createElement("tr");
				let th_c =	document.createElement("th");
				let td_l =	document.createElement("td");
				let c_n  =	document.createTextNode( contenu.colonnes[i] );
				let l_n  =	document.createTextNode( ligne[i]            );
				th_c  .appendChild( c_n   );
				td_l  .appendChild( l_n   );
				tr    .appendChild( th_c  );
				tr    .appendChild( td_l  );
				tbody .appendChild( tr    );
				if( j%2==1 ) tr.classList.add("pair");
			}
		}
		table         .appendChild( tbody );
	}
	//marqueur css
	document.getElementById(id_table_mobile).classList.add("vue_mobile");
}


function table_to_desktop(id_table_mobile,id_table_desktop){
	const NB_DISPLINES = 9;
	let contenu = {};
	//extraction des disciplines
	{
		contenu.colonnes = [];
		let sel = `#${id_table_mobile} tbody`;
		//console.log(`get : >${sel}<`);
		let el_tbody = document.querySelector(sel);
		for (const el_tr of el_tbody.children) { 
			if(contenu.colonnes.length===NB_DISPLINES) break;
			let el_td = el_tr.querySelector('th');
			console.log("el_td : "+el_td);
			contenu.colonnes.push(el_td.innerText);
		}
		//console.log( contenu.colonnes );
	}
	//extractions des notes et des noms (pour les th[colspan="2"])
	{
		contenu.lignes = [];
		contenu.noms   = [];
		let sel = `#${id_table_mobile} tbody`;
		//console.log("get : >"+sel+"<");
		let el_tbody = document.querySelector(sel);
		let compteur = 0;
		let ligne_notes;
		for (const el_tr of el_tbody.children) { 
			if(el_tr.children[0].hasAttribute("colspan")){ //nom
				let nom = el_tr.children[0].innerText;
				console.log(`and now for ${nom}`);
				contenu.noms.push( nom );
			}else{ //note
				compteur += 1;
				if(compteur % NB_DISPLINES === 1) {
					ligne_notes = [];
					contenu.lignes.push( ligne_notes );
				}
				let el_td = el_tr.querySelector('td');
				console.log("el_td : "+el_td);
				ligne_notes.push(el_td.innerText);
			}
		}
	}
	console.log( JSON.stringify(contenu) );
	//trash contenu de table desktop (au cas où) et reconstruction de thead
	{
		let table = document.getElementById(id_table_desktop);
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
		let thead      = document.createElement (  "thead"     );
		let tr         = document.createElement (  "tr"        );
		tr.appendChild( document.createElement ( "td" ) );
		for (const nom_disc of contenu.colonnes ) { 
			let th     = document.createElement (  "th"        );
			let c_n    = document.createTextNode( nom_disc     );
			th.appendChild( c_n );
			tr.appendChild( th  );
		}
		thead .appendChild( tr    );
		table .appendChild( thead );
	}
	//reconstruction de tbody
	{
		let table        = document.getElementById(id_table_desktop);
		let tbody        = document.createElement("tbody");
		for(const [idx,ligne] of contenu.lignes.entries() ) { 
			let tr       = document.createElement("tr");
			let th       = document.createElement ( "th" );
			th.appendChild( document.createTextNode( contenu.noms[idx] ));
			tr.appendChild( th );
			for (const note of ligne ) { 
				let td   = document.createElement("td");
				let c_n  = document.createTextNode(note);
				td.appendChild( c_n );
				tr.appendChild( td  );
			}
			tbody.appendChild( tr    );
		}
		table.appendChild( tbody );
	}
	
}

/* ------------------------------------------------------------ */
