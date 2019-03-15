// Customized alert dialog.
bsd.alert('A message to display', {
    size: 'sm',
    cancelText: "No",
    confirmText: "Yes"
});

// Direct callback assignement.
bsd.confirm('A message to display', function (confirmed) {
    if (confirmed) {
        console.log('Confirmed !');
    }
});
