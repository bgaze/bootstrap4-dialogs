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