console.log("javascript working");

let btn = document.querySelector(".theme-btn");
let topics = document.querySelectorAll(".nav-topic"); 
let sun = document.querySelector(".sun-icon");
let moon = document.querySelector(".moon-icon");
let theme_btn = document.querySelector(".theme-btn");
let sbj_info = document.querySelector(".subject-info");
let choice_btns = document.querySelectorAll(".choice");

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
    topics.forEach(topic => {
        topic.classList.toggle("topic-dark");
    });
    theme_btn.classList.toggle("toggle-end");
    sbj_info.classList.toggle("blue-900-color");
    choice_btns.forEach(btn => {
        btn.classList.toggle("choice-dark");
    });
    if (document.body.classList.contains("dark-theme"))
        darktheme();
    else
        lighttheme();
});