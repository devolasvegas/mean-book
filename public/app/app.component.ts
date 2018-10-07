import { Component }    from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';

@Component({
    selector: 'mean-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private _authenticationService: AuthenticationService, private router: Router) {}
}