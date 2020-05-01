export default new class {

    constructor() {
        this.defaults = {
            dialog: {
                // Callback : [null] | function
                callback: null,

                // A value to use as id attribute for the modal: [null] | string
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

                // Center vertically the dialog in the window: [true] | false
                vcenter: true,

                // Center horizontally the dialog text: [true] |false
                hcenter: true,

                // Manage controls alignment: ['between'] | 'center' | 'start' | 'end' | 'around'
                controlsAlignment: 'between'
            },
            alert: {
                // The template used to generate dialog.
                template: `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <p class="lead bsd-message"></p>
                                            <div class="bsd-controls d-flex align-items-center mt-3">
                                                <button type="button" class="btn bsd-close" data-dismiss="modal"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`,

                // The close button options.
                closeText: 'Validate',
                closeClass: 'btn-primary',

                // Manage controls alignment: ['around'] | 'center' | 'start' | 'end' | 'between'
                controlsAlignment: 'around'
            },
            confirm: {
                // The template used to generate dialog.
                template: `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <p class="lead bsd-message"></p>
                                            <div class="bsd-controls d-flex align-items-center mt-3">
                                                <button class="btn bsd-cancel mr-1" data-dismiss="modal"></button>
                                                <button class="btn bsd-confirm ml-1"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`,

                // The cancel button options.
                cancelText: 'Cancel',
                cancelClass: 'btn-light',

                // The confirm button options.
                confirmText: 'Validate',
                confirmClass: 'btn-primary'
            },
            prompt: {
                // Generate the prompt field : string | jQuery object | function
                // If a function is provided, it MUST return a value compatible with jQuery "appendTo" function.
                field: function (multiline) {
                    if (multiline) {
                        return '<textarea class="form-control bsd-field"></textarea>';
                    }
                    return '<input type="text" class="form-control bsd-field"/>';
                },

                // Get current prompt value.
                // Receive the modal element and returns the user input.
                value: function ($dialog) {
                    return $('.bsd-field', $dialog).val();
                },

                // The template used to generate dialog.
                template: `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <p class="lead bsd-message"></p>
                                            <div class="bsd-field-wrapper"></div>
                                            <div class="bsd-controls d-flex align-items-center mt-3">
                                                <button class="btn bsd-cancel mr-1" data-dismiss="modal"></button>
                                                <button class="btn bsd-confirm ml-1"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`,

                // Is the prompt input multiline:  true | [false]
                multiline: false,

                // The cancel button options.
                cancelText: 'Cancel',
                cancelClass: 'btn-light',

                // The confirm button options.
                confirmText: 'Validate',
                confirmClass: 'btn-primary'
            }
        };
    }

    dialog(type, options, customize) {
        // Configure.
        if (typeof options === 'function') {
            options = {callback: options};
        }
        let settings = $.extend({}, this.defaults.dialog, this.defaults[type] || {}, options || {});

        // Create dialog element.
        let $dialog = $(settings.template).appendTo('body');

        // Add bsd classes to the dialog.
        $dialog.addClass('bsd-dialog').addClass('bsd-' + type);

        // Manage dialog id.
        if (settings.id) {
            $dialog.attr('id', settings.id);
        }

        // Manage dialog size.
        if (settings.size) {
            $('.modal-dialog', $dialog).addClass(settings.size);
        }

        // Manage vertically centered modal.
        if (settings.vcenter) {
            $('.modal-dialog', $dialog).addClass('modal-dialog-centered');
        }

        // Manage vertically centered modal.
        if (settings.hcenter) {
            $('.modal-dialog', $dialog).addClass('text-center');
        }

        // Manage controls alignment.
        if (!['start', 'end', 'between', 'around', 'center'].includes(settings.controlsAlignment)) {
            settings.controlsAlignment = 'between';
        }
        $('.bsd-controls', $dialog).addClass(`justify-content-${settings.controlsAlignment}`);

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

        // Detect modal dismiss with keyboard
        if (settings.keyboard) {
            $dialog.on('keydown.dismiss.bs.modal', function (e) {
                if (e.key === 'Escape') {
                    $dialog.trigger('dismiss.bsd');
                }
            });
        }

        // Detect modal dismiss on outside click
        if (settings.backdrop !== 'static') {
            $dialog.on('click.dismiss.bs.modal', function (e) {
                if (!$(e.target).is($('.modal-content, .modal-content *', $dialog))) {
                    $dialog.trigger('dismiss.bsd');
                }
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

    alert(title, options) {
        return this.dialog('alert', options, function ($dialog, settings) {
            // Manage dialog title.
            if (!title) {
                $('.bsd-message', $dialog).remove();
            } else {
                $('.bsd-message', $dialog).html(title);
            }

            // Customize close button.
            $('.bsd-close', $dialog).addClass(settings.closeClass).text(settings.closeText).click(function () {
                $dialog.trigger('dismiss.bsd');
            });

            // Manage dialog events.
            if (typeof settings.callback === 'function') {
                $dialog.on('dismiss.bsd', settings.callback);
            }
        });
    };

    confirm(title, options) {
        return this.dialog('confirm', options, function ($dialog, settings) {
            // Manage dialog title.
            if (!title) {
                $('.bsd-message', $dialog).remove();
            } else {
                $('.bsd-message', $dialog).html(title);
            }

            // Customize buttons.
            $('.bsd-cancel', $dialog).addClass(settings.cancelClass).text(settings.cancelText).click(function () {
                $dialog.trigger('dismiss.bsd');
            });
            $('.bsd-confirm', $dialog).addClass(settings.confirmClass).text(settings.confirmText).click(function () {
                $dialog.trigger('confirm.bsd');
            });

            // Manage dialog events.
            if (typeof settings.callback === 'function') {
                $dialog
                    .on('dismiss.bsd', function () {
                        settings.callback(false);
                    })
                    .on('confirm.bsd', function () {
                        if (settings.callback(true) !== false) {
                            $dialog.modal('hide');
                        }
                    })
                ;
            }
        });
    };

    prompt(title, options) {
        return this.dialog('prompt', options, function ($dialog, settings) {
            // Manage dialog title.
            if (!title) {
                $('.bsd-message', $dialog).remove();
            } else {
                $('.bsd-message', $dialog).html(title);
            }

            // Append prompt field based on config.
            let input = (typeof settings.field === 'function') ? settings.field(settings.multiline) : settings.field;
            $('.bsd-field-wrapper', $dialog).append(input);

            // Customize buttons.
            $('.bsd-cancel', $dialog).addClass(settings.cancelClass).text(settings.cancelText).click(function () {
                $dialog.trigger('dismiss.bsd');
            });
            $('.bsd-confirm', $dialog).addClass(settings.confirmClass).text(settings.confirmText).click(function () {
                $dialog.trigger('confirm.bsd');
            });

            // Manage dialog events.
            if (typeof settings.callback === 'function') {
                $dialog
                    .on('dismiss.bsd', function () {
                        settings.callback(null);
                    })
                    .on('confirm.bsd', function () {
                        if (settings.callback(settings.value($dialog)) !== false) {
                            $dialog.modal('hide');
                        }
                    })
                ;
            }
        });
    };
}