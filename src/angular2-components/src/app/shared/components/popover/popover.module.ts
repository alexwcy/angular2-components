import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PopoverComponent } from './popover.component'
import { PopoverCloseDirective } from './popover-close.directive';
import { PopoverService } from './popover.service';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [PopoverComponent, PopoverCloseDirective],
    declarations: [PopoverComponent, PopoverCloseDirective],
    providers: [PopoverService]
})
export class PopoverModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PopoverModule,
            providers: []
        };
    }
}
