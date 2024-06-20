
function make_draggable(element, onDragStart, onDragging, onDragEnd) {
    // Listen for whenever the element is clicked
    element.addEventListener('mousedown', dragMouseDown)

    // Save the mouse offset on the element, so it will not snap to top left corner when starting to drag
    let offsetX = 0, offsetY = 0

    function dragMouseDown(e) {
        // Set the dragging class
        e.target.classList.add('dragging')
        // Set the offsets
        offsetX = e.offsetX
        offsetY = e.offsetY
        // Add the listeners
        window.addEventListener('mousemove', elementDrag)
        window.addEventListener('mouseup', dragMouseUp)
    }
    function dragMouseUp(e) {
        // Remove the dragging class
        e.target.classList.remove('dragging')
        // Remove the listeners, which stops teh element from following the mouse
        window.removeEventListener('mousemove', elementDrag)
        window.removeEventListener('mouseup', dragMouseUp)
    }
    function elementDrag(e) {
        // Move the element
        element.style.left = (e.clientX - offsetX) + "px"
        element.style.top = (e.clientY - offsetY) + "px"
    }
}