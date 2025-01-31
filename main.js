import * as utils from "./utils.js";

// Load data.
const NOUNS = await utils.loadData("./data/nouns.txt");
const ADJECTIVES = await utils.loadData("./data/adjectives.txt");
const VERBS = await utils.loadData("./data/verbs.txt");
const VERBS_ING = await utils.loadData("./data/verbs_ing.txt");
const ADVERBS = await utils.loadData("./data/adverbs.txt");
const NAMES = await utils.loadData("./data/names.txt");
const MONTHS = await utils.loadData("./data/months.txt");
const CITIES = await utils.loadData("./data/cities.txt");

// The available paper title generator functions.
const PAPER_TITLE_GENERATORS = [
    acronymTitle,
    timeToTitle,
    towardsTitle,
    aTitle,
    studyTitle,
];

// Tracks the currently generated paper (to populate the bibtex citation).
let CURRENT_PAPER = null;

// Generate a paper title using any of the available generators.
function generatePaperTitle() {
    // Get a generator randomly.
    let generator = utils.getRandomElement(PAPER_TITLE_GENERATORS);

    // Generate all of the paper info.
    const title = generator();
    const year = Math.floor(Math.random() * 800) + 1400;
    const month = utils.getRandomElement(MONTHS);
    const authors = [...new Set([...Array(Math.floor(Math.random() * 4) + 1)].map(
        (_, _i) => {
            return utils.getRandomElement(NAMES);
        }
    ))];
    const booktitle = `Proceedings of the International `
        + `${utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS))} Conference on `
        + `${utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS))}`;
    const publisher = `${utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))} `
        + `${utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS))} Press`;
    const address = utils.getRandomElement(CITIES);
    const volume = Math.floor(Math.random() * 5) + 1;
    const number = Math.floor(Math.random() * 40) + 1;
    const startPage = Math.floor(Math.random() * 1000) + 1;
    const amountOfPages = Math.floor(Math.random() * 30) + 6;

    // Create the citation key based on the first author and the year.
    let authorNameElements = authors[0].split(" ");
    let authorNameForKey = authorNameElements[authorNameElements.length - 1]
        .toLowerCase()
        // Remove special characters from the key.
        .replace("'", "");
    const key =`${authorNameForKey}-${year}`;

    // Update the current paper.
    CURRENT_PAPER = {
        key: key,
        title: title,
        year: year,
        month: month,
        authors: authors.join(" and "),
        booktitle: booktitle,
        publisher: publisher,
        address: address,
        volume: volume,
        number: number,
        pages: `${startPage}--${startPage + amountOfPages}`,
    };

    // Erase citation (if any exists).
    document.getElementById("citation").innerHTML = "";
    document.getElementById("citation").style.display = "none";
    // Set title.
    document.getElementById("paper-title").innerHTML = title;
}


// Generate an acronym title.
//
// Example: "BURGER: Hilarious Stuff for Decent Compilers"
function acronymTitle() {
    const maxAdjectives = 2;

    let acronym = utils.getRandomElement(NOUNS).toUpperCase();
    let firstNoun = utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS))
    let firstAdjectives = [...Array(Math.floor(Math.random() * maxAdjectives) + 1)].map(
        (_, _i) => {
            return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
        }
    ).join(" ");
    let secondNoun = utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS))
    let secondAdjectives = [...Array(Math.floor(Math.random() * maxAdjectives) + 1)].map(
        (_, _i) => {
            return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
        }
    ).join(" ");

    return `${acronym}: ${firstAdjectives} ${firstNoun} for ${secondAdjectives} ${secondNoun}`
}


// Generate a "time to" title.
//
// Example: "Time to Rethink your Concrete Recursive Pony"
function timeToTitle() {
    const maxModifiers = 2;

    let title = "Time to ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxModifiers) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADVERBS))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(VERBS)) + " ";

    title += "your ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxModifiers) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS));

    return title;
}


// Generate a "towards" title.
//
// Example: "Towards Decluttering Provable Symbolic Fuzzer"
function towardsTitle() {
    const maxAdjectives = 2;

    let title = "Towards ";

    title += utils.capitalizeFirstLetter(utils.getRandomElement(VERBS_ING)) + " ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxAdjectives) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS));

    return title;
}


// Generate an "a" title.
//
// Example: "A Fuzzer to Adversarially Improve Strong Recurrent Architecture"
function aTitle() {
    const maxModifiers = 2;

    let title = "";
    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxModifiers) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS)) + " ";

    if (utils.isVowel(title.charAt(0))) {
        title = `An ${title}`;
    } else {
        title = `A ${title}`;
    }

    title += "to ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxModifiers) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADVERBS))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(VERBS)) + " ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxModifiers) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS));

    return title;
}


// Generate a study title.
//
// Example: "A Qualitative Study on Hilarious Strongly-connected Execution"
function studyTitle() {
    const maxAdjectives = 2;

    let title = "";
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            title = "An Empirical ";
            break;
        case 1:
            title = "A Qualitative ";
            break;
        case 2:
            title = "A Quantitative ";
            break;
    }
    title += "Study on ";

    if (Math.random() > 0.5) {
        title += [...Array(Math.floor(Math.random() * maxAdjectives) + 1)].map(
            (_, _i) => {
                return utils.capitalizeFirstLetter(utils.getRandomElement(ADJECTIVES))
            }
        ).join(" ") + " ";
    }
    title += utils.capitalizeFirstLetter(utils.getRandomElement(NOUNS));

    return title;
}


// Produce a bibtex "inproceedings" citation using the current paper.
function citePaper() {
    const bibtex = [
        `@inproceedings{${CURRENT_PAPER.key},`,
        `  title        = {{${CURRENT_PAPER.title}}},`,
        `  author       = {${CURRENT_PAPER.authors}},`,
        `  year         = ${CURRENT_PAPER.year},`,
        `  month        = {${CURRENT_PAPER.month}},`,
        `  booktitle    = {${CURRENT_PAPER.booktitle}},`,
        `  publisher    = {${CURRENT_PAPER.publisher}},`,
        `  address      = {${CURRENT_PAPER.address}},`,
        `  volume       = ${CURRENT_PAPER.volume},`,
        `  number       = ${CURRENT_PAPER.number},`,
        `  pages        = {${CURRENT_PAPER.pages}},`,
        `}`,
    ].join("\n");

    document.getElementById("citation").innerHTML = bibtex;
    document.getElementById("citation").style.display = "block";
}

function initialize() {
    // Add listeners for buttons.
    document.getElementById("generate-btn").addEventListener("click", generatePaperTitle);
    document.getElementById("cite-btn").addEventListener("click", citePaper);

    // Generate a title to start with.
    generatePaperTitle();
}

if (document.readyState !== "loading") {
    initialize();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initialize();
    });
}
