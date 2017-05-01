import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler extends ErrorHandler {
	constructor() {
		super(false);
	}

	public handleError(error: any): void {

		// You can add your own logic here.

		console.log(error);
		//super.handleError(error);
	}
}