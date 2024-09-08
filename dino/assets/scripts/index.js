document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.carousel');
    const skinsBuyText = document.querySelector('.skins-buy__text');
    if(elems.length){
        var instances = M.Carousel.init(elems, {
            onCycleTo:function(data){
                if(data.dataset.text){
                    skinsBuyText.innerHTML = data.dataset.text;
                }
            }
        });
    }



    const navLinkArray = document.querySelectorAll('.nav-list__link');

    if(navLinkArray.length){
        navLinkArray.forEach(link=>{
            const linkImg = link.querySelector('.nav-list__img');
            link.addEventListener('click',(e)=>{
                e.preventDefault();


                linkImg.src = linkImg.dataset.hover;
            });
        });
    }
});