console.log("javascript working");

let btn = document.querySelector(".theme-btn");
let topic = document.querySelector(".nav-topic"); 
let sun = document.querySelector(".sun-icon");
let moon = document.querySelector(".moon-icon");
let theme_btn = document.querySelector(".theme-btn");

function darktheme(){
    console.log("dark theme");
    sun.setAttribute('src',"./starter-code/assets/images/icon-sun-light.svg");
    moon.setAttribute('src',"./starter-code/assets/images/icon-moon-light.svg");

}
function lighttheme(){
    console.log("light theme");
    sun.setAttribute('src',"./starter-code/assets/images/icon-sun-dark.svg");
    moon.setAttribute('src',"./starter-code/assets/images/icon-moon-dark.svg");
}

btn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme");
    topic.classList.toggle("topic-dark");
    theme_btn.classList.toggle("toggle-end");
    if (document.body.classList.contains("dark-theme"))
        darktheme();
    else
        lighttheme();

});