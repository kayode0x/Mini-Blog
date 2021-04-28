import Loading from './Loading';
import Error from './Error';
import useFetch from './useFetch';
import { useState, useEffect } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const Home = () => {
	const [loadHome, setLoadHome] = useState(null);
	useEffect(() => {
		fetch(`http://192.168.1.98:5000/latest`)
			.then((res) => res.json())
			.then((data) => setLoadHome(data));
		// .catch((err) => alert(err));
	}, []);

	const { data: blogs, error, isLoading } = useFetch('http://192.168.1.98:5000/blogs');

	return (
		<>
			{error && <Error />}
			{isLoading && <Loading />}
			{loadHome && (
				<div>
					<div className="homepage">
						<div className="homepage-title">{loadHome.title}</div>
						<img className="homepage-img" src={loadHome.image} alt="" />
						<div className="homepage-lead">{loadHome.body}</div>
						<a className="homepage-link" href={loadHome.link}>
							Continue Reading
							<IconContext.Provider value={{ className: 'homepage-icon' }}>
								<IoChevronForward />
							</IconContext.Provider>
						</a>

						<p className="trending-div">
							<span>Trending</span>
						</p>
					</div>
					{blogs && (
						<div className="homepage-list">
							{error && <Error />}
							{isLoading && <Loading />}
							{blogs &&
								blogs.map((blog) => (
									<div key={blog.id}>
										<a className="homepage-preview" href={`/blog${blog.id}`}>
											<img className="homepage-list-img" src={blog.image} alt="" />
											<p>{blog.title}</p>
										</a>
									</div>
								))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Home;
