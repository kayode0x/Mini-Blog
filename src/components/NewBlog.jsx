import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NewBlog = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    const createBlog = (e) => {
        e.preventDefault();

        let w = title.trim()
        let x = author.trim()
        let y = image.trim()
        let z = body.trim()

        if (w === '' || x === '' || y === '' || z === ''){
            alert('Please fill all fields')

        } else {
            const blog = { title, author, image, body }
            setIsLoading(true)
            postBlog(blog);
        }
    }
    const addLatest = async (blog) => {
        await fetch('http://192.168.1.98:5000/latest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog)
        })
    }

    const postBlog = async (blog) => {
        await fetch('http://192.168.1.98:5000/blogs', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog)
        })
        .then(()=> {
            setIsLoading(false)
            addLatest(blog);
            history.push("/");
        })
        .catch(err => {
            alert("Could not post blog, please try again later. \nError: " + err.message)
            setIsLoading(false);
        })
        
    }

    return (
        <div className="add-blog">
            <Helmet>
                <meta charset='utf-8'/>
                <title> Write A New Blog </title>
            </Helmet>
            <h3>Add a new blog</h3>
            <form onSubmit={createBlog}>
                <div className="title">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="author">
                    <label htmlFor="author">Author</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        value={author}
                        required
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="image">
                    <label htmlFor="image">Image Link</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={image}
                        required
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="blog-text">
                    <label htmlFor="blog-text">Blog Post</label>
                    <textarea 
                        name="blog-text" 
                        id="blog-text"
                        value={body}
                        required
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                {!isLoading && <button type="submit" className="btn">Post Blog</button>}
                { isLoading && <button disabled type="submit" className="btn">Posting...</button> }
            </form>
        </div>
    );
}

export default NewBlog;