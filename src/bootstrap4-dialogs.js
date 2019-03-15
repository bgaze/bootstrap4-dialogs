(function ($) {
    /*
     * INITIALIZE BSD "SINGLETON"
     */

    window.bsd = new function () {
        var self = this;

        /*
         * DEFAULTS COMMON SETTINGS.
         */

        "./src/templates/defaults.js"

        /*
         * DIALOG CREATOR
         */

        this.dialog = function (type, options, customize) {
            // Configure.
            if (typeof options === 'function') {
                options = {callback: options};
            }
            var settings = $.extend({}, self.defaults.dialog, self.defaults[type] || {}, options || {});

            // Create dialog element.
            var $dialog = $(settings.template).appendTo("body");

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

        /*
         * ALERT
         */

        this.alert = function (title, options) {
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

        /*
         * CONFIRM
         */

        this.confirm = function (title, options) {
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

        /*
         * PROMPT
         */

        this.prompt = function (title, options) {
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
    };
}(jQuery));
