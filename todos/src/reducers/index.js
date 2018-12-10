import { combineReducers } from 'redux';

// import { reducer as reduxForm } from 'redux-form';

import todos from './fetchTodos';
import postTodo from './postTodo';

export default combineReducers ({
    todos,
    postTodo
});