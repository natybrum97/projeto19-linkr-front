import { styled } from "styled-components";
import loadingGif from "./../assets/loading.gif";

const PaginationLoading = () => {
  return (
    <StyledPagination>
      <img src={loadingGif}/>
      <p>Loading more posts...</p>
    </StyledPagination>
  )
};

export default PaginationLoading;

const StyledPagination = styled.div`
  margin-bottom: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-height: 66px;
  font-family: Lato;
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  color: #6D6D6D;
  background-color: transparent;
  img{
    width: 36px;
    height: 36px;
  }
`;