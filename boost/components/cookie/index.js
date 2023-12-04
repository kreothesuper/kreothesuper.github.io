const cookie = document.querySelector('.cookie');

if(cookie){
    const cookieClose = cookie.querySelectorAll('.cookie-close');

    cookieClose.forEach(close=>{
        close.addEventListener('click',(e)=>{
            e.preventDefault();

            cookie.classList.add('cookie--hidden');
        });
    });
}
