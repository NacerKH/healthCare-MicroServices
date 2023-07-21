import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'appointment', loadChildren: () => import('./appointmentFrontOffice/appointment-front.module').then(m => m.AppointmentFrontModule) },

    ])],
    exports: [RouterModule]
})
export class PagesFrontRoutingModule { }
