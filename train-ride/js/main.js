
function toggle_subway_surfers_video() {
	const el = document.getElementById('subway-surfers-video');
	const button = document.getElementById('subway-surfers-video-toggle')

	const isOpen = el.classList.toggle('open');
	button.classList.toggle('open');
	if (isOpen) {
		el.play()
	} else {
		el.pause()
	}
}