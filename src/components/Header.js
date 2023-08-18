import React, { useState, useContext } from 'react'; // Import useState
import { LoginContext } from '../contexts/LoginContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styled from 'styled-components';
import SearchBar from './SearchBar';

export default function Header() {

    const { logout } = useContext(LoginContext);

    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu open/close
    const [arrowUp, setArrowUp] = useState(false); // State to manage arrow direction

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setArrowUp(!arrowUp);
    };

    return (
        <PageContainerTopo>
            <h1>linkr</h1>
            <SearchBarWrapper>
                <SearchBar />
            </SearchBarWrapper>
            <Container>
                <ArrowButton onClick={toggleMenu}>
                    {arrowUp ? <FiChevronUp color="white" size={24} /> : <FiChevronDown color="white" size={24} />}
                </ArrowButton>
                <img data-test="avatar" onClick={toggleMenu} src={localStorage.getItem('url')} alt="url" />
                {menuOpen && (
                    <DropdownMenu data-test="menu">
                        <MenuItem data-test="logout" onClick={() => logout()}>Logout</MenuItem>
                    </DropdownMenu>
                )}
            </Container>
        </PageContainerTopo>
    );
}

const PageContainerTopo = styled.div`
    z-index: 2;
    display: flex;
    justify-content:space-between;
    align-items: center;
    height: 72px;
    background-color: #151515;
    width:100%;
    position: fixed;
    top: 0;
    left:0;

    h1{
    font-family: Passion One;
    font-size: 49px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: 0.05em;
    text-align: left;
    width: 108px;
    height: 54px;
    color: #FFFFFF;
    margin: 0 20px;
}
`

const Container = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    gap: 10px;
    margin: 0 20px;

    img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    display:flex;
    justify-content:center;
    align-items:center;
    }
`

const SearchBarWrapper = styled.div`
    width: 593px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const ArrowButton = styled.div`
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 150px;
    height: 43px;
    border-radius: 0px 0px 20px 20px;
    background-color: #171717;
    &:hover {
        background-color: gray;
    }
`;

const MenuItem = styled.div`
    font-family: Lato;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    text-align: center;
    padding: 10px 20px;
    cursor: pointer;
`;