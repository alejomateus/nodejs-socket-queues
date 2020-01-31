var socket = io();
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('escritorio'));
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}
var desktop = searchParams.get('escritorio');
var label = $('small');
console.log(desktop);
$("h1").text(`Desktop ${desktop}`);

$('button').on('click', function () {
    socket.emit('attendTicket', { desktop }, function (resp) {
        if (resp === 'No tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text(`Ticket ${resp.number}`);
    });
})