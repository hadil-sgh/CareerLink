import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  private readonly accountSid: string = 'ACdd00e546dc17b5a83bd694bc1e98b320';
  private readonly authToken: string = 'ef1966de3516463e875bbb894a193dfe';
  private readonly fromNumber: string = '+12059316230';

  constructor(private http: HttpClient) { }

  sendMessage(message: string, toNumber: string): Observable<any> {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
    const body = new URLSearchParams();
    body.set('To', toNumber);
    body.set('From', this.fromNumber);
    body.set('Body', message);

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic ' + btoa(`${this.accountSid}:${this.authToken}`))
    };

    return this.http.post(url, body.toString(), options);
  }
}
