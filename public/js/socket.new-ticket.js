var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function () {
    console.log('Server connected');
});
socket.on('disconnect', function () {
    console.log('Server disconnected');
})
socket.on('actualState', function (resp) {
    label.text(resp.actual);
});
$('button').on('click', function () {
    socket.emit('nextTicket', null, function (nextTicket) {
        console.log(nextTicket);
        label.text(nextTicket);
    });
})