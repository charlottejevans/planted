let plantNameEl, plantNoteEl, plantCategoryEl, addToGarden, cancel, waterReminder;
let settingsKey = 'settings'
let settingsArray = JSON.parse(localStorage.getItem(settingsKey)) || [] // Array to access the information from local storage.


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
    getSettings()
    plantNeedsWater()
}

// Listen for changes to the 'localStorage' and adds them to the page.
window.addEventListener('storage', (event) => {
    if (event.key === 'settingsKey') {
        getSettings()
    }
})

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
        loggingPlants()

    } else {
        console.log("No settings found in localStorage.")
    }
}

// Updates the UI with the new plant information by creating a new div element and appending the information to the infoDiv.
function updateMyGarden() {
    clearGarden()
    // Uses new set to ensure that the plant names are unique.
    const uniquePlantNames = new Set()
    // Loops through the settingsArray and creates a new div element for each plant.
    settingsArray.forEach((setting, index) => {
        // Checks to see if the plant name is unique.
        if (!uniquePlantNames.has(setting.name)) {
            uniquePlantNames.add(setting.name)
            // Creates a new div element for each plant.
            const infoDiv = createPlantDiv(setting, index)
            // Appends the infoDiv to the myGarden div.
            document.getElementById('myGarden').appendChild(infoDiv)
        }
    })
}

// Clears the garden by setting the innerHTML of the myGarden div to an empty string.
function clearGarden() {
    document.getElementById('myGarden').innerHTML = ""
}

// Creates a new div element for each plant and appends the plant name, notes, category, and a delete button to the div.
function createPlantDiv(setting, index) {
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('bg-gray-100', 'rounded', 'p-4', 'text-gray-800', 'font-medium')
    // Creates new elements for the plant name, notes, and category.
    const nameHeading = createElement('h3', ['text-lg', 'font-bold', 'mb-2'], setting.name)
    const notesParagraph = createElement('p', ['mb-2'], setting.notes)
    const categoryDropDown = createElement('p', ['mb-2', 'flex', 'items-end', 'justify-end'], setting.category)
    const dateParagraph = createElement('p', ['mb-2', 'italic', 'text-gray-400', 'flex', 'justify-end'], setting.date)

    const deleteButton = createDeleteButton(index)

    // Appends the new elements to the infoDiv.
    infoDiv.appendChild(nameHeading)
    infoDiv.appendChild(notesParagraph)
    infoDiv.appendChild(categoryDropDown)
    infoDiv.appendChild(dateParagraph)
    infoDiv.appendChild(deleteButton)

    return infoDiv

}

// Creates a new element with the specified tag, classes, and text content.
function createElement(tag, classList, textContent) {
    // Creates a new element with the specified tag.
    const element = document.createElement(tag)
    // Adds the classes from the classList array to the element.
    classList.forEach(cls => element.classList.add(cls))

    element.textContent = textContent
    return element
}

function createDeleteButton(index) {
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('bg-green-500', 'px-4', 'py-2', 'rounded', 'text-white', 'font-semi-bold')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => deletePlant(index))
    return deleteButton
}

function deletePlant(index) {
    // .splice() removes the plant from the settingsArray by its index.
    settingsArray.splice(index, 1)
    // Updates the local storage with the new, modified settingsArray.
    localStorage.setItem(settingsKey, JSON.stringify(settingsArray))
    updateMyGarden()
    loggingPlants()
}

function loggingPlants() {
    console.log('Combined Plants: ', settingsArray)
    cactusPlantsCheck()
    succulentPlantsCheck()
    flowerPlantsCheck()
    fernPlantsCheck()
}

function saveSettings() {
    if (plantNameEl.value && plantNoteEl.value && plantCategoryEl.value) {
        // Gets the current date and stores it in a variable.
        const currentDate = new Date()
        const newSetting = {
            name: plantNameEl.value,
            notes: plantNoteEl.value,
            category: plantCategoryEl.value,
            date: currentDate.toLocaleDateString()
        }

        // Check if the plant is already in the settingsArray
        const isDuplicate = settingsArray.some(setting => setting.name === newSetting.name)
        // Only runs if the plant is not a duplicate.
        if (!isDuplicate) {
            // Add the new plant to the settingsArray
            settingsArray.push(newSetting)
            // JSON stringifies the info.
            const jsonString = JSON.stringify(settingsArray)
            localStorage.setItem(settingsKey, jsonString)

            // Once info is added to LS, triggers a reminder to ask whether they have watered their plant using string interpolation.
            const reminderAlert = `Have you watered your ${newSetting.name} today?`
            document.getElementById("reminder").innerHTML = reminderAlert

            // Updates UI with new plant information after ensuring it's not a duplicate.
            updateMyGarden()
            loggingPlants()

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

// Getting the plants by category - Global Variables
let fernPlants = settingsArray.filter(plant => plant.category === "fern")
let cactusPlants = settingsArray.filter(plant => plant.category === "cactus")
let succulentPlants = settingsArray.filter(plant => plant.category === "succulent")
let flowerPlants = settingsArray.filter(plant => plant.category === "flowering")

// Checks whether the plant is a cactus or not.
function cactusPlantsCheck() {
    console.log('Cactus Plants: ', cactusPlants)
    return cactusPlants
}


function succulentPlantsCheck() {
    console.log('Succulent Plants: ', succulentPlants)
    return succulentPlants
}

function flowerPlantsCheck() {
    console.log('Flowering Plants: ', flowerPlants)
    return flowerPlants
}

function fernPlantsCheck() {
    console.log('Fern Plants: ', fernPlants)
    return fernPlants
}

// NavBar links to scroll to sections on click
document.getElementById('myGardenNavBar').addEventListener('click', function (event) {
    event.preventDefault()
    document.getElementById('myGardenSection').scrollIntoView({behavior: 'smooth'})
})

document.getElementById('addNavBar').addEventListener('click', function (event) {
    event.preventDefault()
    document.getElementById('addPlantsForm').scrollIntoView({behavior: 'smooth'})
})


// Filter plants by category
function filterPlantsByCategory(category) {
    return settingsArray.filter(plant => plant.category === category)
}

// Update UI to display plants of the selected category in the MyGarden section.
function updateUIWithFilteredPlants(category) {
    const filteredPlants = filterPlantsByCategory(category)
    clearGarden()
    // Loop through the filtered plants and create a new div element for each plant.
    filteredPlants.forEach(plant => {
        const infoDiv = createPlantDiv(plant)
        document.getElementById('myGarden').appendChild(infoDiv)
    })
}

// Event listeners for tab buttons.
document.getElementById('allPlantsTab').addEventListener('click', function () {
    updateMyGarden()
    setActiveTabButton('allPlantsTab')
})

document.getElementById('succulentsTab').addEventListener('click', function () {
    updateUIWithFilteredPlants('succulent')
    setActiveTabButton('succulentsTab')
})

document.getElementById('fernsTab').addEventListener('click', function () {
    updateUIWithFilteredPlants('fern')
    setActiveTabButton('fernsTab')
})

document.getElementById('cactiTab').addEventListener('click', function () {
    updateUIWithFilteredPlants('cactus')
    setActiveTabButton('cactiTab')
})

document.getElementById('flowersTab').addEventListener('click', function () {
    updateUIWithFilteredPlants('flowering')
    setActiveTabButton('flowersTab')
})

function setActiveTabButton(tabId) {
    // Get all classed tab buttons
    const tabButtons = document.querySelectorAll('.tab-button')
    // Loop through all tab buttons and add or remove the 'active' class depending on the tabId
    tabButtons.forEach(button => {
        if (button.id === tabId) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })
}