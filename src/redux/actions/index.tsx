import * as constants from '../constants/index'

export interface IIncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM
}

export interface IDecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM
}


export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;


export function incrementEnthusiasm(): IIncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    }
}


export function decrementEnthusiasm(): IDecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    }
}





