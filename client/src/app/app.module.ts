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


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AppFrontOfficeModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AppointmentService,FrontOfficeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
