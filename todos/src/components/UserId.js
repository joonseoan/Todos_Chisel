import React, {Component} from 'react';
import _ from 'lodash';

class UserId extends Component {

	handleClick = e => {

		const {setUserId} = this.props.controlData;
		setUserId(e.target.value);

	}

	shouldComponentUpdate(nextProps, nextState){

		const { userIdNumbers, userId, slide, setSlide } = this.props.controlData;

		if(this.props.controlData.userId && 
			this.props.controlData.userId !== nextProps.controlData.userId) {

			const findUserId = _.filter( userIdNumbers, userIdNumber => 
				userIdNumber === nextProps.controlData.userId);
			

			if(findUserId === 0) return false;
		}

		return true;

	}

	render() {

		const { userIdNumbers, userId, setUserId, slide, setSlide } = this.props.controlData;

		if(userIdNumbers.length === 0) return <div />;
		
		const lastSlide = Math.ceil(userIdNumbers.length / 3);
		
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
							onClick={ () => { setSlide(slide - 1) }}
						>
							<i className="fa fa-chevron-circle-left"
								style={{fontSize: '15px'}}
							></i>
						</div>
					</li>

					{_.map(userIdNumbers, number => {
						if( number >= (slide * 3 - 2)  && number <= slide * 3) {
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
							onClick={ () => { setSlide(slide + 1) } }
						>
							<i className="fa fa-chevron-circle-right align-middle"
								style={{fontSize: '15px'}}
							></i>
						</div>
					</li>

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