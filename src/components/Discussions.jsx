import LikedComment from './LikedComment';
import LikedReply from './LikedReply';
import { useState, useEffect } from 'react';
import AddComment from './AddComment';
import CommentGoBack from './CommentGoBack';
import { useParams } from 'react-router-dom';

const Discussions = () => {
	const { id } = useParams();
	const [error, setError] = useState(false);
	const [discussions, setDiscussions] = useState(null);

	useEffect(() => {
		const abortCont = new AbortController();

		fetch(`http://192.168.1.98:5000/blogs/${id}`, { signal: abortCont.signal })
			.then((res) => {
				if (!res.ok) {
					throw new Error('Could not get data from the database');
				}
				return res.json();
			})
			.then((data) => {
				setDiscussions(data);
			})
			.catch((err) => {
				if (err.name === 'AbortError') {
					// empty if statement
				} else {
					setError(true);
				}
			});

		return () => abortCont.abort();
	}, [id]);

	//Like a comment
	const likeComment = (did) => {
		const url = `http://192.168.1.98:5000/blogs/${id}`;
		setDiscussions({
			...discussions,
			discussion: discussions.discussion.map((discussion) => {
				if (discussion.id === did) {
					return { ...discussion, liked: !discussion.liked };
				} else {
					return discussion;
				}
			}),
		});
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...discussions,
				discussion: discussions.discussion.map((discussion) => {
					if (discussion.id === did) {
						return { ...discussion, liked: !discussion.liked };
					} else {
						return discussion;
					}
				}),
			}),
		});
	};

	//Like a reply
	const likeReply = (xid, did) => {
		const url = `http://192.168.1.98:5000/blogs/${id}`;
		setDiscussions({
			//get the current discussion
			...discussions,
			//loop through to update
			discussion: discussions.discussion.map((discussion) => {
				//check if the discussion id matches the one you clicked
				if (discussion.id === xid) {
					//if yes, return the new discussion
					return {
						//get the current replies
						...discussion,
						//loop through the current replies
						replies: discussion.replies.map((reply) => {
							//check if the reply id matches the one you clicked
							if (reply.id === did) {
								//finally update the liked status
								return { ...reply, liked: !reply.liked };
							} else {
								//if no, return the old reply
								return reply;
							}
						}),
					};
				} else {
					//if no, return the old discussion
					return discussion;
				}
			}),
		});
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...discussions,
				//loop through to update
				discussion: discussions.discussion.map((discussion) => {
					//check if the discussion id matches the one you clicked
					if (discussion.id === xid) {
						//if yes, return the new discussion
						return {
							//get the current replies
							...discussion,
							//loop through the current replies
							replies: discussion.replies.map((reply) => {
								//check if the reply id matches the one you clicked
								if (reply.id === did) {
									//finally update the liked status
									return { ...reply, liked: !reply.liked };
								} else {
									//if no, return the old reply
									return reply;
								}
							}),
						};
					} else {
						//if no, return the old discussion
						return discussion;
					}
				}),
			}),
		});
	};

	const toggleComments = (did) => {
		const url = `http://192.168.1.98:5000/blogs/${id}`;
		setDiscussions({
			...discussions,
			discussion: discussions.discussion.map((discussion) => {
				if (discussion.id === did) {
					return { ...discussion, isOpen: !discussion.isOpen };
				} else {
					return discussion;
				}
			}),
		});
		fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...discussions,
				discussion: discussions.discussion.map((discussion) => {
					if (discussion.id === did) {
						return { ...discussion, isOpen: !discussion.isOpen };
					} else {
						return discussion;
					}
				}),
			}),
		});
	};

	return (
		<>
			{error && <div className="commentError">Cannot retrieve comments </div>}
			{discussions && (
				<>
					<CommentGoBack />

					<div className="commentSection">
						{discussions.discussion.map((discussion, index) => (
							<div key={discussion.id}>
								<div className="comment">
									<img
										onDoubleClick={() => likeComment(discussion.id)}
										className="commentImg"
										src={discussion.thumbnail}
										alt="userImg"
									/>
									<div className="commentBody">
										<p onDoubleClick={() => likeComment(discussion.id)}>
											<span>{discussion.user}</span> {discussion.comment}
										</p>

										{discussion.replies.length === 1 && (
											<div
												onClick={() => toggleComments(discussion.id)}
												className="toggleComments"
											>
												<p>
													{discussion.isOpen
														? `Hide ${discussion.replies.length} reply`
														: `Show ${discussion.replies.length} reply`}
												</p>
											</div>
										)}

										{discussion.replies.length >= 2 && (
											<div
												onClick={() => toggleComments(discussion.id)}
												className="toggleComments"
											>
												<p>
													{discussion.isOpen
														? `Hide ${discussion.replies.length} replies`
														: `Show ${discussion.replies.length} replies`}
												</p>
											</div>
										)}
									</div>
									<div className="commentEmoji">
										<LikedComment
											liked={discussion.liked}
											key={index}
											onClick={() => likeComment(discussion.id)}
										/>
									</div>
								</div>

								{discussion.isOpen ? (
									<div className="replies">
										{discussion.replies.map((reply, index) => (
											<div key={reply.id}>
												<div className="reply">
													<img
														onDoubleClick={() => likeReply(discussion.id, reply.id)}
														className="replyImg"
														src={reply.thumbnail}
														alt="userImg"
													/>
													<div className="replyBody">
														<p onDoubleClick={() => likeReply(discussion.id, reply.id)}>
															<span>{reply.replier}</span> {reply.reply}
														</p>
													</div>
													<div className="replyEmoji">
														<LikedReply
															liked={reply.liked}
															key={index}
															onClick={() => likeReply(discussion.id, reply.id)}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="replies"></div>
								)}
							</div>
						))}
					</div>
					<AddComment />
				</>
			)}
		</>
	);
};

export default Discussions;
