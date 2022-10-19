import React from "react";
import { CloseTag, Container, LogoName, OpenTag } from "./style";

interface Props {
  title: string;
  onClick: () => void;
}

export default function Logo({ title, onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <OpenTag>{"<"}</OpenTag>
      <LogoName>{title}</LogoName>
      <CloseTag>{"/>"}</CloseTag>
    </Container>
  );
}
