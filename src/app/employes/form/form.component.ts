import { Component, OnInit } from '@angular/core';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT } from '@hardpool/ngx-spinner';
import { TaskService } from '../../services/task.service';
import { ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  showSpinner: any;
  spinnerConfig: any;

  constructor(private TaskService: TaskService) {}

  ngOnInit() {
    // this.getEmployees();
    // this.getPersonn();
    this.spinnerConfig = {
      placement: SPINNER_PLACEMENT.inplace,
      animation: SPINNER_ANIMATIONS.rotating_dots,
      size: '1rem',
      color: '#1574b3',
      bgColor: 'rgba(0,0,0,0)',
    };
  }

  ShowSpinner() {
    this.showSpinner = true;
  }

  hideSpinner() {
    this.showSpinner = false;
  }

  public inputValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }

  alert(title = '', message = '', type = 0) {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle(title);
    newToastNotification.setMessage(message);

    newToastNotification.setConfig({
      LayoutType: type,
    });
    newToastNotification.openToastNotification$();
  }

  // employees: any = [];

  // getClients() {
  //   this.TaskService.getClients().subscribe(
  //     (res) => {
  //       this.clients = res;
  //     },
  //     (err) => console.error(err)
  //   );
  // }

  dni: any = '';
  nombre: any;
  apellidos: any;
  phone: any;
  email: any;
  monto: any;
  periodo: any;
  cantidadPeriodo: any;

  person: any;




  getPerson(dni = this.dni) {
    if (dni.length === 8) {
      this.ShowSpinner();
      this.TaskService.getPerson(dni).subscribe((data) => {
        // console.log('Respondió');
        this.person = data;
        if (!this.person.success) {
          this.alert(' ', 'El DNI dado no pertenece a ninguna persona', 3);
          this.nombre = undefined;
          this.apellidos = undefined;
          this.dni = undefined;
          this.hideSpinner();
        } else {
          // console.log('Si hay data');
          // console.log(this.person);
          this.nombre = this.person.data.nombres;
          this.apellidos =
            this.person.data.apellido_paterno +
            ' ' +
            this.person.data.apellido_materno;
          this.hideSpinner();
        }
      });
    } else {
      this.nombre = undefined;
      this.apellidos = undefined;
      // console.log('Hola');
    }
  }

  createDemand() {
    const demand = {
      dni: this.dni,
      nombre: this.nombre,
      apellidos: this.apellidos,
      phone: this.phone,
      email: this.email,
      monto: this.monto,
      periodo: this.periodo,
      cantidadPeriodo: this.cantidadPeriodo,
    };

    if (
      this.dni === undefined ||
      this.dni === null ||
      this.nombre === undefined ||
      this.nombre === null ||
      this.apellidos === undefined ||
      this.apellidos === null ||
      this.phone === undefined ||
      this.phone === null ||
      this.email === undefined ||
      this.email === null ||
      this.monto === undefined ||
      this.monto === null ||
      this.periodo === undefined ||
      this.periodo === null ||
      this.cantidadPeriodo === undefined ||
      this.cantidadPeriodo === null
    ) {
      this.alert(' ', 'Todos los campos son obligatorios', 3);
    } else {
      if (
        this.email.includes('@') === false &&
        this.email.includes('.') === false
      ) {
        this.alert(' ', 'Correo no válido', 3);
      } else if (this.cantidadPeriodo > 99 || this.cantidadPeriodo < 1) {
        this.cantidadPeriodo = undefined;
        this.alert(' ', 'Las cuotas deben estar entre 99 y 1', 3);
      } else if (this.phone.length !== 9) {
        this.alert(' ', 'El teléfono debe tener 9 dígitos', 3);
      } else if (this.monto < 1) {
        this.alert(' ', 'Monto inválido', 3);
        this.monto = undefined;
      } else {
        // console.log(demand);
        this.alert(' ', 'Solicitud enviada, revise su correo.', 1);
        this.TaskService.createDemand(demand).subscribe((viewDemand) => {
          // console.log(viewDemand);
        });
        
        this.TaskService.sendEmail(demand).subscribe((viewDemand) => {
          // console.log(viewDemand);
        });

        // this.TaskService.createDemand(demand).subscribe();
        // this.TaskService.sendEmail(demand).subscribe();

        this.dni = undefined;
        this.nombre = undefined;
        this.apellidos = undefined;
        this.phone = undefined;
        this.email = undefined;
        this.monto = undefined;
        this.periodo = undefined;
        this.cantidadPeriodo = undefined;
      }
    }
  }

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  currentDay = this.currentDate.getDate();

  today = `${this.currentDay}/${this.currentMonth + 1}/${this.currentYear}`;
  periodos = ['DIARIO', 'MENSUAL', 'TRIMESTRAL', 'SEMESTRAL'];
}
