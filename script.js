document.addEventListener("DOMContentLoaded", function() {
    var menuIcon = document.getElementById("menu-icon");
    var menu = document.getElementById("menu");
  
    menuIcon.addEventListener("click", function() {
      menu.classList.toggle("active");
    });
  
    document.addEventListener("click", function(event) {
      var isClickInsideMenu = menu.contains(event.target);
      var isClickOnMenuIcon = menuIcon.contains(event.target);
      if (!isClickInsideMenu && !isClickOnMenuIcon) {
        menu.classList.remove("active");
      }
    });
});
