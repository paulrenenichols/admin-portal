import { MouseEventHandler } from "react";
import { DeleteIcon } from "../icons/delete-icon";

export type DeleteButtonProps = {
  readonly onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button className="delete-button" type="button" onClick={onClick}>
      <DeleteIcon size={"25"} />
    </button>
  );
};
