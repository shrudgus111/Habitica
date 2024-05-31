import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
`;

export const Card = styled.div`
  min-width: 400px;
  min-height: 200px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
  h3 {
    font-size: 16px;
  }
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .input-container {
    width: 300px;
    display: flex;
    gap: 10px;

    span {
      width: 90px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 24px;
    }
    input {
      padding: 4px;
      width: 100px;
    }
  }
`;

export const Button = styled.button<{ $isDisabled: boolean }>`
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? '#b2bec3' : '#3498db'};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  width: 240px;
  padding: 4px;
  font-size: 16px;
  padding: 18px;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
`;
