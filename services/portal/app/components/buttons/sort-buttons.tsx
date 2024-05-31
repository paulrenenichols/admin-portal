import { MouseEventHandler } from "react";
import { UpArrowIcon } from "../icons/up-arrow-icon";
import { DownArrowIcon } from "../icons/down-arrow-icon";

export type SortButtonsProps = {
  readonly onClickUp: MouseEventHandler<HTMLButtonElement>;
  readonly onClickDown: MouseEventHandler<HTMLButtonElement>;
};

export const SortButtons = ({ onClickUp, onClickDown }: SortButtonsProps) => {
  return (
    <div className="sort-buttons">
      <button type="button" onClick={onClickUp}>
        <UpArrowIcon size={"25"} />
      </button>
      <button type="button" onClick={onClickDown}>
        <DownArrowIcon size={"25"} />
      </button>
    </div>
  );
};
