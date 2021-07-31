export enum ItemTypes {
  TESTCASEBLOCK = 'TESTCASEBLOCK',
  RANGEBLOCK = 'RANGEBLOCK'
};

export interface BoxValue {
  begin?: number,
  end?: number,
  count?: number,
  testCount? : number
}


