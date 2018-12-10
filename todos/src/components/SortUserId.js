import React, { Component } from 'react';

class SortUserId extends Component {

	handleOnChange = e => {

		const { sortList } = this.props.sortControl;

		sortList(e.target.value);

	}

	render() {
		return <div>

			<div>
				<div className='d-inline'>
					<label>Title (Ascending)
						<input type='radio' name="sort" value="a_title" onChange={ this.handleOnChange } />
					</label>
				</div>

				<div className='d-inline'>
					<label>Title (Descending)
						<input type='radio' name="sort" value="d_title" onChange={ this.handleOnChange } />
					</label>
				</div>
			</div>

			<div>
				<label>User ID (Descending)
					<input type='radio' name="sort" value="userId" onChange={ this.handleOnChange }/>
				</label>
			</div>

			<div>
				<label>ID (Descending)
					<input type='radio' name="sort" value="id" onChange={ this.handleOnChange } />
				</label>
			</div>

			<div>
				<label>Completed (In-Progress - Completed)
					<input type='radio' name="sort" value="completed" onChange={ this.handleOnChange } />
				</label>
			</div>

			<div>	
				<label>Back To Origin
					<input type='radio' 
						name='sort' 
						value=''
						onChange={ this.handleOnChange } 
						defaultChecked={true}
					/>
				</label>
			</div>

		</div>
	}
}


export default SortUserId;
