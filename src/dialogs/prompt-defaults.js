bsd.defaults.prompt = {
    // Generate the prompt field : string | jQuery object | function (must return a jQuery object).
    // The prompt field MUST have the class "bsd-field".
    // If a function is provided, its return value MUST be compatible with jQuery "appendTo" function.
    field: function (multiline) {
        if (multiline) {
            return '<textarea class="form-control bsd-field"></textarea>';
        }
        return '<input type="text" class="form-control bsd-field"/>';
    },

    // Callback : function
    callback: function (value, event) {
        return true;
    },

    // The template used to generate dialog.
    template: "./src/dialogs/prompt.html",

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
};