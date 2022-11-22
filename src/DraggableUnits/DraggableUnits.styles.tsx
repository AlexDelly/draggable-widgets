import styled from "styled-components";

export const WidgetsContainer = styled.div<{ isMobileLayout?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    gap: 60px;
  }

  @media (max-width: 800px) {
    gap: 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: #edf6ff;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80%;
  padding-top: 60px;
  padding-bottom: 60px;
`;
