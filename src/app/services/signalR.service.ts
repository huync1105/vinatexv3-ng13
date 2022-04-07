import {
    Injectable,
    EventEmitter
} from '@angular/core';
// declare the global variables  
declare var $: any;
@Injectable()
export class SignalRService {
    // Declare the variables
    private proxy: any;
    private proxyName: string = 'notificationHub';
    private connection: any;
    // create the Event Emitter
    public messageReceived: EventEmitter<any>;
    public connectionEstablished: EventEmitter<any>;
    public connectionExists: any;
    constructor() {
        // Constructor initialization
        this.connectionEstablished = new EventEmitter<any>();
        this.messageReceived = new EventEmitter<any>();
        this.connectionExists = false;
        // create hub connection
        // const host1 = 'http://103.130.212.45:2269';//cong test
        // const host1 = 'http://103.130.212.45:2368';//Tong Cong Ty Det May Nam Dinh
        // const host1 = 'http://hoaxa.vinatex.harmonyes.com.vn';//Tong Cong Ty Det May Nam Dinh moi
        // const host1 = 'http://vinatex.harmonyes.com.vn'; //Nha May Soi Dong Van Hanosimex
        const host1 = `${window.location.origin.includes('localhost')?'http://103.130.212.45:2269':(window.location.origin)}`
        this.connection = $.hubConnection(`${host1}/SmartEOSAPI`);
        // create new proxy as name already given in top
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events
        this.registerOnServerEvents();
        // call the connecion start method to start the connection to send and receive events.
        this.startConnection();
    }
    // method to hit from client
    // tslint:disable-next-line:typedef
    public sendTime() {
        // server side hub method using proxy.invoke with method name pass as param
        this.proxy.invoke('GetRealTime');
    }
    // check in the browser console for either signalr connected or not
    private startConnection(): void {
        this.connection.start().done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
    private registerOnServerEvents(): void {
        this.proxy.on('broadcastMessage', (data: any) => {
            this.messageReceived.emit(data)
        });
    }
}

