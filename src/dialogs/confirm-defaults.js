bsd.defaults.confirm = {
    // Callback : function
    callback: function (confirmed, event) {
        return true;
    },

    // The template used to generate dialog.
    template: "./src/dialogs/confirm.html",

    // The cancel button text.
    cancelText: "Cancel",

    // A class to append to cancel button.
    cancelClass: "btn-light",

    // The confirm button text.
    confirmText: "Validate",

    // A class to append to confirm button.
    confirmClass: "btn-primary"
};