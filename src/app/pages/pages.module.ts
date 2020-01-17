import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login/page-login.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';



@NgModule({
  declarations: [
    PageLoginComponent,
    PagesComponent,
    PageDashboardComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    PageLoginComponent,
    PagesComponent
  ]
})
export class PagesModule { }
