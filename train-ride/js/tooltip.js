
const tooltipElement = document.getElementById('tooltip');

document.querySelectorAll(".scene img.selectable").forEach((e) => {
    e.addEventListener('mouseenter', (_) => {
        tooltipElement.innerHTML = e.dataset.tooltipText
    })
})


