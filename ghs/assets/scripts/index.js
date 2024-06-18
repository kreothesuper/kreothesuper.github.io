document.addEventListener('DOMContentLoaded',()=>{
    const languageList = document.querySelectorAll('.language');

    if(languageList.length){
        languageList.forEach(language=>{
            const languageCurrent = language.querySelector('.language__current'),
            languageCurrentText = languageCurrent.querySelector('.language__text');

            languageCurrent.addEventListener('click',()=>{
                language.classList.toggle('language--active');
            });

            language.addEventListener('change',(e)=>{
                languageCurrentText.textContent = e.target.value;
                language.classList.remove('language--active');
            });
        });
        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.language')){
                // language.classList.remove('lanuguage--active');
                languageList.forEach(language=>{
                    language.classList.remove('language--active');
                });
            }
        });
    }

    const searchArray = document.querySelectorAll('.search');

    if(searchArray.length){
        searchArray.forEach(search=>{
            const searchInput = search.querySelector('input');
            search.addEventListener('input',()=>{
                search.classList.add('search--active')
            });
            search.addEventListener('click',()=>{
                search.classList.add('search--active')
            });
            search.addEventListener('change',()=>{
                search.classList.add('search--active')
            });

            searchInput.addEventListener('blur',()=>{
                search.classList.remove('search--active');
                search.reset();
            });
        });
    }
});