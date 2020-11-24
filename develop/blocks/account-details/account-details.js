(function () {
    const accountDetails = document.querySelector('.account-details');
    if (!accountDetails) return;

    const dropdowns = document.querySelectorAll('.tt-dropdown-menu');
    dropdowns.forEach((dd) => {
        new SimpleBar(dd, {
            autoHide: false,
        });
    });

    /** upload files logic */
    const dropzones = document.querySelectorAll('.account-details__file-upload');
    dropzones.forEach((dz) => {
        initNewDropZone(dz);
    });

    function initNewDropZone(target) {
        const status = target.querySelector('.account-details__upload-status');

        const dropz = new Dropzone(target, {
            url: 'upload.php',
            maxFiles: 1,
            maxFilesize: 2,
            autoProcessQueue: false,
            acceptedFiles: 'image/*',
            dictFileTooBig: 'Слишком большой вес файла',
            dictInvalidFileType: 'Выберите изображение',
            // addRemoveLinks: true,
            // thumbnailWidth: '190',
            // thumbnailHeight: '250',
        });

        dropz.on('uploadprogress', function (file) {});

        dropz.on('addedfile', function (file, e) {
            target.classList.remove('error');
            target.classList.add('success');
            status.textContent = '';
        });

        dropz.on('success', function (file) {});

        dropz.on('error', function (file, reason) {
            target.classList.remove('success');
            target.classList.add('error');
            status.textContent = reason;
        });
    }
})();
