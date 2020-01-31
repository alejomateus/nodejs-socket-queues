
const fs = require('fs');
class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}
class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.resetCount();
        }
    }
    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.saveFile();
        return `Ticket ${this.last}`
    }
    next() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return this.last;
    }
    getLastTicket() {
        return `Ticket ${this.last}`
    }
    getLast4Ticket() {
        return this.last4
    }
    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No tickets'
        }
        let number = this.tickets[0].number;
        this.tickets.shift();
        let attendTicketDesktop = new Ticket(number, desktop);
        this.last4.unshift(attendTicketDesktop);
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }
        this.saveFile();
        return attendTicketDesktop;
    }
    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}
module.exports = {
    TicketControl
}