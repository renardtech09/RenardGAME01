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


document.addEventListener("DOMContentLoaded", function() {
    var panierUl = document.getElementById('panier');
    
    // Générer un identifiant unique pour l'utilisateur
    var userId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    document.querySelectorAll('.price').forEach(function(element) {
        element.addEventListener('click', function() {
            var elementInfo = {
                id: userId + '_' + element.dataset.id, // Utiliser un identifiant unique pour chaque sélection
                img: element.dataset.img,
                price: element.dataset.price,
            };
            localStorage.setItem('element_' + elementInfo.id, JSON.stringify(elementInfo));
        });
    });

    // Afficher les éléments du panier de l'utilisateur actuel
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf('element_' + userId) === 0) { // Vérifier les éléments spécifiques à l'utilisateur actuel
            var elementInfo = JSON.parse(localStorage.getItem(key));
            var elementLi = document.createElement('li');
            elementLi.innerHTML = `
                <img src="${elementInfo.img}" alt="">
                <div>
                    <div class="price"><i class="material-symbols-outlined">currency_franc</i><span>${elementInfo.price}</span>
                </div>
            `;
            panierUl.appendChild(elementLi);
        }
    }

    document.getElementById('clear').addEventListener('click', function() {
        // Supprimer les éléments du panier de l'utilisateur actuel
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf('element_' + userId) === 0) { // Vérifier les éléments spécifiques à l'utilisateur actuel
                localStorage.removeItem(key);
            }
        }
        location.reload();
    });

    function genererLienPanierUtilisateur(userId) {
        // Générer le lien vers le panier avec les sélections de l'utilisateur
        var lienVersPanier = "https://renardtech09.github.io/RenardGAME01/pages/MonPanier.html";

        // Récupérer les sélections de l'utilisateur depuis le localStorage
        var selectionsUtilisateur = [];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf('element_' + userId) === 0) { // Vérifier les éléments spécifiques à l'utilisateur actuel
                selectionsUtilisateur.push(JSON.parse(localStorage.getItem(key)).id);
            }
        }

        // Ajouter les sélections de l'utilisateur comme paramètres d'URL
        if (selectionsUtilisateur.length > 0) {
            lienVersPanier += "?selection=" + selectionsUtilisateur.join(",");
        }

        return lienVersPanier;
    }

    // Associer la fonction de copie au bouton "Partager le panier via WhatsApp"
    document.getElementById('send').addEventListener('click', function() {
        // Générer le lien vers le panier de l'utilisateur actuel
        var lienPanierUtilisateur = genererLienPanierUtilisateur(userId);

        // Créer un élément de texte temporaire pour copier le lien dans le presse-papiers
        var tempTextArea = document.createElement('textarea');
        tempTextArea.value = lienPanierUtilisateur;
        document.body.appendChild(tempTextArea);

        // Copier le contenu du textarea dans le presse-papiers
        tempTextArea.select();
        document.execCommand('copy');

        // Retirer l'élément de texte temporaire
        document.body.removeChild(tempTextArea);

        // Afficher un message de confirmation
        alert("Lien vers votre panier copié avec succès dans le presse-papiers. Veuillez le partager avec l'administrateur via WhatsApp.");
    });

    // Afficher le lien vers le panier de l'utilisateur actuel dans la console
    var lienPanierUtilisateur = genererLienPanierUtilisateur(userId);
    console.log(lienPanierUtilisateur);
});
