(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function (jQuery) {
            return (root.bsd = factory(jQuery));
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = (root.bsd = factory(require("jquery")));
    } else {
        root.bsd = factory(root.jQuery);
    }
}(this, function ($) {
    /*
     * INITIALIZE BSD "SINGLETON"
     */

    var bsd = new function () {
        var self = this;

        this.defaults = {};

        this.dialog = function (type, options, customize) {
            // Configure.
            if (typeof options === 'function') {
                options = {callback: options};
            }
            var settings = $.extend({}, self.defaults.dialog, self.defaults[type] || {}, options || {});

            // Create dialog element.
            var $dialog = $(settings.template).appendTo("body");

            // Add bsd classes to the dialog.
            $dialog.addClass('bsd-dialog').addClass('bsd-' + type);

            // Manage dialog id.
            if (settings.id) {
                $dialog.attr('id', settings.id);
            }

            // Manage dialog size.
            if (settings.size) {
                $('.modal-dialog').addClass(settings.size);
            }

            // Manage vertically centered modal.
            if (settings.vcenter) {
                $('.modal-dialog').addClass('modal-dialog-centered');
            }

            // Manage vertically centered modal.
            if (settings.hcenter) {
                $('.modal-dialog').addClass('text-center');
            }

            // Init Bootstrap modal.
            $dialog.modal({
                backdrop: settings.backdrop,
                keyboard: settings.keyboard,
                show: false
            });

            // Destroy modal on hide.
            if (settings.destroy) {
                $dialog.on('hidden.bs.modal', function () {
                    $dialog.modal('dispose').remove();
                });
            }

            // Show callback.
            if (typeof settings.show === 'function') {
                $dialog.on('show.bs.modal', settings.show);
            }

            // Customize dialog element.
            customize($dialog, settings);

            // Show the dialog.
            if (settings.show) {
                $dialog.modal('show');
            }

            // Return dialog element.
            return $dialog;
        };

    };

    /*
     * DEFAULTS COMMON SETTINGS.
     */

    "./src/dialogs/common-defaults.js"

    /*
     * ALERT
     */

    "./src/dialogs/alert-defaults.js"

    "./src/dialogs/alert-function.js"

    /*
     * CONFIRM
     */

    "./src/dialogs/confirm-defaults.js"

    "./src/dialogs/confirm-function.js"

    /*
     * PROMPT
     */

    "./src/dialogs/prompt-defaults.js"

    "./src/dialogs/prompt-function.js"

    /*
     * RETURN
     */

    return bsd;
}));
