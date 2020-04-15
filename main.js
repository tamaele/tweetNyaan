function main() {
    // Tweetボタンが出現したらNyaanボタンを設置

    const target = document.querySelector('.js-drawer.drawer[data-drawer=compose]')
    if (target == null) {
        setTimeout(function(){
            main()
        }, 1000)
        return
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            let buttonContainer = document.querySelector(".js-send-button-container")
            if (buttonContainer != null) {
                let nyaanButton = document.createElement("button")
                nyaanButton.id = "nyaan-button"
                nyaanButton.className = "js-show-tip Button--Nyaan padding-v--6 padding-h--12"
                nyaanButton.textContent = "Nyaan"
                nyaanButton.setAttribute("data-original-title", "Nyaan (Alt+Enter)")
                nyaanButton.addEventListener("click", function() {
                    tweetNyaan()
                    document.querySelector("#nyaan-button").classList.add("is-disabled");
                }, false)
                document.querySelector("textarea.js-compose-text.compose-text.bg-color-twitter-white.txt-size--14.scroll-v.scroll-styled-v.scroll-styled-h.scroll-alt.padding-a--0").addEventListener("keydown", function nyaan(e) {
                    if (event.altKey) {
                        if (e.keyCode === 13) {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent("click", true, true )
                            nyaanButton.dispatchEvent(evt)
                        }
                    }
                })
                buttonContainer.before(nyaanButton)
            };
        });
    });

    observer.observe(target, { childList: true });
}

function tweetNyaan() {
    // にゃーんと時刻を入力してTweetボタンを押す

    console.log("nyaan")
    let formSelector = "textarea.js-compose-text.compose-text.bg-color-twitter-white.txt-size--14.scroll-v.scroll-styled-v.scroll-styled-h.scroll-alt.padding-a--0"
    let form = document.querySelector(formSelector)
    let d = new Date()
    let dt = "" + d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " " + d.getHours() + ":" + ("00"+d.getMinutes()).slice(-2) + ":" + ("00"+d.getSeconds()).slice(-2)
    form.value = ("にゃーん\n" + dt)
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("input", true, true )
    form.dispatchEvent(evt)

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true )
    document.querySelector("button.js-send-button.js-spinner-button.js-show-tip.Button--primary.btn-extra-height.padding-v--6.padding-h--12").dispatchEvent(evt)
}

main()

