import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  InputField,
  Loading,
} from "../../../../../../components";
import { roundActions, updateRoundLimits } from "../../../../../../store/round";
import { sortAlphabetically } from "../../../../../../lib/utils";
import { generalActions } from "../../../../../../store/general";

export default function Limits_Settings() {
  const dispatch = useDispatch();
  const { limits, filter } = useSelector((state) => state.round);
  const roundLimitsIsLoading = useSelector(
    (state) => state.general.loading.roundLimits
  );

  const updateLimits = (event, region) => {
    dispatch(
      roundActions.modifyRoundLimit({ region, amount: event.target.value })
    );
    dispatch(roundActions.filter(filter));
  };

  const modifyRoundLimits = (event) => {
    event.preventDefault();

    dispatch(updateRoundLimits(limits));
    dispatch(generalActions.hideList("roundSettings"));
  };

  return (
    <Form
      className="bg-primary_300 text-primary_950 p-4 rounded-lg flex flex-col gap-3 justify-between"
      onSubmit={modifyRoundLimits}
    >
      {roundLimitsIsLoading ? (
        <Loading />
      ) : (
        <>
          <fieldset>
            <legend className="font-semibold text-xl mb-2">
              <h2>الحد الأدنى لشحن الفاتورة</h2>
            </legend>
            <section className="grid gap-2 grid-cols-2">
              {sortAlphabetically(Object.keys(limits)).map((region) => (
                <InputField
                  key={region}
                  id={region}
                  label={region}
                  type="number"
                  defaultValue={limits[region]}
                  className="flex gap-2 justify-between items-center p-1 border border-background rounded-lg"
                  inputClassName="w-16"
                  step={100}
                  onChange={(event) => updateLimits(event, region)}
                />
              ))}
            </section>
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
