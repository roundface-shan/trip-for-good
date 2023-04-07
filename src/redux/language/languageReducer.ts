import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
    language: "en" | "zh",
    languageList: Array<{ name: string, code: string }>
}

const initialState: LanguageState = {
    language: "zh",
    languageList: [
        { name: "English", code: "en" },
        { name: "中文", code: "zh" }
    ]
}

export default (state = initialState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
          // 黑科技在这里
            i18n.changeLanguage(action.payload);
          return { ...state, language: action.payload };
        case ADD_LANGUAGE:
          return {
            ...state,
            languageList: [...state.languageList, action.payload],
          };
        default:
          return state;
      }
}
