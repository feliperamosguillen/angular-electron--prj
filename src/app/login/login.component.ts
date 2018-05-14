import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userError:string = "";
	passwordError:string = "";

  _user:string = "";
  _password:string = "";

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  doLogin()
  {

    if( this._user === "" )
		{
      this.userError = "Error en el usuario";
    }

    if( this._password === "" )
    {
		  this.passwordError = "Error en el password";
    }

    // Se valida el password
    if( this._user === "felipe" && this._password === "123456" )
    {
      // Se abre el home
      this.router.navigateByUrl('/portafolio');
    }
    else
    {
      alert("Datos incorrectos"); 
    }
  }
}
