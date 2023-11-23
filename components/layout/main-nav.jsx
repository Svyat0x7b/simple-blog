import { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import classes from './main-nav.module.css';

const ROUTES = [
    { title: 'Home', link: '/' },
    { title: 'Posts', link: '/posts' },
    { title: 'Contact', link: '/contact' },
];

const MainNav = () => {
    const [activeRoute, setActiveRoute] = useState('Home');
    const activateRoute = (title) => {
        setActiveRoute(title);
    };
    return (
        <header className={classes.header}>
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <ul>
                    {ROUTES.map((route) => (
                        <li
                            key={route.title}
                            className={activeRoute === route.title ? classes.activeLink : ''}
                            onClick={() => activateRoute(route.title)}>
                            <Link href={route.link}>{route.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default MainNav;
