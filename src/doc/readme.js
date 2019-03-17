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