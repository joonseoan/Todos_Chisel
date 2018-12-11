import React, { Component } from 'react';

// Filter todos based on completed property
class FilterCompleted extends Component {

	// Control input data from radio button
	handleOnChange = e => {

		const { filterCompleted } = this.props.filterControl;

		filterCompleted(e.target.value);

	}

	render() {

		{/* 3 radio buttons 
			The reason to use radio buttons is because 
			when the check boxes are used and both completed and incompleted are checked
			we do not know what data should display.
		*/}
		return <div>

			<div>
				<label>Completed
					<input
						className='ml-2 align-middle' 
						type='radio' 
						name="completed" 
						value="completed" 
						onChange={ this.handleOnChange }/>
				</label>
			</div>

			<div>
				<label>In-Progress
					<input
						className='ml-2 align-middle'  
						type='radio' 
						name="completed" 
						value="incompleted" 
						onChange={ this.handleOnChange } />
				</label>
			</div>
			
			<div>	
				<label>All
					<input type='radio' 
						name='completed'
						value=''
						onChange={ this.handleOnChange } 
						defaultChecked = {true}
					/>
				</label>
			</div>

		</div>
	}
}

export default FilterCompleted;