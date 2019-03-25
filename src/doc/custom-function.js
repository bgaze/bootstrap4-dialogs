bsd.mydialog = function (title, subtitle, options) {
    return this.dialog("mydialog", options, function ($dialog, settings) {
        // Manage dialog texts.
        $('.bsd-title', $dialog).html(title || '');
        $('.bsd-subtitle', $dialog).html(subtitle || '');

        // Customize buttons.
        $('.bsd-no', $dialog).addClass(settings.noClass).text(settings.noText);
        $('.bsd-maybe', $dialog).addClass(settings.maybeClass).text(settings.maybeText);
        $('.bsd-yes', $dialog).addClass(settings.yesClass).text(settings.yesText);

        // Manage dialog callback.
        if (typeof settings.callback === 'function') {
            // Close on Escape key.
            $dialog.on('keydown.dismiss.bs.modal', function (e) {
                settings.callback('no', e);
            });

            // Close on click.
            $dialog.on('click.dismiss.bs.modal', function (e) {
                if (!$(e.target).is('.bsd-maybe, .bsd-yes')) {
                    settings.callback('no', e);
                }
            });

            // Maybe button click.
            $('.bsd-maybe', $dialog).click(function (e) {
                if (settings.callback('maybe', e) !== false) {
                    $dialog.modal('hide');
                }
            });

            // Yes button click.
            $('.bsd-yes', $dialog).click(function (e) {
                if (settings.callback('yes', e) !== false) {
                    $dialog.modal('hide');
                }
            });
        }
    });
};