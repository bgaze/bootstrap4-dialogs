# Bootstrap 4 dialogs

BSD is a tiny *(< 10ko)* and flexible collection of dialog popups based on Bootstrap 4 modals.  
Custom dialogs can be easily defined, in addition to built-in ones (alert, confirm and prompt).

**Table of content :**

> Doc and demos at [https://www.bgaze.fr/bootstrap4-dialogs](https://www.bgaze.fr/bootstrap4-dialogs)

*   [Quick start](#quick-start)
*   [Usage](#usage)
*   [Options](#options)
*   [Alert](#alert)
*   [Confirm](#confirm)
*   [Prompt](#prompt)
*   [Extend BSD](#extend-bsd)

## Quick start

BSD requires jQuery v1.9+ and Bootstrap 4 modal component.

Several quick start options are available:

*   Download the latest release: [https://github.com/bgaze/bootstrap4-dialogs/releases](https://github.com/bgaze/bootstrap4-dialogs/releases)
*   Clone the repo: `git clone https://github.com/bgaze/bootstrap4-dialogs.git`
*   Install with npm: `npm i bgaze-bootstrap4-dialogs`
*   Install with yarn: `yarn add bgaze-bootstrap4-dialogs`
*   Install with Composer: `composer require bgaze/bootstrap4-dialogs`
*   Install via CDN: `https://cdn.jsdelivr.net/gh/bgaze/bootstrap4-dialogs@2/dist/bootstrap4-dialogs.min.js`

Just make sure to include required dependencies into your app, then include the library:

*   If installed as a module, import it:  
    `const bsd = require("bgaze-bootstrap4-dialogs");`
*   Otherwise include the script into your page:  
    `<script src="path/to/bootstrap4-dialogs.js"></script>`

That's it! Now you can use the globally declared `bsd` object.

```javascript
// Alert
bsd.alert('Lorem ipsum dolor sit amet');

// Confirm
bsd.confirm('Lorem ipsum dolor sit amet', function (confirmed) {
    if (confirmed) {
        // ...
    }
});

// Prompt
bsd.prompt('Lorem ipsum dolor sit amet', function (value) {
    if (value !== null) {
        if (value.trim() === '') {
            // Prevent dialog closing, as provided value is empty.
            return false;
        } 

        console.log(value);
    }
});
```

## Usage

When a `bsd` method is called, a customized Boostrap 4 modal will be dynamically built and inserted into the DOM.  
Unless explicitly specified through options, it is automatically shown when created, and destroyed when closed.

**Arguments**

Dialog functions accept two arguments:

*   **title:** the html to insert into the dialog popup title.  
    If undefined, the title element will be removed from the modal.
*   **options:** an optional set of options. If a function is provided, it will be used as dialog callback.  
    All available options can be customized / overrided globally, see [options](#options) sections for details.

```javascript
// Simple dialog

bsd.confirm('A message to display');

// Simple dialog with direct callback assignment

bsd.confirm('A message to display', function (confirmed) {
    if (confirmed) {
        console.log('Confirmed !');
    }
});

// Customized dialog

bsd.confirm('A message to display', {
    callback: function (confirmed) {
        if (confirmed) {
            console.log('Confirmed !');
        }
    },
    size: 'sm',
    cancelText: "No",
    confirmText: "Yes"
});
```

**Handling dialogs**

Each dialog function returns it's modal element as a jQuery object, so Bootstrap modal methods and event can be directly used, except `show.bs.modal`.

```javascript
bsd.alert('A message to display')
        .on('shown.bs.modal', function (e) {
            // ...
        })
        .modal('handleUpdate');
```

The `show.bs.modal` event is fired before returning the modal, so to use it, you'll need to manage modal opening manually:

```javascript
bsd.alert('A message to display', {show: false})
        .on('show.bs.modal', function (e) {
            // ...
        })
        .modal('show');
```

As a shorthand, you can directly pass a function into the `show` option :

```javascript
bsd.alert('A message to display', {
    show: function (e) {
        // ...
    }
});
```

**Theming**

There is no stylesheet provided with BSD, as it only relies on Bootstrap styles.  
To ease dialogs theming, two CSS classes are automatically added to each dialog :
 
+ `bsd-dialog`
+ `bsd-[dialogName]` (for instance `bsd-alert` for alert dialogs).

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

// Define default text for alert, confirm and prompt dialog buttons.
bsd.defaults.alert.closeText = 'OK';
bsd.defaults.confirm.cancelText = 'No';
bsd.defaults.confirm.confirmText = 'Yes';
bsd.defaults.prompt.cancelText = 'No';
bsd.defaults.prompt.confirmText = 'Yes';
```

Here is the list of available common options:

```javascript
bsd.defaults.dialog = {
    // Callback : [null] | function
    callback: null,
    
    // A value to use as id attribute for the modal: [null] | string
    id: null,
    
    // Show the modal element when created : [true] | false | function
    // If a function is provided, the modal will be shown and the function will be used on "show.bs.modal" event.
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
    
    // Center vertically the dialog in the window: [true] |false
    vcenter: true,
    
    // Center horizontally the dialog text: [true] |false
    hcenter: true,
    
    // Manage controls alignment: ['between'] | 'center' | 'start' | 'end' | 'around'
    controlsAlignment: 'between'
};
```

## Alert

**Usage :**

Simple call:

```javascript
bsd.alert('Lorem ipsum dolor sit amet');
```

Simple dialog with direct callback assignment:

```javascript
bsd.alert('Lorem ipsum dolor sit amet', function () {
    // ...
});
```

// Customized dialog

```javascript
bsd.alert('Lorem ipsum dolor sit amet', {
    closeText: "OK",
    closeClass: "btn-success",
    callback: function () {
        // ...
    }
});
```

**Options :**

Alert dialogs accept following options in addition to [common options](#options).

If you need to change the `template` option, make sure to keep `bsd-*` classes, which are necessary to make the dialog work.

```javascript
bsd.defaults.alert = {
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
};
```

## Confirm

**Usage :**

The callback function will receive a boolean as argument.  
Make it return `false` to keep the dialog opened, otherwise it will be closed.

Simple call:

```javascript
bsd.confirm('Lorem ipsum dolor sit amet', function (confirmed) {
    if (confirmed) {
        // ...
    }
});
```

Call with options:

```javascript
bsd.confirm('Lorem ipsum dolor sit amet', {
    confirmText: "Delete",
    confirmClass: "btn-danger",
    callback: function (confirmed) {
        if (confirmed) {
            // ...
        }
    }
});
```

**Options :**

Confirm dialogs accept following options in addition to [common options](#options).

If you need to change the `template` option, make sure to keep `bsd-*` classes, which are necessary to make the dialog work.

```javascript
bsd.defaults.confirm = {
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
};
```

## Prompt

**Usage :**

The callback function will receive:

+ `null` on cancel/dismiss.
+ The user input on "submit". Make it return `false` to keep the dialog opened, otherwise it will be closed.

Simple call:

```javascript
bsd.prompt('Lorem ipsum dolor sit amet', function (value) {
    if (value !== null) {
        if (value.trim() === '') {
            return false;  // Prevent dialog closing, as provided value is empty.
        } 
        
        console.log(value);
    }
});
```

Call with options:

```javascript
bsd.prompt('Lorem ipsum dolor sit amet', {
    confirmText: "Save",
    confirmClass: "btn-success",
    callback: function (value, event) {
        if (value !== null) {
            if (value.trim() === '') {
                return false;  // Prevent dialog closing, as provided value is empty.
            } 
            
            console.log(value);
        }
    }
});
```

**Default options :**

Prompt dialogs accept following options in addition to [common options](#options).

If you need to change the `template` option, make sure to keep `bsd-*` classes, which are necessary to make the dialog work.

```javascript
bsd.defaults.prompt = {
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
};
```

## Extend BSD

If you need to create custom dialogs, you can easily extend BSD:

**1/ Define your dialog options and defaults.**

Simply append them to `bsd.defaults`, use your dialog name as key.

Remember that your dialog options inherit from `bsd.defaults.dialog`, so you can override them.  
The only required option is the dialog template (`template` key).

```javascript
bsd.defaults.mydialog = {
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
                            <div class="modal-footer">
                                <div class="bsd-controls d-flex flex-grow-1 align-items-center">
                                    <button type="button" class="btn bsd-no mr-1" data-dismiss="modal"></button>
                                    <button type="button" class="btn bsd-maybe mx-1"></button>
                                    <button type="button" class="btn bsd-yes ml-1"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,

    // No button.
    noText: 'No',
    noClass: 'btn-danger',

    // Maybe button.
    maybeText: 'Maybe',
    maybeClass: 'btn-primary',

    // Yes button.
    yesText: 'Yes',
    yesClass: 'btn-success',
    
    // DEFAULTS OVERRIDE EXAMPLE
    // Center horizontally the dialog text: true | [false]
    hcenter: false,
};
```

**Create the dialog function.**

You can easily generate the dialog thanks to `bsd.dialog` function which requires three arguments :

1.  The dialog name (must match key into `bsd.defaults`).
2.  The options set provided by the user.
3.  A **customize function**, that will receive as arguments:
    + the modal **jQuery object**
    + the final settings (user's options set merged with dialog defaults and common defaults).  

From the **customize function**: 

1. Initialize the modal content based on settings.
2. Configure each dialog button to fire an event. As the **dismiss.bsd** event is fired when dialog is closed with Escape key or outside click, it should also be fired by any cancel button into the custom dialog. 
3. Use these events to invoke callback function. 

```javascript
bsd.mydialog = function (title, subtitle, options) {
    return this.dialog('mydialog', options, function ($dialog, settings) {
        // Manage dialog texts.
        $('.bsd-title', $dialog).html(title || '');
        $('.bsd-subtitle', $dialog).html(subtitle || '');

        // Customize buttons.
        $('.bsd-no', $dialog).addClass(settings.noClass).text(settings.noText).click(function () {
            $dialog.trigger('dismiss.bsd');
        });
        $('.bsd-maybe', $dialog).addClass(settings.maybeClass).text(settings.maybeText).click(function () {
            $dialog.trigger('maybe.bsd');
        });
        $('.bsd-yes', $dialog).addClass(settings.yesClass).text(settings.yesText).click(function () {
            $dialog.trigger('yes.bsd');
        });

        // Manage dialog callback.
        if (typeof settings.callback === 'function') {
            $dialog
                .on('dismiss.bsd', function () {
                    settings.callback('no');
                })
                .on('maybe.bsd', function () {
                    if (settings.callback('maybe') !== false) {
                        $dialog.modal('hide');
                    }
                })
                .on('yes.bsd', function () {
                    if (settings.callback('yes') !== false) {
                        $dialog.modal('hide');
                    }
                })
            ;
        }
    });
};
```

**Usage:**

Simply use your dialog like other ones:

```javascript
$('#mydialog-demo').click(function () {
    var subtitle = 'Phasellus ultricies dolor ac velit tempus lobortis.<br>Duis ipsum justo, viverra et molestie eget, congue in nunc.';

    bsd.mydialog('Do you like my custom dialog?', subtitle, function (value) {
        console.log(value);
    });
});
```