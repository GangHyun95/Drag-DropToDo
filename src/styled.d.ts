// src/assets/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    titleBgColor: string;
    cardColor: string;
    textColor: string;
    scroll: string;
  }
}
