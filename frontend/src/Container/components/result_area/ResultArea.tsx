import styled from "styled-components";

const ResultAreaStyle = styled.div`
  padding: 10px;
`;
const ResultContent = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #rgb(24, 36, 52);
  background: #202c3d;
  padding: 10px;
  margin-bottom: 10px;
`;

const ResultArea = () => {
  return (
    <div>
      <div
        style={{
          height: "42px",
          borderBottom: "1px solid #182434",
          borderTop: "1px solid #182434",
          padding: "12px",
          boxSizing: "border-box",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        실행결과
      </div>
      <ResultAreaStyle>
        <ResultContent>
          <div>
            <strong> input 1 : </strong>
          </div>
          <div>
            2 <br />
            1 0 0 0 0 <br />
            1 0 0 0 0 <br />
          </div>
          <div>
            <strong> output 1 : </strong>
          </div>
          <div>
            52 <br />
          </div>
        </ResultContent>
        <ResultContent>
          <div>
            <strong> input 1 : </strong>
          </div>
          <div>
            2 <br />
            1 0 0 0 0 <br />
            1 0 0 0 0 <br />
          </div>
          <div>
            <strong> output 1 : </strong>
          </div>
          <div>
            52 <br />
          </div>
        </ResultContent>
        <ResultContent>
          <div>
            <strong> input 1 : </strong>
          </div>
          <div>
            2 <br />
            1 0 0 0 0 <br />
            1 0 0 0 0 <br />
          </div>
          <div>
            <strong> output 1 : </strong>
          </div>
          <div>
            52 <br />
          </div>
        </ResultContent>
        <ResultContent>
          <div>
            <strong> input 1 : </strong>
          </div>
          <div>
            2 <br />
            1 0 0 0 0 <br />
            1 0 0 0 0 <br />
          </div>
          <div>
            <strong> output 1 : </strong>
          </div>
          <div>
            52 <br />
          </div>
        </ResultContent>
      </ResultAreaStyle>
    </div>
  );
};

export default ResultArea;
