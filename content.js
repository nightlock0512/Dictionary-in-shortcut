function getWikipedia(word, callback) {
    const Http = new XMLHttpRequest();
    const url = 'https://ja.wikipedia.org/api/rest_v1/page/summary/' + word;
    Http.open("GET", url);
    Http.send();
    Http.onload = (e) => {
        const res = JSON.parse(Http.responseText);

        if (Http.status == 404) {
            callback(false);
        }else{
            callback(res);
        }
    }
}

function getDeeplURL(word) {
    const from = "auto";
    const to = "ja";
    const url = "https://www.deepl.com/translator#" + from + "/" + to + "/" + word;

    return url;
}

window.addEventListener("keydown", (e) => {
    if (e.shiftKey) {
        switch (e.code) {
            case "KeyD":
                var selectText = window.getSelection().toString();
                window.open(getDeeplURL(selectText));
                break;

            case "KeyW":
                var selectText = window.getSelection().toString();

                var popElm = document.createElement("div");
                popElm.style.position = "fixed";
                popElm.style.zIndex = 50000;
                popElm.style.bottom = 0;
                popElm.style.right = 0;
                popElm.style.maxWidth = "30vw";
                popElm.style.background = "white";
                popElm.style.color = "black";

                getWikipedia(selectText, (res) => {
                    if (res) {
                        popElm.innerHTML = res.extract_html;
                        popElm.onclick = () => {
                            window.open(res.content_urls.desktop.page)
                        }
                    } else {
                        popElm.innerHTML = "Wikipediaが見つかりませんでした。";
                    }

                    document.addEventListener("click", (e) => {
                        if (e.target != popElm) {
                            popElm.remove();
                        }
                    })
                    document.body.appendChild(popElm);
                });

                break;

            default:
                break;
        }
    }
});
