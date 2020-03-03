import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VirtKeyboardDirective } from ".";

@NgModule({
  declarations: [VirtKeyboardDirective],
  imports: [CommonModule],
  exports: [VirtKeyboardDirective]
})
export class ServicesModule {}
