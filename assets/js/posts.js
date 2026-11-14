/*
	List of notes, rendered into <ul id="posts"></ul> (notes/) and
	<ul id="posts" data-limit="3"></ul> (home page, latest notes only).
	To publish a note, copy notes/_template.html to notes/<slug>/index.html and add one line to POSTS:
	[date as YYYY/MM/DD, slug, title].
*/

(function() {

	var POSTS = [
		['2026/11/14', 'agent-memory-is-files', "An agent's memory is the files it writes"],
	];

	var list = document.getElementById('posts');
	if (!list) return;

	// Site root, derived from this script's own URL so that pages in subfolders work.
		var root = document.currentScript.src.replace(/assets\/js\/posts\.js(\?.*)?$/, '');

	// Newest first, whatever the order above.
		var posts = POSTS.slice().sort(function(a, b) { return a[0] < b[0] ? 1 : -1; });
		var limit = parseInt(list.getAttribute('data-limit'), 10);
		if (limit) posts = posts.slice(0, limit);

	// No notes: the home page drops its "Latest notes" section, the Notes page says so.
		if (!posts.length) {
			if (limit) list.closest('section').remove();
			else list.outerHTML = '<p>No notes published yet.</p>';
			return;
		}

	// Dates are written YYYY/MM/DD and shown as e.g. "12 Feb 2026".
		var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		function formatDate(date) {
			var parts = date.split('/');
			return parseInt(parts[2], 10) + ' ' + MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
		}

	list.className = 'post-list';

	posts.forEach(function(post) {
		var item = document.createElement('li'),
			date = document.createElement('span'),
			link = document.createElement('a');

		date.className = 'post-date';
		date.textContent = formatDate(post[0]);
		link.href = root + 'notes/' + post[1] + '/';
		link.textContent = post[2];
		item.appendChild(date);
		item.appendChild(link);
		list.appendChild(item);
	});

})();
