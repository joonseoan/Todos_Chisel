import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import TodoList from './TodoList'

class App extends Component {

  componentDidMount () {

  	this.props.fetchTodos()

  }

  render() {

    if(this.props.todos.length === 0) return <div />
  
    return (

    	<div>
	    	<div className="container jumbotron">

	    		<div className='item-hl'>
		    		
	        		<TodoList 
                todos={ this.props.todos }
                postTodo={ this.props.postTodo }
              />
		    	
		    	</div>	
	    	
	    	</div>
    	</div>

    );

  }

}

function mapStateToProps({ todos }) {

  return { todos }
}

export default connect(mapStateToProps, actions)(App);