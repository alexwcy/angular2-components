import {ModuleWithProviders, NgModule} from "@angular/core";
import {MdPagination} from "./pagination";
import {NumberToArray} from "./numberToArrayPipe";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@NgModule({
	imports: [CommonModule, FormsModule],
	exports: [MdPagination],
	declarations: [MdPagination, NumberToArray],
})
export class MdPaginationModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: MdPaginationModule,
			providers: []
		};
	}
}
