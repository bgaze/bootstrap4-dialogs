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
