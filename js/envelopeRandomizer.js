
const prefix = "randomEnvelope-"
const flap = document.getElementById(prefix + "flap")
const body = document.getElementById(prefix + "body")
const inside = document.getElementById(prefix + "inside")
const stamps = document.getElementById(prefix + "stamps")

const randomize = (data) => {
    const envelopePath = "assets/envelope"
    const stampsPath = `assets/stamps/`
    const envelopeN = randInt(1, data.ranges.envelopes)
    const stampsN = randInt(1, data.ranges.stamps)
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
