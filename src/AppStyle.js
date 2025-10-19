import styled from "styled-components";

export const MainContainer = styled.div`
  background: none;
  /* full available width and height (avoid 100vw which can cause horizontal scroll with vertical scrollbar) */
  width: 100%;
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
