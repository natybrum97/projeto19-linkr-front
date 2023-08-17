import { FiChevronDown } from 'react-icons/fi';
import styled from "styled-components";
import SearchBar from "./SearchBar";

export default function Header() {

    return (

        <PageContainerTopo>

            <h1>linkr</h1>

            <SearchBarWrapper>
                <SearchBar />
            </SearchBarWrapper>  

            <Container>

                <FiChevronDown color="white" size={50} cursor= "pointer" />
                <img data-test="avatar" src="https://i.pinimg.com/736x/cf/77/d2/cf77d222c2ae919cdd2f9fcdbb3e4906.jpg" alt="url" />

            </Container>


        </PageContainerTopo>

    )
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