import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavBarMenu from './NavBarMenu'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const matches = useMediaQuery("(max-width: 480px)");
    const [isOpen, setIsOpen] = useState(false)
    const [clicked, setClicked] = useState(false);

    const openMenu = () => {
        setIsOpen(true)
        setClicked(true)
    }
    const closeMenu = () => {
        setIsOpen(false)
        setClicked(true)
    }
    
    useEffect(() => {
		const handleScroll = () => {
			isOpen ? closeMenu() : setIsOpen(false);
		};
		window.removeEventListener('scroll', handleScroll, { capture: false });
		return () => {
			window.addEventListener('scroll', handleScroll);
		};
	}, [isOpen]);

    return (
		<div className="main-nav">
			<nav className="navbar">
				<Link to="/">
					<h1>Mini Blog</h1>
				</Link>

				{matches === true ? (
					<NavBarMenu clicked={clicked} isOpen={isOpen} openMenu={openMenu} closeMenu={closeMenu} />
				) : (
					<div className="links">
						<Link to="/">Home</Link>
						<Link to="/blogs">All Blogs</Link>
						<Link to="/create">New Blog</Link>
					</div>
				)}
			</nav>
			{isOpen ? (
				<div className="nav-mobile nav-fadeIn">
					<Link to="/" onClick={closeMenu}>
						Home
					</Link>
					<Link to="/blogs" onClick={closeMenu}>
						All Blogs
					</Link>
					<Link to="/create" onClick={closeMenu}>
						New Blog
					</Link>
				</div>
			) : (
				<div className={clicked ? 'nav-fadeOut' : ''}></div>
			)}
		</div>
	);
}

export default Navbar;