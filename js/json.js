
// totally-not-stackoverflow-copy-paste code that was totally written by me
// https://stackoverflow.com/a/70780779/14647521 (in case I need it again)
function getJSON(url) {
    fetch(url)
        .then(response => JSON.parse(response.json()
        .then(data => {
            console.log(data)
            return data
        })))
        /*.catch(function (err) {
            console.log('JSON fetching/reading error: ' + err);
        });*/
}

console.log(getJSON("data/myjson.json"))