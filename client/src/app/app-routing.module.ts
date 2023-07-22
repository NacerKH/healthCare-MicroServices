import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppFrontOfficeComponent } from "./frontOffice/app.frontoffice.component";
import { AuthGuard } from './auth.guard';



@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
            { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            {
                path: 'backoffice', component: AppLayoutComponent,  canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./core/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./core/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./core/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./core/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./core/components/pages/pages.module').then(m => m.PagesModule) }
                ]
                , data: { role: 'admin' }
            },
            {
                path: 'frontoffice', component: AppFrontOfficeComponent,
                children: [
                    { path: '', loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./core/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./core/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./core/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./core/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./core/components/pagesFront/pages-front.module').then(m => m.PagesFrontModule) }
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
