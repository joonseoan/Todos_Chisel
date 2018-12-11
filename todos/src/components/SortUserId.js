import React, { Component } from 'react';

// All the sorting function. Need to change component name
class SortUserId extends Component {

	handleOnChange = e => {

		const { sortList } = this.props.sortControl;

		sortList(e.target.value);

	}

	render() {

		// The sorting functions are based on the radio buttons.
		// Ascending on the basis of id and userId are omitted 
		// 	because they are already run prior to these sorting functions
		return <div>

			<div>
				<div>
					<label>Title (Ascending)
						<input 
							type='radio' 
							name="sort" 
							value="a_title" 
							onChange={ this.handleOnChange } 
							className='ml-2 align-middle' 
						/>
					</label>
				</div>

				<div>
					<label>Title (Descending)
						<input 
							type='radio' 
							name="sort" 
							value="d_title" 
							onChange={ this.handleOnChange } 
							className='ml-2 align-middle' 
						/>
					</label>
				</div>
			</div>

			<div>
				<label>User ID (Descending)
					<input 
						type='radio' 
						name="sort" 
						value="userId" 
						onChange={ this.handleOnChange }
						className='ml-2 align-middle' 
					/>
				</label>
			</div>

			<div>
				<label>ID (Descending)
					<input 
						type='radio' 
						name="sort" 
						value="id" 
						onChange={ this.handleOnChange } 
						className='ml-2 align-middle' 
					/>
				</label>
			</div>

			<div>
				<label>Completed (In-Progress - Completed)
					<input 
						type='radio' 
						name="sort" 
						value="completed" 
						onChange={ this.handleOnChange } 
						className='ml-2 align-middle' 
					/>
				</label>
			</div>

			<div>	
				<label>Back To Origin
					<input 
						type='radio' 
						name='sort' 
						value=''
						onChange={ this.handleOnChange } 
						defaultChecked={true}
						className='ml-2 align-middle' 
					/>
				</label>
			</div>

		</div>
	}
}


export default SortUserId;
