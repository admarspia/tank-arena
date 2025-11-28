export default class GameLogic {
    constructor() {

        this.phrases = [
            "Left wind beneath the mountain",
            "Right river above the hill",
            "Top eagle watching the east",
            "Bottom shadow falling to the west",
            "Left moon rising above the valley",
            "Right stone hidden under the sand",
            "Top fire spreading east",
            "Bottom wolf sleeping beneath the trees"
        ];

        this.currentPhrase = "";
    }

    pickPhrase() {
        this.currentPhrase =
            this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return this.currentPhrase;
    }

    randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    decodePhrase(phrase, numberOfWalls) {
        phrase = phrase.toLowerCase();

        const wallWidth = numberOfWalls / 4;  
        let baseIndex = 0;                    
        if (phrase.includes("top")) baseIndex = 0;
        else if (phrase.includes("left")) baseIndex = wallWidth;
        else if (phrase.includes("bottom") || phrase.includes("down")) baseIndex = wallWidth * 2;
        else if (phrase.includes("right")) baseIndex = wallWidth * 3;

        let half = "upper";

        if (phrase.includes("beneath") || phrase.includes("under") || phrase.includes("lower"))
            half = "lower";
        if (phrase.includes("west"))
            half = "lower";
        if (phrase.includes("east"))
            half = "upper";

        const upperStart = baseIndex;
        const upperEnd = baseIndex + Math.floor(wallWidth / 2) - 1;

        const lowerStart = baseIndex + Math.floor(wallWidth / 2);
        const lowerEnd = baseIndex + wallWidth - 1;

        let target;

        if (half === "upper") {
            target = this.randomRange(upperStart, upperEnd);
        } else {
            target = this.randomRange(lowerStart, lowerEnd);
        }

        return target;
    }

    getIndex(numberOfWalls) {
        return this.decodePhrase(this.currentPhrase, numberOfWalls);
    }
}

