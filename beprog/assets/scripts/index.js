class Animations {
    constructor() {
        this.animationWrapperArray = document.querySelectorAll('.animation-wrapper');
    }

    toggleAnimation(animationWrapperElement) {
        const animationItemArray = animationWrapperElement.querySelectorAll('.animation-item');
        animationItemArray.forEach((animationItemElement, animationItemIndex) => {
            animationItemElement.style.animationDelay = `${animationItemIndex * 0.2}s`;
            animationItemElement.classList.add('animation-item--animated');
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.toggleAnimation(entry.target);
            }
        });
    }

    init() {
        if (!this.animationWrapperArray.length) return;

        const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            // rootMargin:''

        });
        this.animationWrapperArray.forEach(animationWrapper => {
            observer.observe(animationWrapper);
        });
    }
}

const languageObject = {
    en: [
        ['hero-title', 'Anonymous messenger BeProg'],
        ['hero-text', 'Communicate anonymously without a phone number or any kind of registration. Simply come up with a password for you and your vis-à-vis, and create one unique private chat only for the two of you.'],
        ['hero-block', 'No phone number and registration required.'],
        ['hero-title-second', 'In order to chat with someone, you need only a <span class="password-img"><img src="assets/images/password-img.svg" alt=""></span> password'],
        ['hero-list-first', 'All chats are protected by <span>«one-time pad»</span> <span>symmetric</span> encryption, i.e. each message is encrypted with a new never repeating key.'],
        ['hero-list-second', 'Use passwords to <span>make calls</span>, not your phone number.'],
        ['how-title', 'How it works in practice:'],
        ['about-title', 'BeProg is a truly anonymous communication app'],
        ['about-card-title-first', 'There is no need for <br> a phone number'],
        ['about-card-text-first', 'Instead of exchanging phone numbers - exchange passwords.'],
        ['about-card-title-second', 'Password'],
        ['about-card-text-second', 'Come up with a password, share it with the other person and create one private chat for both of you.'],
        ['about-card-title-third', 'Create a channel'],
        ['about-card-text-third', 'Publish protected messages'],
        ['about-card-title-fourth', 'For an unlimited audience'],
        ['about-card-text-fourth', 'BeProg app is ad-free and spam-free'],
        ['banner-text', 'The BeProg messaging app will give you that <br> peace of <img src="assets/images/icons/like-in-text.svg" alt=""> mind, that can only be provided by anonymity.'],
        ['nav-link-first', 'About the app'],
        ['nav-link-second', 'How it works'],
        ['nav-link-third', 'Benefits'],
        ['nav-link-fourth', 'Description'],
        ['anonymity-title', 'Anonymity'],
        ['anonymity-text', 'We have strived to achieve maximum anonymity combined with ease of use. The app does not require any identification, phone number or device ID. The app does not request permission from other user applications such as: Contacts, Location, Phone, etc.'],
        ['simplicity-title', 'Simplicity'],
        ['simplicity-text', 'The app has a minimal set of intuitive functions. Creating a chat is simple and done in two steps. We have developed an easy to use application.'],
        ['possibilities-title', 'Possibilities'],
        ['possibilities-text', 'Create anonymous channels for an unlimited number of subscribers. '],
        ['safety-title', 'Safety'],
        ['safety-text', 'We use our proprietary method based on symmetric end-to-end encryption combined with the one-time pad principle'],
        ['download-text', 'Download'],


        ['how-card-first', "In the open app press <img class='img-small' src='assets/images/icons/plus-text.svg' alt=''> at the bottom of the screen"],
        ['how-card-second', 'Select «Private chat»'],
        ['how-card-third', 'Then, when prompted, enter the «Password» and name of the chat'],
        ['how-card-fourth', 'Сlick «Next» and that’s it!'],
        ['how-card-text', "Then wait, till your vis-à-vis does the same and you can start <img src='assets/images/icons/how-icon.svg' alt=''> chatting!"],
    ],
    ru: [
        ['hero-title', 'Анонимный мессенджер BeProg'],
        ['hero-text', 'Ваше личное пространство в сети, где можно общаться без регистрации и номера телефона. Просто придумайте с собеседником пароль и создайте уникальный чат.'],
        ['hero-block', 'не требует регистрации и номера телефона.'],
        ['hero-title-second', ' Для общения необходим только <br> <span class="password-img"><img src="assets/images/password-img.svg" alt=""></span> пароль'],
        ['hero-list-first', ' Все чаты защищены с помощью <span>симметричного</span> шифрования и, в дополнение, с использованием принципа <span>«одноразового блокнота»</span>, т.е. каждое сообщение шифруется новым ключом'],
        ['hero-list-second', '  Возможность совершать <span>анонимные звонки</span>, используя только пароль'],
        ['how-title', 'Как это работает на практике:'],
        ['about-title', 'BeProg — действительно анонимное приложение для общения'],
        ['about-card-title-first', 'Без номера телефона'],
        ['about-card-text-first', 'Вместо обмена номерами телефонов, просто обменяйтесь паролями.'],
        ['about-card-title-second', 'Пароль'],
        ['about-card-text-second', 'Придумайте пароль, поделитесь им со своим собеседником, создайте приватный чат'],
        ['about-card-title-third', 'Создание канала'],
        ['about-card-text-third', 'Публикация защищенных сообщений'],
        ['about-card-title-fourth', 'Без спама и рекламы'],
        ['about-card-text-fourth', 'В приложении BeProg мы не используем никакие виды рекламы или спама'],
        ['banner-text', 'Приложение для обмена сообщениями BeProg обеспечит вам душевное <img src="assets/images/icons/like-in-text.svg" alt=""> спокойствие, дать которое может лишь полная анонимность.'],
        ['nav-link-first', 'О приложении'],
        ['nav-link-second', ' Как работает'],
        ['nav-link-third', 'Преимущества'],
        ['nav-link-fourth', ' Описание'],
        ['anonymity-title', 'Анонимность'],
        ['anonymity-text', 'Мы стремились достичь максимальной анонимности в сочетании с простотой использования. Приложение не требует какой-либо идентификации, номера телефона или идентификатора устройства. Приложение не запрашивает разрешения у других приложений пользователя, таких как: Контакты, Местоположение, Телефон и т.д. '],
        ['simplicity-title', 'Простота'],
        ['simplicity-text', 'Приложение имеет минимальный набор интуитивно понятных функций. Создание чата отличается простотой и происходит в два шага. Мы разработали очень простое в использовании приложение.'],
        ['possibilities-title', 'Возможности'],
        ['possibilities-text', 'Создание анонимного канала для неограниченного числа участников. BeProg позволяет создать канал, который имеет полный функционал с ролями администраторов и т.д.'],
        ['safety-title', 'Безопасность'],
        ['safety-text', 'Мы используем наш собственный метод, основанный на симметричном сквозном шифровании с использованием принципа «одноразовый блокнот».'],
        ['download-text', 'Загрузить'],

        ['how-card-first', 'В открытом приложении нажмите <img class="img-small" src="assets/images/icons/plus-text.svg" alt=""> внизу экрана'],
        ['how-card-second', 'Выберите «Приватный чат»'],
        ['how-card-third', 'Затем введите «Пароль» и название чата'],
        ['how-card-fourth', '  Нажмите «Далее» и все!'],
        ['how-card-text', 'Подождите, пока ваш визави сделает то же самое, и вы сможете <img src="assets/images/icons/how-icon.svg" alt=""> общаться!'],
    ],
    it: [
        ['hero-title', 'Messaggero anonimo BeProg'],
        ['hero-text', 'Ora puoi comunicare in modo anonimo, senza numero di telefono o registrazione.'],
        ['hero-block', 'Non sono richiesti né numero di telefono né registrazione.'],
        ['hero-title-second', 'Per chattare con qualcuno, è sufficiente una <span class="password-img"><img src="assets/images/password-img.svg" alt=""></span> password. '],
        ['hero-list-first', 'Tutte le chat sono protette dalla crittografia <span>simmetrica “one-time pad”</span>, dove ogni messaggio viene crittografato con una nuova chiave che non si ripete mai.'],
        ['hero-list-second', '<span>Per telefonare</span>, usa la password, non il numero di telefono.'],
        ['how-title', 'Come funziona in pratica:'],
        ['about-title', "BeProg è un'app di comunicazione completamente anonima"],
        ['about-card-title-first', 'Non richiede il numero di telefono'],
        ['about-card-text-first', 'Invece di scambiarsi i numeri di telefono, ci si scambia le password.'],
        ['about-card-title-second', 'Password'],
        ['about-card-text-second', 'Imposta una password, condividila con il tuo interlocutore e crea una chat privata per entrambi.'],
        ['about-card-title-third', 'Crea un canale'],
        ['about-card-text-third', 'Pubblica messaggi protetti per un pubblico illimitato'],
        ['about-card-title-fourth', 'Senza spam e senza pubblicità'],
        ['about-card-text-fourth', "BeProg è un'app senza pubblicità e senza spam"],
        ['banner-text', "L'app BeProg ti darà quella <img src='assets/images/icons/like-in-text.svg' alt=''> tranquillità che solo l'anonimato può garantire."],
        ['nav-link-first', "Informazioni sull'app"],
        ['nav-link-second', ' Come funziona'],
        ['nav-link-third', 'Vantaggi'],
        ['nav-link-fourth', ' Descrizione'],
        ['anonymity-title', 'Anonimato'],
        ['anonymity-text', "Abbiamo puntato sui massimi livelli di anonimato, ma allo stesso tempo l’app è facilissima da usare. L'app non richiede alcuna identificazione, numero di telefono o ID del dispositivo. L'app non richiede l'autorizzazione di altre applicazioni dell'utente come: Contatti, Posizione, Rubrica telefonica, ecc. "],
        ['simplicity-title', 'Semplicità'],
        ['simplicity-text', "L'app ha un set minimo di funzioni intuitive. La creazione di una chat è molto semplice e avviene in due fasi. Abbiamo sviluppato un'applicazione facilissima da usare."],
        ['possibilities-title', 'Possibilità'],
        ['possibilities-text', 'Crea canali anonimi per un numero illimitato di iscritti.'],
        ['safety-title', 'Безопасность'],
        ['safety-text', 'Utilizziamo il nostro metodo proprietario basato sulla crittografia simmetrica end-to-end con il principio del one-time pad.'],
        ['download-text', 'Scaricamento'],
        ['how-card-first', "Aprire l'app, premere <img class='img-small' src='assets/images/icons/plus-text.svg' alt=''> nella parte bassa dello schermo"],
        ['how-card-second', 'Scegliere «Chat privata»'],
        ['how-card-third', 'Digitare la password e il nome della chat'],
        ['how-card-fourth', 'Premere «Avanti», ed è fatta!'],
        ['how-card-text', "Aspettare finché l’altro utente faccia lo stesso, e ora potete <img src='assets/images/icons/how-icon.svg' alt=''> comunicare!"],
    ],
    fr: [
        ['hero-title', 'Messager anonyme BeProg'],
        ['hero-text', 'Communiquez de manière anonyme sans numéro de téléphone ni inscription.'],
        ['hero-block', "Aucun numéro de téléphone ni inscription n'est nécessaire"],
        ['hero-title-second', "Pour tchatter avec quelqu'un, il suffit d'un mot de <span class='password-img'><img src='assets/images/password-img.svg' alt=''></span> passe."],
        ['hero-list-first', "Tous les tchats sont protégés par un cryptage <span>symétrique « one-time pad »</span>, c'est-à-dire que chaque message est crypté à l'aide d'une nouvelle clé qui ne se répète jamais."],
        ['hero-list-second', 'Pour <span>passer des appels</span>, utilisez un mot de passe et non votre numéro de téléphone.'],
        ['how-title', 'Comment cela fonctionne-t-il dans la pratique ?'],
        ['about-title', 'BeProg est une application de communication totalement anonyme'],
        ['about-card-title-first', "Le numéro de téléphone <br> n'est pas nécessaire"],
        ['about-card-text-first', "Au lieu d'échanger des numéros de téléphone, échangez des mots de passe."],
        ['about-card-title-second', 'Mot de passe'],
        ['about-card-text-second', "Trouvez un mot de passe, partagez-le avec l'autre personne et créez un tchat privé pour vous deux."],
        ['about-card-title-third', 'Créez un canal'],
        ['about-card-text-third', 'Publiez des messages protégés'],
        ['about-card-title-fourth', 'Sans spam et sans publicité'],
        ['about-card-text-fourth', "L'application BeProg est sans publicité et sans spam"],
        ['banner-text', "L'application BeProg vous apportera la tranquillité d'esprit que seul l'anonymat <img src='assets/images/icons/like-in-text.svg' alt=''> peut procurer."],
        ['nav-link-first', "À propos de l'application"],
        ['nav-link-second', 'Comment ça fonctionne'],
        ['nav-link-third', 'Les avantages '],
        ['nav-link-fourth', ' Description '],
        ['anonymity-title', 'Anonymat'],
        ['anonymity-text', "Nous avons cherché à atteindre les plus hauts niveaux d'anonymat, tout en restant une application très facile à utiliser. L'application ne nécessite pas d'identification, de numéro de téléphone ou ID d'appareil. L'application ne demande pas la permission à d'autres applications de l'utilisateur telles que : Contacts, Localisation, Téléphone, etc."],
        ['simplicity-title', 'Simplicité'],
        ['simplicity-text', "L'application dispose d'un ensemble minimal de fonctions intuitives. La création d'un tchat est simple et se fait en deux étapes. Nous avons développé une application facile à utiliser."],
        ['possibilities-title', 'Possibilités'],
        ['possibilities-text', "Créez des canaux anonymes pour un nombre illimité d'abonnés."],
        ['safety-title', 'Безопасность'],
        ['safety-text', "Nous utilisons notre propre méthode basée sur le cryptage symétrique end-to-end combiné au principe du one-time pad."],
        ['download-text', 'Scaricamento'],
        ['how-card-first', "Ouvrez l'application, appuyez sur <img class='img-small' src='assets/images/icons/plus-text.svg' alt=''> en bas de l'écran"],
        ['how-card-second', 'Choisissez «Tchat privé»'],
        ['how-card-third', 'Saisissez votre mot de passe et votre nom de chat'],
        ['how-card-fourth', 'Appuyez sur «Suivant», et vous avez terminé!'],
        ['how-card-text', "Attendez que l'autre utilisateur fasse de même, et vous pouvez maintenant <img src='assets/images/icons/how-icon.svg' alt=''> communiquer!"],

    ],
}


