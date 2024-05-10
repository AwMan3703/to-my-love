// Reveal the letter, entering from the bottom and show the back, with the stamps
const animation_phase1 = () => {
    envelope.style.animationName = "letter-reveal-1"
    envelopeWrapper.style.bottom = "60px"

    envelope.addEventListener("click", animation_phase2)
}
// Start turning to reveal the front, stop halfway
const animation_phase2 = () => {
    envelope.style.animationDuration = ".25s"
    envelope.style.animationTimingFunction = "ease-in"
    envelope.style.animationName = "letter-reveal-2"

    envelope.addEventListener("animationend", animation_phase3)
}
// Show the flap, body and inside, hide the front and stamps - then resume turning
const animation_phase3 = () => {
    inside.style.visibility = "visible"
    body.style.visibility = "visible"
    flap.style.visibility = "visible"

    front.style.visibility = "hidden"
    stamps.style.visibility = "hidden"

    envelope.style.animationTimingFunction = "ease-out"
    envelope.style.animationName = "letter-reveal-3"

    envelope.addEventListener("animationend", animation_phase4)
}
// Open the flap and extract the letter
const animation_phase4 = () => {
    envelopeLevelBack.appendChild(flap)

    flap.style.transform = "scaleY(-100%)"
    flap.style.filter = "contrast(0.5)"

    letter.style.height = "200%"
    letter.style.translate = "0 -90%"

    envelope.style.translate = "0 50%"

    document.getElementById('background-main').classList.add('lights-on')

    envelope.removeEventListener("load", animation_phase1)
    envelope.removeEventListener("click", animation_phase2)
    envelope.removeEventListener("animationend", animation_phase3)
    envelope.removeEventListener("animationend", animation_phase4)
}

function animateEnvelope(envelopeN, stampsN) {
    envelope.style.transform = ""; // Show the envelope

    inside.style.visibility = "hidden"
    body.style.visibility = "hidden"
    flap.style.visibility = "hidden"

    front.src = envelopePath + envelopeN + "/front.png"
    stamps.addEventListener("load", animation_phase1)
    stamps.src = stampsPath + stampsN + ".png"
}