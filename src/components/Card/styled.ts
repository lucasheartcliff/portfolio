import styled from 'styled-components';

export const Container = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '275px'};
  height: ${({ height }) => height || '150px'};
  flex: 1;
  margin: 0 10px 5px 10px;
  background: #fff;
  /* overflow: hidden; */
  box-shadow: 0px 1px 22px -12px #333;
`;
