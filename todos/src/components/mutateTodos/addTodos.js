import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AddTodos extends Component {

	input = React.createRef();

	state={

		title: '',
		userId: '',
		completed: '',
		error : true,
		message: ''

	}

	handleOnChange = e => {

		const name = e.target.name;
		const value = e.target.value;
		
		if(name === 'userId') {

			if(value && (!Number(value))) {

				this.setState({ 
					error: true,
					message: 'Must be a number.'
				});

			} else if(Number(value) < 0) {

				this.setState({ 
					error: true,
					message: 'Must be greater than 0.'
				});

			} else if(value.indexOf('.') !== (-1)) {

				this.setState({ 
					error: true,
					message: 'Must be an integer.'
				});

			} else {

				this.setState({ 
					error: false,
					message: ''
				});
			}
			
		}

		this.setState({
			[name] : value
		});

	}

	handleSubmit = e => {

		const { maxNumber } = this.props;

		const newState ={ 
			title: this.state.title.trim(),
			userId: Number(this.state.userId),
			id : maxNumber + 1,
			completed: this.state.completed === 'completed' ? true : false
		}

		this.props.postTodo(newState);

		this.setState({
			title:'',
			userId:'',
			completed: 'incompleted'
		})

		e.preventDefault() 
	}

	render() {

		const {completed} = this.state;

		const display = this.state.error ? 'none' 
			: !this.state.title || !this.state.userId || !this.state.completed 
			? 'none' : 'block';

		const incompleteMessage = !this.state.title || !this.state.userId || !this.state.completed 
			? (<label className='text-warning'> PLEASE FILL BLANKS </label>) 
			: this.state.error ? (<label className='text-danger'>STILL ERROR</label>)
			: (<label className='mr-2'>DONE!<i className="fa fa-check ml-2"></i></label>);
		
		return <div className='card'>

			<form onSubmit={this.handleSubmit}>
				<div>
					<label>
						USER ID:
						<input type='text'
							name='userId'
							onChange={this.handleOnChange} 
							value={this.state.userId}
							ref={this.input}
							required = {true}
						/>
					</label>
					<label className="text-danger blink text-center d-block">{this.state.message}</label>
				</div>
				<div>
					<label>
						ID: {this.props.maxNumber + 1}
					</label>
				</div>
				<div>
					<label>
						TITLE:	
						<input type='text'
							name='title'
							onChange={this.handleOnChange}
							value={this.state.title} 
						/>
					</label>
				</div>
				<div>	
				
					<label>
						COMPLETED:
						<input type='radio' 
							name='completed'
							value= 'completed'
							onChange={this.handleOnChange}
							checked = {completed === 'completed'}
							
						/>
					</label>
					<label>
						IN-PROGRESS:
						<input type='radio' 
							name='completed'
							value= 'incompleted'
							onChange={this.handleOnChange}
							checked = {completed === 'incompleted'}
						/>
					</label>
				
				</div>
				<div className='text-center text-secondary mx-auto'>

					{incompleteMessage}

					<button
						className='btn btn-sm btn-danger mx-auto' 
						type='submit'
						style={{display: display}}
					>
						SUBMIT
					</button>
				</div>	
			</form>

		</div>
	}
}

export default connect(null, actions)(AddTodos);