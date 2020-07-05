import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AppointmentService } from "../services/appointment.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("f") form: NgForm;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const phoneNumber = +this.form.value.phoneNumber;
    this.appointmentService.phoneNumber = phoneNumber;
    this.appointmentService.checkIfDentist(phoneNumber).subscribe(
      (res) => {
        this.appointmentService.isDentist = true;
        this.router.navigate(["appointment", phoneNumber, "dentist"]);
      },
      (err) => {
        this.appointmentService.isDentist = false;
        this.router.navigate(["appointment", phoneNumber]);
      }
    );
  }
}
