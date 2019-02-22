$("#signup-login-btn").on("click", function() {
  window.location.href = "/signup";
});

$("#login-btn").on("click", function() {
  window.location.href = "/dashboard";
});

$("#logout-btn").on("click", function() {
  window.location.href = "/";
});

$("#search-btn").on("click", function() {
  let userQuery = $("#search").val();
  let formattedQuery = userQuery.replace(" ", "+");
  window.location.href = `https://stackoverflow.com/search?q=${formattedQuery}`;
});
