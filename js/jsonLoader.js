
// totally-not-stackoverflow-copy-paste code that was totally written by me
// https://stackoverflow.com/a/70780779/14647521 (in case I need it again)
async function getJSON(url) {
    let r = await fetch(url).then(response => response.json())
    console.log("Fetched JSON data from " + url+ " => " + r)
    return r
}
