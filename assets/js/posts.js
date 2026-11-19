/*
	List of notes, rendered into <ul id="posts"></ul> (notes/) and
	<ul id="posts" data-limit="3"></ul> (home page, latest notes only),
	plus structured note series rendered into <div id="series"></div> (notes/).
	To publish a standalone note, copy notes/_template.html to notes/<slug>/index.html
	and add one line to POSTS: [date as YYYY/MM/DD, slug, title].
*/

(function() {

	var POSTS = [
		['2026/11/14', 'agent-memory-is-files', "An agent's memory is the files it writes"],
		['2026/11/17', 'concept-guided-exploration-one-gpu', 'Reproducing concept-guided exploration on one GPU'],
		['2026/11/19', 'questions/structlora', 'Ten questions on StructLoRA (series)'],
	];

	var SERIES = [
		{
			slug: 'questions/structlora',
			title: 'Questions on StructLoRA (ACL 2026)',
			summary: 'Ten self-contained technical questions on Not All Directions Matter (Xiao et al., ACL 2026): low-rank outer products, static gating vs. Information Bottleneck, spectral graph smoothing, and empirical checks.',
			posts: [
				['2026/11/19', 'questions/structlora-01-rank-one-directions', 'Why LoRA\u2019s AB is an equal-weight sum of r rank-one directions'],
				['2026/11/19', 'questions/structlora-02-norm-vs-gating', 'Why keeping the largest-norm LoRA directions loses to learned gating'],
				['2026/11/19', 'questions/structlora-03-l2-gate-sparsity', 'Why an L2 penalty on gate weights drives redundant directions to zero'],
				['2026/11/19', 'questions/structlora-04-static-gates-and-ib', 'Why input-dependent gates break zero-latency merging, and what that means for Information Bottleneck'],
				['2026/11/19', 'questions/structlora-05-layer-graph-dimensions', 'How layer updates move through a GNN: tensor shapes, Transformer depth, and GNN depth'],
				['2026/11/19', 'questions/structlora-06-laplacian-drift-energy', 'Why adjacent-layer drift energy equals the Laplacian quadratic form U\u1D40(L \u2297 I)U'],
				['2026/11/19', 'questions/structlora-07-gnn-as-laplacian-smoothing', 'Why one linearised GNN step is one gradient step of Laplacian smoothing'],
				['2026/11/19', 'questions/structlora-08-oversmoothing-depth', 'Why a 2- or 3-layer GNN hurts performance: quantifying oversmoothing with (I \u2212 \u03B7L)\u1D40'],
				['2026/11/19', 'questions/structlora-09-filter-gnn-synergy', 'Why the GNN barely helps alone (+0.3) but combines super-additively with filtering (+2.2)'],
				['2026/11/19', 'questions/structlora-10-complexity-and-reporting-audit', 'Auditing StructLoRA: the 16.8M-dimensional GNN cost and cross-table inconsistencies'],
			]
		}
	];

	// Site root, derived from this script's own URL so that pages in subfolders work.
	var root = document.currentScript.src.replace(/assets\/js\/posts\.js(\?.*)?$/, '');

	// Dates are written YYYY/MM/DD and shown as e.g. "12 Feb 2026".
	var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	function formatDate(date) {
		var parts = date.split('/');
		return parseInt(parts[2], 10) + ' ' + MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
	}

	var list = document.getElementById('posts');
	if (list) {
		// Newest first, whatever the order above.
		var posts = POSTS.slice().sort(function(a, b) { return a[0] < b[0] ? 1 : -1; });
		var limit = parseInt(list.getAttribute('data-limit'), 10);
		if (limit) posts = posts.slice(0, limit);

		// No notes: the home page drops its "Latest notes" section, the Notes page says so.
		if (!posts.length) {
			if (limit) list.closest('section').remove();
			else list.outerHTML = '<p>No posts published yet.</p>';
		} else {
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
		}
	}

	// Series groups on notes/index.html.
	var seriesHost = document.getElementById('series');
	if (seriesHost && SERIES.length) {
		SERIES.forEach(function(series, idx) {
			var details = document.createElement('details'),
				summary = document.createElement('summary'),
				heading = document.createElement('h3'),
				count = document.createElement('span'),
				desc = document.createElement('p'),
				overview = document.createElement('a'),
				ul = document.createElement('ul');

			details.className = 'pub-group';
			if (idx === 0) details.open = true;

			heading.textContent = series.title;
			count.className = 'pub-group-count';
			count.textContent = series.posts.length + (series.posts.length === 1 ? ' note' : ' notes');
			summary.appendChild(heading);
			summary.appendChild(count);
			details.appendChild(summary);

			desc.className = 'series-summary';
			desc.appendChild(document.createTextNode(series.summary + ' '));
			overview.href = root + 'notes/' + series.slug + '/';
			overview.textContent = 'Series overview';
			desc.appendChild(overview);
			desc.appendChild(document.createTextNode('.'));
			details.appendChild(desc);

			ul.className = 'post-list';
			series.posts.forEach(function(post, i) {
				var li = document.createElement('li'),
					num = document.createElement('span'),
					a = document.createElement('a');

				num.className = 'series-num';
				num.textContent = (i < 9 ? '0' : '') + (i + 1);
				a.href = root + 'notes/' + post[1] + '/';
				a.textContent = post[2];
				li.appendChild(num);
				li.appendChild(a);
				ul.appendChild(li);
			});

			details.appendChild(ul);
			seriesHost.appendChild(details);
		});
	}

})();
