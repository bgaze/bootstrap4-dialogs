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
