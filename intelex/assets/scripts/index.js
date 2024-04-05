document.addEventListener('DOMContentLoaded',()=>{
    const fileInputArray = document.querySelectorAll('.file-input');

    if(fileInputArray.length){
        fileInputArray.forEach(input=>{
            const inputText = input.querySelector('.file-input__checkmark');
            if(!inputText) return
            input.addEventListener('change',(e)=>{
                const file = e.target.files[0];
                inputText.textContent = file.name;
            });
        })
    }

    const blockArray = document.querySelectorAll('.js-block');

    if(blockArray.length){
        blockArray.forEach(block=>{
            const blockLink = block.querySelector('.js-block-toggle');

            blockLink.addEventListener('click',(e)=>{
                e.preventDefault();

                block.classList.toggle('active');
            });
        });
    }
});