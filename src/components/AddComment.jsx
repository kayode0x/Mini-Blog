import { RiSendPlaneFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { useState } from 'react'

const AddComment = () => {
    const [comment, setComment] = useState('');
    const handleComment = (e, comment) => {
        e.preventDefault();
        console.log(comment)
        let x = comment.trim();
        x !== '' 
        ? alert(`Yeah you typed ${x}, Unfortunately comments cannot be added yet, still working on that 😂`)
        : alert("Cannot add an empty comment")
        
    }

	return (
		<div className="main-addComment">
			<form className="addComment" onSubmit={(e) => handleComment(e, comment)}>
				<input
					type="text"
					placeholder="Add a comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<IconContext.Provider value={{ className: 'comment-icon', color: 'var(--main-text-color)' }}>
					<RiSendPlaneFill onClick={(e) => handleComment(e, comment)} />
				</IconContext.Provider>
			</form>
		</div>
	);
};

export default AddComment;
