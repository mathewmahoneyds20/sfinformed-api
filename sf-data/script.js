// GLOBALS
const BASE_URL =
	'https://data.sfgov.org/resource/wg3w-h783.json?incident_category=';

// CACHED DOM ELEMENTS
const form = document.querySelector('.form');
const complaintsList = document.querySelector('.complaints-list');
// Verify DOM elements are correctly selected
// console.log(complaintsList);

// FUNCTIONS
const updateResults = data => {
	// empty the complaints list of any preexisting data first
	complaintsList.innerHTML = '';

	for (let i = 0; i < data.length; i++) {
		// console.log(data[i].unique_key);
		const complaintHTML = `<li>${i + 1}. ${data[i]
			.incident_subcategory} - ${data[i].incident_date}
        <button class="complaints-list-item-button">WHAT DID THE POLICE DO?</button>
        <p class="hide-response">${data[i].resolution}</p>
        </li>`;
		complaintsList.innerHTML += complaintHTML;
	}
};

const handleSubmit = async event => {
	event.preventDefault();
	// console.log('hello world');
	// first make sure the event target is a button
	if (event.target.tagName === 'BUTTON') {
		// get the incident category that was clicked on
		const incident_category = event.target.innerText;
		// get the number of results
		const userInput = document.querySelector('#number-of-complaints').value;
		const REQUEST_URL =
			BASE_URL + incident_category + `&$limit=${userInput || 10}`;
		// make the api call with the request url
		try {
			const response = await fetch(REQUEST_URL);
			const data = await response.json();
			updateResults(data);
		} catch (err) {
			console.error(err);
		}
	}
};

const handleToggle = event => {
	event.preventDefault();
	if (event.target.tagName === 'BUTTON') {
		// use nextElementSibling to grab the sibling HTML element
		// use class list toggle to hide/show the element
		event.target.nextElementSibling.classList.toggle('hide-response');
	}
};

// EVENT LISTENERS
form.addEventListener('click', handleSubmit);
complaintsList.addEventListener('click', handleToggle);
