import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComplaintComponent } from './complaint.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ComplaintComponent }
	])],
	exports: [RouterModule]
})
export class ComplaintRoutingModule { }
