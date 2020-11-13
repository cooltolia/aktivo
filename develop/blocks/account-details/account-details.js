(function () {
    const accountDetails = document.querySelector('.account__details');

    var $dropdown = $('.tt-dropdown-menu');
    if ($dropdown.length == 0) return;

    new SimpleBar($dropdown[0], {
        autoHide: false,
    });
})();
