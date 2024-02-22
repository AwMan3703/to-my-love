
const prefix = "randomEnvelope-"
const envelope = document.getElementById(prefix + "envelope")
const front = document.getElementById(prefix + "front")
const inside = document.getElementById(prefix + "inside")
const body = document.getElementById(prefix + "body")
const flap = document.getElementById(prefix + "flap")
const stamps = document.getElementById(prefix + "stamps")

const envelopePath = "assets/envelope"
const stampsPath = "assets/stamps/"

const randomizeEnvelope = (data) => {
    const envelopeN = randInt(1, data.ranges.envelopes)
    const stampsN = randInt(2, data.ranges.stamps) // start from 2 because stamps/1.png is reserved to detect failed randomization

    inside.src = envelopePath + envelopeN + "/inside.png"
    body.src = envelopePath + envelopeN + "/body.png"
    flap.src = envelopePath + envelopeN + "/flap.png"

    animateEnvelope(envelopeN, stampsN)

    console.log(`envelope randomization complete (envelope #${envelopeN}, stamps #${stampsN})`)
}

fetchme("../data/envelopeRandomization.json", (data) => {
    randomizeEnvelope(data)
    envelope.style.transform = ""; // Show the envelope
})