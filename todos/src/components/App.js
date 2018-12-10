import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import TodoList from './TodoList'
// import FilterUserId from './FilterUserId';

class App extends Component {

  componentDidMount () {

  	this.props.fetchTodos()

  }

  render() {
  
    return (

    	<div>
	    	<div className="container jumbotron">

	    		<div className='item-hl'>
		    		
	        		<TodoList />
		    	
		    	</div>	
	    	
	    	</div>
    	</div>

    );

  }

}
 
export default connect(null, actions)(App);