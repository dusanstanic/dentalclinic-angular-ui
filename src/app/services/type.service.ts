import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class TypeService {
  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get<any>("http://localhost:8080/types").pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }
}
