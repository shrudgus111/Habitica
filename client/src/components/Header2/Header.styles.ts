import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #b2bec3;
  gap: 10px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  .reset-button {
    font-size: 24px;
    padding: 18px;
  }

  .timer {
    font-size: 16px;
    font-weight: bold;
  }
`;
