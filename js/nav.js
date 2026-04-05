(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.getElementById('site-nav');
        if (!toggle || !menu) return;

        function setOpen(open) {
            menu.classList.toggle('nav-menu-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            setOpen(!menu.classList.contains('nav-menu-open'));
        });

        document.addEventListener('click', function (e) {
            if (!menu.classList.contains('nav-menu-open')) return;
            var nav = document.querySelector('.navbar');
            if (nav && !nav.contains(e.target)) {
                setOpen(false);
            }
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });

        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width: 769px)').matches) {
                setOpen(false);
            }
        });
    });
})();
