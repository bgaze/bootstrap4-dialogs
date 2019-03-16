// The dialog options.
// Remember that they inherit from bsd.defaults.dialog

bsd.defaults.mydialog = {
    // Callback : [null] | function
    callback: function () {
        return true;
    },

    // The template used to generate dialog.
    template: `<div class="modal fade bsd-dialog bsd-alert" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title bsd-message"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p class="bsd-subtitle"></p>
                            </div>
                            <div class="modal-footer justify-content-between">
                                <button type="button" class="btn bsd-no" data-dismiss="modal"></button>
                                <button type="button" class="btn bsd-maybe"></button>
                                <button type="button" class="btn bsd-yes"></button>
                            </div>
                        </div>
                    </div>
                </div>`,

    // Center vertically the dialog in the window: [true] | false
    vcenter: true,

    // Center horizontally the dialog text: [true] | false
    hcenter: true,

    // No button.
    noText: "No",
    noClass: "btn-danger",

    // Maybe button.
    maybeText: "Maybe",
    maybeClass: "btn-primary",

    // Yes button.
    yesText: "Yes",
    yesClass: "btn-success"
};

// The dialog function

bsd.mydialog = function (title, subtitle, options) {
    return this.dialog("mydialog", options, function ($dialog, settings) {
        // Manage dialog title.
        if (!title) {
            $('.bsd-message', $dialog).remove();
        } else {
            $('.bsd-message', $dialog).html(title);
        }

        // Manage subtitle.
        $('.bsd-subtitle', $dialog).html(subtitle || '');

        // Customize buttons.
        $('.bsd-no', $dialog).addClass(settings.noClass).text(settings.noText);
        $('.bsd-maybe', $dialog).addClass(settings.maybeClass).text(settings.maybeText);
        $('.bsd-yes', $dialog).addClass(settings.yesClass).text(settings.yesText);

        // Manage dialog events.
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

            // Maybe button click.
            $('.bsd-yes', $dialog).click(function (e) {
                if (settings.callback('yes', e) !== false) {
                    $dialog.modal('hide');
                }
            });
        }
    });
};

// Usage

$('#mydialog-demo').click(function () {
    var subtitle = 'Phasellus ultricies dolor ac velit tempus lobortis.'
            + '<br>Duis ipsum justo, viverra et molestie eget, congue in nunc.';

    bsd.mydialog('Do you like my custom dialog?', subtitle, function (value, e) {
        console.log(value);
        return true;
    });
});
