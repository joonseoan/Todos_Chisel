import { POST_TODO } from '../actions/types';

export default function (state = null, action) {

    switch(action.type) {

        case POST_TODO:
        	
        	console.log(action.payload)
            return action.payload;
        
        default:

            return state;

    }

}
