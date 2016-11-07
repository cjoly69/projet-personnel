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
  document.body.appendChild(button);
  titre.value = '';
}
