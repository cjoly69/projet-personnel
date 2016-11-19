// accordion
function accordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
}

//INITIALISATION ADAPTER L URL v
getChapters("basededonnees.json");
// getChapters("niveau3.csv");


//RECUPERATION DE DONNEES SUR UN FICHIER JSON AVEC JSON
function getChapters(url) {

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
function generateChapter(arrayJSONObj) {
    //console.log(arrayJSONObj[0]["niveaux"]);
    var out = "";
    var i = 0;
    var comp = 0;
    var chapterArray = {};

    //LE CHOIX DU NIVEAU EST ARBITRAIRE POUR L'INSTANT
    for (niveau in arrayJSONObj[0]["niveaux"]) {
        if (niveau == "3e") {
            chapterArray = arrayJSONObj[0]["niveaux"][niveau]["chapitres"];
            //console.log(chapterArray);
        }
        //else {console.log(niveau);}
    }
    for (chapter in chapterArray) {
        comp++;
        var idpan="pan"+comp;
        accordion();
        document.getElementById("liste_chapitres").innerHTML
         += '<button class="accordion" onclick="accordion()">' + chapter
         + '<i class="material-icons">keyboard_arrow_down</i></button>'
         + '<div class="panel" id="'+idpan+'">';

        for (competence in chapterArray[chapter]["competences"]) {
            //console.log(chapterArray[chapter]);
            i++;
            //VOIR PROBLEME AVEC L'ATTRIBUT CHECKED TOUJOURS TRUE : checked=' + competence["etat"]
            document.getElementById(idpan).innerHTML += '<input type="checkbox" id="cbox' + i + '" value="deuxieme_checkbox" ' + '/> <label for="cbox' + i + ' "> ' + competence + '</label></br>';
        }
        document.getElementById(idpan).innerHTML += '</div>';

    }
    //ajout des chapitres créé sur le local storage
    if(typeof(Storage) !== "undefined") {
        if (localStorage.savedChapters) {
            document.getElementById("liste_chapitres").innerHTML += localStorage.savedChapters;
        }
    }
    
    //j'appelle la fonction pour l'appel au click
    return accordion();
}

//CREATION DE CHAPITRES
function createChapter(){
    var titre = document.getElementById("titre").value;
    var competence = document.getElementById("competence").value;
    var newchapter = '<button class="accordion">'+ titre +'<i class="material-icons">keyboard_arrow_down</i></button>'
                    +'<div class="panel">'
                        +'<input type="checkbox" value="premiere_checkbox"><label>'+ competence +'</label><br>'
                    +'</div>';
    document.getElementById("liste_chapitres").innerHTML += newchapter;
    saveChapter(newchapter);
    return accordion();
}

//SAUVEGARDE DU CHAPITRE EN LOCAL STORAGE
function saveChapter(chapter) {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.savedChapters) {
            localStorage.savedChapters += chapter;
        } else {
            localStorage.savedChapters = chapter;
        }
    }
}
