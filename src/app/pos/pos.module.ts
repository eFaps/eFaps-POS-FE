import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";

import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { ContactsModule } from "../contacts/contacts.module";
import { SharedModule } from "../shared/shared.module";
import { CategorySelectComponent } from "./category-select/category-select.component";
import { CommandsComponent } from "./commands/commands.component";
import { ConfigDialogComponent } from "./config-dialog/config-dialog.component";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";
import { OrderDialogComponent } from "./order-dialog/order-dialog.component";
import { PosRoutingModule } from "./pos-routing.module";
import { PosComponent } from "./pos.component";
import { GridElementComponent } from "./product-grid/grid-element/grid-element.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { ProductsElementComponent } from "./product-grid/products-element/products-element.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TotalsComponent } from "./totals/totals.component";
@NgModule({
    imports: [
        CommonModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        MatStepperModule,
        MatRadioModule,
        PosRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ContactsModule,
        MatExpansionModule,
        SharedModule,
        CommandsComponent,
        OrderDialogComponent,
        PosComponent,
        ProductListComponent,
        ProductGridComponent,
        TicketComponent,
        TotalsComponent,
        CategorySelectComponent,
        GridElementComponent,
        ProductsElementComponent,
        ContactDialogComponent,
        ConfigDialogComponent,
    ],
})
export class PosModule {}
