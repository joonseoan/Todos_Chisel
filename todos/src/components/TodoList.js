import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import UserId from './UserId';
import FilterUserId from './FilterUserId';
import FilterCompleted from './FilterCompleted';
import SortUserId from './SortUserId';
import PostedTodo from './PostedTodo';
import AddTodos from './mutateTodos/addTodos';

class TodoList extends Component {

	state = {

		todos: [],
		userId: '',
		slide : 1,
		completedStatus : '',
		sortValue: '',
		postedTodo: null,
		openModal: false

	}

	// To setup and assign numbers to todo list
	itemNumber = 0;

	// assgin props data to state.todos
	componentDidMount = () => {

		const { todos } = this.props;

		this.setState({ todos });


	}

	// Update
	componentDidUpdate(prevProps, prevState) {

		// add a new todo to this.state.todos
		if(prevProps.postTodo !== this.props.postTodo) {

			const newTodos = _.concat(prevState.todos, this.props.postTodo);
			this.setState({ todos: newTodos });
			this.itemNumber = 0;
	
		}

		// update an existing todo to this.state.todos
		if(prevProps.editTodo !== this.props.editTodo) {

			const newTodos = _.filter(prevState.todos, todo=> todo.id !== this.props.editTodo.id);
			this.setState({ todos: _.concat(newTodos, this.props.editTodo) });
			this.itemNumber = 0;
		}

	}

