import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Form,
  InputField,
  Loading,
  Modal,
} from "../../../../../../components";
import {
  roundActions,
  updateRoundsStructure,
} from "../../../../../../store/round";
import { sortAlphabetically } from "../../../../../../lib/utils";
import { RoundRegions } from "../../../../../../layouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";
import { generalActions } from "../../../../../../store/general";

export default function RoundsStructure_Settings() {
  const dispatch = useDispatch();
  const newRoundRef = useRef();
  const [showNewRoundForm, setShowNewRoundForm] = useState(false);
  const { roundsStructure, unAssignedRegions } = useSelector(
    (state) => state.round
  );
  const roundsStructureIsLoading = useSelector(
    (state) => state.general.loading.roundsStructure
  );

  const modifyRoundsStructure = (event) => {
    event.preventDefault();

    if (unAssignedRegions.length == 0) {
      dispatch(updateRoundsStructure(roundsStructure));
      dispatch(generalActions.hideList("roundSettings"));
    } else alert("أضف جميع المناطق إلى الحركة قبل الحقظ!");
  };

  const removeRound = (roundName) => {
    const confirmDeletion = confirm(
      `هل أنت متأكد من أنك تريد حذف ${roundName}؟`
    );
    if (confirmDeletion)
      dispatch(roundActions.removeRoundFromRoundsStructure({ roundName }));
  };

  const addNewRoundStructure = (event) => {
    event.preventDefault();

    if (Object.keys(roundsStructure).includes(newRoundRef.current.value))
      alert("يوجد راوند بهذا الاسم بالفعل!");
    else {
      dispatch(
        roundActions.addRoundToRoundsStructure({
          roundName: newRoundRef.current.value,
        })
      );
      setShowNewRoundForm(false);
    }
  };

  return (
    <Form
      className="bg-primary_300 text-primary_950 p-4 rounded-lg flex flex-col gap-3 justify-between"
      onSubmit={modifyRoundsStructure}
    >
      {roundsStructureIsLoading ? (
        <Loading />
      ) : (
        <>
          <fieldset>
            <legend className="font-semibold text-xl mb-2">
              <h2>إعدادات الحركة</h2>
            </legend>
            <section className="flex flex-col gap-2">
              {sortAlphabetically(Object.keys(roundsStructure)).map(
                (roundName) => (
                  <div
                    key={roundName}
                    className="relative border border-background p-1 rounded-lg"
                  >
                    <InputField id={roundName} defaultValue={roundName} />
                    <RoundRegions roundName={roundName} />
                    <div className="absolute top-0 left-0 px-1 py-0.5 bg-background rounded-br-lg rounded-tl-md flex gap-1 items-center">
                      <Button
                        title={`احذف ${roundName}`}
                        onClick={(event) => removeRound(roundName, event)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          size="sm"
                          color="red"
                          cursor="pointer"
                        />
                      </Button>
                    </div>
                  </div>
                )
              )}
              <Button
                kind="primary"
                className="text-foreground"
                onClick={() => setShowNewRoundForm(true)}
              >
                أضف راوند جديد
              </Button>
              {showNewRoundForm && (
                <Modal
                  id="newRoundForm"
                  onBackdropClick={() => setShowNewRoundForm(false)}
                >
                  <Form
                    className="bg-primary_300 text-primary_950 p-4 rounded-lg"
                    onSubmit={addNewRoundStructure}
                  >
                    <fieldset>
                      <legend className="sr-only">
                        أضف راوند جديد إلى الحركة
                      </legend>
                      <InputField
                        ref={newRoundRef}
                        placeholder="أضف راوند جديد إلى الحركة"
                        autoFocus
                        required
                      />
                      <Button
                        type="submit"
                        kind="primary"
                        className="text-foreground mt-2"
                      >
                        أضف
                      </Button>
                    </fieldset>
                  </Form>
                </Modal>
              )}
            </section>
            {unAssignedRegions.length > 0 && (
              <section className="border border-background p-1 rounded-lg mt-2">
                <h3 className="font-medium text-lg">مناطق خارج الحركة</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {sortAlphabetically(unAssignedRegions).map((region) => (
                    <Badge
                      key={region}
                      allRounds={Object.keys(roundsStructure)}
                      allowAddingAction
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </fieldset>
          <section className="flex gap-2 justify-center items-center">
            <Button type="submit" kind="primary" className="text-foreground">
              حفظ على قاعدة البيانات
            </Button>
          </section>
        </>
      )}
    </Form>
  );
}
