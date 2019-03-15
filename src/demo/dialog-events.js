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

