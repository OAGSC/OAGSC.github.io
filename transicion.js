// Limpiar el overlay cuando el navegador restaura la página desde el caché (botón Atrás)
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        var overlay = document.getElementById('transition-overlay');
        if (overlay) overlay.classList.remove('activo');
    }
});

document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (!link) return;

        var href = link.getAttribute('href') || '';

        // Ignorar: vacíos, hashes, mailto, tel
        if (!href || href === '#') return;
        if (href.charAt(0) === '#') return;
        if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
        if (link.target) return;

        // Ignorar: navegación de hash en la misma página
        // (link apunta a la misma ruta pero con un hash)
        if (link.pathname === window.location.pathname && link.hash) return;

        // Solo actuar en links del mismo origen
        try {
            if (link.hostname && link.hostname !== window.location.hostname) return;
        } catch (err) {
            return;
        }

        var destino = link.href;
        if (!destino) return;

        e.preventDefault();

        var overlay = document.getElementById('transition-overlay');

        // Si el overlay existe, animar; si no, navegar de inmediato
        if (overlay) {
            overlay.classList.add('activo');
            setTimeout(function() {
                window.location.href = destino;
            }, 520);
        } else {
            window.location.href = destino;
        }
    });

});
