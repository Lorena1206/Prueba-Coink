import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from '../servicio/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });
  constructor(
    private peticiones: PeticionesService,
    private rutaactiva: Router
  ) { }



  ngOnInit() {
   
  }

  


  async loginFuncion() {
    this.LoginForm.markAllAsTouched();
    if (this.LoginForm.valid) {
      let dataToLogin = {
        user_mail: this.LoginForm.get('nombre').value,
        user_password: this.LoginForm.get('contrasena').value
      }
      console.log(dataToLogin);
      try {
        let token = await this.peticiones.Login(dataToLogin, '/login');
        this.peticiones.openSnackBar("Autenticacion exitosa", "Aceptar");
        // Redireccion a home
        this.rutaactiva.navigate(['/verificacion'])
      } catch (error) {
        console.log(error)
        this.LoginForm.get('nombre').setValue('');
        this.LoginForm.get('contrasena').setValue('');
      }
    }
  }

}
