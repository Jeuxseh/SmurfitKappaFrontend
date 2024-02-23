import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './Components/buttons/buttons.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { SharedDataService } from './Services/shared-data.service';
import { UserService } from './Services/user-service.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ButtonsComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    SharedDataService,
    UserService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
