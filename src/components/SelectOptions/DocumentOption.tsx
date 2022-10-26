import React from 'react';

import * as S from './styled';

interface Props {
  id: number;
  document: string;
  args?: { label: string; value: any }[];
}

const DocumentOption: React.FC<Props> = ({ id, document, args = [] }) => (
  <S.Container key={id}>
    <S.Row>
      <S.Title>{'N° do Documento: '}</S.Title>
      <S.Value style={{ marginLeft: 5 }}>{document}</S.Value>
    </S.Row>
    <S.Row>
      {args.map(({ label, value }) => (
        <S.ArgumentContainer>
          <S.Row>
            <S.Title>{label}</S.Title>
          </S.Row>
          <S.Row>
            <S.Value>{value}</S.Value>
          </S.Row>
        </S.ArgumentContainer>
      ))}
    </S.Row>
  </S.Container>
);

export default DocumentOption;
