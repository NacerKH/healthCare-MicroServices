import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AppointmentComponent }
	])],
	exports: [RouterModule]
})
export class AppointmentRoutingModule { }
