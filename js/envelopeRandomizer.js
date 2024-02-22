
const prefix = "randomEnvelope-"
const envelope = document.getElementById(prefix + "envelope")
const front = document.getElementById(prefix + "front")
const inside = document.getElementById(prefix + "inside")
const body = document.getElementById(prefix + "body")
const flap = document.getElementById(prefix + "flap")
const stamps = document.getElementById(prefix + "stamps")

const animation_phase1 = () => {
    envelope.style.animationName = "letter-reveal-1"

    envelope.addEventListener("click", animation_phase2)
}
const animation_phase2 = () => {
    envelope.style.animationDuration = ".25s"
    envelope.style.animationTimingFunction = "ease-in"
    envelope.style.animationName = "letter-reveal-2"

    envelope.addEventListener("animationend", animation_phase3)
}
const animation_phase3 = () => {
    front.style.visibility = "hidden"
    stamps.style.visibility = "hidden"

    inside.style.visibility = "visible"
    body.style.visibility = "visible"
    flap.style.visibility = "visible"

    envelope.style.animationTimingFunction = "ease-out"
    envelope.style.animationName = "letter-reveal-3"

    envelope.removeEventListener("load", animation_phase1)
    envelope.removeEventListener("click", animation_phase2)
    envelope.removeEventListener("animationend", animation_phase3)
}

const randomize = (data) => {
    const envelopePath = "assets/envelope"
    const stampsPath = `assets/stamps/`
    const envelopeN = randInt(1, data.ranges.envelopes)
    const stampsN = randInt(2, data.ranges.stamps) // start from 2 because stamps/1.png is reserved to detect failed randomization

    inside.src = envelopePath + envelopeN + "/inside.png"
    body.src = envelopePath + envelopeN + "/body.png"
    flap.src = envelopePath + envelopeN + "/flap.png"

    inside.style.visibility = "hidden"
    body.style.visibility = "hidden"
    flap.style.visibility = "hidden"

    front.src = envelopePath + envelopeN + "/front.png"
    stamps.addEventListener("load", animation_phase1)
    stamps.src = stampsPath + stampsN + ".png"

    console.log(`envelope randomization complete (envelope #${envelopeN}, stamps #${stampsN})`)
}

fetch('../data/envelopeRandomization.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        return response.json()
    })
    .then(data => {
        randomize(data)
        envelope.style.transform = ""; // Show the envelope
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    });
