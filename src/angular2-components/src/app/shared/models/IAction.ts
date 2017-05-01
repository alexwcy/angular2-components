export interface IAction {
	type: string,
	payload?: any
}

export interface IActionCreator {
	(...args: any[]) : IAction
}