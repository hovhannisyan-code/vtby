jQuery(document).ready($ => {

    // Menu open
    $('#menu-button').click(function() {
        $('.header__buttons button').not('.language-button').removeClass('active');
        $('[data-type="dropdown"]').removeClass('show');

        $(this).toggleClass('active');
        $('#menu').toggleClass('show');
    });

    // Language list open
    $('#language-button').click(function() {
        $('.header__buttons button').not('.language-button').removeClass('active');
        $('[data-type="dropdown"]').removeClass('show');

        $(this).toggleClass('active');
        $('#language-list').toggleClass('show');
    });

    // Route open
    $('.route').click(function() {
        $(this).toggleClass('active');
    });

    // Ticket form dropdown open
    $('.ticket-form__input').click(function() {
        $(this).siblings('.item__dropdown').addClass('active');
        
        // On document click
        $(document).mouseup((event) => {
            let $dropdown = $('.item__dropdown');
            
            // Ticket form dropdown close
            if (! $dropdown.is(event.target)
                && $dropdown.has(event.target).length === 0) {
                    $dropdown.removeClass('active');
            }
        });
    });

});