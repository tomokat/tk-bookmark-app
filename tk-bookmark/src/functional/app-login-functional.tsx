import { FunctionalComponent } from "@stencil/core";

interface AppLoginProps {
  condition: boolean
}

export const AppLogin: FunctionalComponent<AppLoginProps> = ({condition}, children) => (
  condition && children
);