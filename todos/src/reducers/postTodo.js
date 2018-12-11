// POST Reducer

import { POST_TODO } from '../actions/types';

export default function (state = null, action) {

    switch(action.type) {

        case POST_TODO:
        	
            return action.payload;
        
        default:

            return state;

    }

}
