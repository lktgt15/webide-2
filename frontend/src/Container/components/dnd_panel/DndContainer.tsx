import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import useBlock, { BoxState, DustbinState } from "../../hooks/useBlock";
import useInput from "../../hooks/useInput";
import Box from "../dnd_component/Box";
import { BoxValue, ItemTypes } from "../dnd_component/DataTypes";
import Dustbin from "../dnd_component/Dustbin";

const ContainerSection = styled.div`
  display: flex;
`;

const BoxSection = styled.div`
  width: 180px;
  padding: 10px;
`;

const DustbinSection = styled.div`
  flex: 1;
  padding: 10px;
  color: white;
`;

const PlusButton = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #0078fe;
  font-size: 14px;
  font-weight: bold;
`;

const initialDustbinStates: DustbinState[] = [
  {
    accepts: [ItemTypes.TESTCASEBLOCK],
  },
  {
    accepts: [ItemTypes.RANGEBLOCK],
  },
];

const initialBoxStates: BoxState[] = [
  {
    type: ItemTypes.TESTCASEBLOCK,
  },
  {
    type: ItemTypes.RANGEBLOCK,
  },
];

const DndContainer = () => {
  const { dustbins, boxes, addDustbin, handleDrop } = useBlock({
    initialDustbinStates,
    initialBoxStates,
  });

  const [inputs, onChange] = useInput<BoxValue>({
    begin: 0,
    end: 0,
    count: 0,
    testCount: 0,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <ContainerSection>
        <BoxSection>
          {boxes.map((value, index) => {
            return (
              <Box
                type={value.type}
                key={index}
                value={inputs}
                onChangeHanlder={onChange}
              ></Box>
            );
          })}
        </BoxSection>
        <DustbinSection>
          <div style={{ marginBottom: "10px" }}>
            {" "}
            <strong>Input :</strong>{" "}
          </div>
          <div
            style={{
              border: "2px dashed",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {dustbins.map(({ accepts, lastDroppedValue }, index) => {
              return (
                <Dustbin
                  accept={accepts}
                  lastDroppedValue={lastDroppedValue}
                  onDrop={(item: BoxValue) => handleDrop(index, item)}
                  key={index}
                ></Dustbin>
              );
            })}
            <PlusButton onClick={addDustbin}> + 추가하기 </PlusButton>
          </div>
        </DustbinSection>
      </ContainerSection>
    </DndProvider>
  );
};

export default DndContainer;
