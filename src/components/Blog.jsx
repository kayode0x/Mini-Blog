import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiShare } from 'react-icons/fi'
import { BiComment } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { Helmet } from 'react-helmet'
import { IoChevronForward } from 'react-icons/io5';

const Blog = () => {
    const { id } = useParams();
    const [liked, setLiked] = useState(null);
    const [blog, setBlog] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch('http://192.168.1.98:5000/blogs/' + id, { signal: abortCont.signal })
			.then((res) => {
				if (!res.ok) {
					throw new Error('Could not load data from the database');
				}
				return res.json();
			})
			.then((data) => {
				setBlog(data);
				if (data.liked === true) {
					setLiked(true);
				} else if (data.liked === false) {
					setLiked(false);
				}
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				if (err.name === 'AbortError') {
					// empty if statement
				} else {
					setIsLoading(false);
					setError(err);
				}
			});

        return () => abortCont.abort()

    }, [id, liked])

    const likePost = () => {
        liked ? setLiked(false) : setLiked(true);
        fetch(`http://192.168.1.98:5000/blogs/${blog.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ liked: !blog.liked }),
		});
    }

    return (
		<>
			{isLoading && <Loading />}
			{error && <Error />}
			{blog && (
				<div className="blog-details">
					<Helmet>
						<meta charset="utf-8" />
						<title>{blog.title}</title>
					</Helmet>

					<div className="main-blog-place">
						<article>
							<h1>{blog.title}</h1>
							<p> {blog.author} </p>
							<img className="blog-img" src={blog.image} alt="" />
							<div className="icons-source">
								<p className="source">
									Image source <a href={blog.image}>Unsplash</a>
								</p>
								<div className="iconsSource">
									{blog.liked ? (
										<IconContext.Provider value={{ className: 'liked-love-icon' }}>
											<FaHeart onClick={likePost} />
										</IconContext.Provider>
									) : (
										<FaRegHeart className="love-icon" onClick={likePost} />
									)}

									<Link className="commentIcon" to={`/blog${blog.id}/discussion`}>
										<BiComment />
									</Link>
									<FiShare className="shareLink" />
								</div>
							</div>
							<div className="blog-body">{blog.body}</div>
						</article>
						<Link className="blogComment" to={`/blog${blog.id}/discussion`}>
							Join the discussion
							<IconContext.Provider value={{ className: 'forwardIcon' }}>
								<IoChevronForward />
							</IconContext.Provider>
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default Blog;