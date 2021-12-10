import { NgModule } from '@angular/core';
import { KtdGridModule } from "@katoid/angular-grid-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";




@NgModule({
  imports: [],
  exports: [
    KtdGridModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule
  ]
})
export class GridLayoutModule {}
