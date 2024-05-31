import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 20px;

  .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  button {
    border: none;
    width: 80px;
    height: 100%;
    padding: 4px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .beginner-btn {
    background-color: #fdcb6e;
  }

  .intermediate-btn {
    background-color: #00b894;
  }

  .expert-btn {
    background-color: #ff7675;
  }

  .custom-btn {
    background-color: #b2bec3;
  }
`;
