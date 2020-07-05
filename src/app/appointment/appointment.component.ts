import { Component, OnInit, Input, OnDestroy, ViewChild } from "@angular/core";
import { AppointmentService } from "src/app/services/appointment.service";
import { TypeService } from "src/app/services/type.service";
import { ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Type } from "../models/Type.model";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"],
})
export class AppointmentComponent implements OnInit, OnDestroy {
  @ViewChild("reserveForm") reserveForm: NgForm;
  @ViewChild("cancelForm") cancelForm: NgForm;
  phoneNumber: number;
  isDentist: boolean;
  types: Type[];
  appointmentTime: [];

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private typeService: TypeService
  ) {}

  ngOnInit() {
    this.phoneNumber = this.appointmentService.phoneNumber;
    this.isDentist = this.appointmentService.isDentist;
    this.typeService.getTypes().subscribe((res) => {
      this.types = res;
    });
    this.appointmentService.getAvailableAppointmentTime().subscribe((res) => {
      this.appointmentTime = res;
    });
  }

  onReserve() {
    const typeId = this.reserveForm.value.type;
    const appointmentTimeId = this.reserveForm.value.appointmentTime;
    let phoneNumber;
    if (this.isDentist) {
      console.log(this.reserveForm);
      phoneNumber = +this.reserveForm.value.phoneNumber;
    }

    this.appointmentService.createAppointment({
      phoneNumber: this.isDentist ? phoneNumber : this.phoneNumber,
      type: this.types[+typeId],
      appointmentTime: this.appointmentTime[+appointmentTimeId],
    });
    this.reserveForm.reset();
  }

  onCancel() {
    if (this.isDentist) {
      this.appointmentService
        .deleteAppointment(+this.cancelForm.value.phoneNumber)
        .subscribe((res) => {
          this.appointmentService.onUpdateAppointment.next(true);
        });
    } else {
      this.appointmentService.deleteAppointment(this.phoneNumber);
    }
    this.cancelForm.reset();
  }

  ngOnDestroy() {}
}
