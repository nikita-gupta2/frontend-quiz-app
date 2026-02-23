console.log("javascript working");

let btn = document.querySelector(".theme-btn");
let topics = document.querySelectorAll(".nav-topic"); 
let topic_nav = document.querySelector(".nav-ques");
let sun = document.querySelector(".sun-icon");
let moon = document.querySelector(".moon-icon");
let theme_btn = document.querySelector(".theme-btn");
let sbj_info = document.querySelector(".subject-info");
let subject = document.querySelector(".choicefirst-btn");
let sbj_choice = document.querySelectorAll(".choicefirst");
let choice_btns = document.querySelectorAll(".choice");
let choice_article = document.querySelector(".choice-btn");
let nav= document.querySelector("nav");
let quiz_front = document.querySelector(".quiz-choice");
let quiz_Display = document.querySelector(".quiz-display");
let submit_Btn = document.querySelector(".submit");
let null_Error = document.querySelector(".null-error");
let result_display = document.querySelector(".result-display");
let quiz_result = document.querySelector(".quiz-result");
let nextpage = document.querySelector(".Nextpage");
let resultNavQues = result_display.querySelector(".nav-ques");
let replay_btn = document.querySelector(".replay");
let result_box = document.querySelector(".display-box");
let scores_display_text = document.querySelector(".score");

let correct_score = 0;

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
    sbj_choice.forEach(btn =>{
        btn.classList.toggle("choice-dark");
    })
    topics.forEach(btn => {
        btn.classList.toggle("text-white");
    })
    scores_display_text.classList.toggle("text-white");
    result_box.classList.toggle("choice-dark");
    let scoreText = result_box.querySelector(".text-preset-5");
    console.log(scoreText);
    scoreText.classList.toggle("blue-300-color");
    choice_btns.forEach(btn => {
        btn.classList.toggle("choice-dark");
    });
    null_Error.classList.toggle("text-white");
    if (document.body.classList.contains("dark-theme"))
        darktheme();
    else
        lighttheme();
});
const subjectBgMap = {
  html: "bg-orange-50",
  css: "bg-green-100",
  js: "bg-blue-50",
  Accessibility: "bg-purple-100"
};

let selectedOptionIndex = null;
let selectedBtn = null;
let count=0;
let quiz_start =true;
let title ;
function enableOptionMode() {
  choice_btns.forEach(btn => {
    const iconDiv = btn.querySelector(".nav-icon");
    const img = iconDiv.querySelector("img");
    const letter = iconDiv.querySelector(".option-letter");

    // hide image
    img.classList.add("display-hide");

    // show A/B/C/D
    letter.classList.remove("display-hide");

    // change background
    iconDiv.classList.add("option-mode");
  });
}


function updateNavFromClicked(clickedBtn, topic_nav) {
  const navIconDiv = topic_nav.querySelector(".nav-icon");
  const navIconImg = navIconDiv.querySelector("img");
  const navTopicText = topic_nav.querySelector(".nav-topic");

  const clickedIconDiv = clickedBtn.querySelector(".nav-icon");
  const clickedImg = clickedIconDiv.querySelector("img");
  const clickedTitle = clickedBtn.querySelector(".nav-topic").textContent.trim();

  // copy image
  navIconImg.src = clickedImg.src;
  navIconImg.alt = clickedImg.alt;

  // copy text
  navTopicText.textContent = clickedTitle;

  // reset background classes
  Object.values(subjectBgMap).forEach(bg =>
    navIconDiv.classList.remove(bg)
  );

  // apply correct background
  for (const key in subjectBgMap) {
    if (clickedBtn.classList.contains(key)) {
      navIconDiv.classList.add(subjectBgMap[key]);
      break;
    }
  }
}


sbj_choice.forEach((btn) => {
  btn.addEventListener("click", (e) => {
  const clickedBtn = e.currentTarget;
  console.log(clickedBtn);
  topic_nav.classList.remove("display-hide"); // remove nav-topic from hiding 
  nav.classList.add("content-justify");// justify its content
    updateNavFromClicked(clickedBtn, topic_nav);
    updateNavFromClicked(clickedBtn, resultNavQues);
    // enableOptionMode();
    quiz_front.classList.add("display-hide");
  // changing 1st article part
    quiz_Display.classList.remove("display-hide");
    submit_Btn.classList.remove("display-hide");
     document.querySelector(".choicefirst-btn")
            .classList.add("display-hide");
    const title = clickedBtn.querySelector(".nav-topic").textContent.trim();
    quiz_start = false;
    // subject.classList.add("display-hide");
    choice_article.classList.remove("display-hide");
    console.log(title);
    // choice_article.classList.add("answering");
    // choice_article.classList.remove("locked");
    updateUI(title);
  })
})


