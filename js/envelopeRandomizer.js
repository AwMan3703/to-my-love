
const prefix = "randomEnvelope-"
const envelope = document.getElementById(prefix + "envelope")
const inside = document.getElementById(prefix + "inside")
const body = document.getElementById(prefix + "body")
const flap = document.getElementById(prefix + "flap")
const stamps = document.getElementById(prefix + "stamps")

const randomize = (data) => {
    const envelopePath = "assets/envelope"
    const stampsPath = `assets/stamps/`
    const envelopeN = randInt(1, data.ranges.envelopes)
    const stampsN = randInt(2, data.ranges.stamps) // start from 2 because stamps/1.png is reserved to detect failed randomization
    inside.src = envelopePath + envelopeN + "/inside.png"
    body.src = envelopePath + envelopeN + "/body.png"
    flap.src = envelopePath + envelopeN + "/flap.png"
    stamps.src = stampsPath + stampsN + ".png"

    console.log(`envelope randomization complete (envelope ${envelopeN}, stamps ${stampsN})`)
}

fetch('../data/envelopeRandomization.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        randomize(data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
