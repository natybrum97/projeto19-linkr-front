import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { TIMELINEPOSTS } from "../MOCK/TIMELINEPOSTS";
import Post from "../components/Post";

export default function UserPage() {
  return (
    <UserTimeLine>
      
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <Container>
        <img
          src="https://i.pinimg.com/736x/cf/77/d2/cf77d222c2ae919cdd2f9fcdbb3e4906.jpg"
          alt="url"
        />
        <h1>Juvenal Juvêncio’s posts</h1>
      </Container>
      
    </UserTimeLine>
  );
}

const Container = styled.div`
  width: 563px;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px ;
  }

  h1 {
    font-size: 40px;
    font-weight: 700;
    font-family: Oswald;
    color: #fff;
  }
`;

const SearchBarWrapper = styled.div`
    width: 563px;
    max-width: 100%;

    @media (min-width: 767px) {
      display: none;
      
      input {
        font-size: 16px;
      }
    }
`;

const UserTimeLine = styled.div`
  max-width: 100%;
  padding-top: 90px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 767px) {

    h1 {
      font-size: 30px;
    }
  }
`;


