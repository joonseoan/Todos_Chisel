import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import EditTodos from './mutateTodos/editTodos';


// To Display Modal based a single Todo
class PostedTodo extends Component {

	// to switch to Update Input on Modal
	state = { edit : false }

	// To minimize rendering. To receive modalControl props object just once.
	shouldComponentUpdate(nextProps, nextState) {

		const { postedTodo, openModal } = this.props.modalControl;
		const { edit } = this.state;

		if(postedTodo) {
			if(openModal !== nextProps.modalControl.openModal) {
				return true;
			}
			if( edit !== nextState.edit) {
				return true;
			}

			if(postedTodo.id === nextProps.modalControl.postedTodo.id) {
				return false;
			}
		}

		return true;
	}

	render() {

		const { postedTodo, openModal, closeModal, removeTodo } = this.props.modalControl;

		if (!postedTodo) return <div />;

		return <div>

			<Modal show={ openModal } 
				style={{ top: '15%' }}
			>
				<Modal.Header className='bg-success'>
					<span className="text-center display-4 d-inline">
						USER ID: {postedTodo.userId}						
					</span>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="text-right text-primary font-weight-bold"
							style = {{ fontSize: '20px'}}
						>
							TODO-ID: { postedTodo.id }
						</div>
						{/* When this.state.edit is true, it changes the modal content into update input*/}
						{ !this.state.edit
						  ? (<div>
							  	<div className='mt-2'>
								<label className='font-weight-bold'>
									TODO-TITLE:
								</label>
								<p className='font-italic'>{ postedTodo.title } </p>
								</div>
								<div className='mt-4'>
									<label className='font-weight-bold'>
										STATE:
									</label>
									<p className={`text-${postedTodo.completed ? 'primary' : 'danger'}`}>
										{ postedTodo.completed ? "COMPLETED" : "STILL IN PORGRESS"}
									</p>
								</div>
							</div>)
						   : (<EditTodos
						   		postedTodo= { postedTodo } 
						   		closeModal={ closeModal }
						   		removeTodo={ removeTodo }
						   	/>)
						}

					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className='mx-auto'>
						<div className='btn btn-sm btn-secondary d-inline'
							onClick={() => { 
								closeModal();
								this.setState({ edit: false });
							}}
						>BACK</div>
						<div className='btn btn-sm btn-warning d-inline'
							onClick={() => { this.setState({ edit: true });}}
							style = {{ visibility : `${ this.state.edit ? 'hidden': 'visible' }`}}
						>EDIT</div>

						{ this.state.edit ? (

							<div className='btn btn-sm btn-success d-inline'
								onClick={() => { this.setState({ edit: false });}}
							>CANCEL</div>

							) : null 
						}

					</div>
				</Modal.Footer>
			</Modal>

		</div>
	}
}

export default PostedTodo;	