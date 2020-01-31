const { io } = require('../server');
const { TicketControl } = require('../classes/ticket.controller');

const ticketControl = new TicketControl();
io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log('Where is the next Ticket', next);
        callback(next);
    });
    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4Ticket()
    })
    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop is neccesary'
            });
        }
        let attendTicket = ticketControl.attendTicket(data.desktop);
        client.broadcast.emit('last4',{
            last4: ticketControl.getLast4Ticket()
        });
        callback(attendTicket);
    })
});