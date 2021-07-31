import { useCallback, useState } from "react";
import { BoxValue, ItemTypes } from "../components/dnd_component/DataTypes";

export interface DustbinState {
  accepts: ItemTypes[];
  lastDroppedValue? : BoxValue;
}

export interface BoxState {
  type: ItemTypes;
}

export interface BlockHookProps {
  initialDustbinStates : DustbinState[];
  initialBoxStates : BoxState[];
}

interface BlockHookReturnType {
  dustbins : DustbinState[],
  boxes : BoxState[],
  addDustbin : () => void;
  handleDrop : (index:number, item: BoxValue) => void;
}

export default function useBlock({initialDustbinStates, initialBoxStates} : BlockHookProps) : BlockHookReturnType {

  const [dustbins, setDustbins] = useState<DustbinState[]>(initialDustbinStates);
  const [boxes] = useState<BoxState[]>(initialBoxStates);

  const addDustbin = useCallback( () => {
    setDustbins([...dustbins, {accepts : [ItemTypes.RANGEBLOCK]}])
  },[dustbins]);


  const handleDrop = useCallback(
    (index: number, item: BoxValue ) => {
      const newDustbins = [...dustbins];
      newDustbins[index].lastDroppedValue = item;
      setDustbins([...dustbins])
    },
    [dustbins],
  )

  return {
    dustbins,
    boxes,
    addDustbin,
    handleDrop
  }
}