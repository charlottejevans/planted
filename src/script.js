let plantNameEl, plantNoteEl, addToGarden, cancel;
let settingsKey = 'settings'

function init() {
    plantNameEl = document.getElementById("plantNameInput");
    plantNoteEl = document.getElementById("noteInput");
    addToGarden = document.getElementById("addToGarden");
    cancel = document.getElementById("cancel");

    console.log(localStorage.getItem(settingsKey))
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
        const settingsJSON = JSON.parse(jsonString)


        settingsJSON.name = ""
        settingsJSON.notes = ""

        const newJsonString = JSON.stringify(settingsJSON)
        localStorage.setItem(settingsKey, newJsonString);
    }
}