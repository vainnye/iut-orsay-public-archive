"use strict";

/* ------------------------------------------------------------ */

function rajoute_un_clic(){
	let btn = document.getElementById("le_bouton_lui_meme");
	process_hello_button(btn);
}

function process_hello_button(btn){
	let txt = btn.innerText;
	if(txt==="Hello !"){
		alert("welcome !");
		btn.innerText = "re hello";
	}else{
		alert("on s'est déjà vu non ?");
	}	
}

function rajoute_un_clic_alt(that){
	process_hello_button(that);
}

/* ------------------------------------------------------------ */