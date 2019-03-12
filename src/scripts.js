import "./style.sass";
//import $ from "jquery";
var cacheDOM = (function(){
	var blocks = document.getElementsByClassName("block");
	blocks = [ ...blocks ];
	var menu = document.getElementsByClassName("menu");
	var colapser = document.getElementsByClassName("menu--colapser");
	return{
		menu: menu,
		blocks: blocks,
		colapser: colapser
	}
})();
var lastscrollY
function scrollspy(){
	menu = cacheDOM.menu;
	blocks = cacheDOM.blocks;
		 
	var buttons = [ ...document.getElementsByTagName("a")];
	
	if(window.scrollY>lastscrollY){
		menu[0].style.top = "-4em";
		lastscrollY = window.scrollY;
	}
	else {
		menu[0].style.top = "0px";
		lastscrollY = window.scrollY;
	}

	buttons.forEach(x=>{
		x.classList.remove("active");
	})
	
	for( var i=2; i>=0; i-- ){
		if(blocks[i].offsetTop < window.scrollY){
			document.querySelector('a[href*=' + blocks[i].id + ']').classList.add("active");
			
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
	var tolower = document.getElementById("menu--label__tolower");
	tolower.innerHTML = "m";
	arr.forEach(function(x){
		x.style.display="none";	
	});
},3300)

function menuToggle(){
	if(cacheDOM.colapser[0].classList.contains('colapsed')){
		cacheDOM.colapser[0].classList.remove("colapsed");
	}
	else cacheDOM.colapser[0].classList.add("colapsed")
}

window.addEventListener("scroll", scrollspy);
document.getElementById("menu-toggle").addEventListener("click", menuToggle);


//items=[{label:"dom",value:"las"},{label:"kot",value:"pies"}]
//var karuzela = funcion(){};
//var item = {type:"Fiat", model:"500", color:"white"};


	
//var items = [{},{5434}]
(function(){
	var items =[
		{
			id:1,header:"Javascript",content:"Javascript to podstawa dynamicznej strony internetowej ciągle rozwijam"+
			 "jej znajomość wraz z nadzbiorem ECMAscript.",
		},
		{
			id:2,header:"HTML5", content:"HTML5 podstawowy dla działania każdej strony język znaczników, znam solidne"+
			" podstawy tego języka oraz staram się podązać za standardami W3C."
		},
		{
			id:3,header:"CSS3", content:"CSS3 kaskadowe arkusze stylów pozwalają nadać wygląd stronie rozwijam znajomość CSS3 oraz"+
			" staram sie podążać za trendami jakimi są OCSS oraz BEM, dodatkowo znam preprocesor SASS"
		},
		{
			id:4,header:"React",content:"React umożliwia łatwą manipulację stanem aplikacji oraz separację widoku od logiki",

		},
		{
			id:5,header:"webpack",content:"Webpacka używam do automatyzacji zadań, oraz usprawnienia środowiska pracy  ",
		},
		{
			id:6,header:"node",content:"",
		},
		{
			id:7,header:"EXPRESS",content:"Systematycznie poznaję Express by móc w przyszłości budowac back-end w node",
		},
		{
			id:8,header:"Socket.io",content:"To narzędzie usprawnia prace z websockets tworząc bezposrednie połączenie klient-serwer"+
			" umożliwiając bezpośrednią wymianę informacji"
		}

	];
	var Translation = {};
	
	var karuzela = {
		items : [],
		radius: 110,
		angle : null,
		HTML : "",
		opis: document.getElementById("value"),
		
		init : function(){
			this.angle = 2*Math.PI/items.length;
			
			console.log(this.angle);
			this.items.forEach(x=>{							
				Translation.X = Math.sin(this.angle * x.id).toFixed(1) * this.radius * 2 ;
				Translation.Z = Math.cos(this.angle * x.id).toFixed(1) * this.radius ;
				var degangle = (this.angle*360*x.id)/(2*Math.PI);				
				if( degangle >= 360)
					degangle = degangle-360;
				else 
					degangle = degangle
				

				var div = document.createElement("div");
				div.innerHTML = x.header;

				
				div.setAttribute("style", "transform:TranslateX("+Translation.X+"px)TranslateZ("+Translation.Z+"px");
				div.setAttribute("width", "600");
				div.setAttribute("data-angle", degangle);
 				document.getElementById("scena").appendChild(div);
			});
			this.opis.innerHTML = items[items.length-1].content;
		},
		
		set: function(x){
			this.items = x
		},
		rotate: function(degAngle){
			var divsToTranslate = [ ...scena.getElementsByTagName("div")];
			var newdegAngle, newradAngle;
						
			divsToTranslate.forEach((x,key)=>{				
				newdegAngle = x.getAttribute("data-angle") - degAngle;
				newradAngle = (newdegAngle*2*Math.PI)/360;
				Translation.X = Math.sin(newradAngle).toFixed(1) * this.radius * 2;
				Translation.Z = Math.cos(newradAngle).toFixed(1) * this.radius ;
				x.setAttribute("style","transform:translateX("+Translation.X+"px)translateZ("+Translation.Z+"px)");
				//x.addAttribute("style","-webkit-transform:translateX("+Translation.X+"px)translateZ("+Translation.Z+"px)");
				//x.addAttribute("style","-ms-webkit-transform:translateX("+Translation.X+"px)translateZ("+Translation.Z+"px)");
				if(newdegAngle == 0){
					this.opis.innerHTML = items[key].content;
				};
			});
		},
		
		
	}
	karuzela.set(items);
	karuzela.init();
	
	addEventListener("click",function(event){
		event.stopPropagation();
		var degAngle = parseInt(event.target.getAttribute("data-angle"));
		if(!isNaN(degAngle)){
			karuzela.rotate(degAngle);
		};
	});
	var step = 360/karuzela.items.length;
	var iteration = 0;
	setInterval(function(){
		if(iteration < karuzela.items.length-1)
			iteration += 1;
		else iteration = 0;
		
		karuzela.rotate(iteration*step);
	},5130);
	

	//console.log(karuzela.items);
})();

document.getElementById("form").addEventListener("submit", function(event){
	event.preventDefault();
});
