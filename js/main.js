jQuery(document).ready($ => {

    // Close header dropdowns and remove active classes of buttons
    const resetHeader = (button, dropdown) => {
        $('header .header__buttons [data-type="dropdown-button"]').not(button).removeClass('active');
        $('header [data-type="dropdown"]').not(dropdown).removeClass('show');
    };

    const filterCities = (input, items) => {
        console.log(items);
        items.each((index, element) => {
            console.log($(element).text())
        });
    }

    // On header dropdown button click
    $(document).on('click', '[data-type="dropdown-button"]', function() {
        var $button = $(this);
        var $dropdown = $(`${$($button).attr('data-href')}`);
        
        resetHeader($button, $dropdown);

        $button.toggleClass('active');
        $dropdown.toggleClass('show');
    });

    // Route open/close
    $(document).on('click', '.route', function() {
        $(this).toggleClass('active');
    });

    // Ticket form dropdown open/close
    $(document).on('click', '.item--dropdown', function(event) {
        var $item = $(this);
        var $dropdown = $item.children('.item__dropdown');

        if(! $(event.target).parent().is('#city-from, #city-to')
            && ! $(event.target).parent().is('#passengers-list')) {
            $item.addClass('active');
        }

        // On document click
        $(document).mouseup((event) => {
            // Ticket form dropdown close
            if (! $dropdown.is(event.target) && $dropdown.has(event.target).length === 0) {
                $item.removeClass('active');
            }
        });
    });

    // Change ticket form dropdown levels
    $(document).on('input click', '.item--dropdown input', function() {
        var $input = $(this);
        var $dropdown = $(this).siblings('.item__dropdown');

        if ($input.val().length) {
            $dropdown.children('.dropdown__level').not('.dropdown__level--search').hide();
            $dropdown.children('.dropdown__level--search').show();

            filterCities($input, $input.siblings('.item__dropdown').find('.dropdown__level--search .dropdown__list .dropdown__item'));
        } else {
            $dropdown.children('.dropdown__level--country').show();
            $dropdown.children('.dropdown__level--search').hide();
        }
    });

    // On date dropdown button click
    $(document).on('click', '[data-type="calendar-button"]', function() {
        var $dropdown = $(this).closest('.item__dropdown');

        $dropdown.find('[data-type="calendar-button"]').removeClass('active');
        $(this).addClass('active');
    });

    // On country item click
    $(document).on('click', '#country-from .dropdown__item, #country-to .dropdown__item', function() {
        var $dropdown = $(this).closest('.item__dropdown');

        $(this).siblings('.dropdown__item').removeClass('active');
        $(this).addClass('active');

        $dropdown.find('.dropdown__level--city').show();
    });

    // On city item hover
    $(document).on('mouseenter', '#city-from .dropdown__item, #city-to .dropdown__item', function() {
        var $input = $(this).closest('.item__dropdown').siblings('.ticket-form__input');

        $input.attr('placeholder', $(this).text());
    });

    // On city item click
    $(document).on('click', '#city-from .dropdown__item, #city-to .dropdown__item', function() {
        var $item = $(this).closest('.item--dropdown');
        var $input = $(this).closest('.item__dropdown').siblings('.ticket-form__input');
        var $next = $(`${$item.attr('data-href')}`);

        $input.val($(this).text());

        $input.parent('.item--dropdown').removeClass('active');

        $next.trigger('click');
    });

    // Ticket form passengers select output
    $('#passengers option').each((index, element) => {
        $('#passengers-list').append(`<li class="dropdown__item">${$(element).text()}</li>`);
    });

    // On passengers select item hover
    $(document).on('mouseenter', '#passengers-list .dropdown__item', function() {
        var text = $(this).text();
        $('#passengers').siblings('.item__preview').children('.preview__selected').attr('placeholder', text);
    });

    // On passengers select item click
    $(document).on('click', '#passengers-list .dropdown__item', function() {
        var text = $(this).text();
        $(this).closest('.item--dropdown').removeClass('active');
        $('#passengers').siblings('.item__preview').children('.preview__selected').val(text);
    });

});