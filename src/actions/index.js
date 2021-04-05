export const ActionTypes = {
     SET_HYDRO : 'SET_HYDRO',
     SET_RP : 'SET_RP',
     SET_GATE : 'SET_GATE'
}

export const setHydro = ( key, id, x, y, value ) => ({
    type: ActionTypes.SET_HYDRO,
    value: {
        key,
        id,
        hydro : { x, y, value }
    }
});
