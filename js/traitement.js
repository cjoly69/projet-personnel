// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}

//chapitres

function ajouteChap(){
  var chap = document.getElementsByClassName('chapitre');
  var button = document.createElement('button');
  var titre = document.getElementById('titre');
  button.innerText = titre.value;
  document.querySelector(".new").appendChild(button);
  titre.value = '';
}

//compétences
// function ajouteComp(){
//   var comp = document.getElementsByClassName('competence');
//   var button = document.createElement('input');
//   var titreComp = document.getElementById('competence');
//   input.innerText = titreComp.value;
//   document.querySelector(".new").appendChild(input);
//   titreComp.value = '';
// }

  // ajouteChap();
  // ajouteComp();

  //INITIALISATION ADAPTER L URL v
  getChapters("basededonnees.txt");


  //RECUPERATION DE DONNEES SUR UN FICHIER TXT AVEC JSON
  function getChapters(url){

  	var xmlhttp = new XMLHttpRequest();
  	//var url = "./basededonnees.txt";

  	xmlhttp.onreadystatechange = function() {
  	    if (this.readyState == 4 && this.status == 200) {
  	        var myArr = JSON.parse(this.responseText);
  	        generateChapter(myArr);
  	    }
  	};
  	xmlhttp.open("GET", url, true);
  	xmlhttp.send();
  }

  //FORMATAGE DES CHAPITRES ET AFFICHAGE
  function generateChapter(arrayJSONObj){
  	//console.log(arrayJSONObj[0]["niveaux"]);
      var out = "";
      var i = 0;
      var chapterArray = {};

      //LE CHOIX DU NIVEAU EST ARBITRAIRE POUR L'INSTANT
      for (niveau in arrayJSONObj[0]["niveaux"]){
      	if (niveau == "3e"){
     			chapterArray = arrayJSONObj[0]["niveaux"][niveau]["chapitres"];
     			//console.log(chapterArray);
      	}
      	//else {console.log(niveau);}
      }
      for (chapter in chapterArray){
      	document.getElementById("liste_chapitres").innerHTML += '<button class="accordion">' + chapter + '</button>' + '<div class="panel">' ;
      	for(competence in chapterArray[chapter]["competences"]){
      		i++;
      		//VOIR PROBLEME AVEC L'ATTRIBUT CHECKED TOUJOURS TRUE
      		document.getElementById("liste_chapitres").innerHTML += '<input type="checkbox" id="cbox' + i + '" value="deuxieme_checkbox" checked=' + competence["etat"]  + '> <label for="cbox' + i +' "> '+ competence  +'</label></br>';
  	   	}
  	   	document.getElementById("liste_chapitres").innerHTML += '</div>'
      }
  }
