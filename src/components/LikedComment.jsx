import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconContext } from 'react-icons';


const LikedComment = ({ liked, onClick }) => {
	return (
		<>
			{liked ? (
				<IconContext.Provider value={{ color: 'red', className: 'liked-love-icon', size: '.85rem' }}>
					<FaHeart onClick={onClick} />
				</IconContext.Provider>
			) : (
				<IconContext.Provider value={{ size:'.85rem'}}>
					<FaRegHeart className="love-icon" onClick={onClick} />
				</IconContext.Provider>
			)}
		</>
	);
};

export default LikedComment;