const apiKey = '97bc26f9cb214d6dbfa122ca1f316946';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const apiUrl2 = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`;

fetch('./Js/getNews.js')
	.then((res) => res.json())
	.then((data) => {
		console.log(data); // Use the data to update the DOM
	})
	.catch((err) => console.error('Error fetching data:', err));

// Function to display News in the Breaking news section
async function displayNewsSection() {
	const articles = await getNews(apiUrl);

	const breakingNewsContainer = document.querySelector('.breaking-news');

	breakingNewsContainer.innerHTML = '';

	articles.forEach((article) => {
		const newsCard = document.createElement('div');
		newsCard.classList.add('news-card');
		newsCard.innerHTML = `
							<div class="image-container">
								<img src="${article.urlToImage || './assets/NoImage.png'} " alt="${
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

// Function to display news in the marquee animation
async function displayNewsInMarquee() {
	const articles = await getNews(apiUrl);
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

// Function to display new s in the top stories section
async function displayTopStories() {
	const articles = await getNews(apiUrl2);

	const topStoriesContainer = document.getElementById('top-stories');

	articles.slice(0, 8).forEach((article) => {
		const storiesCard = document.createElement('div');
		storiesCard.classList.add('news-card');
		storiesCard.innerHTML = `<div class="image-container">
								<img src="${article.urlToImage || './assets/NoImage.png'} " alt="${
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

// Function to update the day and time
function updateDateTime() {
	const now = new Date();

	// Format the date and time
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	const formattedDateTime = now.toLocaleString('en-US', options);

	// Display in the DOM
	document.getElementById('current-datetime').textContent = formattedDateTime;
}

// Update every second to keep the time current
setInterval(updateDateTime, 1000);

// Call the function initially to display immediately
updateDateTime();
displayNewsInMarquee();
displayNewsSection();
displayTopStories();
