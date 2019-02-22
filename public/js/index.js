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

//just for questions right now
$(".upvote").on("click", function() {
  let questionid = $(this).data("questionid");
  $.post(`/api/questions/${questionid}/upvotes`, function(data) {
    // console.log(data);
    window.location.reload();
  });
});

$(".downvote").on("click", function() {
  let questionid = $(this).data("questionid");
  $.post(`/api/questions/${questionid}/downvotes`, function(data) {
    window.location.reload();
  });
});
