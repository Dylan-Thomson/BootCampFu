if($(".question-body-text").length > 0) {
  console.log($(".question-body-text").text());
  const splitText= $(".question-body-text").text().split("`");
  console.log(splitText);
  for(let i = 0; i < splitText.length; i++) {
    if(i % 2 !== 0) {
      splitText[i] = splitText[i].replace(/</g, "&lt;");
      splitText[i] = splitText[i].replace(/>/g, "&gt;");
      console.log(splitText[i]);
      splitText[i] = "<pre class=\"prettyprint\">\n<code>\n" + splitText[i] + "</code></pre>"
    }
  }
  console.log(splitText.join(""));
  $(".question-body-text").html(splitText.join(""));
}

$("#signup-login-btn").on("click", function() {
  window.location.href = "/signup";
});

$("#login-btn").on("click", function() {
  window.location.href = "/dashboard";
});

$("#logout-btn").on("click", function() {
  window.location.href = "/logout";
});

$("#search-btn").on("click", function() {
  let userQuery = $("#search").val();
  let formattedQuery = userQuery.replace(" ", "+");
  window.location.href = `https://stackoverflow.com/search?q=${formattedQuery}`;
});

$(".upvote").on("click", function() {
  let questionid = $(this).data("questionid");
  $.post(`/api/questions/${questionid}/upvotes`, function(data) {
    window.location.reload();
  });
});

$(".downvote").on("click", function() {
  let questionid = $(this).data("questionid");
  $.post(`/api/questions/${questionid}/downvotes`, function(data) {
    window.location.reload();
  });
});

// /api/questions/:questionId/answers/:answerId/upvotes
$(".a-upvote").on("click", function() {
  let questionid = $(this).data("questionid");
  let answerid = $(this).data("answerid");
  $.post(
    `/api/questions/${questionid}/answers/${answerid}/upvotes`,
    function() {
      window.location.reload();
    }
  );
});

$(".a-downvote").on("click", function() {
  let questionid = $(this).data("questionid");
  let answerid = $(this).data("answerid");
  $.post(
    `/api/questions/${questionid}/answers/${answerid}/downvotes`,
    function() {
      window.location.reload();
    }
  );
});
