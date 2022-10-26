import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5em;
  text-decoration: none;
  align-items: center;
`;

export const LogoName = styled.div`
  font-family: "Agustina Regular";
  font-weight: bold;
  font-variant-ligatures: no-common-ligatures;
  -webkit-font-variant-ligatures: no-common-ligatures;
  padding: 0 5px;
`;
export const OpenTag = styled.span`
  font-size: 1.5em;
  content: "<";
`;
export const CloseTag = styled.span`
  font-size: 1.5em;
  content: "/>";
`;
