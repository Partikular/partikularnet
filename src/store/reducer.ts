import * as actionTypes from "./actionTypes";

const initialState: NavLinkButtonBackgroundPosState = {
  linkButtonBackgroundPos: {
    x: 0,
    y: 0,
  },
};

const reducer = (
  state: NavLinkButtonBackgroundPosState = initialState,
  action: NavLinkButtonBackgroundPosAction
): NavLinkButtonBackgroundPosState => {
  switch (action.type) {
    case actionTypes.SET_NAV_LINK_BUTTON_BACKGROUND_POS:
      return {
        ...state,
        linkButtonBackgroundPos: action.elementPosition,
      };
  }
  return state;
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
