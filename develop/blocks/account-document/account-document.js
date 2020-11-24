(function() {
    const accountDocuments = document.querySelectorAll('.account-document');
    if (accountDocuments.length > 0) {
        accountDocuments.forEach(doc => {
            const header = doc.querySelector('.account-document__header');
            const body = doc.querySelector('.account-document__body');
            header.addEventListener('click', function() {
                doc.classList.toggle('active');
                header.classList.toggle('active');
                $(body).slideToggle(250)
            })
        })
    }
})();