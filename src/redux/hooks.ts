import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";

// 这段是为了帮助组件和redux store解耦，同时又能获得类型提示
export const useSelector: 
TypedUseSelectorHook<RootState> 
= useReduxSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
