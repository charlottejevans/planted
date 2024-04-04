let plantName, plantNote, addToGarden, cancel;

function init() {
    plantName = document.getElementById("plantNameInput").value;
    plantNote = document.getElementById("noteInput").value;
    addToGarden = document.getElementById("addToGarden");
    cancel = document.getElementById("cancel");
}
function addTo() {
    console.log("hello")
    const objectArray = [];

    const objectItem = {
        Name: plantName,
        Notes: plantNote,
    }

    objectArray.push(objectItem);
    const json = JSON.stringify(objectArray)
    localStorage.setItem("info", json);
}