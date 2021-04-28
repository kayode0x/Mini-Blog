import { Link, useParams } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const CommentGoBack = () => {
	const { id } = useParams();
	return (
		<div className="div-go-back">
			<Link className="commentGoBack" to={`/blog${id}`}>
				<IconContext.Provider value={{ className: 'backIcon' }}>
					<IoChevronBack />
				</IconContext.Provider>
				Back to Blog
			</Link>
		</div>
	);
};

export default CommentGoBack;
