
function followPointer(e) {
    document.addEventListener("mousemove", (ev) => {
        e.style.left = `${ev.clientX}px`;
        e.style.top = `${ev.clientY}px`;
    })
}
