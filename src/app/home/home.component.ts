import { Component, OnInit } from "@angular/core";
import { AppointmentService } from "../services/appointment.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isDentist: boolean;
  showToday: boolean = false;
  showWeekly: boolean = false;
  currentPage: number = 0;
  appointments: [] = [];
  appointmentsWeekly: [] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.isDentist = this.appointmentService.isDentist;
    this.appointmentService.onUpdateAppointment.subscribe((didDelete) => {
      this.appointmentService.getTodaysAppointments().subscribe((res) => {
        this.appointments = res;
      });
    });
  }

  ngOnDestroy() {}

  onShowToday() {
    this.showToday = !this.showToday;
    this.appointmentService.getTodaysAppointments().subscribe((res) => {
      this.appointments = res;
    });
  }

  onShowWeekly() {
    this.showWeekly = !this.showWeekly;
    this.appointmentService
      .getValidAppointments(this.currentPage)
      .subscribe((res) => {
        this.appointmentsWeekly = res;
        console.log(res);
      });
  }

  onNext() {}

  onPrevious() {}
}
