import { IconContext } from 'react-icons';
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <IconContext.Provider value={{ size: '5rem', className: 'not-found-icon' }}>
            <div className="not-found">
                <FaExclamationTriangle />
                <p>Page not found</p>
                <Link to="/">Back to home</Link>
            </div>
        </IconContext.Provider>
    );
}

export default NotFound;