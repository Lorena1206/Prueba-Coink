import { Component, OnInit, ViewChild } from '@angular/core';
import { SatDatepicker } from 'saturn-datepicker';
import { MatPaginator, MatPaginatorModule, MatTableDataSource, } from '@angular/material';
import { PeticionesService } from '../servicio/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('picker', { static: false }) dateInput: SatDatepicker<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  datasource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'cel', 'email', 'fechacompra', 'edad'];
  columnas = [
    { id: 1, nombre: "Nombre" },
    { id: 2, nombre: "Cel" },
    { id: 3, nombre: "Email" },
    { id: 4, nombre: "Fecha Compra" },
    { id: 5, nombre: "Edad" },
  ]
  constructor(
    private peticiones: PeticionesService
  ) { }

  ngOnInit() {
    this.datasource.paginator = this.paginator;
    this.setearTextosPaginado();
  }

  async obtenerDatos() {
    ///pockets/reports/transactions/purchases
    try {
      let dataToTable = {
        vault_id:'b73bde9f-6891-4b2e-847e-484be1830794',
        filter_field: '',
        filter_value: '',
        begin_date: this.dateInput._beginDate,
        end_date: this.dateInput._endDate,
        page: 1,
        items_per_page: 10
      }
      let data = await this.peticiones.ObtrenerDatos(dataToTable, '/pockets/reports/transactions/purchases');
      console.log(data);
    } catch (error) {

    }
  }

  buscar() {
    this.obtenerDatos();
  }

  setearTextosPaginado() {
    // this.paginator._intl.itemsPerPageLabel = "Registros por página";
    // this.paginator._intl.nextPageLabel = "Siguiente pagina";
    // this.paginator._intl.lastPageLabel = "Ultima pagina";
    // this.paginator._intl.previousPageLabel = "Pagina anterior";
    // this.paginator._intl.firstPageLabel = "Primera pagina";

  }

}
