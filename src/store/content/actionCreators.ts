import * as actionTypes from "./actionTypes";

export function setLinkBackgroundPosition(elementPosition: LinkButtonRectPos) {
  const action: NavLinkButtonBackgroundPosAction = {
    type: actionTypes.SET_NAV_LINK_BUTTON_BACKGROUND_POS,
    elementPosition,
  };

  return action;
}
