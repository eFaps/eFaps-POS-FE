import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProducttableComponent } from './producttable/producttable.component';
import { MaterialModule } from './material/material.module';
import { ProductService } from './services/product.service';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    ProducttableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ProductService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => function() { return configService.load(); },
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
