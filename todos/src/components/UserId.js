import React, {Component} from 'react';
import _ from 'lodash';

// Built Pagination Buttons
class UserId extends Component {

	state = {

		userIdNumbers: []
	}

	// Directly store props.userIdNumbers data into state above
	static getDerivedStateFromProps(nextProps, prevState) {
        
        if(prevState.userIdNumbers.length < nextProps.controlData.userIdNumbers.length) {

            return {
                userIdNumbers: nextProps.controlData.userIdNumbers
            };

        }
        return null;
   
    }

	handleClick = e => {

		const {setUserId} = this.props.controlData;
		setUserId(e.target.value);

	}

	render() {

		const { userIdNumbers } = this.state;

		if(userIdNumbers.length === 0) return <div />;

		// Props object and properties from TodoList
		const { userId, setUserId, slide, setSlide } = this.props.controlData;
		
		const lastSlide = Math.ceil(userIdNumbers.length / 3);
		
		// Button Display Control
		const prevDisplay = slide === 1 ? 'hidden' : 'visible';
		const nextDisplay = slide === lastSlide ? 'hidden' : 'visible';
		const allUserIdDisplay = !userId ? 'hidden' : 'visible';

		return(<div className='border rounded bg-secondary mb-3 mx-auto'
					style={{width:'475px'}}
				>
				<div className='text-white d-inline font-italic ml-3'
					style={{fontFamily:'Ubuntu'}}
				>FIND TO-DO BY USER ID: </div>
				<ul className='pagination ml-2'>

					<li className='d-inline'>
						<div className='d-inline btn btn-sm btn-outline-primary mr-2' type='button'
							style={{ visibility : prevDisplay}}

							// Control a number of Slide (PREV Button)
							onClick={ () => { setSlide(slide - 1) }}
						>
							<i className="fa fa-chevron-circle-left"
								style={{fontSize: '15px'}}
							></i>
						</div>
					</li>
					{/* Display Pagination Button*/}
					{_.map(userIdNumbers, number => {

						{/* Control Pagination slide which consists of 3 button 
							It is managed by indexOf methods to automatically control
							additional userIds in the future
						*/}

						if(userIdNumbers.indexOf(number) + 1 >= (slide * 3 - 2) &&
						 userIdNumbers.indexOf(number) + 1 <= slide * 3) {
							return <li key={number} >
						
								<button className={`btn btn-sm d-inline mr-2 
									btn-${Number(userId) === number ? 'warning' : 'success'} 
									`}
									onClick = {this.handleClick}
									value={number}
								>
									{number}

								</button>

							</li>
						}
					})}

					<li className='d-inline'>
						<div className='d-inline btn btn-sm btn-outline-primary mr-3' type='button'
							style={{ visibility : nextDisplay}}

							// Control a number of Slide (NEXT Button)
							onClick={ () => { setSlide(slide + 1) } }
						>
							<i className="fa fa-chevron-circle-right align-middle"
								style={{fontSize: '15px'}}
							></i>
						</div>
					</li>
					{/* To get gack to all userIds*/}
					<li>
						<button 
							className='btn btn-sm btn-primary'
							onClick={() => { setUserId('')}}
							style={{visibility: allUserIdDisplay}}
						>
							ALL USER IDs
						</button>
					</li>

				</ul>
		</div>);
	}
}

export default UserId