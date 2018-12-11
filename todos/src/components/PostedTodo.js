import React, { Component } from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import EditInput from './EditInput';

class PostedTodo extends Component {

	state = { edit : false }

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

		console.log(this.state.edit)

		const { postedTodo, openModal, closeModal, removeTodo } = this.props.modalControl;

		if (!postedTodo) return <div />;

		console.log(postedTodo.id)

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
						   : (<EditInput 
						   		postedTodo= { postedTodo } 
						   		closeModal={ closeModal }
						   		removeTodo={ removeTodo }
						   	/>)
						}

					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className='mx-auto'>
						<div className='btn btn-sm btn-secondary'
							onClick={() => { 
								closeModal();
								this.setState({ edit: false });
							}}
						>BACK</div>
						<div className='btn btn-sm btn-warning'
							onClick={() => { this.setState({ edit: true });}}
						>EDIT</div>	
					</div>
				</Modal.Footer>
			</Modal>

		</div>
	}
}

export default PostedTodo;