jQuery(document).ready($ => {

    $('#menu-button').click(function() {
        $('.header__buttons button:not(.language-button)').removeClass('active');
        $('[data-type="dropdown"]').removeClass('show');

        $(this).toggleClass('active');
        $('#menu').toggleClass('show');
    });

    $('#language-button').click(function() {
        $('.header__buttons button:not(.language-button)').removeClass('active');
        $('[data-type="dropdown"]').removeClass('show');

        $(this).toggleClass('active');
        $('#language-list').toggleClass('show');
    });

    $('.route').click(function() {
        $(this).toggleClass('active');
    });

});