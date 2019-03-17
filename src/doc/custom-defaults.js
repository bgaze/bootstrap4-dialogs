bsd.defaults.mydialog = {
    // Callback : function
    callback: function () {
        return true;
    },

    // The template used to generate dialog.
    template: `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title bsd-title"></h5>
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