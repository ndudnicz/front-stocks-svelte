import type { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";

export class SignalRService {
    private static hubConnection: HubConnection;

    public static init() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/hub')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started!'))
            .catch((err: any) => console.log('Error while establishing connection ', err));
    }

    public static close() {
        this.hubConnection?.stop();
    }

    public static on(eventName: string, callback: any) {
        this.hubConnection?.on(eventName, callback);
    }

    public static off(eventName: string, callback: any) {
        this.hubConnection?.off(eventName, callback);
    }
}