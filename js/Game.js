class Game {
    url = new URL(location.href);

    g = this.url.searchParams.get("game");

    placeholder;

    constructor (placeholder, clicker) {
        if (!this.g) {
            return this.randomRedirect();
        }

        var o = this.g.split("-");
        var phrases = new Phrases(o[0], o[1], o[2]);
        placeholder.innerHTML = phrases.getPhrase();
        /*
        for (var el of placeholder.querySelectorAll("span.covered")) {
            el.addEventListener("click", (e) => {
                var t = e.currentTarget;
                t.innerText = t.getAttribute("data-word");
            });
        }
        */
        this.placeholder = placeholder;

        clicker.addEventListener("click", e => this.clickerClicked(e));
    }

    static getRandomUrl () {
        return "?game="
            + Phrases.getRandomPhraseIndex()
            + "-" + Phrases.getRandomObjectIndex()
            + "-" + Phrases.getRandomObjectIndex();
    }

    randomRedirect () {
        location.href = Game.getRandomUrl();
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