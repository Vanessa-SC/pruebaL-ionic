import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPersonaPageRoutingModule } from './add-persona-routing.module';

import { AddPersonaPage } from './add-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPersonaPageRoutingModule
  ],
  declarations: [AddPersonaPage]
})
export class AddPersonaPageModule {}
