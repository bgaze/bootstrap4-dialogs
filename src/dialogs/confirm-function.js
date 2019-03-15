bsd.confirm = function (title, options) {
    return this.dialog("confirm", options, function ($dialog, settings) {
        // Manage dialog title.
        if (!title) {
            $('.bsd-message', $dialog).remove();
        } else {
            $('.bsd-message', $dialog).html(title);
        }

        // Customize buttons.
        $('.bsd-cancel', $dialog).addClass(settings.cancelClass).text(settings.cancelText);
        $('.bsd-confirm', $dialog).addClass(settings.confirmClass).text(settings.confirmText);

        // Manage dialog events.
        if (typeof settings.callback === 'function') {
            // Close on Escape key.
            $dialog.on('keydown.dismiss.bs.modal', function (e) {
                settings.callback(false, e);
            });

            // Close on click.
            $dialog.on('click.dismiss.bs.modal', function (e) {
                if (!$(e.target).is('.bsd-confirm')) {
                    settings.callback(false, e);
                }
            });

            // Confirm button click.
            $('.bsd-confirm', $dialog).click(function (e) {
                if (settings.callback(true, e) !== false) {
                    $dialog.modal('hide');
                }
            });
        }
    });
};