	render() {

		const { todos } = this.state;

		if(this.props.todos.length === 0) return <div />

		if(todos.length === 0) return <div />;

		// Sorting the todo data in case 'id' / 'userId' 
		//		propertie(s) of the elements are not sorted
		const ascendingTodos = todos
			.sort((first, second) => first.userId - second.userId)
			.sort((first, second) => first.id - second.id);

		// Asing a variable to receive the manipulated data
		//	which are sorted or filtered data
		let newTodoList = [];

		// Filter unique userIds to build pagination buttons 
		// 	which are based on userIds
		const userIds = _.uniqBy(_.sortBy(_.map(ascendingTodos, todo => todo.userId)));

		const controlData = {

			userIdNumbers: userIds,
			userId: this.state.userId,
			setUserId: (userId) => {
				this.setState({userId});
				this.itemNumber = 0;
			},
			slide: this.state.slide,
			setSlide: (slide) => {
				this.setState({ slide });
				this.itemNumber = 0;
			}

		};


		// filter data based on a userId
		const filterUserId = _.filter(ascendingTodos, todo => todo.userId === Number(this.state.userId));

		// in case the userIds are not availbe, it should get back to all data
		newTodoList = filterUserId.length !== 0 ? filterUserId : ascendingTodos;

		// In order to sort data based on 'completed' property down below
		const completedList = _.filter(newTodoList, todo => todo.completed);
		const inCompletedList = _.filter(newTodoList, todo => !todo.completed);

		// Filter data based on 'completed'
		if(this.state.completedStatus === 'completed') {
			newTodoList = completedList;
		} else if (this.state.completedStatus === 'incompleted') {
			newTodoList = inCompletedList;
		}

		// Soring data
		if(this.state.sortValue === 'a_title') {
			newTodoList = newTodoList.sort((first, second) => first.title !== second.title ? first.title < second.title ? -1 : 1 : 0);
		} else if(this.state.sortValue === 'd_title') {
			newTodoList = newTodoList.sort((first, second) => first.title !== second.title ? first.title > second.title ? -1 : 1 : 0);
		} else if(this.state.sortValue === 'userId') {
			newTodoList = newTodoList.sort((first, second) => second.userId - first.userId);
		} else if(this.state.sortValue === 'id') {
			newTodoList = newTodoList.sort((first, second) => second.id - first.id);
		} else if (this.state.sortValue === 'completed') {
			newTodoList = inCompletedList.concat(completedList);
		}

		// Used flex-box for the responsive UI
		return(<div className='d-flex flex-wrap row-hl justify-content-center'>
			
			<div className='item-hl mr-5'>

				{/* Used Collapsible*/}
				<div id="accordion">
					<div className='card'>
						<div className='card-header'>
							<h5>
	            				<a href="#collapse1" data-parent="#accordion" data-toggle="collapse">
	              					FILTER USER ID
	            				</a>
	         				 </h5>
						</div>
						<div id="collapse1" className="collapse">
							<div className='card-body'>
								<FilterUserId controlData={controlData} />
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-header'>
							<h5>
	            				<a href="#collapse2" data-parent="#accordion" data-toggle="collapse">
	              					FILTER COMPLETED
	            				</a>
	         				 </h5>
						</div>
						<div id="collapse2" className="collapse">
							<div className='card-body'>

								<FilterCompleted 
									filterControl={{
										completedStatus: this.state.completedStatus,
										filterCompleted: (filter) => { 
											this.setState({completedStatus: filter});
											this.itemNumber = 0;
										}
									}} 
								/>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-header'>
							<h5>
	            				<a href="#collapse3" data-parent="#accordion" data-toggle="collapse">
	              					SORT DATA
	            				</a>
	         				 </h5>
						</div>
						<div id="collapse3" className="collapse">
							<div className='card-body'>
								<SortUserId 
									sortControl={{
										sortValue: this.state.sortValue,
										sortList: (value) => { 
											this.setState({sortValue: value});
											this.itemNumber = 0;
										}
									}} 
								/>
							</div>
						</div>
					</div>

					<div className='card'>
						<div className='card-header'>
							<h5>
	            				<a href="#collapse4" data-parent="#accordion" data-toggle="collapse">
	              					ENTER NEW TODOs
	            				</a>
	         				 </h5>
						</div>
						<div id="collapse4" className="collapse">
							<div className='card-body'>
								<AddTodos maxNumber={ascendingTodos[ascendingTodos.length - 1].id} />
							</div>
						</div>
					</div>

				</div>
			
			</div>

			<div className='item-hl'>
				
				<UserId 
					controlData = {controlData}
				/>
				
				<div className="d-inline">

					<div className="text-right mr-3 mb-3">
						<span className="mr-3">
							Completed: <i className="fa fa-check-square text-primary"></i> 
						</span>

						<span>
							In progress: <i className="fa fa-flag text-danger"></i> 
						</span>
					</div>

				</div>

				<div>

					<ul className="list-group list-group-flush">
					{/* Render All todos or manipulated todos*/}
						{_.map(newTodoList, todo => {
							
							return <li key={todo.id}  
								 className={`list-group-item bg-${this.itemNumber % 2 === 0 ? 'light' : ''}`}>
								
								<div onClick={ () => {
								
									this.setState({ 

										postedTodo: todo,
										openModal: true

									});

									this.itemNumber = 0;
								}}
									
								>
									<div className="font-weight-bold d-inline">
										{this.itemNumber=this.itemNumber+1}. {todo.title}
									</div>
									<div className="d-inline float-right">
										<i className={`fa fa-${!todo.completed 
										? 'flag text-danger blink' 
										: 'check-square text-primary'}`}></i>
									</div>
									<div className="ml-4">Todo-ID: {todo.id} </div>
									<div className="text-right">User ID: {todo.userId}</div>
								</div>
							</li>;
						})}
					</ul>
				<div>
					{/* Display Sinngle todo by using Modal*/}
					<PostedTodo 

						modalControl= {{

							postedTodo: this.state.postedTodo,
							openModal: this.state.openModal,
							closeModal: () => {
								this.setState({ openModal: false });
								this.itemNumber = 0;
							}
						}}
					/>

				</div>	

				</div>
			</div>
		</div>);
	}
}

// Get a new / updated todo by using Redux
function mapStateToProps({ postTodo, editTodo }) {

	return { postTodo, editTodo }
}

export default connect(mapStateToProps)(TodoList);
