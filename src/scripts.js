import "./style.sass";

var cacheDOM = (function(){
	var blocks = document.getElementsByClassName("block");
	blocks = [ ...blocks ];
	var menu = document.getElementsByClassName("menu");
	var colapser = document.getElementsByClassName("colapser");
	return{
		menu: menu,
		blocks: blocks,
		colapser: colapser
	}
})()
var lastscrollY
var scrollspy = function(){
	menu = cacheDOM.menu;
	blocks = cacheDOM.blocks;
		 
	var buttons = [ ...document.getElementsByTagName("a")];
	
	if(window.scrollY>lastscrollY){
		menu[0].style.top = "-100%";
		lastscrollY = window.scrollY;
	}
	else {
		menu[0].style.top = "0px";
		lastscrollY = window.scrollY;
	}

	buttons.forEach(x=>{
		x.classList.remove("active");
	})
	console.log("sasa")

	for( var i=2; i>=0; i-- ){
		if(blocks[i].offsetTop < window.scrollY+10){
			document.querySelector('a[href*=' + blocks[i].id + ']').classList.add("active");
			console.log("addded");
			return;
			}
		}

};

var blocks = document.getElementsByClassName("block");
blocks = [ ...blocks ];
var menu = document.getElementsByClassName("menu");

//dodac plynna animacje
setTimeout(function(){
	var tohide = document.getElementsByClassName("menu--label__hide");
	var arr = [ ...tohide ];
	var tolower = document.getElementById("tolower");
	tolower.innerHTML = "m";
	arr.forEach(function(x){
		x.style.display="none";	
	});
},3300)
var lastscrollY = 1333333333;
//var buttons = [ ...document.getElementsByTagName("a")];

function menuToggle(){
	console.log(cacheDOM.colapser[0].classList.contains('colapsed'));
	if(cacheDOM.colapser[0].classList.contains('colapsed')){
		cacheDOM.colapser[0].classList.remove("colapsed");
	}
	else cacheDOM.colapser[0].classList.add("colapsed")
}

window.addEventListener("scroll", scrollspy);
document.getElementById("menu-toggle").addEventListener("click", menuToggle);
