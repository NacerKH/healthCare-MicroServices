import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComplaintFrontComponent } from './complaint-front.component';

@NgModule({
	imports: [RouterModule.forChild([
	{ path: '', component: ComplaintFrontComponent }
	])],
	exports: [RouterModule]
})
export class ComplaintFrontRoutingModule { }



