
const startButton = document.getElementById('start');

const audio = document.getElementById('audio');


startButton.onclick = _ => {
	startButton.remove()
	document.body.classList.remove('prestart')
	audio.play();
}