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

// Check if a letter is a vowel.
export function isVowel(letter) {
    switch (letter.charAt(0).toLowerCase()) {
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
        case "y":
            return true;
        default:
            return false;
    }
}
