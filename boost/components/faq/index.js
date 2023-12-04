// faq
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length) {
    faqItems.forEach(faqItem => {
        const faqItemHeader = faqItem.querySelector('.faq-item__header');

        faqItemHeader.addEventListener("click", (e) => {
            e.preventDefault();

            faqItem.classList.toggle('faq-item--active');
        });
    });
}