const closeAllAside = () =>{
    const asideLength = document.querySelectorAll('.aside');

    if(asideLength.length){
        asideLength.forEach(aside=>{
            aside.classList.remove('aside--active');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const asideButtons = document.querySelectorAll('[data-aside]');

    if (asideButtons.length) {
        asideButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const aside = document.querySelector(`${button.dataset.aside}`);

                if (aside) {
                    aside.classList.toggle('aside--active');
                }
            });
        });
    }

    [].forEach.call(document.querySelectorAll('.phone-input'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });


    const video = document.querySelector('.video');
    const windowWidth = window.innerWidth;

    const videoSource = (windowWidth < 1025) ? video.dataset.mobile : video.dataset.desktop;
    const videoHTML = `<source src='${videoSource}' type='video/mp4'>`;
    video.innerHTML = videoHTML;


    const formArray = document.querySelectorAll('form');

    if (formArray.length) {
        formArray.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(form);

                fetch("/mail.php", {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                        } else {
                        }
                    })
                    .catch(error => {
                    });
                    closeAllAside()
            });
        })
    }
});


window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const screen = document.querySelector('.screen');
    const video = document.querySelector('.video');

    setTimeout(() => {
        loader.classList.add('loaded');
        screen.classList.add('loaded');
        video.play();
    }, 500)
});