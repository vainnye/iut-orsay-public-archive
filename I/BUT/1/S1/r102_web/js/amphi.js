function load(){
	console.log( "loaded" );
	make_nav();
}

function make_nav(){
	let nav_liste = document.querySelector("#nav_liste");
	nav_liste.innerHTML = '';
	document.querySelectorAll("article").forEach(
		(article) => { add_article_to_nav(article,nav_liste); }
	);
}

function add_article_to_nav( article, nav_liste ){
	if( article.hasAttribute('id') ){
		nav_liste.appendChild( make_nav_part(
			article.getAttribute('id'),
			article.dataset?.title
		));
	}else if( article.classList.contains('titre') ){
		nav_liste.appendChild( make_nav_sec(
			article.dataset?.title
		));
	}
}

function make_nav_sec( title ){
	console.log("sec> "+title);
	const template    = document.querySelector('#nav_li_sec');
	const clone       = template.content.cloneNode(true);
	let   li          = clone.querySelector("li");
	li.textContent    = title??"...";
	return clone;
};

function make_nav_part( id, title ){
	console.log("part> "+id+","+title);
	const template    = document.querySelector('#nav_li_part');
	const clone       = template.content.cloneNode(true);
	let   anch        = clone.querySelector("a");
	anch.textContent  = title??"...";
	anch.setAttribute( "href", '#'+id );
	return clone;
};

