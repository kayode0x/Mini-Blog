import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Loading from './Loading';
import Error from './Error';
import useFetch from './useFetch';

const BlogList = () => {
    const { data: blogs, error, isLoading } = useFetch('http://192.168.1.98:5000/blogs');
    return (
        <>
            <Helmet>
				<meta charset="utf-8" />
				<title>Mini Blog</title>
			</Helmet>
            <div className="blog-list">
                {error && <Error />}
                {isLoading && <Loading />}
                {blogs && (
                    blogs.map((blog) => (
                        <div key={blog.id}>
                            <Link to={`/blog${blog.id}`}>
                                <img className="list-img" src={blog.image} alt="" />
                            </Link>
                            <div className="blog-preview">
                                <div className="blogs">
                                    <Link to={`/blog${blog.id}`}>
                                        <h2>{blog.title}</h2>
                                        <p>{blog.author}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
	);
}

export default BlogList;