import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private socket: Socket) {
    this.connect();
  }

  private connect(): void {
    this.socket.connect();
    this.socket.fromEvent<string>('notifications').subscribe((notification: string) => {
      this.notificationsSubject.next([...this.notificationsSubject.value, notification]);
    });
  }

  sendNotification(message: string): void {
    this.socket.emit('notification', message);
  }
}
