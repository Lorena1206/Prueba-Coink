import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncriptacionService } from './encriptacion.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';

const httpHeaders = new HttpHeaders({
  'Access-Control-Allow-Origin': '*'
});

const httpHeadersObtenerDatos = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Authorization': sessionStorage.getItem('token')
});


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(
    private http: HttpClient,
    private Encriptacionservice: EncriptacionService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  Login(data, segmento) {
    new Promise(async (resolve, reject) => {
      try {
        let dataencriptada = this.Encriptacionservice.encrypt(JSON.stringify(data));
        let JsonToSend = {
          payload: dataencriptada
        }
        let response = await this.http.post(`${environment.url}${segmento}?apiKey=252156`, JsonToSend, { headers: httpHeaders }).toPromise();
        sessionStorage.setItem("token", response.toString());
        resolve(response);
      } catch (error) {
        reject('Error al realizar peticion')
      }
    })
  };


  ObtrenerDatos(data, segmento) {
    new Promise(async (resolve, reject) => {
      try {

        let dataencriptada = this.Encriptacionservice.encrypt(JSON.stringify(data));
        let JsonToSend = {
          payload: dataencriptada
        }
        console.log(JsonToSend);

        let response = await this.http.post(`${environment.url}${segmento}?apiKey=252156`, JsonToSend, { headers: httpHeadersObtenerDatos }).toPromise();
        console.log(JSON.parse(this.Encriptacionservice.decrypt(response['payload'])));
        resolve(JSON.parse(this.Encriptacionservice.decrypt(response['payload'])));
      } catch (error) {
        reject('Error al realizar peticion')
      }
    })
  };





}
