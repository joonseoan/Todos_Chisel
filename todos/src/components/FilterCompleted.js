import React, { Component } from 'react';


class FilterCompleted extends Component {

	handleOnChange = e => {

		const { filterCompleted } = this.props.filterControl;

		// console.log(e.target.value);

		filterCompleted(e.target.value);


	}

	render() {

		return <div>

			<div>
				<label>Completed
					<input type='radio' name="completed" value="completed" onChange={ this.handleOnChange }/>
				</label>
			</div>

			<div>
				<label>In-Progress
					<input type='radio' name="completed" value="incompleted" onChange={ this.handleOnChange } />
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