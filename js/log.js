(function () {
    'use strict';

    var LOG_URL = 'data/log.json';

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function parseEntries(data) {
        if (!data || !Array.isArray(data.entries)) return [];
        return data.entries.slice().sort(function (a, b) {
            return (b.date || '').localeCompare(a.date || '');
        });
    }

    function formatDisplayDate(iso) {
        if (!iso) return '';
        var parts = iso.split('-');
        if (parts.length !== 3) return iso;
        var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function renderTags(tags) {
        if (!tags || !tags.length) return '';
        return tags.map(function (t) {
            return '<span class="log-tag">' + escapeHtml(t) + '</span>';
        }).join('');
    }

    function bodyToParagraphs(body) {
        if (!body) return '';
        return body
            .split(/\n\n+/)
            .map(function (p) {
                return p.trim();
            })
            .filter(Boolean)
            .map(function (p) {
                return '<p>' + escapeHtml(p).replace(/\n/g, '<br>') + '</p>';
            })
            .join('');
    }

    function renderVideo(youtubeId) {
        if (!youtubeId || typeof youtubeId !== 'string') return '';
        var id = youtubeId.trim();
        if (!id) return '';
        var src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id);
        return (
            '<div class="log-video-wrap">' +
            '<iframe title="Embedded video" src="' +
            src +
            '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
            '</div>'
        );
    }

    function entryHtml(entry, options) {
        options = options || {};
        var title = entry.title ? '<h2 class="log-entry-title">' + escapeHtml(entry.title) + '</h2>' : '';
        var tags = renderTags(entry.tags);
        var tagRow = tags ? '<div class="log-tags">' + tags + '</div>' : '';
        var safeDate = (entry.date || '').replace(/[^\d-]/g, '');
        var entryId = safeDate ? ' id="log-entry-' + safeDate + '"' : '';
        return (
            '<article class="log-entry"' + entryId + '>' +
            '<header class="log-entry-header">' +
            '<time class="log-date" datetime="' +
            escapeHtml(entry.date || '') +
            '">' +
            escapeHtml(formatDisplayDate(entry.date)) +
            '</time>' +
            title +
            tagRow +
            '</header>' +
            '<div class="log-body">' +
            bodyToParagraphs(entry.body) +
            '</div>' +
            (options.includeVideo !== false ? renderVideo(entry.videoYoutubeId) : '') +
            '</article>'
        );
    }

    function renderLogPage(container) {
        if (!container) return;
        container.innerHTML = '<p class="log-loading">Loading…</p>';
        fetch(LOG_URL)
            .then(function (r) {
                if (!r.ok) throw new Error('Failed to load log');
                return r.json();
            })
            .then(function (data) {
                var entries = parseEntries(data);
                if (!entries.length) {
                    container.innerHTML = '<p class="log-empty">No entries yet. Add objects to <code>data/log.json</code>.</p>';
                    return;
                }
                container.innerHTML = entries.map(function (e) {
                    return entryHtml(e);
                }).join('');
            })
            .catch(function () {
                container.innerHTML =
                    '<p class="log-empty">Could not load the log. If you opened this file locally, use a local server or view the site on GitHub Pages.</p>';
            });
    }

    function renderTeaser(container, limit) {
        limit = limit || 3;
        if (!container) return;
        container.innerHTML = '<p class="log-loading">Loading…</p>';
        fetch(LOG_URL)
            .then(function (r) {
                if (!r.ok) throw new Error('fail');
                return r.json();
            })
            .then(function (data) {
                var entries = parseEntries(data).slice(0, limit);
                if (!entries.length) {
                    container.innerHTML = '<p class="log-empty">No log entries yet.</p>';
                    return;
                }
                var html = entries
                    .map(function (e) {
                        var excerpt = (e.body || '').split(/\n\n/)[0] || '';
                        if (excerpt.length > 220) excerpt = excerpt.slice(0, 217) + '…';
                        var mini = {
                            date: e.date,
                            title: e.title,
                            tags: e.tags,
                            body: excerpt
                        };
                        return entryHtml(mini, { includeVideo: false });
                    })
                    .join('');
                container.innerHTML = '<div class="log-teaser-list">' + html + '</div>';
            })
            .catch(function () {
                container.innerHTML = '';
            });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var full = document.getElementById('log-entries');
        if (full) renderLogPage(full);
        var teaser = document.getElementById('latest-log-entries');
        if (teaser) renderTeaser(teaser, 3);
    });
})();
