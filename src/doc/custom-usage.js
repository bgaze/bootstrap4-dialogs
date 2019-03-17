$('#mydialog-demo').click(function () {
    var subtitle = 'Phasellus ultricies dolor ac velit tempus lobortis.'
            + '<br>Duis ipsum justo, viverra et molestie eget, congue in nunc.';

    bsd.mydialog('Do you like my custom dialog?', subtitle, function (value, e) {
        console.log(value);
        return true;
    });
});