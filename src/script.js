let plantNameEl, plantNoteEl, plantCategoryEl, addToGarden, cancel, waterReminder;
let settingsKey = 'settings'
let reminderName = localStorage.getItem(settingsKey)


// initiating the HTML elements the moment the page is loaded.
function init() {
    plantNameEl = document.getElementById("plantNameInput")
    plantNoteEl = document.getElementById("noteInput")
    addToGarden = document.getElementById("addToGarden")
    cancel = document.getElementById("cancel")
    waterReminder = document.getElementById("plantWateringReminder")
    plantCategoryEl = document.getElementById("plantCategory")

    // Checks to see if the local storage is empty or not. If it is empty, it will display a message saying that the garden is empty. If it is not empty, it will display a message saying that the garden is not empty.
    const isLocalStorageEmpty = localStorage.getItem(settingsKey) ? false : true;
    const localStorageCheckElement = document.getElementById("isLocalStorageEmpty");
    localStorageCheckElement.textContent = isLocalStorageEmpty ? "Your garden is empty." : "Your garden is not empty."
    console.log(localStorage.getItem(settingsKey))
    getSettings()
}

// retrieves the info from localstorage using the settings key and parses it into a JSON string object.
function getSettings() {
    const jsonString = localStorage.getItem(settingsKey)
    // If there is any previous input, parse the info and create a variable called combinedInfo using concatenation.
    if (jsonString) {
        const settingsArray = JSON.parse(jsonString)
        settingsArray.forEach(setting => {
            const combinedInfo = setting.name + ': ' + setting.notes + ': ' + setting.category
            updateMyGarden(combinedInfo)
        });
    } else {
        console.log("No settings found in localStorage.")
    }
}

function updateMyGarden(combinedInfo) {
    // Create a new div element to hold the combined information
    const infoDiv = document.createElement('div')
    infoDiv.textContent = combinedInfo

    // Append the new div to the 'myGarden' div without clearing old content
    document.getElementById('myGarden').appendChild(infoDiv)
}

// Listen for changes to the 'localStorage' and adds them to the page.
window.addEventListener('storage', (event) => {
    if (event.key === 'settingsKey') {
        getSettings()
    }
})



function saveSettings() {
    if (plantNameEl.value && plantNoteEl.value) {
        console.log("hello")

        const newSetting = {
            name: plantNameEl.value,
            notes: plantNoteEl.value,
            category: plantCategoryEl.value,
        }

        let settingsArray = JSON.parse(localStorage.getItem(settingsKey)) || []
        settingsArray.push(newSetting)

        const jsonString = JSON.stringify(settingsArray)
        localStorage.setItem(settingsKey, jsonString)
        updateMyGarden(`${newSetting.name}: ${newSetting.notes}: ${newSetting.category}`)

        plantNameEl.value = ""
        plantNoteEl.value = ""
        // Once info is added to LS, triggers a reminder to ask whether they have watered their plant using string interpolation.
        const reminderName = newSetting.name
        const reminderAlert = `Have you watered your ${reminderName} today?`
        document.getElementById("reminder").innerHTML = reminderAlert
    } else {
        alert("Information is missing.")
    }
}


function wipeInputForm() {

    if (plantNameEl.value || plantNoteEl.value ) {
    console.log("Clearing Input")
    plantNameEl.value = ""
    plantNoteEl.value = ""
    } else {
        console.log("There is nothing to clear")
        alert("There is nothing to clear.")
    }
}

function wipeMyGarden() {
    // Clear localStorage for the key SettingsKey
    localStorage.removeItem(settingsKey)

    // Select the 'myGarden' div and remove all its child elements
    const myGardenDiv = document.getElementById('myGarden')
    while (myGardenDiv.firstChild) {
        myGardenDiv.removeChild(myGardenDiv.firstChild)
    }
    console.log("Your plant has been removed from your garden.")
    alert("Your plant has been removed from your garden.")
}

// Learning how to use function expressions.
const plantNeedsWater = function () {
    const today = new Date()
    const day = today.getDay()

    if (day === 2 || day === 3 ) { // Monday and Wednesday
        console.log("Time to water your plants")
        alert("Time to water your plants")
    }
}

plantNeedsWater()


