import { FC, memo } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemTypes, BoxValue } from "./DataTypes";

const DustBinStyle = styled.div<{
  isActive: boolean;
  isTestBlock: boolean;
  canDrop: boolean;
}>`
  height: 50px;
  width: 100%;
  background: ${(props) => {
    if (props.canDrop) {
      return props.theme.palette.darkgrey.main;
    } else {
      if (props.isTestBlock) {
        if (props.isActive) {
          return props.theme.palette.yellow.main;
        } else {
          return props.theme.palette.yellow.dark;
        }
      } else {
        if (props.isActive) {
          return props.theme.palette.red.main;
        } else {
          return props.theme.palette.red.dark;
        }
      }
    }
  }};
  margin-bottom: 10px;
  color: white;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface DustbinProps {
  accept: string[];
  lastDroppedValue?: BoxValue;
  onDrop: (item: BoxValue) => void;
}

export const Dustbin: FC<DustbinProps> = memo(
  ({ accept, lastDroppedValue, onDrop }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
      {
        accept,
        drop: onDrop,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      },
      [accept, onDrop]
    );

    const isActive = isOver && canDrop;

    let string = "";
    let test = true;
    if (accept.includes(ItemTypes.TESTCASEBLOCK)) {
      string = "테스트케이스 블럭을 옮겨주세요";
    } else {
      test = false;
      string = "값 블럭을 옮겨주세요";
    }

    return (
      <DustBinStyle
        ref={drop}
        role="Dustbin"
        isActive={isActive}
        isTestBlock={test}
        canDrop={canDrop}
      >
        {lastDroppedValue !== undefined ? (
          test ? (
            <p>
              {lastDroppedValue.testCount} 만큼의 테스트케이스를 반복합니다.{" "}
            </p>
          ) : (
            <p>
              {lastDroppedValue.begin} 부터 {lastDroppedValue.end} 까지 랜덤하게{" "}
              {lastDroppedValue.count}개의 값을 넣습니다.
            </p>
          )
        ) : (
          !isActive && string
        )}
      </DustBinStyle>
    );
  }
);

export default Dustbin;
