import { EDIT_TODO } from '../actions/types';

export default function (state = null, action) {

    switch(action.type) {

        case EDIT_TODO:
        	
            return action.payload;
        
        default:

            return state;

    }

}
