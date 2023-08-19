import { FiSearch } from "react-icons/fi";
import { styled } from "styled-components";

export default function SearchBar() {
  return (
    <Container>
      <input data-test="search" type="search" placeholder="Search for people" />
      <FiSearch color="#C6C6C6" size={34} cursor="pointer" />
    </Container>
  );
}

const Container = styled.form`
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 0 15px;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;

  input {
    width: 100%;
    font-size: 20px;
    border: none;
    position: relative;

    &:focus {
      outline: 0;
    }
  }
`;
