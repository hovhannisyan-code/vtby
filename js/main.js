jQuery(document).ready($ => {

    // Close header dropdowns and remove active classes of buttons
    const resetHeader = (button, dropdown) => {
        $('header .header__buttons [data-type="dropdown-button"]').not(button).removeClass('active');
        $('header [data-type="dropdown"]').not(dropdown).removeClass('show');
    };

    // Filter ticket form cities dropdown by input value
    const filterCities = ($input, items) => {
        items.each((index, element) => {
            let inputValue = $input.val().trim().toLowerCase(),
                elementValue = $(element).attr('data-value').trim().toLowerCase();

            $(element).show();

            if (elementValue.indexOf(inputValue) < 0) {
                $(element).hide();
            } else {
                elementValue = elementValue.replace(/\s/g, '');
                elementValue = elementValue.replace(inputValue, '<b>' + inputValue.toUpperCase() + '</b>');

                $(element).children('span.city').html(elementValue);
            }
        });
    }

    // On header dropdown button click
    $(document).on('click', '[data-type="dropdown-button"]', function() {
        var $button = $(this);
        var $dropdown = $(`${$($button).attr('data-href')}`);
        
        resetHeader($button, $dropdown);

        if ($(this).attr('data-toggle') == 'modal')
            return;

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
        
        if(! $(event.target).closest('.dropdown__list').is('#city-from, #city-to, #city-from-search, #city-to-search, #passengers-list')) {
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

    // On ticket form switch click
    $(document).on('click', 'button.ticket-switch', function() {
        let fromValue = $('#from').val();
        let toValue = $('#to').val();

        $('#from').val(toValue);
        $('#to').val(fromValue);
    });

    // On date dropdown button click
    $(document).on('click', '[data-type="calendar-button"]', function() {
        var $dropdown = $(this).closest('.item__dropdown');

        if ($(this).is('.active')) {
            $(this).removeClass('active');
            
            return;
        }

        $dropdown.find('[data-type="calendar-button"]').removeClass('active');
        $(this).siblings('[data-type="calendar-button"]').removeClass('active');
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
    $(document).on('click', '#city-from .dropdown__item, #city-to .dropdown__item, #city-from-search .dropdown__item, #city-to-search .dropdown__item', function() {
        var $item = $(this).closest('.item--dropdown');
        var $input = $(this).closest('.item__dropdown').siblings('.ticket-form__input');
        var $next = $(`${$item.attr('data-href')}`);

        if ($(this).parent().is('#city-from-search, #city-to-search'))
            $input.val($(this).attr('data-value'));
        else
            $input.val($(this).text());

        $input.parent('.item--dropdown').removeClass('active');

        $next.trigger('click');
    });

    // Ticket form passengers select output
    $('#passengers option').each((index, element) => {
        $('#passengers-list').append(`<li class="dropdown__item" data-value="${$(element).val()}">${$(element).text()}</li>`);
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
        $('#passengers').val($(this).attr('data-value'));
    });

    // On password hide click
    $(document).on('click', '.password-hide', function() {
        $input = $(this).siblings('input');
        
        $(this).toggleClass('hide show');

        if ($input.attr('type') == 'text')
            $input.attr('type', 'password')
        else
            $input.attr('type', 'text');
    });

    // On modal button click
    $(document).on('click', '[data-type="modal-open"]', function() {
        $('.modal').modal('hide');

        console.log($(`${$(this).attr('data-href')}`));
        $(`${$(this).attr('data-href')}`).modal('show');
    });

    // On trip click
    $(document).on('click', '.trip__wrapper', function() {
        $(this).closest('.trip').toggleClass('active');
    });

    // On parent trip open click
    $(document).on('click', '.trip--parent .trip__open', function() {
        $(this).closest('.trip--parent').toggleClass('open');
    });

    // Timebar slider "from"
    $('#timebar-slider-from').slick({
        dots: false,
        infinite: false,
        speed: 750,
        prevArrow: $('#timebar-slider-from-prev'),
        nextArrow: $('#timebar-slider-from-next'),
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 500
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500
                }
            }
        ]
    });

    // Timebar slider "to"
    $('#timebar-slider-to').slick({
        dots: false,
        infinite: false,
        speed: 750,
        prevArrow: $('#timebar-slider-to-prev'),
        nextArrow: $('#timebar-slider-to-next'),
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 500
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500
                }
            }
        ]
    });

    // On seat click
    $(document).on('click', '.seat', function() {
        if ($(this).hasClass('seat--busy'))
            return;

        $(this).closest('.scheme__seats').find('.seat').not(this).removeClass('seat--selected');

        $(this).toggleClass('seat--selected');
    });

    // Init place tooltip
    $('[data-toggle="tooltip"][toggle-type="place"]').tooltip({
        template: '<div class="tooltip tooltip--place" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // Init hint tooltip
    $('[data-toggle="tooltip"][toggle-type="hint"]').tooltip({
        template: '<div class="tooltip tooltip--hint" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // Form select click
    $(document).on('click', '.form-select .select-item', function() {
        $(this).siblings('.select-item').removeClass('active');
        $(this).addClass('active');
    });

});