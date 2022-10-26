import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #989898;
`;

export const Value = styled.div`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ArgumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
