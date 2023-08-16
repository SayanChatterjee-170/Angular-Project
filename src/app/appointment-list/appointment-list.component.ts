import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
// oninit means on initialization [lifecycle hook]
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  // this becomes an array
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  // onInit gets invoked when {onInit} gets initialized --> loads data when component gets created
  ngOnInit(): void {
    // checking the key in local storage
    let savedAppointments = localStorage.getItem('appointments-key');
    // value of appointments array will be savedAppointments <- if true: we will parse the appointments (loading the data) & if not an empty array will be created
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppoint: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };
      this.appointments.push(newAppoint);
      //after every time we click the button ->text field should be empty!
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();
      // appointments is a key,this.appointments(array) turns into a json string
      localStorage.setItem(
        'appointments-key',
        JSON.stringify(this.appointments)
      );
    }
  }
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
