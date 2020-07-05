import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "appointment", component: HomeComponent },
  { path: "appointment/:id", component: HomeComponent },
  { path: "appointment/:id/:name", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
