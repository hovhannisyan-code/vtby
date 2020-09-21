jQuery(document).ready($ => {

    // Remove header active and show classes for other buttons and dropdowns
    const resetHeader = (button, dropdown) => {
        $('header .header__buttons [data-type="dropdown-button"]').not(button).removeClass('active');
        $('header [data-type="dropdown"]').not(dropdown).removeClass('show');
    };

    // On header dropdown button click
    $(document).on('click', '[data-type="dropdown-button"]', function() {
        $button = $(this);
        $dropdown = $(`${$($button).attr('data-href')}`);
        
        resetHeader($button, $dropdown);

        $button.toggleClass('active');
        $dropdown.toggleClass('show');
    });

    // Route open/close
    $(document).on('click', '.route', function() {
        $(this).toggleClass('active');
    });

    // Ticket form dropdown open/close
    $(document).on('click', '.item--dropdown', function() {
        $item = $(this);
        $dropdown = $item.children('.item__dropdown');

        $item.addClass('active');
        $dropdown.addClass('active');

        // On document click
        $(document).mouseup((event) => {
            
            // Ticket form dropdown close
            if (! $dropdown.is(event.target)
                && $dropdown.has(event.target).length === 0) {
                    $dropdown.removeClass('active');
                    $item.removeClass('active');
            }
        });
    });

    // On ticket for date dropdown button click
    $(document).on('click', '[data-type="calendar-button"]', function() {
        $('[data-type="calendar-button"]').removeClass('active');
        $(this).addClass('active');
    });

});