import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { componentModuleUrl } from '@angular/compiler';

@Component({
    selector: 'home',
    templateUrl: './app/home.home.template.html'
})
export class HomeComponent {
    user: any;

    constructor(private _authenticationService: AuthenticationService) {
        this.user = _authenticationService.user;
    }
}