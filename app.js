console.log("javascript working");

let btn = document.querySelector(".theme-btn");
let topics = document.querySelectorAll(".nav-topic"); 
let topic_nav = document.querySelector(".nav-ques");
let sun = document.querySelector(".sun-icon");
let moon = document.querySelector(".moon-icon");
let theme_btn = document.querySelector(".theme-btn");
let sbj_info = document.querySelector(".subject-info");
let choice_btns = document.querySelectorAll(".choice");
let nav= document.querySelector("nav");
let quiz_front = document.querySelector(".quiz-choice");
let quiz_Display = document.querySelector(".quiz-display");

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
function updateTopicTheme() {
  document.querySelectorAll(".nav-topic").forEach(topic => {
    topic.classList.toggle("topic-dark");
  });
}

btn.addEventListener("click",()=>{
    let que_no = document.body.querySelector(".ques-no");
    document.body.classList.toggle("dark-theme");
    updateTopicTheme();
    theme_btn.classList.toggle("toggle-end");
    sbj_info.classList.toggle("blue-300-color");
    que_no.classList.toggle("blue-300-color")
    choice_btns.forEach(btn => {
        btn.classList.toggle("choice-dark");
    });
    if (document.body.classList.contains("dark-theme"))
        darktheme();
    else
        lighttheme();
});

// handling of choice btns
choice_btns.forEach(btn => {
  btn.addEventListener("click", handleChoiceClick);
});

let firstTopic = topics[0];
let count=0;
let title ;

function handleChoiceClick(e) {
  const clickedBtn = e.currentTarget;
  console.log("Clicked:", e.currentTarget);
    

  if (
    clickedBtn.classList.contains("html") ||
    clickedBtn.classList.contains("css") ||
    clickedBtn.classList.contains("js") ||
    clickedBtn.classList.contains("Accessibility")
  ){
    topic_nav.classList.remove("nav-ques-hide"); // remove nav-topic from hiding 
  nav.classList.add("nav-justify");// justify its content
  const topicIcon = clickedBtn.querySelector(".nav-ques"); // selected topic
  topic_nav.innerHTML = topicIcon.innerHTML; // make same via changing 
     quiz_front.classList.add("quiz-choice-hide");
  // changing 1st article part
    quiz_Display.classList.remove("quiz-display-hide");
    count = 1;
    const title = clickedBtn.querySelector(".nav-topic").textContent.trim();
    updateUI(title,clickedBtn);
  }
}



let data = [];

fetch("./data.json")
  .then(response => response.json())
  .then(jsonData => {
    quizzes = jsonData.quizzes; 
    console.log(quizzes);
  });

function updateques(selectedData){
    //update number in para
    quiz_no_update= quiz_Display.querySelector(".number");
    quiz_no_update.textContent= count;
    // update title with question
    quiz_show = quiz_Display.querySelector(".ques-detail");
    quiz_show.textContent = selectedData.questions[count].question;
     //updating bar
    quiz_bar = quiz_Display.querySelector(".lower-bar");
    let wid = count*10;
    quiz_bar.style.width = `${wid}%`;
}

function updateUI(title,clickedBtn) {
  const allowedTitles = ["HTML", "CSS", "JavaScript", "Accessibility"];

  // check if title is valid
  if (!allowedTitles.includes(title)) {
    console.log("Invalid title:", title);
    return;
  }

  const selectedData = quizzes.find(q => q.title === title);

  if (!selectedData) {
    console.log("No data found for:", title);
    return;
  }
  console.log("Matched Data:", selectedData);
  //dispaly first question
  updateques(selectedData,clickedBtn);
}