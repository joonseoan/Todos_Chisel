import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import UserId from './UserId';
import FilterUserId from './FilterUserId';
import FilterCompleted from './FilterCompleted';
import SortUserId from './SortUserId';
import PostedTodo from './PostedTodo';
import AddTodos from './mutateTodos/addTodos';
import EditTodos from './mutateTodos/editTodos';

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

	itemNumber = 0;

	componentDidMount = () => {

		const { todos } = this.props;

		this.setState({ todos });


	}

	componentDidUpdate(prevProps, prevState) {

		if(prevProps.postTodo !== this.props.postTodo) {

			const newTodos = _.concat(prevState.todos, this.props.postTodo);
			this.setState({ todos: newTodos });
			this.itemNumber = 0;
	
		}
		
	}

	render() {

		const { todos } = this.state;

		if(this.props.todos.length === 0) return <div />

		if(todos.length === 0) return <div />;

		console.log(this.state.postedTodo)

		const ascendingTodos = todos
			.sort((first, second) => first.userId - second.userId)
			.sort((first, second) => first.id - second.id);

		let newTodoList = [];

		const userIds = _.uniqBy(_.map(ascendingTodos, todo => todo.userId));

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

		const filterUserId = _.filter(ascendingTodos, todo => todo.userId === Number(this.state.userId));

		newTodoList = filterUserId.length !== 0 ? filterUserId : ascendingTodos;

		const completedList = _.filter(newTodoList, todo => todo.completed);
		const inCompletedList = _.filter(newTodoList, todo => !todo.completed);

		if(this.state.completedStatus === 'completed') {
			newTodoList = completedList;
		} else if (this.state.completedStatus === 'incompleted') {
			newTodoList = inCompletedList;
		}

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

		return(<div className='d-flex flex-wrap row-hl justify-content-center'>
			
			<div className='item-hl mr-5 sticky-top'>

				<div className='sticky-top'>
		
					<FilterUserId controlData={controlData} />

					<FilterCompleted 
						filterControl={{
							completedStatus: this.state.completedStatus,
							filterCompleted: (filter) => { 
								this.setState({completedStatus: filter});
								this.itemNumber = 0;
							}
						}} 
					/>

					<SortUserId 
						sortControl={{
							sortValue: this.state.sortValue,
							sortList: (value) => { 
								this.setState({sortValue: value});
								this.itemNumber = 0;
							}
						}} 
					/>
					<AddTodos maxNumber={ascendingTodos[ascendingTodos.length - 1].id} />

					<EditTodos />
				
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
						{_.map(newTodoList, todo => {
							
							return <li key={todo.id}  
								 className={`list-group-item bg-${this.itemNumber % 2 === 0 ? 'light' : ''}`}>
								
								<div onClick={ () => {
									console.log('a: ', todo.id); 
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

					<PostedTodo 

						modalControl= {{

							postedTodo: this.state.postedTodo,
							openModal: this.state.openModal,
							closeModal: () => {
								this.setState({ openModal: false });
								this.itemNumber = 0;
							},
							removeTodo: (id) => {

								console.log('iddddddd: ', id)
								this.setState({
									todo: _.filter(this.state.todo, todo => (todo.id !== id))
								});
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

function mapStateToProps({ postTodo }) {

	return { postTodo }
}

export default connect(mapStateToProps)(TodoList);

// export default TodoList;
