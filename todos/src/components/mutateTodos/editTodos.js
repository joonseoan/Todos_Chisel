import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class EditTodos extends Component {

	state = { 
		userId: 0,
		title : '',
		completed: ''
	}

	componentDidMount = () => {

		// Asign a posted todo to be displayed ahead when inputs are placed in Modal
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

		const { postedTodo } = this.props;

		// an updated todo state
		const updatedState = {

			userId: this.state.userId,
			title: this.state.title,
			completed: this.state.completed === 'completed' ? true : false

		}

		// put an updated post to API
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

		const errorMessage = this.state.title ? '' : 'Must enter a title name.';

		// 'submit' button display control
		const display = this.state.title ? 'block' : 'none';

		const inputDesign = {
		    backgroundColor: "transparent",
		    border: "none",
		    borderBottom: "1px solid #000000",
		    boxShadow: "none",
		    outline: "none",
		    borderRadius: "0%"
		};

		return <div className='text-center mt-4 border rounded'>
			<form className='mt-3' onSubmit = { this.handleOnSubmit }>

				{/* update of title*/}
				<div>
					<label className='mt-3'>Edit Title: </label>
					<input 
						className='ml-3'
						style = { inputDesign }
						type='text'
						name = 'title'
						onChange= { this.handleOnChange } 
						value = { this.state.title } 
					/>
					<label className='text-danger text-center d-block blink mt-2'>
						{errorMessage}
					</label>
				</div>

				{/* update of complete*/}				
				<div className='mt-3'>
					<label className='mr-5'>
						Completed
						<input 
							className='ml-2 align-middle'
							type='radio' 
							name='completed' 
							value='completed'
							onChange={this.handleOnChange}
							checked={this.state.completed === 'completed'}
						/>
					</label>
					<label>
						Incompleted
						<input
							className='ml-2 align-middle' 
							type='radio' 
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
						className = 'btn btn-sm btn-danger mb-3 mx-auto'
						style={{ display : display }}
					>
						SEND
					</button>
				</div>
	
			</form>
		</div>;

	}
}

export default connect(null, actions)(EditTodos);