class Game {
    url = new URL(location.href);

    g = this.url.searchParams.get("game");

    v = this.url.searchParams.get("variant");

    placeholder;

    constructor (placeholder, clicker, change) {
        this.placeholder = placeholder;

        if (this.v) {
            return this.randomRedirect(this.v);
        }
        if (!this.g) {
            return this.randomRedirect();
        }
        var o = this.g.split("-");
        if (o.length != 4) {
            return this.randomRedirect();
        }

        var phrases = new Phrases(o[0], o[1], o[2], o[3]);
        placeholder.innerHTML = phrases.getPhrase();
        clicker.addEventListener("click", e => this.clickerClicked(e));

        if (change) {
            change.href = "?variant=" + o[1];
        }
    }

    static getRandomUrl (situationId) {
        return "?game="
            + Phrases.getRandomGoalIndex()
            + "-" + (situationId && Phrases.phrases.hasOwnProperty(situationId) ? situationId : Phrases.getRandomPhraseIndex())
            + "-" + Phrases.getRandomObjectIndex()
            + "-" + Phrases.getRandomObjectIndex();
    }

    randomRedirect (situationId) {
        location.href = Game.getRandomUrl(situationId);
    }

    clickerClicked (e) {
        var covered = this.placeholder.querySelectorAll("span.covered");
        if (!covered.length) {
            window.location.href = document.getElementById("btn-reload").href;
            return;
        }
        covered[0].innerText = covered[0].getAttribute("data-word");
        covered[0].setAttribute("class", "uncovered");
    }
}