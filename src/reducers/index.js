import {ActionTypes} from '../actions';
import { combineReducers } from 'redux';
import { v4 as uuid } from 'uuid'; // this is the random UUID
import {applyMiddleware, compose, createStore} from 'redux';

const grid = {
    A: {
        seq: [
            {x: 0, y: 43 + 87 },
            {x: 0, y: 43 + 87 + 87 },
            {x: 0, y: 43 + 87 + 87 + 87 },
            {x: 0, y: 43 + 87 + 87 + 87 + 87 },
        ]
    },
    B: {
        seq: [
            {x: 75, y: 87},
            {x: 75, y: 87 + 87},
            {x: 75, y: 87 + 87 + 87},
            {x: 75, y: 87 + 87 + 87 + 87},
            {x: 75, y: 87 + 87 + 87 + 87 + 87},
        ]
    },
    C: {
        seq: [
            {x: 150, y: 43},
            {x: 150, y: 43 + 87},
            {x: 150, y: 43 + 87 + 87},
            {x: 150, y: 43 + 87 + 87 + 87},
            {x: 150, y: 43 + 87 + 87 + 87 + 87},
            {x: 150, y: 43 + 87 + 87 + 87 + 87 + 87},
        ]
    },
    D: {
        seq: [
            {x: 225, y: 0},
            {x: 225, y: 87},
            {x: 225, y: 87 + 87},
            {x: 225, y: 87 + 87 + 87},
            {x: 225, y: 87 + 87 + 87 + 87},
            {x: 225, y: 87 + 87 + 87 + 87 + 87},
            {x: 225, y: 87 + 87 + 87 + 87 + 87 + 87},
        ]
    },
    E: {
        seq: [
            {x: 300, y: 43},
            {x: 300, y: 43 + 87},
            {x: 300, y: 43 + 87 + 87},
            {x: 300, y: 43 + 87 + 87 + 87},
            {x: 300, y: 43 + 87 + 87 + 87 + 87},
            {x: 300, y: 43 + 87 + 87 + 87 + 87 + 87},
        ]
    },
    F: {
        seq: [
            {x: 375, y: 87},
            {x: 375, y: 87 + 87},
            {x: 375, y: 87 + 87 + 87},
            {x: 375, y: 87 + 87 + 87 + 87},
            {x: 375, y: 87 + 87 + 87 + 87 + 87},
        ]
    },
    G: {
        seq: [
            {x: 450, y: 43 + 87},
            {x: 450, y: 43 + 87 + 87},
            {x: 450, y: 43 + 87 + 87 + 87},
            {x: 450, y: 43 + 87 + 87 + 87 + 87},
        ]
    }
}

