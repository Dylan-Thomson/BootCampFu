//searching for a question by topic
$(".topic-search").on("click", function(e) {
  e.preventDefault();

  const topic = parseInt($(this).data("topic"));
  console.log(topic);

  $.get("/questions/" + topic, (req, res) => {
    console.log("Searched");
    console.log(res);
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
