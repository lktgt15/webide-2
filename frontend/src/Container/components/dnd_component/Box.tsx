import styled from "styled-components";
import { FC, memo } from "react";
import { useDrag } from "react-dnd";
import { BoxValue, ItemTypes } from "./DataTypes";

const BoxStyle = styled.div<{type:ItemTypes}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 3px;
  border-radius: 30px;
  border: 3px solid ${props => props.type === ItemTypes.TESTCASEBLOCK ? props.theme.palette.yellow.main : props.theme.palette.red.main};
  margin-bottom: 10px;
  font-size: 14px;
  color: white;
`;

export interface BoxProps {
  type: ItemTypes;
  value : BoxValue;
  onChangeHanlder: (e:any) => void;
}


export const Box: FC<BoxProps> = memo(({ type , value, onChangeHanlder }) => {

  const [{}, drag] = useDrag(
    () => ({
      type,
      item: {...value},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [type, value]
  );


  return (
    <BoxStyle ref={drag} role="Box" type={type}>
      {type === ItemTypes.TESTCASEBLOCK ? (
        <div>
          <div style={{ fontSize: "0.6rem", marginBottom: "3px" }}>
            <strong>테스트케이스 블럭</strong>
          </div>
          <div>
            <span>반복 횟수: &nbsp;</span>
            <input type="number" name="testCount" value={value.testCount} style={{ width: "35px" }} onChange={onChangeHanlder} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "0.6rem", marginBottom: "3px" }}>
            <strong>값 입력 블럭</strong>
          </div>
          <div>
            <div>
              <label> 시작 범위 : </label>
              <input type="number" name="begin"  value={value.begin} style={{ width: "35px" }} onChange={onChangeHanlder} />
            </div>
            <div>
              <label htmlFor="end"> 끝 범위 : </label>
              <input type="number" name="end"  value={value.end} style={{ width: "35px" }} onChange={onChangeHanlder} />
            </div>
            <span> 반복 개수: &nbsp;</span>
            <input type="number" name="count" value={value.count} style={{ width: "35px" }} onChange={onChangeHanlder} />
          </div>
        </div>
      )}
    </BoxStyle>
  );
});

export default Box;
