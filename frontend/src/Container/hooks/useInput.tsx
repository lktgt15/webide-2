import { useCallback, useState } from "react";
import { BoxValue } from "../components/dnd_component/DataTypes";

function useInput<T extends BoxValue>(initalValue : T) : [ T, (e:any) => void] {

  const [inputs, setInputs] = useState<T>(initalValue);

  const onChange = useCallback((e: any) => {
    const { value, name } = e.target;

    if ( name === 'begin') {     
      const begin = parseInt(value);
      if ((inputs.end !== undefined) && (inputs.end < begin)) {
          return;
      }
    }

    if ( name === 'end') {     
      const end = parseInt(value);
      if ((inputs.begin !== undefined) && (inputs.begin > end)) {
          return;
      }
    }

    setInputs({
      ...inputs, 
      [name]: value
    });
  },[inputs]);

  return [inputs, onChange]
}


export default useInput;


// TODO : validation필요함.
// TODO : 
// https://react.vlpt.us/basic/09-multiple-inputs.html
// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
