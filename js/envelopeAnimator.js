// Reveal the letter, entering from the bottom and show the back, with the stamps
const animation_phase1 = () => {
    console.log("phase 1 start");
    envelope.style.animationName = "letter-reveal-1"
    envelopeWrapper.style.bottom = "60px"

    envelope.addEventListener("click", animation_phase2)
    console.log("phase 1 end - awaiting click");
}
// Start turning to reveal the front, stop halfway
const animation_phase2 = () => {
    console.log("phase 2 start");
    envelope.style.animationDuration = ".3s"
    envelope.style.animationTimingFunction = "ease-in"
    envelope.style.animationName = "letter-reveal-2"

    envelope.addEventListener("animationend", animation_phase3)
    console.log("phase 2 end");
}
// Show the flap, body and inside, hide the front and stamps - then resume turning
const animation_phase3 = () => {
    console.log("phase 3 start");
    inside.style.visibility = "visible"
    body.style.visibility = "visible"
    flap.style.visibility = "visible"

    front.style.visibility = "hidden"
    stamps.style.visibility = "hidden"

    envelope.style.animationTimingFunction = "ease-out"
    envelope.style.animationName = "letter-reveal-3"

    envelope.addEventListener("animationend", animation_phase4)
    console.log("phase 3 end");
}
// Open the flap and extract the letter
const animation_phase4 = () => {
    console.log("phase 4 start");
    envelope.style.animationName = "none"

    envelopeLevelBack.appendChild(flap)

    flap.style.transform = "scaleY(-100%)"
    flap.style.filter = "contrast(0.5)"

    const rect = envelope.getBoundingClientRect()
    particleExplosion(
        document.getElementById("particle-level"),
        (Math.random() * 20) + 10,
        rect,
        190,
        210,
        "heart-particle-start",
        "heart-particle-end",
        "heart-particle",
        "assets/heart.png"
    )

    letter.style.height = "220%"
    letter.style.translate = "0 -90%"

    envelope.style.translate = "0 50%"

    document.getElementById("light-up").style.opacity = 1
    document.body.style.backgroundColor = "#5C2A50FF"

    envelope.removeEventListener("load", animation_phase1)
    envelope.removeEventListener("click", animation_phase2)
    envelope.removeEventListener("animationend", animation_phase3)
    envelope.removeEventListener("animationend", animation_phase4)
    console.log("phase 4 end");
}

function animateEnvelope(envelopeN, stampsN) {
    envelope.style.transform = ""; // Show the envelope

    inside.style.visibility = "hidden"
    body.style.visibility = "hidden"
    flap.style.visibility = "hidden"

    front.src = envelopePath + envelopeN + "/front.png"
    stamps.addEventListener("load", animation_phase1)
    stamps.src = stampsPath + stampsN + ".png"
    console.log("starting animation...")
}