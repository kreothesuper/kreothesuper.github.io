const profileCardLink = document.querySelector('.profile-card-link');

if(profileCardLink){
    const profileCardList = document.querySelector('.profile-card-list');
    document.addEventListener('click',(e)=>{
        if(!e.target.closest('.profile-card')){
            profileCardList.classList.remove('profile-card-list--active');
        }
    });

    profileCardLink.addEventListener('click',(e)=>{
        e.preventDefault();
        profileCardList.classList.toggle('profile-card-list--active');
    });
}