bsd.prompt = function (title, options) {
    return this.dialog("prompt", options, function ($dialog, settings) {
        // Manage dialog title.
        if (!title) {
            $('.bsd-message', $dialog).remove();
        } else {
            $('.bsd-message', $dialog).html(title);
        }

        // Append prompt field based on config.
        var input = (typeof settings.field === 'function') ? settings.field(settings.multiline) : settings.field;
        $('.bsd-field-wrapper', $dialog).append(input);

        // Customize buttons.
        $('.bsd-cancel', $dialog).addClass(settings.cancelClass).text(settings.cancelText);
        $('.bsd-confirm', $dialog).addClass(settings.confirmClass).text(settings.confirmText);

        // Manage dialog events.
        if (typeof settings.callback === 'function') {
            // Close on Escape key.
            $dialog.on('keydown.dismiss.bs.modal', function (e) {
                settings.callback(null, e);
            });

            // Close on click.
            $dialog.on('click.dismiss.bs.modal', function (e) {
                if (!$(e.target).is('.bsd-confirm')) {
                    settings.callback(null, e);
                }
            });

            // Confirm button click.
            $('.bsd-confirm', $dialog).click(function (e) {
                if (settings.callback($('bsd-field', $dialog).val(), e) !== false) {
                    $dialog.modal('hide');
                }
            });
        }
    });
};