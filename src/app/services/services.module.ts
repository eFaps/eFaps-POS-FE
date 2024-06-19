import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VirtKeyboardDirective } from ".";

@NgModule({
  declarations: [VirtKeyboardDirective],
  imports: [CommonModule],
  exports: [VirtKeyboardDirective],
})
export class ServicesModule {}
