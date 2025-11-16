export default class GameLogic {
    constructor() {
        this.phrases = [
            "Sky Above Mountain",
            "Red Fire Dragon",
            "Bright Silent Valley",
            "Frozen Night Wind",
            "Golden Shadow Path",
            "Morning River Light",
            "Hidden Silent Forest",
            "Crystal Stone Tower"
        ];

        this.currentPhrase = "";
        this.currentValue = 0;
    }

    pickPhrase() {
        this.currentPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return this.currentPhrase;
    }

    generateNumber(phrase, len) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let sum = 0;

        const firstLetters = phrase
            .split(" ")
            .map(w => w[0].toUpperCase());

        firstLetters.forEach(l => {
            const idx = letters.indexOf(l);
            if (idx !== -1 ) sum += (idx + 1);
        });


        this.currentValue = sum % len;
        return this.currentValue;
    }
}

