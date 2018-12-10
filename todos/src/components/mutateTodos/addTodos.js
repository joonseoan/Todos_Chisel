import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AddTodos extends Component {

	input = React.createRef();

	state={

		title: '',
		userId: '',
		completed: false

	}

	componentDidUpdate(prevProps, prevState){

		if(this.props.postTodo.id !== prevProps.postTodo.id) {
			this.props.setNewTodo(this.props.postTodo);
		}

	}

	handleOnChange = e => {

		const name = e.target.name;
		const value = e.target.value.trim();
		this.setState({
			[name] : value
		});

	}

	handleSubmit = e => {

		const { maxNumber } = this.props;

		const newState ={ 
			title: this.state.title,
			userId: Number(this.state.userId),
			id : maxNumber + 1,
			completed: this.state.completed
		}

		this.props.postTodo(newState);

		e.preventDefault() 

		this.setState({
			title:'',
			userId:'',
			completed: false
		})

	}

	render() {

		console.log(this.state.title, this.state.userId, this.state.completed)
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
						/>
					</label>
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
							onChange={this.handleOnChange}
							value={true} 
						/>
					</label>
					<label>
						IN-PROGRESS:
						<input type='radio' 
							name='completed'
							onChange={this.handleOnChange}
							value={false} 
						/>
					</label>
				
				</div>
				<button className='btn btn-sm btn-danger' type='submit'>
					SUBMIT
				</button>	
			</form>

		</div>
	}
}

function mapStateToProps({ postTodo }) {
	return {postTodo};
}

export default connect(null, actions)(AddTodos);