import React from "react";
import styled from "styled-components";
import { Audio } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <LoadingContainer>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
        />
      </LoadingContainer>
    </>
  );
};

const LoadingContainer = styled.div`
  width: 80%;
  height: 100%;
  transform: translate(40%, 40%);
`;
export default Loading;
