import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #218838;
  }
`;

export default StyledButton;
