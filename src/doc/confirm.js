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
