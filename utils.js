// Load data from a local JSON file.
export function loadData(file) {
    let request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.send(null);

    return request.responseText.split("\n");
}

// Get a random element from an array.
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}

// Capitalize the first letter of a string.
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Add the -ing ending to a verb (approximatively).
export function getIngVerb(verb) {
    if (verb[verb.length - 1] == "e") {
        verb = verb.slice(0, verb.length - 1);
    }

    return `${verb}ing`;
}
