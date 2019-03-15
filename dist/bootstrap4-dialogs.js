(function($) {
    /*
     * INITIALIZE BSD "SINGLETON"
     */

    window.bsd = new function() {
        var self = this;

        /*
         * DEFAULTS COMMON SETTINGS.
         */

        this.defaults = {
            // COMMON OPTIONS 
            // (available for all dialogs)

            dialog: {
                // An value to use as id attribute for the modal: [null] | string
                id: null,

                // Show the modal element when created : [true] | false | function
                // If a function is provided, the modal will be shown and the function will be used on show.bs.modal event.
                show: true,

                // Delete the modal element on hidden : [true] |false
                destroy: true,

                // Dialog size : [null] | 'modal-sm' | 'modal-lg' | 'modal-xl'
                size: null,

                // Include a backdrop element: [true] | false | 'static' 
                // With static option, backdrop doesn't close the modal on click.
                backdrop: true,

                // Closes the dialog when escape key is pressed: [true] |false
                keyboard: true,

                // Center vertically the dialog in the window: true | [false]
                vcenter: false,

                // Center horizontally the dialog text: true | [false]
                hcenter: false
            },

            // ALERT DIALOG

            alert: {
                // Callback : [null] | function
                callback: null,

                // The template used to generate dialog.
                template: "<div class=\"modal fade bsd-dialog bsd-alert\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-body\"><p class=\"lead bsd-message\"></p><div class=\"d-flex justify-content-center mt-3\"><button type=\"button\" class=\"btn bsd-close\" data-dismiss=\"modal\"></button></div></div></div></div></div>",

                // The close button text.
                closeText: "Validate",

                // A class to append to close button.
                closeClass: "btn-primary"
            },

            // CONFIRM DIALOG

            confirm: {
                // Callback : function
                callback: function(confirmed) {
                    return true;
                },

                // The template used to generate dialog.
                template: "<div class=\"modal fade bsd-dialog bsd-confirm\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-body\"><p class=\"lead bsd-message\"></p><div class=\"d-flex justify-content-between mt-3\"><button class=\"btn bsd-cancel\" data-dismiss=\"modal\"></button><button class=\"btn bsd-confirm\"></button></div></div></div></div></div>",

                // The cancel button text.
                cancelText: "Cancel",

                // A class to append to cancel button.
                cancelClass: "btn-light",

                // The confirm button text.
                confirmText: "Validate",

                // A class to append to confirm button.
                confirmClass: "btn-primary"
            },

            // PROMPT DIALOG

            prompt: {
                // Generate the prompt field : string | jQuery object | function (must return a jQuery object).
                // The prompt field MUST have the class "bsd-field".
                // If a function is provided, its return value MUST be compatible with jQuery "appendTo" function.
                field: function(multiline) {
                    if (multiline) {
                        return '<textarea class="form-control bsd-field"></textarea>';
                    }
                    return '<input type="text" class="form-control bsd-field"/>';
                },

                // Callback : function
                callback: function(value) {
                    return true;
                },

                // The template used to generate dialog.
                template: "<div class=\"modal fade bsd-dialog bsd-prompt\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"><div class=\"modal-dialog\" role=\"document\"><div class=\"modal-content\"><div class=\"modal-body\"><p class=\"lead bsd-message\"></p><div class=\"bsd-field-wrapper\"></div><div class=\"d-flex justify-content-between mt-3\"><button class=\"btn bsd-cancel\" data-dismiss=\"modal\"></button><button class=\"btn bsd-confirm\"></button></div></div></div></div></div>",

                // Is the prompt input multiline:  true | [false]
                multiline: false,

                // The cancel button text.
                cancelText: "Cancel",

                // A class to append to cancel button.
                cancelClass: "btn-light",

                // The confirm button text.
                confirmText: "Validate",

                // A class to append to confirm button.
                confirmClass: "btn-primary"
            }
        };

        /*
         * DIALOG CREATOR
         */

        this.dialog = function(type, options, customize) {
            // Configure.
            if (typeof options === 'function') {
                options = {
                    callback: options
                };
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
                $dialog.on('hidden.bs.modal', function() {
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

        this.alert = function(title, options) {
            return this.dialog("alert", options, function($dialog, settings) {
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

        this.confirm = function(title, options) {
            return this.dialog("confirm", options, function($dialog, settings) {
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
                    $dialog.on('keydown.dismiss.bs.modal', function(e) {
                        settings.callback(false, e);
                    });

                    // Close on click.
                    $dialog.on('click.dismiss.bs.modal', function(e) {
                        if (!$(e.target).is('.bsd-confirm')) {
                            settings.callback(false, e);
                        }
                    });

                    // Confirm button click.
                    $('.bsd-confirm', $dialog).click(function(e) {
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

        this.prompt = function(title, options) {
            return this.dialog("prompt", options, function($dialog, settings) {
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
                    $dialog.on('keydown.dismiss.bs.modal', function(e) {
                        settings.callback(null, e);
                    });

                    // Close on click.
                    $dialog.on('click.dismiss.bs.modal', function(e) {
                        if (!$(e.target).is('.bsd-confirm')) {
                            settings.callback(null, e);
                        }
                    });

                    // Confirm button click.
                    $('.bsd-confirm', $dialog).click(function(e) {
                        if (settings.callback($('bsd-field', $dialog).val(), e) !== false) {
                            $dialog.modal('hide');
                        }
                    });
                }
            });
        };
    };
}(jQuery));