let plantNameEl, plantNoteEl, addToGarden, cancel;
let settingsKey = 'settings'

function init() {
    plantNameEl = document.getElementById("plantNameInput");
    plantNoteEl = document.getElementById("noteInput");
    addToGarden = document.getElementById("addToGarden");
    cancel = document.getElementById("cancel");

    console.log(localStorage.getItem(settingsKey))
    getSettings()
}

function getSettings() {
    const jsonString = localStorage.getItem(settingsKey)
    const settingsJSON = JSON.parse(jsonString)

    plantNameEl.value = settingsJSON.name
}

function saveSettings() {
    console.log("hello")

    const settingsJSON = {
        name: plantNameEl.value,
        notes: plantNoteEl.value,
    }

    const jsonString = JSON.stringify(settingsJSON)
    localStorage.setItem(settingsKey, jsonString);
}

function wipeSettings() {
    console.log("Wipe storage")

    const jsonString = localStorage.getItem(settingsKey)

    if (jsonString) {
        console.log(jsonString)
        // parse json string and
        const settingsJSON = JSON.parse(jsonString)

        // reset properties
        settingsJSON.name = ""
        settingsJSON.notes = ""

        // stringify settings json and update local storage
        const newJsonString = JSON.stringify(settingsJSON)
        localStorage.setItem(settingsKey, newJsonString);

        // reset values of the HTML elements
        plantNameEl.value = ""
    }
}