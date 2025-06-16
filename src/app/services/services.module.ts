import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VirtKeyboardDirective } from ".";

@NgModule({
    imports: [CommonModule, VirtKeyboardDirective],
    exports: [VirtKeyboardDirective],
})
export class ServicesModule {}
