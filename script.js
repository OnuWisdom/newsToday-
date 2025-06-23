const apiKey = '97bc26f9cb214d6dbfa122ca1f316946';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const apiUrl2 = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`;

async function getNews() {
	try {
		const response = await fetch(
			apiUrl
			//.replace('keyword', 'technology') // Replace 'technology' with your desired keyword
		);
		if (!response.ok) {
			throw new Error('Failed to fetch news');
		}
		const data = await response.json();

		return data.articles;

		// data.articles.forEach((article, index) => {
		// 	console.log(`Article ${index + 1}:`);
		// 	console.log(`Title: ${article.title}`);
		// 	console.log(`Description: ${article.description}`);
		// 	console.log(`URL: ${article.url}`);
		// 	console.log(`-------------------`);
		// });
	} catch (error) {
		console.error('Error fetching news:', error);
		return [];
	}
}

async function displayNewsSection() {
	const articles = await getNews();

	const breakingNewsContainer = document.querySelector('.breaking-news');

	breakingNewsContainer.innerHTML = '';

	articles.forEach((article) => {
		const newsCard = document.createElement('div');
		newsCard.classList.add('news-card');
		newsCard.innerHTML = `
							<div class="image-container">
								<img src="${article.urlToImage || 'car.jpg'} " alt="${
			article.title
		} " class="image1" />
							</div>

							<div class="news-body">
								<a href="${article.url}"
									><h3>${article.title} </h3></a
								>
								<p>
									${article.description || 'No Description Available'}
								</p>
								<p class="date">${new Date(article.publishedAt).toLocaleDateString()} </p>
								<p class="author">${article.author || 'Unknown Author'} </p>

								<a href="${article.url} " class="read-more" target="blank" >Read More</a>
							</div>
						`;

		breakingNewsContainer.appendChild(newsCard);
	});
}

async function displayNewsInMarquee() {
	const articles = await getNews();
	const newsMarquee = document.getElementById('news-marquee');
	if (!newsMarquee) {
		console.error('Marquee element not found!');
		return;
	}

	// Construct marquee content
	newsMarquee.innerHTML = articles
		.map(
			(article) =>
				`<a href="${
					article.url
				}" target="_blank" style="margin-right: 30px; text-decoration: none; color: white;">
                    ${article.title || 'No Title'}
                </a>`
		)
		.join(' | ');
}

async function fetchEverythingNews() {
	try {
		const response = await fetch(
			apiUrl2
			//.replace('keyword', 'technology') // Replace 'technology' with your desired keyword
		);
		if (!response.ok) {
			throw new Error('Failed to fetch news');
		}
		const data = await response.json();

		return data.articles;
	} catch (error) {
		console.error('Error fetching news:', error);
		return [];
	}
}

async function displayTopStories() {
	const articles = await fetchEverythingNews();

	const topStoriesContainer = document.getElementById('top-stories');

	articles.forEach((article) => {
		const storiesCard = document.createElement('div');
		storiesCard.classList.add('news-card');
		storiesCard.innerHTML = `<div class="image-container">
								<img src="${article.urlToImage || 'car.jpg'} " alt="${
			article.title
		} " class="image1" />
							</div>

							<div class="news-body">
								<a href="${article.url}"
									><h3>${article.title} </h3></a
								>
								<p>
									${article.description || 'No Description Available'}
								</p>
								<p class="date">${new Date(article.publishedAt).toLocaleDateString()} </p>
								<p class="author">${article.author || 'Unknown Author'} </p>

								<a href="${article.url} " class="read-more" target="blank" >Read More</a>
							</div>
						`;

		topStoriesContainer.appendChild(storiesCard);
	});
}

displayNewsInMarquee();
displayNewsSection();
displayTopStories();
