import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AppointmentService } from "../services/appointment.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.css"],
})
export class AppointmentsComponent implements OnInit {
  appointments: [] = [];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.appointmentService.getAppointmentByPhoneNumber(1).subscribe((res) => {
      console.log(res);
      this.appointments = res;
    });
  }

  reserveAppointment() {
    this.router.navigate(["reserveAppointment"]);
  }
}
