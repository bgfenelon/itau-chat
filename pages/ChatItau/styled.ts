import styled from "styled-components";
import { Typography } from "@mui/material";

export const ChatContainer = styled.div`
  width: 50%;
  height: 85vh;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
`;

export const ChatHeader = styled.div`
  padding: 16px;
  background-color: #f3691fff; /* primary.main */
  color: white;
  border-bottom: 1px solid #ccc;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export const ChatFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #ccc;
  background-color: white;
`;

export const MessageRow = styled.div<{ justify: string }>`
  display: flex;
  justify-content: ${props => props.justify};
  margin-bottom: 12px;
`;

export const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: 12px;
  max-width: 350px;
  border-radius: 12px;
  background-color: ${props => (props.isUser ? "#ef9b6dff" : "#f3691fff")};
  color: ${props => (props.isUser ? "white" : "#ffff")};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-family: Arial, Helvetica, sans-serif;
`;

export const HeaderTitle = styled(Typography)`
  font-weight: bold;
`;
