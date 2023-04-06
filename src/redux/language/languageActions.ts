export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

type LanguageCode = 'zh' | 'en';

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: LanguageCode;
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: {
        name: string;
        code: string;
    }
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (languageCode): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode
    }
};

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code }
    }
}