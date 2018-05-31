import { Injectable } from '@angular/core';
import { StompConfig, StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private configService: ConfigService, private stompService: StompRService,
    private authService: AuthService) {
    this.authService.currentEvent.subscribe(() => {
      this.disconnect();
    });
  }

  init() {
    if (!this.stompService.connected()) {
      const stompConfig: StompConfig = {
        url: `ws:///${window.location.host}${this.configService.socketUrl}`,
        headers: {
          login: this.authService.currentUser.token,
        },
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: true
      };
      this.stompService.config = stompConfig;
      this.stompService.initAndConnect();
    }
  }

  disconnect() {
    if (this.stompService.connected()) {
        this.stompService.disconnect();
    }
  }
}
