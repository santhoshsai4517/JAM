/** @format */

import { topics } from './topics.js';

const contentElm = document.getElementById('content');
const modal = document.getElementById('modal');
const countdownElement = document.getElementById('countdown');
const modalContent = document.getElementById('topic');
const topicIdElm = document.getElementById('topicId');
const nextElm = document.getElementById('next');

const nextNumber = [];
const timeoutDuration = 120000;

nextNumber.push(1);

// Generating random number to display on screen as next number
export const randomNum = () => {
	let randNextNumber;

	while (true) {
		randNextNumber = Math.floor(Math.random() * topics.length);
		// console.log(randNextNumber);
		if (!nextNumber.includes(randNextNumber + 1)) {
			nextNumber.push(randNextNumber + 1);
			// console.log(nextNumber);
			break;
		}
	}

	return randNextNumber;
};

export const openModal = (event) => {
	modal.style.display = 'block';
	// console.log(event);
	nextElm.textContent = 'Next number is ' + (randomNum() + 1);

	topicIdElm.textContent = 'Topic-' + (+event.target.name + 1);
	modalContent.textContent = topics[+event.target.name].topic;
	countdownElement.textContent = 'Time left: 120 seconds';

	countDown(event);
};

// Timer for 120 seconds
export const countDown = (event) => {
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
		}
	}
};

export const closeModal = () => {
	modal.style.display = 'none';
};

// Creating tiles on the screen
export const renderTiles = () => {
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
