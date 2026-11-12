/*
	Shared page elements, inserted on every page: skip link, header with the site name and navigation,
	footer, "All notes" link on notes, time-limited content, and math rendering (KaTeX) on pages that
	contain formulas.
	Styled by assets/css/custom.css.
	To add a menu entry, edit MENU below (paths are relative to the site root).
*/

(function() {

	var MENU = [
		['', 'Home'],
		['research/', 'Research'],
		['projects/', 'Projects'],
		['interests/', 'Interests'],
		['notes/', 'Notes'],
		['cv/', 'CV']
	];

	// Site root, derived from this script's own URL so that pages in subfolders work.
		var root = document.currentScript.src.replace(/assets\/js\/site\.js(\?.*)?$/, '');

	// Current section: the page itself, or Notes for a note.
		var page = location.href.split(/[?#]/)[0].replace(/index\.html$/, '');
		var isNote = page.indexOf(root + 'notes/') == 0 && page != root + 'notes/';

	var items = MENU.map(function(entry) {
		var href = root + entry[0],
			current = entry[0] ? page.indexOf(href) == 0 : page == root;
		return '<li><a href="' + href + '"' + (current ? ' aria-current="page"' : '') + '>' + entry[1] + '</a></li>';
	}).join('');

	var html =
		'<a class="skip-link" href="#main">Skip to content</a>' +
		'<header class="site-header"><div class="site-header-inner">' +
			'<a class="site-name" href="' + root + '">Hao Xiao</a>' +
			'<nav class="site-nav" aria-label="Primary"><ul>' + items + '</ul></nav>' +
		'</div></header>';

	var wrapper = document.getElementById('wrapper');
	wrapper.insertAdjacentHTML('afterbegin', html);

	// Notes: a link back to the list, before the comments if there are any.
		if (isNote) {
			var inner = document.querySelector('#main .inner'),
				back = document.createElement('p');

			document.body.classList.add('is-post');
			back.className = 'post-back';
			back.innerHTML = '<a href="' + root + 'notes/">All notes</a>';
			inner.insertBefore(back, document.getElementById('comments'));
		}

	// Time-limited content: <p data-expires="YYYY-MM-DD"> is removed from that day on (Paris time).
		var today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' });
		Array.prototype.forEach.call(document.querySelectorAll('[data-expires]'), function(element) {
			if (today >= element.getAttribute('data-expires')) element.remove();
		});

	// Footer.
		wrapper.insertAdjacentHTML('beforeend',
			'<footer class="site-footer"><div class="site-footer-inner">' +
				'&copy; ' + new Date().getFullYear() + ' Hao Xiao' +
				' &middot; <a href="https://github.com/xiao98">GitHub</a>' +
				' &middot; <a href="' + root + 'cv/">CV</a>' +
				' &middot; Design based on <a href="https://html5up.net">HTML5 UP</a>' +
			'</div></footer>');

	// Math: KaTeX is loaded only on pages containing \( ... \), \[ ... \] or $$ ... $$.
		var main = document.getElementById('main');
		if (/\\\(|\\\[|\$\$/.test(main.textContent)) {
			var KATEX = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';

			var css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = KATEX + 'katex.min.css';
			css.integrity = 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+';
			css.crossOrigin = 'anonymous';
			document.head.appendChild(css);

			var load = function(file, integrity, then) {
				var script = document.createElement('script');
				script.src = KATEX + file;
				script.integrity = integrity;
				script.crossOrigin = 'anonymous';
				script.onload = then;
				document.head.appendChild(script);
			};

			load('katex.min.js', 'sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg', function() {
				load('contrib/auto-render.min.js', 'sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk', function() {
					window.renderMathInElement(main, {
						delimiters: [
							{ left: '$$', right: '$$', display: true },
							{ left: '\\[', right: '\\]', display: true },
							{ left: '\\(', right: '\\)', display: false }
						],
						throwOnError: false
					});
				});
			});
		}

})();
