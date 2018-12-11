import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EditInput extends Component {

	state = { 
		userId: 0,
		title : '',
		completed: ''
	}

	componentDidMount = () => {

		const { title, completed, userId } = this.props.postedTodo;

		this.setState({

			userId,
			title,
			completed: completed ? 'completed' : 'incompleted'

		});

	}

	handleOnChange = e => {

		const name = e.target.name;
		const value = e.target.value;
		
		this.setState({
			[name]: value

		})

	}

	handleOnSubmit = e => {

		const { postedTodo, removeTodo } = this.props;

		// removeTodo(postedTodo.id);

		const updatedState = {

			userId: this.state.userId,
			title: this.state.title,
			completed: this.state.completed === 'completed' ? true : false

		}

		this.props.editTodo(updatedState, postedTodo.id);
		
		e.preventDefault();

		this.setState({ 
			userId: '',
			title: '',
			completed: ''
		});

		this.props.closeModal();


	}

	render() {

		const { postedTodo } = this.props;

		if(!postedTodo) return <div />;

		return <div className='text-center mt-3'>
			<form onSubmit = { this.handleOnSubmit }>
				<div>
					<label>Edit Title: </label>
					<input type='text'
						name = 'title'
						onChange= { this.handleOnChange } 
						value = { this.state.title } 
					/>
				</div>
				<div>
					<label>
						Completed
						<input type='radio' 
							name='completed' 
							value='completed'
							onChange={this.handleOnChange}
							checked={this.state.completed === 'completed'}
						/>
					</label>
					<label>
						Incompleted
						<input type='radio' 
							name='completed' 
							value='incompleted'
							onChange={this.handleOnChange}
							checked={this.state.completed === 'incompleted'}
						/>
					</label>
				</div>

				<div className='mt-3'>
					<button 
						type='submit'
						className = 'btn btn-sm btn-danger'
					>
						SEND
					</button>
				</div>
	
			</form>
		</div>;

	}
}

export default connect(null, actions)(EditInput);
