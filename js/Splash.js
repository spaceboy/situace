class Splash {
    static splashId = "splash";
    static display = "block";

    static getSplash () {
        var s = document.getElementById(Splash.splashId);
        if (!s) {
            var s = document.createElement("div");
            s.id = Splash.splashId;
            s.style.display = "none";
            document.body.appendChild(s);
        }
        return s;
    }

    static hide () {
        Splash.getSplash().style.display = "none";
    }

    static show (splash) {
        splash.style.display = Splash.display;
    }

    static showHtml (html, callback) {
        var s = Splash.getSplash();
        s.innerHTML = html;
        Splash.show(s);
        if (callback) {
            callback(s);
        }
    }

    static showElement (el, callback) {
        var s = Splash.getSplash();
        s.innerHTML = el.innerHTML;
        Splash.show(s);
        if (callback) {
            callback(s);
        }
    }

}