(function () {
    const accountDetails = document.querySelector('.account-details');
    if (!accountDetails) return;

    const $dropdown = $('.tt-dropdown-menu');
    if ($dropdown.length == 0) return;

    new SimpleBar($dropdown[0], {
        autoHide: false,
    });

    /** upload files logic */
    $('.account-details__file-upload').each(function () {
        initNewDropZone($(this)[0]);
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
            dictInvalidFileType: 'Выберите изображение'
            // addRemoveLinks: true,
            // thumbnailWidth: '190',
            // thumbnailHeight: '250',
        });

        dropz.on('uploadprogress', function (file) {
            debugger;
            // const $add = $(file.previewElement).siblings('.add');
            // const $progressBar = $(file.previewElement).find('.dz-upload');

            // $progressBar.css('opacity', 1);
            // $add.css('opacity', 0);
        });

        dropz.on('addedfile', function (file, e) {
            target.classList.remove('error');
            target.classList.add('success');
            status.textContent = ''
        });

        dropz.on('success', function (file) {
            debugger;
            // const $progressBar = $(file.previewElement).find('.dz-upload');

            // $progressBar.css('opacity', 0);
        });

        dropz.on('error', function (file, reason) {
            debugger;
            target.classList.remove('success');
            target.classList.add('error');
            status.textContent = reason;
            // const $progressBar = $(file.previewElement).find('.dz-upload');

            // $progressBar.css('opacity', 0);
        });
    }
})();
