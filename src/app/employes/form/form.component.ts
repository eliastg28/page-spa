import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      
  }

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  currentDay = this.currentDate.getDate();
  today = `${this.currentDay}/${this.currentMonth + 1}/${this.currentYear}`

  empleados = ['Empleado 1', 'Empleado 2', 'Empleado 3', 'Empleado 4', 'Empleado 5'];
  clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'];
  periodos = ['Diario', 'Mensual', 'Trimestral', 'Anual'];

}
