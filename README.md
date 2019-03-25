# Bootstrap 4 dialogs

> Doc and demos here : [https://www.bgaze.fr/bootstrap4-dialogs](https://www.bgaze.fr/bootstrap4-dialogs)

**Table of content :**

*   [Quick start](#quick-start)
*   [Usage](#usage)
*   [Options](#options)
*   [Alert](#alert)
*   [Confirm](#confirm)
*   [Prompt](#prompt)
*   [Extend BSD](#extend-bsd)

## Quick start

BSD requires jQuery v1.9.1+, Bootstrap 4 modal component, and Bootstrap's CSS.

Several quick start options are available:

*   Download the latest release: [https://github.com/bgaze/bootstrap4-dialogs/releases](https://github.com/bgaze/bootstrap4-dialogs/releases)
*   Clone the repo: `git clone https://github.com/bgaze/bootstrap4-dialogs.git`
*   Install with npm: `npm i bgaze-bootstrap4-dialogs`
*   Install with yarn: `yarn add bgaze-bootstrap4-dialogs`
*   Install with Composer: `composer require bgaze/bootstrap4-dialogs`
*   Install via CDN: `https://cdn.jsdelivr.net/gh/bgaze/bootstrap4-dialogs@1/dist/bootstrap4-dialogs.min.js`

Just make sure to include required dependencies into your app, then include the library:

*   If installed as a module, import it:  
    `const bsd = require("bgaze-bootstrap4-dialogs");`
*   Otherwise include the script into your page:  
    `<script src="path/to/bootstrap4-dialogs.min.js"></script>`

That's it! You can use the globally declared `bsd` object.

```javascript
// Alert.
bsd.alert('Lorem ipsum dolor sit amet');

// Confirm.
bsd.confirm('Lorem ipsum dolor sit amet', function (confirmed, event) {
    if (confirmed) {
        // ...
    }
    return true;
});

// Prompt.
bsd.prompt('Lorem ipsum dolor sit amet', function (value, event) {
    if (value === null) {
        return true;
    }

    if (value.trim() === '') {
        bsd.alert('You must provide a value!');
        return false;
    }

    // ...

    return true;
});
```

## Usage

This section applies to all provided dialog functions (**bsd.alert**, **bsd.confirm**, **bsd.prompt**).

When called, a customized Boostrap 4 modal will be dynamically built and inserted into the document.  
Unless explicitly specified through options, the modal is automatically shown when created, and destroyed then removed from the DOM when closed.

There is no stylesheet provided with BSD, as it rely on Bootstrap styles.  
To ease dialogs theming, two CSS classes are automatically added to each dialog : `bsd-dialog` and `bsd-[dialogName]` (for instance `bsd-alert` for alert dialogs).

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

BSD defaults options are stored into the `bsd.defaults` object and organized this way:

*   `bsd.defaults.dialog`: common options that apply to all dialogs.
*   `bsd.defaults.[dialogName]`: options that apply to a specific dialog only.

You can easily make application wide customizations:

```javascript
// Center vertically all dialogs.
bsd.defaults.dialog.vcenter = true;

// Center texts horizontally for all dialogs.
bsd.defaults.dialog.hcenter = true;

// Use small size for all dialogs except prompt.
bsd.defaults.dialog.size = 'modal-sm';
bsd.defaults.prompt.size = null;

// Define default text for alert, confirm and prompt.
bsd.defaults.alert.closeText = 'OK';
bsd.defaults.confirm.cancelText = 'No';
bsd.defaults.confirm.confirmText = 'Yes';
bsd.defaults.prompt.cancelText = 'No';
bsd.defaults.prompt.confirmText = 'Yes';
```

Here is the list of available common options:

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

**Usage :**

When using a callback function, it will receive as argument the original "modal dismiss" event.

```javascript
// Simple call.

bsd.alert('Lorem ipsum dolor sit amet');

// Call with options.

bsd.alert('Lorem ipsum dolor sit amet', {
    closeText: "OK",
    closeClass: "btn-success"
});

// Callback

bsd.alert('Lorem ipsum dolor sit amet', function (event) {
    // ...
});

bsd.alert('Lorem ipsum dolor sit amet', {
    closeText: "OK",
    closeClass: "btn-success",
    callback: function (event) {
        // ...
    }
});
```

**Default options :**

You can customize these options as described in the options section.

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

If you need to change this template, just make sure to keep required `bsd-*` classes.

```html
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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

## Confirm

**Usage :**

The callback function will receive two arguments:

1.  The confirmed status as a boolean.
2.  The original event that raised the callback.

It must return a boolean indicating if the dialog should be closed.

```javascript
// Simple call.

bsd.confirm('Lorem ipsum dolor sit amet', function (confirmed, event) {
    if (confirmed) {
        // ...
    }
    return true;
});

// Call with options.

bsd.confirm('Lorem ipsum dolor sit amet', {
    confirmText: "Delete",
    confirmClass: "btn-danger",
    callback: function (confirmed, event) {
        if (confirmed) {
            // ...
        }
        return true;
    }
});
```

**Default options :**

You can customize these options as described in the options section.

```javascript
bsd.defaults.confirm = {
    // Callback : function
    callback: function (confirmed, event) {
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

If you need to change this template, just make sure to keep required `bsd-*` classes.

```html
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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

## Prompt

**Usage :**

The callback function will receive two arguments:

1.  The prompt field value, or `null` if canceled.
2.  The original event that raised the callback.

It must return a boolean indicating if the dialog should be closed.

```javascript
// Simple call.

bsd.prompt('Lorem ipsum dolor sit amet', function (value, event) {
    if (value === null) {
        return true;
    }

    if (value.trim() === '') {
        bsd.alert('You must provide a value!');
        return false;
    }

    // ...

    return true;
});

// Call with options.

bsd.prompt('Lorem ipsum dolor sit amet', {
    confirmText: "Save",
    confirmClass: "btn-success",
    callback: function (value, event) {
        if (value === null) {
            return true;
        }

        if (value.trim() === '') {
            bsd.alert('You must provide a value!');
            return false;
        }

        // ...

        return true;
    }
});
```

**Default options :**

You can customize these options as described in the options section.

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
    callback: function (value, event) {
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

If you need to change this template, just make sure to keep required `bsd-*` classes.

```html
<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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

## Extend BSD

If you need to create custom dialogs, you can easily extend BSD.  
Please find below a detailed example.

**Define your dialog options and defaults.**

Simply append them to `bsd.defaults`. The key MUST be your dialog name.  
Remember that your dialog options inherit from `bsd.defaults.dialog`, so you can override them.

The only required option that must be provided is the dialog template (`template` key).

```javascript
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
```

**Create the dialog function.**

You can easily generate the dialog thanks to the `bsd.dialog` function wich :

1.  Prepares the dialog settings by merging provided options, dialog defaults and common defaults.
2.  Generates the dialog HTML and insert it into the DOM.
3.  Initializes Bootstrap 4 Modal based on settings, keeping it hidden.
4.  Manages the dialog removal on `hidden.bs.modal` event based on `destroy` option.
5.  Manages the `show.bs.modal` event based on `show` option.
6.  Customizes the dialog using a provided function.
7.  Manages the dialog opening based on `show` option.
8.  Returns the dialog jQuery object.

It requires three arguments :

1.  The dialog defaults key name into `bsd.defaults`.
2.  The option set provided by the user.
3.  A function to customize the dialog. When called, it will receive as arguments the dialog jQuery object and the merged settings.

```javascript
bsd.mydialog = function (title, subtitle, options) {
    return this.dialog("mydialog", options, function ($dialog, settings) {
        // Manage dialog texts.
        $('.bsd-title', $dialog).html(title || '');
        $('.bsd-subtitle', $dialog).html(subtitle || '');

        // Customize buttons.
        $('.bsd-no', $dialog).addClass(settings.noClass).text(settings.noText);
        $('.bsd-maybe', $dialog).addClass(settings.maybeClass).text(settings.maybeText);
        $('.bsd-yes', $dialog).addClass(settings.yesClass).text(settings.yesText);

        // Manage dialog callback.
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
```

**Usage:**

Simply use your function like this:

```javascript
$('#mydialog-demo').click(function () {
    var subtitle = 'Phasellus ultricies dolor ac velit tempus lobortis.'
            + '<br>Duis ipsum justo, viverra et molestie eget, congue in nunc.';

    bsd.mydialog('Do you like my custom dialog?', subtitle, function (value, e) {
        console.log(value);
        return true;
    });
});
```