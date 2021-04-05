import configureStore from './index';
import {setHydro} from '../actions/index';

describe('reducers', () => {
    describe('gridReducer',()=>{
        describe('setHydro', () => {
            it('should be equal to default state', ( ) => {
                const initialState = Object.freeze({
                });
                const store = configureStore(initialState);
                store.dispatch(setHydro( 'A1', 'a5c0ee1d-9f40-45cc-b568-1bf598ea5a70', 100, 200, 1000 ));
                expect( store.getState() ).toMatchSnapshot();
            });
        });
    });
});
