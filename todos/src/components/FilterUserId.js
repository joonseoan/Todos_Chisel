import React, { Component } from 'react';
import _ from 'lodash';


// Filter Todos based on UserId Text Input
// The reason this input need to be build
// 	is because when users are hundreds of users or more than that numbers,
// 	it is very hard to find a specific user with (for example,) userId : 10000
class FilterUserId extends Component {

	state = { userIdLength : 0 }

	componentDidUpdate(prevProps, prevState) {

		const { userIdNumbers, userId, setSlide } = this.props.controlData;

		// Update and find the pagination button equivalent to a userId entered in the text input
		if(prevProps.controlData.userId !== userId) {

			const findUserId = _.filter(userIdNumbers, userIdNumber => userIdNumber === Number(userId));

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

	// Validation
	validate = () => {
		const { userId } = this.props.controlData;

		if(userId && !Number(userId)) return 'Please enter a number.';
		if(userId && this.state.userIdLength === 0) return 'Cannot find the user.'

	} 

	render() {

		// Underline-based input design
		const inputDesign = {
		    backgroundColor: "transparent",
		    border: "none",
		    borderBottom: "1px solid #000000",
		    boxShadow: "none",
		    outline: "none",
		    borderRadius: "0%"
		};

		if(!this.props.controlData) return <div />
		
		return(<div>
			<label>ENTER USER ID: </label>
			<input type='text'
				onChange={this.handleOnChange}
				value={this.props.controlData.userId}
				style={inputDesign}
			/>
			<label className='d-block text-danger text-right blink'>{this.validate()}</label>

		</div>);
	}
}

export default FilterUserId;