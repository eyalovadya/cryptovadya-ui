import styled, { keyframes } from 'styled-components';
import { MenuItem, Menu as MenuInner } from '@szhsin/react-menu';
import { menuSelector, menuItemSelector, menuDividerSelector } from '@szhsin/react-menu/style-utils';
import '@szhsin/react-menu/dist/core.css';
import { PropsWithChildren, useState } from 'react';
import { RootState, Dispatch } from '../../../state/store';
import { connect } from 'react-redux';
import UpdateUserDetailsModal from './UpdateUserDetailsModal';
import { User } from '../../../types/users';

type Props = {
    user: User;
    logout: () => Promise<void>;
};
const UserMenu = ({ user, children, logout }: PropsWithChildren<Props>) => {
    const [isUpdateDetailsModalOpen, setIsUpdateDetailsModalOpen] = useState<boolean>(false);
    return (
        <Menu position="anchor" align="end" offsetY={8} portal menuButton={<MenuButton>{children}</MenuButton>}>
            <MenuItem onClick={() => setIsUpdateDetailsModalOpen(true)}>Edit Details</MenuItem>
            <MenuItem onClick={logout}>Log Out</MenuItem>
            <UpdateUserDetailsModal user={user} isOpen={isUpdateDetailsModalOpen} setIsOpen={setIsUpdateDetailsModalOpen} />
        </Menu>
    );
};

const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;
const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;

const Menu = styled(MenuInner)`
    ${menuSelector.name} {
        font-size: 0.925rem;
        user-select: none;
        box-shadow: 0px 0px 5px -1px ${(props) => `${props.theme.mainButtonColor}63`};
        border: 1px solid ${(props) => `${props.theme.mainButtonColor}63`};
        border-radius: 6px;
        padding: 6px;
        min-width: 10rem;
        color: ${(props) => props.theme.textColor};
        background: ${(props) => props.theme.cardBackground};
    }

    ${menuSelector.stateOpening} {
        animation: ${menuShow} 0.1s ease-out;
    }

    ${menuSelector.stateClosing} {
        animation: ${menuHide} 0.1s ease-out forwards;
    }

    ${menuItemSelector.name} {
        padding: 0.375rem 0.625rem;
        border-radius: 6px;
    }

    ${menuItemSelector.hover} {
        color: #fff;
        background-color: ${(props) => `${props.theme.mainButtonColor}aa`};
    }

    ${menuDividerSelector.name} {
        margin: 0.5rem 0.625rem;
    }
`;

const MenuButton = styled.div`
    cursor: pointer;
`;

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
    logout: dispatch.user.logout
});

export default connect(mapState, mapDispatch)(UserMenu);
