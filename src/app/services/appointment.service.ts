import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AppointmentService {
  onUpdateAppointment = new Subject<boolean>();
  phoneNumber: number;
  isDentist: boolean;

  constructor(private http: HttpClient) {}

  checkIfDentist(phoneNumber: number) {
    return this.http
      .get<any>(`http://localhost:8080/dentists/${phoneNumber}`)
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  getTodaysAppointments() {
    return this.http.get<any>("http://localhost:8080/appointments/today").pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }
  ////////////////////////
  getValidAppointments(currentPage: number) {
    return this.http
      .get<any>(
        `http://localhost:8080/appointments/today?page=${currentPage}&size=${7}`
      )
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
  //////////////////////////////////
  getAvailableAppointmentTime() {
    return this.http
      .get<any>("http://localhost:8080/appointments/availabletimes")
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  createAppointment(appointment: any) {
    this.http
      .post<{ name: string }>("http://localhost:8080/appointments", appointment)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.onUpdateAppointment.next(true);
          alert("Succesfully saved appointment");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteAppointment(phoneNumber: number) {
    return this.http.delete(
      `http://localhost:8080/appointments/${phoneNumber}`
    );
  }
  ///////////////////////////////
  getAppointments() {
    return this.http.get<any>("http://localhost:8080/appointments").pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  getAppointmentByPhoneNumber(id: number) {
    return this.http.get<any>(`http://localhost:8080/appointments/${id}`).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  updateAppointment(appointment: any) {
    return this.http
      .put<{ name: string }>(
        `http://localhost:8080/appointments/${1}`,
        appointment
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveAppointment(appointment: any) {
    this.http
      .post<{ name: string }>("http://localhost:8080/students", appointment)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
