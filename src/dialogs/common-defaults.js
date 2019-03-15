bsd.defaults.dialog = {
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
};