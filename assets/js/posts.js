/*
	List of blog posts, rendered into <ul id="posts"></ul> (blog.html) and
	<ul id="posts" data-limit="3"></ul> (index.html, latest posts only).
	To publish a new post, add one line to POSTS (paths are relative to the site root).
*/

(function() {

	var POSTS = [
	];

	var list = document.getElementById('posts');
	if (!list) return;

	// Site root, derived from this script's own URL so that pages in subfolders work.
		var root = document.currentScript.src.replace(/assets\/js\/posts\.js(\?.*)?$/, '');

	// Newest first, whatever the order above.
		var posts = POSTS.slice().sort(function(a, b) { return a[0] < b[0] ? 1 : -1; });
		var limit = parseInt(list.getAttribute('data-limit'), 10);
		if (limit) posts = posts.slice(0, limit);

	// Dates are written YYYY/MM/DD and shown as e.g. "12 Feb 2026".
		var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		function formatDate(date) {
			var parts = date.split('/');
			return parseInt(parts[2], 10) + ' ' + MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
		}

	list.className = 'post-list';

	if (!posts.length) list.innerHTML = '<li class="post-date">No posts yet.</li>';

	posts.forEach(function(post) {
		var item = document.createElement('li'),
			date = document.createElement('span'),
			link = document.createElement('a');

		date.className = 'post-date';
		date.textContent = formatDate(post[0]);
		link.href = root + post[1];
		link.textContent = post[2];
		item.appendChild(date);
		item.appendChild(link);
		list.appendChild(item);
	});

})();
