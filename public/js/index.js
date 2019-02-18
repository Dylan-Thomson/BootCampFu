//submitting a new question
//trying to use vanilla JS as much as possible

document.querySelector("#submit-custom-question-btn").addEventListener("click", (e) => {
  e.preventDefault();

  let questionTitle = document.querySelector("#question-title").value;
  let questionTopic = document.querySelector("#question-topic").value;
  let questionWeek = document.querySelector("#question-week").value;
  let questionBody = document.querySelector("#question-body").value;
  
  let newQuestion = {
    "title": questionTitle,
    "topic": questionTopic,
    "week": questionWeek,
    "text": questionBody
  }
  
  $.post("/api/questions", newQuestion).then(function(data) {
    console.log("it was posted");
    //generate post on new questionpage
  });
});