const getCurrentLanguage = () => {
    const currentUrl = window.location.search;
    return new URLSearchParams(currentUrl).get('lang');
}

const changeLanguage = (langArray) => {
    if (!langArray) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('lang', 'en');
        window.location.search = urlParams;
    }
    if (getCurrentLanguage() === 'ru') {
        const languageImgArray = document.querySelectorAll('.language-img');

        if (languageImgArray.length) {
            languageImgArray.forEach(img => {
                const originalSrc = img.getAttribute('src');

                // Extract the file name and extension
                const parts = originalSrc.split('/');
                const fileNameWithExtension = parts[parts.length - 1];
                const extension = fileNameWithExtension.split('.').pop();
                const fileNameWithoutExtension = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf('.'));

                // Create the new src attribute value with "-ru" added
                const newFileName = fileNameWithoutExtension + "-ru." + extension;
                const newSrc = originalSrc.replace(fileNameWithExtension, newFileName);

                // Update the src attribute with the new value
                img.setAttribute('src', newSrc);
            });
        }
    }
    langArray.forEach(lang => {
        const elementArray = document.querySelectorAll(`.${lang[0]}`);
        if (elementArray.length) {
            elementArray.forEach(block => {
                block.innerHTML = lang[1];
            })
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {

    changeLanguage(languageObject[getCurrentLanguage()]);
    //animation init
    const animation = new Animations();
    animation.init();

    const videoArray = document.querySelectorAll('.video');

    if (videoArray.length) {
        videoArray.forEach(video => {
            const videoElement = document.querySelector('video');

            video.addEventListener('click', function (e) {
                if (!e.target.classList.contains('video__resize')) {
                    if (videoElement.paused) {
                        videoElement.play();
                        video.classList.add('play');
                    } else {
                        videoElement.pause();
                        video.classList.remove('play');
                        video.classList.remove('full');
                    }
                } else {
                    video.classList.toggle('full');
                }

            });
        })
    }

    const hero = document.querySelector('.hero');
    const header = document.querySelector('.header');

    if (hero) {
        const heroWrapper = document.querySelector('.hero-wrapper');
        const heroSection = document.querySelectorAll('.hero-section');

        heroSection.forEach(element => {
            const heroSectionText = element.querySelectorAll('.hero-section-text');

            if (heroSectionText.length) {
                heroSectionText.forEach((text, index) => {
                    text.style.transitionDelay = `${index * .2}s`
                });
            }
        });

        var swiper = new Swiper('.hero', {
            direction: "vertical",

            effect: 'fade',
            crossFade: true,
            speed: 500,
            touchReleaseOnEdges: false,
            // autoHeight: true,
            preventInteractionOnTransition: false,
            mousewheel: {
                invert: false,
                // forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: false,
                thresholdTime: 1500,
            },

            touchRatio: 0.5,
            resistanceRatio: 0,
            // longSwipes:false,

            init: function () {
                hero.dataset.current = this.realIndex;
            },

        });

        const swiperNew = new Swiper('.hero-section-column', {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            nested: true,
            init: false,
            spaceBetween: 30,
            slidesOffsetAfter: 1,
            touchMoveStopPropagation: true,
            shortSwipes: false,
            // preventInteractionOnTransition: false,
            mousewheel: {
                invert: false,
                // forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
                // thresholdTime: 500,
            },
            touchReleaseOnEdges: true,
            observer: true,
        });

        if (window.screen.width >= 1280) {

            swiper.on('slideChange', function () {
                hero.scrollIntoView({ behavior: 'smooth' });
                swiper.params.mousewheel.releaseOnEdges = false;
                swiper.params.touchReleaseOnEdges = false;
            });
            swiperNew[swiperNew.length - 1].on('reachEnd', function () {
                setTimeout(function () {
                    swiper.params.mousewheel.releaseOnEdges = true;
                    swiper.params.touchReleaseOnEdges = true;
                }, 500);
            });
        }



        // swiperNew[1].on('setTranslate', function () {
        //     const heroHeader = this.el.querySelector('.hero__header');
        //     hero.style.setProperty('--offsetTop-second', `${this.translate + heroHeader.getBoundingClientRect().height}px`);
        // });
        swiperNew[1].on('init', function () {
            const heroHeader = this.el.querySelector('.hero__header');
            hero.style.setProperty('--offsetTop-second', `${heroHeader.getBoundingClientRect().height}px`);
        });
        swiperNew[0].on('init', function () {
            const heroHeader = this.el.querySelector('.hero__header');
            hero.style.setProperty('--heroHeaderHeight', `${heroHeader.getBoundingClientRect().height}px`);
            hero.style.setProperty('--offsetTop', `${heroHeader.getBoundingClientRect().height}px`);
        });

        // swiperNew[0].on('setTranslate', function () {
        //     const heroHeader = this.el.querySelector('.hero__header');
        //     console.log(heroHeader.getBoundingClientRect().top)
        //     hero.style.setProperty('--offsetTop', `${this.translate + heroHeader.getBoundingClientRect().height}px`)
        // });

        swiperNew.forEach(slider => {
            slider.init();
        })

        // swiperNew[1].params.releaseOnEdges = false;

        swiper.on('slideChange', function () {
            hero.dataset.current = swiper.realIndex;
            // swiper.update();
            // hero.scrollIntoView({ behavior: "smooth" });

            heroSection.forEach((element, index) => {
                const heroSectionText = element.querySelectorAll('.hero-section-text');

                if (heroSectionText.length) {
                    if (index == swiper.realIndex) {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2 + 1}s`
                        });
                    } else {
                        heroSectionText.forEach((text, index) => {
                            text.style.transitionDelay = `${index * .2}s`
                        });
                    }
                }
            });

            if (swiper.realIndex > 0) {
                header.classList.remove('active')
            } else {
                header.classList.add('active');
            }
        });
    }


    const navLinkArray = document.querySelectorAll('.nav__link');

    if (navLinkArray.length && hero) {
        if (window.location.hash) {
            const hashBlock = document.querySelector(`${window.location.hash}`);
            hashBlock.scrollIntoView({ behavior: 'smooth' });
            if (window.location.hash !== '#hero') {
                swiper.slideTo(swiper.slides.length - 1);
            } else {
                swiper.slideTo(0);
            }
        }
        navLinkArray.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                burger.classList.remove('burger--active');
                header.classList.remove('header--active');
                const linkHash = e.target.hash;
                const hashBlock = document.querySelector(`${linkHash}`);
                if (!hashBlock) return
                window.location.hash = e.target.hash;
                if (linkHash === '#hero' && link.dataset.slide) {
                    hashBlock.scrollIntoView({ behavior: 'smooth' });
                    swiper.slideTo(link.dataset.slide);
                } else {
                    swiper.slideTo(swiper.slides.length - 1);
                    hashBlock.scrollIntoView({ behavior: 'smooth' });
                    document.body.style.setProperty('--header-height', `${document.querySelector('.header').getBoundingClientRect().height}px`)
                }
            });
        });
    }

    const burger = document.querySelector('.burger');


    burger.addEventListener('click', (e) => {
        e.preventDefault();

        burger.classList.toggle('burger--active');
        header.classList.toggle('header--active');

        if(header.classList.contains('header--active')){
            scrollLock.disablePageScroll();
        }else{
            scrollLock.enablePageScroll();
        }
    });


    const languageList = document.querySelectorAll('.language');

    if (languageList.length) {
        languageList.forEach(language => {
            const languageCurrent = language.querySelector('.language__current'),
                languageCurrentText = languageCurrent.querySelector('.language__text'),
                languageInput = language.querySelectorAll('input');

            languageInput.forEach(element => {
                if (element.value == getCurrentLanguage()) {
                    element.checked = true;
                }
            });

            const languageChecked = language.querySelector(':checked');

            languageCurrent.addEventListener('click', () => {
                language.classList.toggle('language--active');
            });

            language.addEventListener('change', (e) => {
                languageCurrentText.textContent = e.target.closest('.language-input').querySelector('.language-input__text').textContent;
                language.classList.remove('language--active');

                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('lang', e.target.value);
                window.location.search = urlParams;
            });

            languageCurrentText.textContent = languageChecked.closest('.language-input').querySelector('.language-input__text').textContent;
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language')) {
                // language.classList.remove('lanuguage--active');
                languageList.forEach(language => {
                    language.classList.remove('language--active');
                });
            }
        });
    }

    const headerButton = document.querySelector('.header__button'),
    headerQr = document.querySelector('.header__qr');

    headerButton.addEventListener('click',(e)=>{
        e.preventDefault();

        headerQr.classList.toggle('active');
        headerButton.classList.toggle('active');

        if(headerQr.classList.contains('active')){
            scrollLock.disablePageScroll();
        }else{
            scrollLock.enablePageScroll();
        }
    });
});