import styled from "styled-components";
import { Typography } from "@mui/material";

export const ChatContainer = styled.div`
  width: 50vw;
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
  background-color: #d25f22ff;
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
  padding: 12px 16px;
  max-width: 350px;
  border-radius: 16px;
  background-color: ${props => (props.isUser ? "#dd9670ff" : "#d25f22ff")};
  color: ${props => (props.isUser ? "white" : "#ffff")};
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  font-family: "Roboto", sans-serif;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
  letter-spacing: 0.3px;
`;

export const HeaderTitle = styled(Typography)`
  font-weight: bold;
`;

export const MetaData = styled(Typography)`
  font-size: 0.7rem;
  color: gray;
  margin-top: 2px;
`;
