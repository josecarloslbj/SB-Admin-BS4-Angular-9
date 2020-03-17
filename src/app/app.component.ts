import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { WINDOW } from './shared/core/providers/window.provider';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(  private authService: AuthService,
        @Inject(WINDOW) private window: Window) {
    }

    ngOnInit() {
    }
}
