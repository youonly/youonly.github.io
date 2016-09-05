var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-red";

  document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == '37') {
            plusDivs(-1); //left <- show Prev image
            scroll("img");
        } else if (e.keyCode == '39') {
            // right -> show next image
            plusDivs(1);
            scroll("img");
        }
    }
}

function scroll(element){
var ele = document.getElementById(element);
window.scrollTo(ele.offsetLeft,ele.offsetTop); }
