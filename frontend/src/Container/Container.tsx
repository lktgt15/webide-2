import styled from "styled-components";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-solarized_dark";
import { useState } from "react";
import DndContainer from "./components/dnd_panel/DndContainer";
import ResultArea from "./components/result_area/ResultArea";
import SubmitArea from "./components/submit/SubmitArea";

const FLEX = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  padding-bottom: 62px;
  background: #263747;
`;

const LEFT = styled.div`
  flex: 0.4;
`;

const RIGHT = styled.div`
  flex: 0.6;
  height: 100%;
`;


const UpandDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UP = styled.div`
  flex: 1;
  overflow: scroll;
`;
const DOWN = styled.div`
  flex: 0.6;
  color: white;
  overflow: scroll;
`;


// todo 어떻게 바꿀지 해야함?


const Container = () => {

  const [ editorValue, setEditorValue] = useState("");

  // Websocket is not ready!
  // useWebSocket({ postUrl : '/abcd', socketEndPointUrl : '/abcd', subscribeUrl : '/defg'});
  // const onSubmit = useCallback(() => {
  //   sendName();
  //   // const result : any = dustbins.map( (value) => {
  //   //   if(value.lastDroppedValue) {
  //   //     if(value.accepts.includes(ItemTypes.TESTCASEBLOCK)) {
  //   //       return {
  //   //         type : 1,
  //   //         testCount : value.lastDroppedValue.testCount
  //   //       }
  //   //     } else {
  //   //       return {
  //   //         type : 2,
  //   //         rangeBegin : value.lastDroppedValue.begin,
  //   //         rangeEnd : value.lastDroppedValue.end,
  //   //         count : value.lastDroppedValue.count
  //   //       }
  //   //     }
  //   //   }
  //   // })
  //   // const resultJSON = {
  //   //   code : editorValue,
  //   //   result,
  //   // }
  //   // console.log(resultJSON);
  // }, [dustbins, editorValue]);


  return (
    <FLEX>
      <SubmitArea onSubmit={()=>{}}/>
      <LEFT>
        <AceEditor
          width="100%"
          height="100%"
          theme={"solarized_dark"}
          mode="c_cpp"
          onChange={(newValue: string) => {
            setEditorValue(newValue);
          }}
          value={editorValue}
        />
      </LEFT>
      <RIGHT>
        <UpandDownContainer>
          <UP>
            <DndContainer/>
          </UP>
          <DOWN>
            <ResultArea/>
          </DOWN>
        </UpandDownContainer>
      </RIGHT>
    </FLEX>
  );
};

export default Container;
