import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { ReactComponent as UpArrow } from '../assets/up-arrow-circle.svg';
import gsap from 'gsap';

let tl = gsap.timeline();

const Header = ({ history, dimensions }) => {
	// we use state becuase we want to know when the menu is opened and when it is opned, we want to trigger a certain animation
	const [menuState, setMenuState] = useState({ menuOpened: false });
	useEffect(() => {
		history.listen(() => {
			setMenuState({ menuOpened: false });
		});
		// if the menuState animation is opened, the state will be set to true
		if (menuState.menuOpened === true) {
			// Run open menu animaiton
			// when we click on the naviagtion and it opens up, we want to not be able to scroll on the body
			tl.to('body', { duration: 0.01, css: { overflow: 'hidden' } })
				.to('.App', {
					duration: 1,
					y: dimensions.width <= 654 ? '70vh' : dimensions.height / 2,
					ease: 'expo.inOut',
					// when you click on the hamburger menu, it should shrink and disappear
				})
				.to('.hamburger-menu span', {
					duration: 0.6,
					delay: -1,
					scaleX: 0,
					transformOrigin: '50% 0%',
					ease: 'expo.inOut',
				})
				.to('#Path_1', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 10,
						strokeDasharray: 5,
					},
				})
				.to('#Path_2', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 10,
						strokeDasharray: 20,
					},
				})
				.to('#Line_1', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 40,
						strokeDasharray: 18,
					},
				})
				.to('#circle', {
					duration: 0.6,
					delay: -0.8,
					css: {
						strokeDashoffset: 0,
					},
				})

				.to('.hamburger-menu-close', {
					duration: 0.6,
					delay: -0.8,
					css: {
						display: 'block',
					},
				});
		} else {
			// Run close menu animation
			tl.to('.App', {
				duration: 1,
				y: 0,
				ease: 'expo.inOut',
			})
				.to('#circle', {
					duration: 0.6,
					delay: -0.6,
					css: {
						strokeDashoffset: -193,
						strokeDasharray: 227,
					},
				})
				.to('#Path_1', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 10,
						strokeDasharray: 10,
					},
				})
				.to('#Path_2', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 10,
						strokeDasharray: 10,
					},
				})
				.to('#Line_1', {
					duration: 0.4,
					delay: -0.6,
					css: {
						strokeDashoffset: 40,
						strokeDasharray: 40,
					},
				})
				.to('.hamburger-menu-close', {
					duration: 0,
					css: {
						display: 'none',
					},
				})
				.to('.hamburger-menu span', {
					duration: 0.6,
					delay: -0.6,
					scaleX: 1,
					transformOrigin: '50% 0%',
					ease: 'expo.inOut',
				})
				.to('body', {
					duration: 0,
					css: {
						overflow: 'auto',
					},
				});
		}
	}, [menuState.menuOpened]);
	return (
		<div className="header">
			<div className="container">
				<div className="row v-center space-between">
					<div className="logo">
						<NavLink to="/" exact>
							AGENCY.
						</NavLink>
					</div>
					<div className="nav-toggle">
						<div onClick={() => setMenuState({ menuOpened: true })} className="hamburger-menu">
							<span></span>
							<span></span>
						</div>
						<div onClick={() => setMenuState({ menuOpened: false })} className="hamburger-menu-close">
							<UpArrow />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Header);