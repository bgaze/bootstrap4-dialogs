# Bootstrap 4 dialogs

## Quick start

BSD requires jQuery v1.9.1+, Bootstrap 4 modal component, and Bootstrap's CSS.

Several quick start options are available:

*   Download the latest release: [https://github.com/bgaze/bootstrap4-dialogs/releases](https://github.com/bgaze/bootstrap4-dialogs/releases)
*   Clone the repo: `git clone https://github.com/bgaze/bootstrap4-dialogs.git`
*   Install with npm: `npm install TODO`
*   Install with yarn: `yarn add TODO`
*   Install with Composer: `composer TODO`
*   Install with Bower: `bower install TODO`
*   Install via CDN: `TODO`

Just make sure to include required dependencies into your app, then the library script `bootstrap4-dialogs.min.js`.  
That's it! You can use the globally declared `bsd` object :

**HTML**

```html
<button class="btn btn-primary" id="demo1">Alert</button>
<button class="btn btn-primary" id="demo2">Confirm</button>
<button class="btn btn-primary" id="demo3">Prompt</button>
<button class="btn btn-primary" id="demo4">Multiline prompt</button>
<button class="btn btn-primary" id="demo5">Customized dialog</button>
```

**Javascript**

```javascript
$('#demo1').click(function () {
    bsd.alert('Lorem ipsum dolor sit amet');
});

$('#demo2').click(function () {
    bsd.confirm('Lorem ipsum dolor sit amet');
});

$('#demo3').click(function () {
    bsd.prompt('Lorem ipsum dolor sit amet');
});

$('#demo4').click(function () {
    bsd.prompt('Lorem ipsum dolor sit amet', {multiline: true});
});

$('#demo5').click(function () {
    bsd.prompt('Most of this dialog options are customized.', {
        field: function () {
            var $select = $('<select>').addClass('form-control bsd-field');
            for (var i = 1; i < 4; i++) {
                $('<option>').text('Option ' + i).appendTo($select);
            }
            return $select;
        },
        id: 'my-customized-modal',
        size: 'modal-sm',
        backdrop: 'static',
        keyboard: false,
        vcenter: true,
        hcenter: true,
        cancelText: "No",
        cancelClass: "btn-danger btn-sm",
        confirmText: "Yes",
        confirmClass: "btn-success btn-sm"
    });
});
```

## Usage

This section applies to all provided dialog functions (**bsd.alert**, **bsd.confirm**, **bsd.prompt**).

When called, a customized Boostrap 4 modal will be dynamically built and inserted into the document.  
Unless explicitly specified through options, the modal is automatically shown when created, and destroyed then removed from the DOM when closed.

**Arguments**

Dialog functions accept two arguments:

*   **title:** the html to insert into the dialog popup title.  
    If undefined, the title element will be removed from the modal.
*   **options:** an optional set of options. If a function is provided, it will be used as dialog callback.  
    All available options can be customized / overrided globally, see [options](#options) sections for details.

```javascript
// Simple alert.

bsd.confirm('A message to display');

// Direct callback assignement.

bsd.confirm('A message to display', function (confirmed) {
    if (confirmed) {
        console.log('Confirmed !');
    }
});

// Customized prompt dialog.

bsd.prompt('A message to display', {
    callback: function (value) {
        if (value !== null) {
            console.log(value);
        }
    },
    size: 'sm',
    cancelText: "No",
    confirmText: "Yes"
});
```

**Handling dialogs**

Each dialog function returns it's modal element as a jQuery object, so Bootstrap modal events and method can be directly used.

```javascript
// With the "show" option activated, the "show.bs.modal" event is fired before returning the modal. 
// To use that event, you need to manage modal opening manually:

bsd.alert('A message to display', {show: false})
        .on('show.bs.modal', function (e) {
            // ...
        })
        .modal('show');

// As a shortand, you can directly pass your callback to the "show" option :

bsd.alert('A message to display', {
    show: function (e) {
        // ...
    }
});

// Methods and other events can be use directly:

bsd.alert('A message to display')
        .on('shown.bs.modal', function (e) {
            // ...
        })
        .modal('handleUpdate');
```

## Options

```javascript
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
```

## Alert

**Default options :**

```javascript
bsd.defaults.alert = {
    // Callback : [null] | function
    callback: null,

    // The template used to generate dialog.
    template: "[See below]",

    // The close button text.
    closeText: "Validate",

    // A class to append to close button.
    closeClass: "btn-primary"
};
```

**Default template :**

```html
<div class="modal fade bsd-dialog bsd-alert" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p class="lead bsd-message"></p>
                <div class="d-flex justify-content-center mt-3">
                    <button type="button" class="btn bsd-close" data-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Events :**

```javascript
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
```

## Confirm

**Default options :**

```javascript
bsd.defaults.confirm = {
    // Callback : function
    callback: function (confirmed) {
        return true;
    },

    // The template used to generate dialog.
    template: "[See below]",

    // The cancel button text.
    cancelText: "Cancel",

    // A class to append to cancel button.
    cancelClass: "btn-light",

    // The confirm button text.
    confirmText: "Validate",

    // A class to append to confirm button.
    confirmClass: "btn-primary"
};
```

**Default template :**

```html
<div class="modal fade bsd-dialog bsd-confirm" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p class="lead bsd-message"></p>
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn bsd-cancel" data-dismiss="modal"></button>
                    <button class="btn bsd-confirm"></button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Events :**

```javascript
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
```

## Prompt

**Default options :**

```javascript
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
    callback: function (value) {
        return true;
    },

    // The template used to generate dialog.
    template: "[See below]",

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
```

**Default template :**

```html
<div class="modal fade bsd-dialog bsd-prompt" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <p class="lead bsd-message"></p>
                <div class="bsd-field-wrapper"></div>
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn bsd-cancel" data-dismiss="modal"></button>
                    <button class="btn bsd-confirm"></button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Events :**

```javascript
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
```

## Extend: make your own dialogs

If you need to create custom dialogs, you can easily extend BSD.

Here is an example : 

```jvascript
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
                                    <span aria-hidden="true">×</span>
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
```