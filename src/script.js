function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('menu-ativo');
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("/service-worker.js").then(function(registration) {
        console.log("Service Worker registrado com sucesso: ", registration.scope);
      }, function(err) {
        console.log("Falha ao registrar o Service Worker: ", err);
      });
    });
  }
  