let initState = {
    gridIdx:[
        [ 'A1', 'A2', 'A3', 'A4' ],
        [ 'B1', 'B2', 'B3', 'B4', 'B5' ],
        [ 'C1', 'C2', 'C3', 'C4', 'C5', 'C6' ],
        [ 'D1', 'D2', 'D3', 'D4', 'D5', 'D6','D7' ],
        [ 'E1', 'E2', 'E3', 'E4', 'E5', 'E6' ],
        [ 'F1', 'F2', 'F3', 'F4', 'F5' ],
        [ 'G1', 'G2', 'G3', 'G4' ]
    ],
    /**
     * State adheres to normalization, eg grid: { A1:{ hydro: ["id1"] } .... hydro:{ see below } }
     * where    hydro: { "id1": { x: 0, y: 130, value: 100 } }
     *
     * The basic concepts of normalizing data are:
     *
     *  + Each type of data gets its own "table" in the state.
     *  + Each "data table" should store the individual items in an object, with the IDs of the
     *    items as keys and the items themselves as the values.
     *  + Any references to individual items should be done by storing the item's ID.
     *  + Arrays of IDs should be used to indicate ordering.
     */
    grid: {
        A1:{ x: 0, y: 130, hydroIdx: [], rpIdx: [], gateIdx: [] },
        A2:{ x: 0, y: 217, hydroIdx: [], rpIdx: [], gateIdx: [] },
        A3:{ x: 0, y: 304, hydroIdx: [], rpIdx: [], gateIdx: [] },
        A4:{ x: 0, y: 391, hydroIdx: [], rpIdx: [], gateIdx: [] },

        B1:{ x: 75, y: 87,  hydroIdx: [], rpIdx: [], gateIdx: [] },
        B2:{ x: 75, y: 174, hydroIdx: [], rpIdx: [], gateIdx: [] },
        B3:{ x: 75, y: 261, hydroIdx: [], rpIdx: [], gateIdx: [] },
        B4:{ x: 75, y: 348, hydroIdx: [], rpIdx: [], gateIdx: [] },
        B5:{ x: 75, y: 435, hydroIdx: [], rpIdx: [], gateIdx: [] },

        C1:{ x: 150, y: 43,  hydroIdx: [], rpIdx: [], gateIdx: [] },
        C2:{ x: 150, y: 130, hydroIdx: [], rpIdx: [], gateIdx: [] },
        C3:{ x: 150, y: 217, hydroIdx: [], rpIdx: [], gateIdx: [] },
        C4:{ x: 150, y: 304, hydroIdx: [], rpIdx: [], gateIdx: [] },
        C5:{ x: 150, y: 391, hydroIdx: [], rpIdx: [], gateIdx: [] },
        C6:{ x: 150, y: 478, hydroIdx: [], rpIdx: [], gateIdx: [] },

        D1:{ x: 225, y: 0,   hydroIdx: [], rpIdx: [], gateIdx: [] },
        D2:{ x: 225, y: 87,  hydroIdx: [], rpIdx: [], gateIdx: [] },
        D3:{ x: 225, y: 174, hydroIdx: [], rpIdx: [], gateIdx: [] },
        D4:{ x: 225, y: 261, hydroIdx: [], rpIdx: [], gateIdx: [] },
        D5:{ x: 225, y: 348, hydroIdx: [], rpIdx: [], gateIdx: [] },
        D6:{ x: 225, y: 435, hydroIdx: [], rpIdx: [], gateIdx: [] },
        D7:{ x: 225, y: 522, hydroIdx: [], rpIdx: [], gateIdx: [] },

        E1:{ x: 300, y: 43,  hydroIdx: [], rpIdx: [], gateIdx: [] },
        E2:{ x: 300, y: 130, hydroIdx: [], rpIdx: [], gateIdx: [] },
        E3:{ x: 300, y: 217, hydroIdx: [], rpIdx: [], gateIdx: [] },
        E4:{ x: 300, y: 304, hydroIdx: [], rpIdx: [], gateIdx: [] },
        E5:{ x: 300, y: 391, hydroIdx: [], rpIdx: [], gateIdx: [] },
        E6:{ x: 300, y: 478, hydroIdx: [], rpIdx: [], gateIdx: [] },

        F1:{ x: 375, y: 87,  hydroIdx: [], rpIdx: [], gateIdx: [] },
        F2:{ x: 375, y: 174, hydroIdx: [], rpIdx: [], gateIdx: [] },
        F3:{ x: 375, y: 261, hydroIdx: [], rpIdx: [], gateIdx: [] },
        F4:{ x: 375, y: 348, hydroIdx: [], rpIdx: [], gateIdx: [] },
        F5:{ x: 375, y: 435, hydroIdx: [], rpIdx: [], gateIdx: [] },

        G1:{ x: 450, y: 130, hydroIdx: [], rpIdx: [], gateIdx: [] },
        G2:{ x: 450, y: 217, hydroIdx: [], rpIdx: [], gateIdx: [] },
        G3:{ x: 450, y: 304, hydroIdx: [], rpIdx: [], gateIdx: [] },
        G4:{ x: 450, y: 391, hydroIdx: [], rpIdx: [], gateIdx: [] },
    },
    hydro: {}, // { 'abc123': { x: 450, y: 391, value: 1234 }
    rp:    {}, // { 'def456': { x: 450, y: 391, level: 1 }
    gate:  {}  // { 'ghi789': { x: 450, y: 391, ownership: 'blue' } or 'red'
}

const gridReducer = ( state = initState, action ) => {
    switch (action.type) {
        case ActionTypes.SET_HYDRO: {
            let { key, id, hydro } = action.value;
            id = !!id ? id : uuid();
            let sectorHydro = new Set(state.grid[key].hydroIdx);
            sectorHydro.add(id);
            return {
                ...state,
               hydro: {
                    ...state.hydro,
                   [id]: hydro // basically override all values, not a merge.
               },
               grid: {
                    ...state.grid,
                   [key]: {
                       ...state.grid[key],
                       hydroIdx: Array.from( sectorHydro ) // basically not a merge.
                   }
               }
            }
        }
        case ActionTypes.SET_GATE: {
            let { key, index, hydro } = action.value;
            return {
                ...state,
                [`${key}`]:{
                    ...state[`${key}`],
                    hydro
                }
            }
        }
        case ActionTypes.SET_RP: {
            let { key, index, hydro } = action.value;
            return {
                ...state,
                [`${key}`]:{
                    ...state[`${key}`],
                    hydro
                }
            }
        }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    gridReducer,
})

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(),
            (process.env.NODE_ENV || '').toLowerCase().startsWith('prod') ? undefined : devtools()
        )
    )
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }
    return store
}

export default configureStore
