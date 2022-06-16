import styled from '@emotion/styled';
import * as React from 'react';

export const Background = styled.div`
  background-color: #2b2b2b;
  /* gradient */
  background-image: linear-gradient(
    to bottom,
    rgba(1, 13, 66, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  background-size: cover;
  background-position: center;

  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;
