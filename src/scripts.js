import "./style/style.sass";

var cacheDOM = (function(){
	var blocks = document.getElementsByClassName("block");
	blocks = [ ...blocks ];
	var menu = document.getElementsByClassName("menu")[0];
	var colapser = document.getElementsByClassName("menu--colapser");
	var buttons = [ ...document.getElementsByTagName("a")];
	return{
		menu: menu,
		blocks: blocks,
		buttons: buttons,
		colapser: colapser		
	}
})();
//var blocks = document.getElementsByClassName("block");
//blocks = [ ...blocks ];
//var menu = document.getElementsByClassName("menu");
var lastscrollY

function scrollspy(){
	var menu = cacheDOM.menu;
	var blocks = cacheDOM.blocks;	
	var buttons = cacheDOM.buttons;	 
	
	
	if(window.scrollY>lastscrollY){
		menu.style.top = "-4em";
		lastscrollY = window.scrollY;
	}
	else {
		menu.style.top = "0px";
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

(function(){
	var items =[
		{
			id:1,header:"Javascript",content:"Javascript to podstawa dynamicznej strony internetowej ciągle rozwijam "+
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
			id:6,header:"git",content:"narzędzie służące do kontroli wersji",
		},
		{
			id:7,header:"EXPRESS",content:"Systematycznie poznaję Express by móc w przyszłości budowac back-end w node",
		},
		{
			id:8,header:"Socket.io",content:"To narzędzie usprawnia prace z websockets tworząc bezposrednie połączenie klient-serwer"+
			" umożliwiając bezpośrednią wymianę informacji"
		},
		{
			id:9,header:"VSC", content:"Visual Studio Code rozbudowany i darmowy edytor kodu."
		},
		{
			id:10,header:"SQL", content:"Język zapytań dla baz danych"
		}

	];
		
	var karuzela = {
		translation :{},
		items : [],
		radius: 110,
		angle : 0,
		rotationAngle: 0,
		HTML : "",
		opis: document.getElementById("value"),
		
		init : function(){
			this.angle = 2*Math.PI/items.length;			
			
			this.items.forEach(x=>{							
				this.translation.X = Math.sin(this.angle * x.id).toFixed(1) * this.radius * 2 ;
				this.translation.Z = Math.cos(this.angle * x.id).toFixed(1) * this.radius ;
				var degangle = (this.angle*360*x.id)/(2*Math.PI);				
				if( degangle >= 360)
					degangle = degangle-360;
				else 
					degangle = degangle
				

				var div = document.createElement("div");
				div.innerHTML = x.header;

				
				div.setAttribute("style", "transform:TranslateX("+this.translation.X+"px)TranslateZ("+this.translation.Z+"px");
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
			if(degAngle >= 360){
				degAngle=degAngle-360;
			}
			this.rotationAngle = degAngle;			
			divsToTranslate.forEach((x,key)=>{				
				newdegAngle = x.getAttribute("data-angle") - degAngle;
				newradAngle = (newdegAngle*2*Math.PI)/360;
				this.translation.X = Math.sin(newradAngle).toFixed(1) * this.radius * 2;
				this.translation.Z = Math.cos(newradAngle).toFixed(1) * this.radius ;
				x.setAttribute("style","transform:translateX("+this.translation.X+"px)translateZ("+this.translation.Z+"px)");
				//x.addAttribute("style","-webkit-transform:translateX("+Translation.X+"px)translateZ("+Translation.Z+"px)");
				//x.addAttribute("style","-ms-webkit-transform:translateX("+Translation.X+"px)translateZ("+Translation.Z+"px)");
				//console.log(newdegAngle);
				if(newdegAngle == 0){
					this.opis.innerHTML = items[key].content;
				};
			});
		},
		curentRotationAngle: function(){
			return this.rotationAngle;
		},
		
		
	}
	karuzela.set(items);
	karuzela.init();
	
	document.getElementById("scena").addEventListener("click",function(event){
		event.stopPropagation();
		var degAngle = parseInt(event.target.getAttribute("data-angle"));
		if(!isNaN(degAngle)){
			karuzela.rotate(degAngle);
		};
	});

	var step = 360/karuzela.items.length;
	
	setInterval(function(){
		var curAngle = karuzela.curentRotationAngle();	
		console.log(curAngle+step);	
		karuzela.rotate(curAngle+step);
	},2130);	
})();

document.getElementById("form").addEventListener("submit", function(event){
	event.preventDefault();
});


(function(){
	var x = new Date(); 
	var xx=x.getFullYear();
	document.getElementById("stopa").innerText = "Rafał Malenta "+xx;

})();
