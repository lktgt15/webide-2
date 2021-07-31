import 'styled-components';
interface IPalette {
  main: string
  dark: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      yellow:IPalette,
      red: IPalette,
      darkgrey: IPalette
   }
  }
}




