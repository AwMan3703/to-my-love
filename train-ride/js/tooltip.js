
const tooltipElement = document.getElementById('tooltip');

document.querySelectorAll("#image img.selectable").forEach((e) => {
    e.addEventListener('mouseenter', (_) => {
        tooltipElement.innerText = e.dataset.tooltipText
    })
})


followPointer(document.getElementById("tooltip"));