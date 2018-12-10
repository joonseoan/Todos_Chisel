import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class EditTodos extends Component {

	handleOnClick = e => {

		const data = {
			userId: 1,
			title: 'abcdedf',
			completed: false,

		}
		// console.log(this.props)
		this.props.editTodo(data, 10);
	}

	render() {

		return <div>
			<button

				className='btn-sm btn-primary'
				onClick={this.handleOnClick}

			>dddd</button>

			</div>
	}

}

export default connect(null, actions)(EditTodos);
// export default EditTodos;