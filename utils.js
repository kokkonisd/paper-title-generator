// Load data from a local JSON file.
export function loadData(file) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", file);
        xhr.onload = (e) => {
            if (xhr.status === 200) {
                resolve(xhr.responseText.split("\n").filter((data) => data != ""));
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                });
            }
        };
        xhr.onerror = (e) => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText,
            });
        };
        xhr.send();
    });
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
