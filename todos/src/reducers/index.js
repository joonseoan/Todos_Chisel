import { combineReducers } from 'redux';

// import { reducer as reduxForm } from 'redux-form';

import todos from './fetchTodos';
import postTodo from './postTodo';
import editTodo from './editTodo';

export default combineReducers ({
    todos,
    postTodo,
    editTodo
});