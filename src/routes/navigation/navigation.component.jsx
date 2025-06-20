import { Fragment,useContext } from 'react';
import {Outlet} from 'react-router';
import {ReactComponent as CrwnLogo} from '../../assests/crown.svg';
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles';
import { userContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { isCartOpen } = useContext(CartContext);

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
            <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              ):
              (<NavLink to='/auth'>
                SIGN IN
            </NavLink>
            )}
            <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;