import type { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";

export class SignalRService {
    private static hubConnection: HubConnection;
    private static restartLoop: number;
    private static restartInterval: number = 5000;

    public static init() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/hub')
            .build();

        this.restartLoop = setInterval(async () => {
            await this.start(this.restartLoop);
        }, this.restartInterval);
        
        this.hubConnection.onclose(() => {
            console.log('Connection closed, restarting...');
            this.restartLoop = setInterval(async () => {
                await this.start(this.restartLoop);
            }, this.restartInterval);
        });
    }

    private static start(restartLoop: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started!');
                clearInterval(restartLoop);
                resolve();
            })
            .catch((err: any) => {
                console.log('Error while establishing connection ', err)
                reject();
            });
        });
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