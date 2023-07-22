import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'appointment', loadChildren: () => import('./appointmentFrontOffice/appointment-front.module').then(m => m.AppointmentFrontModule) },
         { path: 'complaint', loadChildren: () => import('./complaint-front/complaint-front.module').then(m => m.ComplaintFrontModule) },

    ])],
    exports: [RouterModule]
})
export class PagesFrontRoutingModule { }
