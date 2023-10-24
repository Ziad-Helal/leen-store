import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleUp } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { roundActions } from "../../store/round";
import { Button, Modal } from "../../components";
import { sortAlphabetically } from "../../lib/utils";

export default function Badge({
  children,
  className = "",
  round,
  allRounds,
  allowRemovingAction = false,
  allowAddingAction = false,
}) {
  const dispatch = useDispatch();
  const [visibleRoundPicker, setVisibleRoundPicker] = useState(false);
  const [actionsPosition, setAcionsPosition] = useState("h-0 [&>*]:hidden");

  const showActions = () => {
    setAcionsPosition("h-fit [&>*]:block");
  };

  const hideActions = () => {
    setAcionsPosition("h-0 [&>*]:hidden");
  };

  const removeRegionFromRound = () => {
    dispatch(
      roundActions.removeRegionFromRoundsStructure({
        roundName: round,
        region: children,
      })
    );
  };

  const showRoundPicker = () => {
    setVisibleRoundPicker(true);
  };

  const hideRoundPicker = () => {
    setVisibleRoundPicker(false);
  };

  const addRegionToRounds = (event) => {
    dispatch(
      roundActions.addRegionToRoundsStructure({
        roundName: event.target.innerText,
        region: children,
      })
    );
  };

  return (
    <span
      className={`relative bg-background text-foreground px-1.5 py-0.5 rounded-lg text-sm ${className}`}
      onMouseEnter={showActions}
      onMouseLeave={hideActions}
    >
      {children}
      {(allowRemovingAction || allowAddingAction) && (
        <div
          className={`absolute left-0 bottom-full ${actionsPosition} w-full min-w-fit flex gap-0.5 justify-center items-center bg-primary_300 rounded-t-lg`}
          onMouseEnter={showActions}
          onMouseLeave={hideActions}
        >
          {allowRemovingAction && (
            <Button
              title={`احذف ${children} من ${round}`}
              onClick={removeRegionFromRound}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                color="red"
                cursor="pointer"
              />
            </Button>
          )}
          {allowAddingAction && (
            <Button
              title={`أضف ${children} إلى الحركة`}
              onClick={showRoundPicker}
            >
              <FontAwesomeIcon
                icon={faCircleUp}
                color="green"
                cursor="pointer"
              />
            </Button>
          )}
        </div>
      )}
      {visibleRoundPicker && (
        <Modal id="roundPicker" onBackdropClick={hideRoundPicker}>
          <ul className="bg-primary_300 p-2 rounded-lg flex flex-col gap-1">
            {sortAlphabetically(allRounds).map((r) => (
              <li
                key={r}
                className="bg-primary_800 p-2 rounded-lg cursor-pointer hover:bg-primary_700"
                onClick={addRegionToRounds}
              >
                {r}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </span>
  );
}
