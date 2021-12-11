interface LinkButtonRectPos {
  x: number;
  y: number;
}

type NavLinkButtonBackgroundPosState = {
  linkButtonBackgroundPos: LinkButtonRectPos;
};

type NavLinkButtonBackgroundPosAction = {
  type: string;
  elementPosition: LinkButtonRectPos;
};

type DispatchType = (
  args: NavLinkButtonBackgroundRectPosStateAction
) => NavLinkButtonBackgroundRectPosStateAction;
