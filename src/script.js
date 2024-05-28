let plantNameEl, plantNoteEl, plantCategoryEl, addToGarden, cancel, waterReminder;
let settingsKey = 'settings'
let reminderName = localStorage.getItem(settingsKey)
// Array to access the information from local storage.
let settingsArray = JSON.parse(localStorage.getItem(settingsKey)) || []


console.log('Combined Plants: ',settingsArray)

// initiating the HTML elements the moment the page is loaded.
function init() {
    plantNameEl = document.getElementById("plantNameInput")
    plantNoteEl = document.getElementById("noteInput")
    addToGarden = document.getElementById("addToGarden")
    cancel = document.getElementById("cancel")
    waterReminder = document.getElementById("plantWateringReminder")
    plantCategoryEl = document.getElementById("plantCategory")

    // Checks to see if the local storage is empty or not. If it is empty, it will display a message saying that the garden is empty. If it is not empty, it will display a message saying that the garden is not empty.
    const isLocalStorageEmpty = localStorage.getItem(settingsKey) ? false : true
    const localStorageCheckElement = document.getElementById("isLocalStorageEmpty")
    localStorageCheckElement.textContent = isLocalStorageEmpty ? "Your garden is empty." : ""
    // console.log(localStorage.getItem(settingsKey))
    getSettings()
    plantNeedsWater()
}

// retrieves the info from localstorage using the settings key and parses it into a JSON string object.
function getSettings() {
    const jsonString = localStorage.getItem(settingsKey)
    // If there is any previous input, parse the info and create a variable called combinedInfo using concatenation.
    if (jsonString) {
        settingsArray = JSON.parse(jsonString)
        settingsArray.forEach(newSetting => {
            const combinedInfo = 'Plant Name: ' + newSetting.name + ', Plant Notes: ' + newSetting.notes + ', Plant Category: ' + newSetting.category
            updateMyGarden()
        })
        cactusPlantsCheck()
        succulentPlantsCheck()
        flowerPlantsCheck()
        fernPlantsCheck()
    } else {
        console.log("No settings found in localStorage.")
    }
}

// Updates the UI with the new plant information by creating a new div element and appending the information to the infoDiv.
function updateMyGarden() {
    // Clears existing content and places value back to an empty string.
    document.getElementById('myGarden').innerHTML = ""

    // Creates a Set to keep track of unique plant names and avoid duplicates
    const uniquePlantNames = new Set()

    settingsArray.forEach(setting => {
        // Check if the plant name is already in the Set
        if (!uniquePlantNames.has(setting.name)) {
            // Add the plant name to the Set to mark it as seen
            uniquePlantNames.add(setting.name)

            // Create a new div element to hold the information
            const infoDiv = document.createElement('div')
            infoDiv.classList.add('bg-gray-100', 'rounded', 'p-4', 'text-gray-800', 'font-medium')

            // Create a heading for the name
            const nameHeading = document.createElement('h3')
            nameHeading.classList.add('text-lg', 'font-bold', 'mb-2')
            nameHeading.textContent = setting.name

            // Creates a paragraph for the notes
            const notesParagraph = document.createElement('p')
            notesParagraph.classList.add('mb-2')
            notesParagraph.textContent = setting.notes

            // Creates a paragraph for the category
            const categoryDropDown = document.createElement('p')
            categoryDropDown.classList.add('mb-2')
            categoryDropDown.textContent = setting.category

            // Appends the data to the infoDiv
            infoDiv.appendChild(nameHeading)
            infoDiv.appendChild(notesParagraph)
            infoDiv.appendChild(categoryDropDown)

            // Append the new div to the 'myGarden' div
            document.getElementById('myGarden').appendChild(infoDiv)
        }
    })
}


// Listen for changes to the 'localStorage' and adds them to the page.
window.addEventListener('storage', (event) => {
    if (event.key === 'settingsKey') {
        getSettings()
    }
})


function saveSettings() {
    if (plantNameEl.value && plantNoteEl.value && plantCategoryEl.value) {
        const newSetting = {
            name: plantNameEl.value,
            notes: plantNoteEl.value,
            category: plantCategoryEl.value,
        }

        // Check if the plant is already in the settingsArray
        const isDuplicate = settingsArray.some(setting => setting.name === newSetting.name)
        // Only runs if the plant is not a duplicate.
        if (!isDuplicate) {
            // Add the new plant to the settingsArray
            settingsArray.push(newSetting)
            console.log(settingsArray)
            // JSON stringifies the info.
            const jsonString = JSON.stringify(settingsArray)
            localStorage.setItem(settingsKey, jsonString)

            // Once info is added to LS, triggers a reminder to ask whether they have watered their plant using string interpolation.
            const reminderAlert = `Have you watered your ${newSetting.name} today?`
            document.getElementById("reminder").innerHTML = reminderAlert

            // Updates UI with new plant information after ensuring it's not a duplicate.
            updateMyGarden()
            cactusPlantsCheck()
            succulentPlantsCheck()
            flowerPlantsCheck()
            fernPlantsCheck()

            plantNameEl.value = ""
            plantNoteEl.value = ""
        } else {
            alert("This plant is already in your garden.")
        }
    } else {
        alert("Information is missing.")
    }
}


function wipeInputForm() {

    if (plantNameEl.value || plantNoteEl.value) {
        console.log("Clearing Input")
        plantNameEl.value = ""
        plantNoteEl.value = ""
    } else {
        console.log("There is nothing to clear.")
        alert("There is nothing to clear.")
    }
}

function wipeMyGarden() {
    // Clear localStorage for the key SettingsKey
    localStorage.removeItem(settingsKey)
    // Clear the settingsArray
    settingsArray = []

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

    if (day === 1 || day === 3) { // Monday and Wednesday
        console.log("Time to water your plants")
        alert("Time to water your plants")
    }
}


// Checks whether the plant is a cactus or not.
function cactusPlantsCheck() {
    let cactusPlants = settingsArray.filter(plant => plant.category === "cactus")
    console.log('Cactus Plants: ',cactusPlants)
    return cactusPlants
}


function succulentPlantsCheck() {
    let succulentPlants = settingsArray.filter(plant => plant.category === "succulent")
    console.log('Succulent Plants: ', succulentPlants)
    return succulentPlants
}

function flowerPlantsCheck() {
    let flowerPlants = settingsArray.filter(plant => plant.category === "flowering")
    console.log('Flowering Plants: ',flowerPlants)
    return flowerPlants
}

function fernPlantsCheck() {
    let fernPlants = settingsArray.filter(plant => plant.category === "fern")
    console.log('Fern Plants: ',fernPlants)
    return fernPlants
}

