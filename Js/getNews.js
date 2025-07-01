require('dotenv').config();

const fetch = require('node-fetch');

exports.handler = async function (event, context) {
	const API_KEY = process.env.API_KEY; // Access the variable from .env

	// Default to top headlines, but allow for a 'type' query param
	let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
	if (event && event.queryStringParameters && event.queryStringParameters.type === 'top') {
		url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`;
	}

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Error fetching news: ${res.statusText}`);
		}
		const data = await res.json();

		// Return only the articles array for frontend simplicity
		return {
			statusCode: 200,
			body: JSON.stringify({ articles: data.articles }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
