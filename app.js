/** @format */

import { topics } from './topics.js';

const contentElm = document.getElementById('content');
const modal = document.getElementById('modal');
const countdownElement = document.getElementById('countdown');
const modalContent = document.getElementById('topic');
const topicIdElm = document.getElementById('topicId');
const nextElm = document.getElementById('next');

const nextNumber = new Array(topics.length).fill(0);
const timeoutDuration = 120000;

nextNumber[0] = 1;

// Generating random number to display on screen as next number
const randomNum = () => {
	let randNextNumber;

	while (true) {
		randNextNumber = Math.floor(Math.random() * topics.length);
		if (nextNumber[randNextNumber] === 0) {
			nextNumber[randNextNumber]++;
			// console.log(nextNumber);
			break;
		}
	}

	return randNextNumber;
};

const openModal = (event) => {
	modal.style.display = 'block';
	// console.log(event);
	nextElm.textContent = 'Next number is ' + (randomNum() + 1);

	topicIdElm.textContent = 'Topic-' + (+event.target.name + 1);
	modalContent.textContent = topics[+event.target.name].topic;

	countDown(event);
};

// Timer for 120 seconds
const countDown = (event) => {
	const targetTime = Date.now() + timeoutDuration;
	const intervalID = setInterval(updateCountdown, 1000);

	function updateCountdown() {
		const currentTime = Date.now();
		const timeLeft = targetTime - currentTime;

		countdownElement.textContent = `Time left: ${Math.ceil(
			timeLeft / 1000
		)} seconds`;

		if (timeLeft <= 0) {
			clearInterval(intervalID);
			closeModal();
			// console.log(event);
			event.target.style.display = 'none';
			countdownElement.textContent = 'Time left: 120 seconds';
		}
	}
};

const closeModal = () => {
	modal.style.display = 'none';
};

// Creating tiles on the screen
const renderTiles = () => {
	for (let i = 0; i < topics.length; i++) {
		const linkElm = document.createElement('a');
		linkElm.setAttribute('id', 'link');
		linkElm.setAttribute('name', i);
		linkElm.textContent = i < 9 ? `0${i + 1}` : i + 1;
		contentElm.appendChild(linkElm);
	}
};

contentElm.addEventListener('click', (event) => {
	if (event.target.tagName === 'A') openModal(event);
});

renderTiles();
