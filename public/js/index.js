//searching for a question by topic

$(".topic-search").on("click", e => {
  e.preventDefault();

  const topic = $(this).val();

  $.get("/api/questions/" + topic, (req, res) => {
    //res.sendFile()
    //will send the question list file dynamically generated for that topic (res.render on the backend)
  });
});

//search for a question by week

$(".week-search").on("click", e => {
  e.preventDefault();

  const week = $(this).val();

  $.get("/api/questions/" + week, (req, res) => {
    //res.sendFile();
    //will send the question list file dynamically generated for that week (res.render on the backend)
  });
});
//submitting a new question
$("#submit-custom-question-btn").on("click", e => {
  e.preventDefault();

  const questionTitle = $("#question-title").val();
  const questionTopic = $("#question-topic").val();
  const questionWeek = $("#question-week").val();
  const questionBody = $("#question-body").val();

  const newQuestion = {
    title: questionTitle,
    topic: questionTopic,
    week: questionWeek,
    text: questionBody
  };

  $.post("/api/questions", newQuestion).then(function(data) {
    console.log("it was posted");
    //generate post on new questionpage
  });
});
