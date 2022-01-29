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

    static show (splash, callback) {
        // Standard text block closer:
        var el = splash.querySelector(".text-block-closer");
        if (el) {
            el.addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    Splash.hide();
                }
            );
        } else {
            // Timed block closer (commercials etc)
            var el = splash.querySelector(".timed-block-closer");
            if (el) {
                var html = el.innerHTML;
                var count = parseInt(el.getAttribute("time"));
                if (!count) {
                    count = 5;
                }
                el.innerHTML = count--;
                var timer = window.setInterval(
                    function () {
                        el.innerHTML = count--;
                        if (count < 0) {
                            window.clearInterval(timer);
                            el.innerHTML = html;
                            el.setAttribute("class", "text-block-closer");
                            el.addEventListener(
                                "click",
                                function (e) {
                                    e.preventDefault();
                                    Splash.hide();
                                }
                            );
                        }
                    },
                    1000
                );
            }
        }
        splash.style.display = Splash.display;
        if (callback) {
            callback(el);
        }
    }

    static showHtml (html, callback) {
        var s = Splash.getSplash();
        s.innerHTML = html;
        Splash.show(s, callback);
    }

    static showElement (el, callback) {
        var s = Splash.getSplash();
        s.innerHTML = el.innerHTML;
        Splash.show(s, callback);
    }

}