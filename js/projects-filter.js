(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var bar = document.querySelector('.project-filter-bar');
        if (!bar) return;

        var pills = bar.querySelectorAll('.filter-pill');
        var cards = document.querySelectorAll('.project-card-interactive');

        pills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                var filter = pill.getAttribute('data-filter') || 'all';
                pills.forEach(function (p) {
                    p.classList.remove('active');
                    p.setAttribute('aria-pressed', 'false');
                });
                pill.classList.add('active');
                pill.setAttribute('aria-pressed', 'true');

                if (typeof window.resetAllProjectsView === 'function') {
                    window.resetAllProjectsView();
                }

                cards.forEach(function (card) {
                    var tags = (card.getAttribute('data-project-tags') || '')
                        .split(/\s+/)
                        .filter(Boolean);
                    var show = filter === 'all' || tags.indexOf(filter) !== -1;
                    card.style.display = show ? '' : 'none';
                    var pid = card.getAttribute('data-project');
                    if (pid) {
                        var exp = document.getElementById(pid + '-expanded');
                        if (exp) exp.style.display = 'none';
                    }
                });
            });
        });
    });
})();
