import { useReducer } from 'react';

const reducer = (state, dispatch) => {
    console.log(`called:`)
    console.log(state)
    console.log(dispatch)
    switch (dispatch.type) {
        case "ADD":
            return { ...state, sum: state.sum + 1 }
            break;
        case "SUB":
            return { ...state, sub: state.sub - 1 }
            break;
        default:
            return state
            break;
    }


}
// const [state, dispatch] = useReducer(reducer, { sum: 0, sub: 0 })


export default reducer;