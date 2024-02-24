const animation_phase1 = () => {
    envelope.style.animationName = "letter-reveal-1"
    envelopeWrapper.style.bottom = "60px"

    envelope.addEventListener("click", animation_phase2)
}
const animation_phase2 = () => {
    envelope.style.animationDuration = ".25s"
    envelope.style.animationTimingFunction = "ease-in"
    envelope.style.animationName = "letter-reveal-2"

    envelope.addEventListener("animationend", animation_phase3)
}
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
const animation_phase4 = () => {
    flap.style.transform = "scaleY(-100%)"
    flap.style.filter = "contrast(0.5)"

    envelope.removeEventListener("load", animation_phase1)
    envelope.removeEventListener("click", animation_phase2)
    envelope.removeEventListener("animationend", animation_phase3)
    envelope.removeEventListener("animationend", animation_phase4)
}

function animateEnvelope(envelopeN, stampsN) {
    inside.style.visibility = "hidden"
    body.style.visibility = "hidden"
    flap.style.visibility = "hidden"

    front.src = envelopePath + envelopeN + "/front.png"
    stamps.addEventListener("load", animation_phase1)
    stamps.src = stampsPath + stampsN + ".png"

}