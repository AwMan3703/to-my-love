
function followPointer(e) {
    document.addEventListener("mousemove", (ev) => {
        e.style.left = `${ev.clientX ? ev.clientX : ev.target.clientX}px`;
        e.style.top = `${ev.clientY ? ev.clientY : ev.target.clientY}px`;
    })
}
