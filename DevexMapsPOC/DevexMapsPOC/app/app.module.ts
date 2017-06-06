import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxMapModule } from 'devextreme-angular';
import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule, DxMapModule ],
  declarations: [AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
