bsd.alert = function (title, options) {
    return this.dialog("alert", options, function ($dialog, settings) {
        // Manage dialog title.
        if (!title) {
            $('.bsd-message', $dialog).remove();
        } else {
            $('.bsd-message', $dialog).html(title);
        }

        // Customize close button.
        $('.bsd-close', $dialog).addClass(settings.closeClass).text(settings.closeText);

        // Manage dialog events.
        if (typeof settings.callback === 'function') {
            $dialog.on('click.dismiss.bs.modal keydown.dismiss.bs.modal', settings.callback);
        }
    });
};