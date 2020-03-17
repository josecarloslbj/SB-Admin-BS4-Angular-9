import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
        public router: Router
        , private authService: AuthService
    ) { }

    ngOnInit() { }

    onLoggedin() {
        // const tst = environment.URL;

        const obj_: any = new Object();
        obj_.Nome = 'pedrotese@silva.com.br';
        obj_.Senha = 'aaaa123abc';
        obj_.Email = '1122';
        obj_.Login = 'pedrotese';

        this.authService.login(obj_).then(res => {

            console.log(res);
            this.router.navigate(['/tables']);


            //this.router.navigate(['/dashboard']);
        });

        // console.log('onLoggedin');
        // localStorage.setItem('isLoggedin', 'true');
    }
}
