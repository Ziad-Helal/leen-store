import { Modal } from "../../../../../components";
import {
  Limits_Settings,
  RoundsStructure_Settings,
} from "../../../../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../../../../store/general";

export default function Round_List_Settings() {
  const dispatch = useDispatch();
  const roundSettingsIsOpen = useSelector(
    (state) => state.general.lists.roundSettingsIsOpen
  );

  const closeRoundSettings = () => {
    dispatch(generalActions.hideList("roundSettings"));
  };

  return (
    roundSettingsIsOpen && (
      <Modal id="roundSettings" onBackdropClick={closeRoundSettings}>
        <section dir="rtl" className="flex gap-4 flex-col md:flex-row">
          <Limits_Settings />
          <RoundsStructure_Settings />
        </section>
      </Modal>
    )
  );
}
