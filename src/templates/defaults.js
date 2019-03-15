bsd.defaults = {
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
        template: "./src/templates/alert.html",

        // The close button text.
        closeText: "Validate",

        // A class to append to close button.
        closeClass: "btn-primary"
    },
    
    // CONFIRM DIALOG
    
    confirm: {
        // Callback : function
        callback: function (confirmed) {
            return true;
        },

        // The template used to generate dialog.
        template: "./src/templates/confirm.html",

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
        field: function (multiline) {
            if (multiline) {
                return '<textarea class="form-control bsd-field"></textarea>';
            }
            return '<input type="text" class="form-control bsd-field"/>';
        },

        // Callback : function
        callback: function (value) {
            return true;
        },

        // The template used to generate dialog.
        template: "./src/templates/prompt.html",

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