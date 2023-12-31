import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppFrontOfficeModule } from './frontOffice/app.frontoffice.module';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AppointmentService } from './core/service/appointment.service';
import { ProductService } from './core/service/product.service';
import { CountryService } from './core/service/country.service';
import { CustomerService } from './core/service/customer.service';
import { EventService } from './core/service/event.service';
import { IconService } from './core/service/icon.service';
import { NodeService } from './core/service/node.service';
import { PhotoService } from './core/service/photo.service';
import { FrontOfficeService } from './frontOffice/service/app.frontOffice.service'; // Adjust the path accordingly
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/helpers/auth.interceptor';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './auth.guard';
import { ComplaintService } from './core/service/complaint.service';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForumService } from './core/service/Forum.service';



@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AppFrontOfficeModule,

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,ForumService,
        PhotoService, ProductService, AppointmentService,ComplaintService, FrontOfficeService, MessageService, AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
