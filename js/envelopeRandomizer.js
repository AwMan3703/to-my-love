
const prefix = "randomEnvelope-"
const flap = document.getElementById(prefix + "flap")
const body = document.getElementById(prefix + "body")
const inside = document.getElementById(prefix + "inside")
const stamps = document.getElementById(prefix + "stamps")

let randomizationData;
fetch('../data/envelopeRandomization.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        randomizationData = data;
        console.log(randomizationData);
    })
    .catch(error => {
        console.error('Error fetching randomization data:', error);
    });
console.log(randomizationData);


const randomize = () => {
    const envelopePath = "assets/envelope"
    const stampsPath = `assets/stamps/`
    const envelopeN = randInt(1, 1)
    const stampsN = randInt(1, 1)
    inside.src = envelopePath + envelopeN + "/inside.png"
    body.src = envelopePath + envelopeN + "/body.png"
    flap.src = envelopePath + envelopeN + "/flap.png"
    stamps.src = stampsPath + stampsN + ".png"

    console.log("envelope randomization complete")
}

randomize()
