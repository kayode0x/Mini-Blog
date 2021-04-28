import { IconContext } from 'react-icons';
import { FaExclamationTriangle } from 'react-icons/fa'

const Error = () => {
    return (
		<IconContext.Provider value={{ size: '5rem', className: 'errorIcon' }}>
			<div className="errorDiv">
				<FaExclamationTriangle />
				<p className="errorDiv-p">Could not load data.</p>
			</div>
		</IconContext.Provider>
	);
}

export default Error;