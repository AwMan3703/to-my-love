
function randInt(min, max) {
    max = max + 1
    return Math.floor(Math.random() * (max - min)) + min
}

function showErrorMessage(title, error) {
    document.getElementById("fetch-error-message").style.visibility = "visible"
    document.querySelector("#fetch-error-message > #fetch-error-title").innerHTML = `An error occurred ― ${title}!`
    const description = document.querySelector("#fetch-error-message > #fetch-error-description")
    description.innerHTML = "⚠️ " + error
    if (!error || error==='') description.style.visibility = "hidden"
}