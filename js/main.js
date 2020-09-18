jQuery(document).ready($ => {

    $('#menu-button').click(function() {
        $(this).toggleClass('active');

        $('#menu').toggleClass('show');
    })

});