import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// Actually, I wanted to use redux form but
// I kept having the error "withRef ...." the library.
// Maybe, the version might be changed
// This issue generated a lot of time consumming to build this app.
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
		
		// Validate Inputs
		if(name === 'userId') {

			// not number
			if(value && (!Number(value))) {

				this.setState({ 
					error: true,
					message: 'Must be a number.'
				});

			// when the number is negative
			} else if(Number(value) < 0) {

				this.setState({ 
					error: true,
					message: 'Must be greater than 0.'
				});

			// when the number is not integer
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

		// post new todo
		const { maxNumber } = this.props;

		const newState ={ 
			title: this.state.title.trim(),
			userId: Number(this.state.userId),
			// Automatic new Id generation
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

		// Submit button display control in terms of the error
		const display = this.state.error ? 'none' 
			: !this.state.title || !this.state.userId || !this.state.completed 
			? 'none' : 'block';

		// Eorror Message Control
		const incompleteMessage = !this.state.title || !this.state.userId || !this.state.completed 
			? (<label className='text-warning'> PLEASE FILL BLANKS </label>) 
			: this.state.error ? (<label className='text-danger'>STILL ERROR</label>)
			: (<label className='mr-2'>DONE!<i className="fa fa-check ml-2"></i></label>);

		const inputDesign = {
		    backgroundColor: "transparent",
		    border: "none",
		    borderBottom: "1px solid #000000",
		    boxShadow: "none",
		    outline: "none",
		    borderRadius: "0%"
		};
		
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
							style={inputDesign}
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
							style={inputDesign}
						/>
					</label>
				</div>
				<div>	
				
					<label className='mr-3'>
						COMPLETED:
						<input type='radio' 
							name='completed'
							value= 'completed'
							onChange={this.handleOnChange}
							checked = {completed === 'completed'}
							className='ml-2 align-middle'
						/>
					</label>
					<label>
						IN-PROGRESS:
						<input type='radio' 
							name='completed'
							value= 'incompleted'
							onChange={this.handleOnChange}
							checked = {completed === 'incompleted'}
							className='ml-2 align-middle'
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