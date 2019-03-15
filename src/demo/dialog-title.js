bsd.alert('A message to display');

bsd.alert(function () {
    let date = new Date();
    return '<b>[' + date.toString() + '] A message to display</b>';
});