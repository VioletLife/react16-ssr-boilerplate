import {EnthusiasmAction} from "../actions";
import {IStoreState} from "../types/inex";
import {INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM} from "../constants";

export function enthusiasm(state: IStoreState, action: EnthusiasmAction): IStoreState {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return {
                ...state, enthusiasmLevel: state.enthusiasmLevel + 1
            };
        case DECREMENT_ENTHUSIASM:
            return {
                ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel)
            }
    }
    return state;
}