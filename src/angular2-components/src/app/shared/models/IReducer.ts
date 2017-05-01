import {IAction} from "./IAction";

export interface IReducer<T>{
	(state: T, action: IAction) : T;
}
