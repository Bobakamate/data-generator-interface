
const expand_btn = document.querySelector(".expand-btn");
const sidebarLinks = document.querySelectorAll(".sidebar-links a");

sidebarLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien

    const href = this.getAttribute("href"); // Obtient l'URL du lien cliqué

    // Met à jour l'attribut 'data' de l'objet pour charger le nouveau contenu HTML
    document.getElementById("contentFrame").setAttribute("data", href);

    // Ajoute la classe active au parent du lien cliqué
    sidebarLinks.forEach(l => {
      l.parentElement.classList.remove("active");
    });
    this.parentElement.classList.add("active");
  });
});




let activeIndex;

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

const current = window.location.href;

const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
  elem.addEventListener('click', function() {
    const hrefLinkClick = elem.href;

    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick){
        link.classList.add("active");
      } else {
        link.classList.remove('active');
      }
    });
  })
});


