import Hello from '../../components/Hello';
import * as actions from '../actions/index';
import {IStoreState} from "../../types/inex";
import {connect} from 'react-redux';
import {Dispatch} from 'redux'


export function mapStateToProps({enthusiasmLevel, languageName}: IStoreState) {
    return {
        enthusiasmLevel,
        name: languageName
    }
}


export function mapDispatchProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Hello)