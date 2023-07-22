import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ForumComponent }
	])],
	exports: [RouterModule]
})
export class ForumRoutingModule { }
