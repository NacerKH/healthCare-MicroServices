import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentFrontComponent } from './appointment-front.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AppointmentFrontComponent }
	])],
	exports: [RouterModule]
})
export class AppointmentFrontRoutingModule { }
