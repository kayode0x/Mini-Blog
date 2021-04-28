import { IoMenu, IoClose } from "react-icons/io5";
import { IconContext } from 'react-icons';

const NavBarMenu = ({ isOpen, openMenu, closeMenu, clicked }) => {

    return (
        <IconContext.Provider value={{ className: 'menuIcon', size: '2.5rem' }}>
            <div className='nav-icon'>
                {
                    isOpen ? <IoClose className='close-icon' onClick={closeMenu} /> : <IoMenu className = { clicked && 'menu-icon-prev'} onClick={openMenu} />
                }
            </div>
        </IconContext.Provider>
    );
}

export default NavBarMenu;