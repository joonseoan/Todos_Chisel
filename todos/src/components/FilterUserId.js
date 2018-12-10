import React, { Component } from 'react';
import _ from 'lodash';

class FilterUserId extends Component {

	state = { userIdLength : 0 }

	componentDidUpdate(prevProps, prevState) {

		const { userIdNumbers, userId, setSlide } = this.props.controlData;

		if(prevProps.controlData.userId !== userId) {

			const findUserId = _.filter(userIdNumbers, userIdNumber => userIdNumber === Number(userId));

			// console.log('findUserID', findUserId)

			this.setState({userIdLength : findUserId.length })

			if(findUserId.length > 0) {

				const slideNumber = Math.ceil((userIdNumbers.indexOf(findUserId[0]) + 1) / 3);
				setSlide(slideNumber);
			
			}

		}

	}

	handleOnChange = e => {
		const { setUserId } = this.props.controlData;
		const value = e.target.value.trim();
		setUserId(value);

	}

	validate = () => {
		const { userIdNumbers, userId } = this.props.controlData;

		if(userId && !Number(userId)) return 'Please enter a number.';
		if(userId && this.state.userIdLength === 0) return 'Cannot find the user.'

	} 

	render() {

		if(!this.props.controlData) return <div />
		
		return(<div>
			<label>ENTER USER ID: </label>
			<input type='text'
				onChange={this.handleOnChange}
				value={this.props.controlData.userId}
			/>
			<label className='d-block text-danger text-right blink'>{this.validate()}</label>

		</div>);
	}
}

export default FilterUserId;