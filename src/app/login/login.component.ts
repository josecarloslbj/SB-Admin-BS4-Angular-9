import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { NgForm, FormGroup, Form, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        public router: Router
        , private authService: AuthService,
        public fb: FormBuilder
    ) {

        this.form = new FormGroup({
            'login': new FormControl('34234', Validators.required),
            'password': new FormControl('', Validators.required)
        });
    }



    ngOnInit() {



        //     this.login ='asdasdasdad';

        //     const loginFormulario= new LoginFormulario();
        //     loginFormulario.login="asdasdasd";
        //     loginFormulario.email="asdasdas@teste.com.br";
        //     loginFormulario.password="1234560";

        //    // this.contactForm.setValue(loginFormulario);
        //    this.form.controls['login'].setValue('asdasdadasd@teste.com');
        //    this.form.controls['password'].setValue('asdasdadasd@teste.com');
        //    this.form.controls['email'].setValue('asdasdadasd@teste.com');

        // this.form = this.fb.group({
        //     login: ['', Validators.required],
        //     password: ['', Validators.required],
        //     email: ['', Validators.required],
        // });



    }

    onLoggedin() {
        // const tst = environment.URL;

        console.log(this.form.value);

        debugger;
        return;
        const obj_: any = new Object();
        // obj_.Nome = this.login;
        // obj_.Senha = this.password;
        // obj_.Email = this.login;
        // obj_.Login = this.login;


        if (this.form.valid == false)
            return false;


        this.authService.login(obj_).then(res => {

            console.log(res);
            this.router.navigate(['/tables']);


            //this.router.navigate(['/dashboard']);
        });

        // console.log('onLoggedin');
        // localStorage.setItem('isLoggedin', 'true');

    }

    submitForm() {

    }
}


export class LoginFormulario {

    email: string;
    password: string;
    login: string;
}
