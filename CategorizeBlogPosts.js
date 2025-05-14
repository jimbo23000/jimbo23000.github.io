let dict = {
	"OOP": "Object-Oriented Programming",
	"SWE": "Software Engineering"
};

function categorizeBlogPosts(site, page) {
	const blogPosts = page.username === null ? site.posts : site.posts.filter(post => post.member === page.username);
	const categories = new Set();
	const categorizedBlogPosts = [];
	blogPosts.forEach(post => {
		const filename = post.path.split('/').pop().split('.')[0];
		const fields = filename.split('-');
		let i = 3;
		let category = fields[i++];
		while (fields[i] !== "Blog") {
			category += ' ' + fields[i++];
		}
		let title = fields[i++] + " Post #" + fields[i];
		categories.add(category);
		categorizedBlogPosts.push({
			category,
			url: post.url,
			title,
			date: new Date(post.date)
		});
	});
	const blogDiv = document.getElementById("blog");
	categories.forEach(category => {
		if (!category) return;
		const button = document.createElement("button");
		button.className = "collapsible";
		button.textContent = `${dict[category]} Blog Posts`;
		const blogPostsDiv = document.createElement("div");
		blogPostsDiv.className = "blog-posts";
		const blogPostsUl = document.createElement("ul");
		categorizedBlogPosts
			.filter(post => post.category === category)
			.forEach(post => {
				const blogPostsLi = document.createElement("li");
				const formattedDate = post.date.toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric"
				});
				blogPostsLi.innerHTML = `<a href="${post.url}">${post.title}</a> &emsp; Posted on ${formattedDate}`;
				blogPostsUl.appendChild(blogPostsLi);
			});
		blogPostsDiv.appendChild(blogPostsUl);
		blogDiv.appendChild(button);
		blogDiv.appendChild(blogPostsDiv);
	});
	document.querySelectorAll('.collapsible').forEach(button => {
		button.addEventListener('click', function () {
			this.classList.toggle('active');
			const content = this.nextElementSibling;
			content.style.display = content.style.display === 'block' ? 'none' : 'block';
		});
	});
}