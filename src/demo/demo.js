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
