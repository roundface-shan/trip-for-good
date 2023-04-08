import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "./store";

export const useSelector: 
TypedUseSelectorHook<RootState> 
= useReduxSelector;

// 这段是为了帮助组件和redux store解耦，同时又能获得类型提示