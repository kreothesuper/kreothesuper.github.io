document.addEventListener('DOMContentLoaded',()=>{
    const dropDownArray = document.querySelectorAll('.js-dropdown');

    if(dropDownArray.length){
        dropDownArray.forEach(dropDown=>{
            const dropDownLink = dropDown.querySelector('.js-dropdown-link');

            dropDownLink.addEventListener('click',(e)=>{
                e.preventDefault();

                dropDownArray.forEach(dropDownElement=>{
                    dropDownElement !== dropDown ? dropDownElement.classList.remove('active') : null;
                });
                dropDown.classList.toggle('active');
            });
        });

        document.addEventListener('click',(e)=>{
            if(!e.target.closest('.js-dropdown')){
                dropDownArray.forEach(dropDown=>dropDown.classList.remove('active'));
            }
        });
    }
});