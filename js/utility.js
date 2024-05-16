
function randInt(min, max) {
    max = max + 1
    return Math.floor(Math.random() * (max - min)) + min
}

// (causes must be an array of strings describing potential causes of the problem)
function showErrorMessage(title, error, causes) {
    document.getElementById("fetch-error").style.display = "flex"
    document.getElementById("fetch-error-title").innerHTML = `An error occurred ― ${title}!`
    const description = document.getElementById("fetch-error-description")
    description.innerHTML = "⚠️ " + error
    if (!error || error==='') description.style.visibility = "hidden"
    const causesList = document.getElementById("fetch-error-diagnosis-list")
    const causeElement = (text) => {
        const li = document.createElement("li")
        li.innerText = text
        return li
    }
    if (!causes || causes.length === 0) causesList.appendChild(causeElement("Unknown error source :("))
    else {
        for (const cause of causes) {
            causesList.appendChild(causeElement(cause))
        }
    }
}