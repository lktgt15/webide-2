import styled from 'styled-components';

const FilledPage = styled.div`
  width:100%;
  height:100vh;
  background-color:red;
`

const ErrorPage = () => {

  return <FilledPage>
    <div>
      최소 986px 이상은 되어야 합니다.
    </div>
    <div>
      adfasdf
    </div>
  </FilledPage>
}

export default ErrorPage;