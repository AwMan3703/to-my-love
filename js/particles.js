function findThirdPoint(x1, y1, x2, y2, distance) {
    // Calculate the direction vector
    let dx = x2 - x1;
    let dy = y2 - y1;

    // Calculate the length of the direction vector
    let length = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction vector to get the unit vector
    let unitDx = dx / length;
    let unitDy = dy / length;

    // Scale the unit vector by the given distance
    let newDx = unitDx * distance;
    let newDy = unitDy * distance;

    // Calculate the coordinates of the third point
    let x3 = x2 + newDx;
    let y3 = y2 + newDy;

    return { x: x3, y: y3 };
}

function linearParticle(parent, startX, startY, startRotation, startClass, endX, endY, endRotation, endClass, className, imageUrl) {
    // Generate an image element
    let particle = document.createElement("img")
    // Set the particle's starting state
    particle.src = imageUrl
    particle.classList.add(className)
    particle.classList.add(startClass)
    particle.style.position = "absolute"
    particle.style.left = `${Math.round(startX)}px`
    particle.style.top = `${Math.round(startY)}px`
    particle.style.rotate = `${startRotation}deg`
    // Append it to the parent
    parent.appendChild(particle)

    // Wait for its image to load
    particle.addEventListener("load", () => {
        // Move the particle to its end position
        particle.style.left = `${Math.round(endX)}px`
        particle.style.top = `${Math.round(endY)}px`
        particle.style.rotate = `${endRotation}deg`
        // Wait for it to finish transitioning
        particle.addEventListener("transitionend", () => {
            // Switch class names
            particle.className = particle.className.replace(startClass, endClass)
            // Wait for the transition to finish, then remove the particle
            particle.addEventListener("transitionend", particle.remove)
        })
    })
}

function particleExplosion(parent, count, startRect, rangeStart, rangeEnd, startClass, endClass, className, imageUrl) {
    for (let i = 0; i < count; i++) {
        const centerX = (startRect.x + startRect.width) - (startRect.width / 2)
        const centerY = (startRect.y + startRect.height) - (startRect.height / 2)

        let startX = (Math.random() * startRect.width)
        startX += startRect.x
        let startY = (Math.random() * startRect.height)
        startY += startRect.y

        const distance = rangeStart + (Math.random() * rangeEnd)

        const end = findThirdPoint(centerX, centerY, startX, startY, distance)
        let endX = end.x, endY = end.y

        let startRot = Math.random() * 360
        let endRot = Math.random() * 360

        linearParticle(parent, startX, startY, startRot, startClass, endX, endY, endRot, endClass, className, imageUrl)
    }
}

/*particleExplosion(
    document.getElementById("particle-level"),
    5,
    new DOMRect(50, 50, 100, 100),
    new DOMRect(0, 0, visualViewport.width/2, visualViewport.height/2),
    "a", "b", "heart-particle",
    "assets/heart.png"
)*/