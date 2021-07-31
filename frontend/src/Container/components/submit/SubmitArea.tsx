import React from "react";
import styled from "styled-components";
import { FC, memo } from 'react'


const SumbitAreaStyle = styled.div`
  position: absolute;
  height: 62px;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid #182434;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


const SubmitButtonStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #0078fe;
  font-size: 18px;
  padding: 10px 22px;
  margin-right: 12px;
  font-weight: bold;
  color: white;
`;


export interface SubmitAreaProps {
  onSubmit : () => void;
}

const SubmitArea : FC<SubmitAreaProps> = memo( ({onSubmit} : SubmitAreaProps) => {
  return (<SumbitAreaStyle>
    <SubmitButtonStyle onClick={onSubmit}>제출하기</SubmitButtonStyle>
  </SumbitAreaStyle>);
})

export default SubmitArea;



