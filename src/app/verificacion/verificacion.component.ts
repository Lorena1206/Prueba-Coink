import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.scss']
})
export class VerificacionComponent implements OnInit {

  constructor(
    private rutaactiva: Router
  ) { }

  ngOnInit() {
  }
  redireccion(){
  this.rutaactiva.navigate(['/home'])
  }

}
