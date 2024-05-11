
const prefix = "randomEnvelope-"
const envelopeWrapper = document.getElementById(prefix + "envelopeWrapper")
const envelopeLevelFront = document.getElementById(prefix + "level-front")
const envelopeLevelBack = document.getElementById(prefix + "level-back")
const envelope = document.getElementById(prefix + "envelope")
const letter = document.getElementById("letter")
const front = document.getElementById(prefix + "front")
const inside = document.getElementById(prefix + "inside")
const body = document.getElementById(prefix + "body")
const flap = document.getElementById(prefix + "flap")
const stamps = document.getElementById(prefix + "stamps")

const envelopePath = "assets/envelope"
const stampsPath = "assets/stamps/"

const randomizeEnvelope = (data) => {
    // Ignoring the syntax warnings for the data fields feels like saying "trust me bro" to my IDE
    const envelopeN = randInt(1, data.ranges.envelopes)
    const stampsN = randInt(2, data.ranges.stamps) // start from 2 because stamps/1.png is reserved to detect failed randomization

    inside.src = envelopePath + envelopeN + "/inside.png"
    body.src = envelopePath + envelopeN + "/body.png"
    flap.src = envelopePath + envelopeN + "/flap.png"

    console.log(`envelope randomization complete (envelope #${envelopeN}, stamps #${stampsN})`)
    return { envelopeN, stampsN }
}

// Get the current path, cut out the file name and replace it with the file we want
const dataPath = "data/envelopeRandomization.json"
const fileNameHrefIndex = window.location.href.indexOf("index.html")
const randomizationDataURL = (fileNameHrefIndex > 0 ? window.location.href.substring(0,window.location.href.indexOf("index.html")) : window.location.href) + dataPath
document.getElementById("letter-frame").addEventListener(
    "load",
    function() {
        fetchjson(randomizationDataURL,
            (data) => {
            const randData = randomizeEnvelope(data)
            animateEnvelope(randData.envelopeN, randData.stampsN)
            },
            (error) => { showErrorMessage("fetch failed", error) }
        )
    }
)