choice_btns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
  const clickedBtn = e.currentTarget;
  console.log("Clicked:", e.currentTarget);
  if(nextpage.classList.contains("display-hide")){
        choice_article.classList.add("answering");
    choice_article.classList.remove("locked");
  }

    // if (nextpage.classList.contains("display-hide")){
    //     
    // }

    choice_btns.forEach(b => {
        b.classList.remove("selected");
        b.classList.remove("border-purple");
        b.querySelector(".nav-icon").classList.remove("bag-purple");
        b.querySelector(".option-letter").classList.remove("topic-dark");
    });

    if (choice_article.classList.contains("answering")){
        choice_article.classList.remove("answering");
    choice_article.classList.add("locked");
    btn.classList.add("border-purple");
    btn.querySelector(".nav-icon").classList.add("bag-purple");
    btn.querySelector(".option-letter").classList.add("topic-dark");
    };

    // mark selected
    btn.classList.add("selected");
    selectedOptionIndex = index;
    selectedBtn = btn;

    // hide error if shown
    null_Error.classList.add("display-hide");
});
});
let currentQuiz = null;


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
    quiz_no_update.textContent= count+1;
    // update title with question
    quiz_show = quiz_Display.querySelector(".ques-detail");
    quiz_show.textContent = selectedData.questions[count].question;
     //updating bar
    quiz_bar = quiz_Display.querySelector(".lower-bar");
    let wid = (count+1)*10;
    quiz_bar.style.width = `${wid}%`;
}
function showResult(){
    result_display.classList.remove("display-hide");
    quiz_Display.classList.add("display-hide");
    choice_article.classList.add("display-hide");
    quiz_result.classList.remove("display-hide");
    result_display.querySelector(".score").textContent=correct_score;
    
}
function goToNextQuestion() {
  selectedOptionIndex = null;
  selectedBtn = null;

  console.log("inside next question");
    console.log(submit_Btn.textContent);
  submit_Btn.textContent = "Submit Answer";
  console.log(submit_Btn.textContent);
  // RESET UI
  choice_btns.forEach(btn => {
    const result_icon = btn.querySelector(".result-icon");
    const iconDiv = btn.querySelector(".nav-icon");
    const letter = iconDiv.querySelector(".option-letter");

    btn.classList.remove("correct", "wrong", "content-justify", "selected");
    letter.classList.remove("option-letter-selected");
    iconDiv.classList.remove("correct-icon", "wrong-icon");
    result_icon.classList.add("display-hide");
  });
  
  // END QUIZ CHECK
  if (count == currentQuiz.questions.length) {
    console.log("Quiz finished");
    showResult();
    return;
  }

  updateques(currentQuiz);
  updatebuttons(currentQuiz);
}
//update buttons value
function updatebuttons(selectedData){
  const options = selectedData.questions[count].options;
    
  choice_btns.forEach((btn, index) => {
    const topicEl = btn.querySelector(".nav-topic");

    if (options[index] !== undefined) {
      topicEl.textContent = options[index];
    }
  });
}

function handlesubmit(selectedData) {
    console.log("inside submit");
  if (selectedOptionIndex === null) {
    null_Error.classList.remove("display-hide");
    return;
  }
  else{
    
  const currentQuestion = selectedData.questions[count];
  const correctAnswer = currentQuestion.answer; // text OR index based on your data
    choice_article.classList.remove("answering");
    choice_article.classList.add("locked");
  choice_btns.forEach((btn, index) => {
    btn.classList.remove("border-purple");
    btn.querySelector(".nav-icon").classList.remove("bag-purple");
    btn.querySelector(".option-letter").classList.remove("topic-dark");
    const result_icon = btn.querySelector(".result-icon");
    const result_img = btn.querySelector(".icon-image");
    const btn_content = btn.querySelector(".nav-topic").textContent.trim();
    const iconDiv = btn.querySelector(".nav-icon");
    const letter = iconDiv.querySelector(".option-letter");
    // reset state
    btn.classList.remove("correct", "wrong", "content-justify");
        letter.classList.remove("option-letter-selected");
    iconDiv.classList.remove("correct-icon","wrong-icon");
    result_icon.classList.add("display-hide");


       //CASE 1: CORRECT OPTION
    if (btn_content === correctAnswer) {
        if (btn.classList.contains("selected")){
            btn.classList.add("correct");
            iconDiv.classList.add("correct-icon");
            letter.classList.add("option-letter-selected");
        }
       btn.classList.add("content-justify");
      result_icon.classList.remove("display-hide");
      result_img.setAttribute(
        "src",
        "./starter-code/assets/images/icon-correct.svg"
      );
      if (btn.classList.contains("selected")){
              correct_score++;
      console.log(correct_score);
      }

    }

    //    CASE 2: SELECTED BUT WRONG
    if (btn.classList.contains("selected") && btn_content !== correctAnswer) {
      btn.classList.add("wrong", "content-justify");
      result_icon.classList.remove("display-hide");
      iconDiv.classList.add("wrong-icon");
      letter.classList.add("option-letter-selected");
      result_img.setAttribute(
        "src",
        "./starter-code/assets/images/icon-incorrect.svg"
      );
    }
  });
  nextpage.classList.remove("display-hide")
  submit_Btn.classList.add("display-hide");
  }
    
}
nextpage.addEventListener("click", () =>{
    submit_Btn.classList.remove("display-hide");
    nextpage.classList.add("display-hide");
    count++;
    console.log("before next question");
    goToNextQuestion();
})


replay_btn.addEventListener("click", () => {
    quiz_front.classList.remove("display-hide");
     document.querySelector(".choicefirst-btn")
            .classList.remove("display-hide");
    result_display.classList.add("display-hide");
    quiz_result.classList.add("display-hide");
    topic_nav.classList.add("display-hide"); 
    nav.classList.remove("content-justify");
    selectedOptionIndex = null;
    selectedBtn = null;

    count=0;
    quiz_start =true;
    correct_score = 0;
    currentQuiz = null;
})


submit_Btn.addEventListener("click", () => {
  if (!currentQuiz) return;
  handlesubmit(currentQuiz);
});
function updateUI(title) {
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
  updateques(selectedData);
  updatebuttons(selectedData);
  currentQuiz = selectedData;

}

