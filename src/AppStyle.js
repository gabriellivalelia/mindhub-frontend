import styled from "styled-components";

export const MainContainer = styled.div`
  background: none;
  /* full viewport width and height */
  width: 100vw;
  min-height: 100dvh;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  /* ensure any background covers the whole area without repeating */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;

  /* avoid horizontal scroll caused by children */
  overflow-x: hidden;

  display: grid;
  grid-template-rows: auto 1fr;
`;
