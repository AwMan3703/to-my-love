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

function particleExplosion(parent, count, startRect, endRect, startClass, endClass, className, imageUrl) {
    for (let i = 0; i < count; i++) {
        // TODO: fix positions
        let startX = (Math.random() * startRect.width)
        startX += startRect.x
        startX += startRect.width / 2
        let startY = (Math.random() * startRect.height)
        startY += startRect.y
        startY += startRect.height / 2

        let startRot = Math.random() * 360

        let endX = (startX < startRect.width / 2)
            ? (Math.random() * (endRect.width / 2))
            : (Math.random() * (endRect.width / 2)) + (endRect.width / 2)
        endX += endRect.x
        let endY = (startY < startRect.height / 2)
            ? (Math.random() * (endRect.height / 2))
            : (Math.random() * (endRect.height / 2)) + (endRect.height / 2)
        endY += endRect.y

        // TODO: fix rotation
        let endRot = (startX < startRect.width / 2)
            ? ((startY < startRect.height / 2)
                ? (Math.random() * 90) + 270 // top left : 270-360
                : (Math.random() * 90))//+ 0 // top right : 0-90
            : ((startY < startRect.height / 2)
                ? (Math.random() * 90) + 180 // bottom left : 180-270
                : (Math.random() * 90) + 90) // bottom right : 90-180
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