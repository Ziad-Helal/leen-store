import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputField, Button } from "../../../components";
import { generalActions } from "../../../store/general";
import { updateClient } from "../../../store/clients";

export default function UpdateClient_Form({
  الاسم = "",
  تليفون = "",
  تليفون2 = "",
  المنطقة = "",
  العنوان = "",
  الموقع = "",
}) {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const tel1Ref = useRef();
  const tel2Ref = useRef();
  const regionRef = useRef();
  const addressRef = useRef();
  const locationRef = useRef();
  const allUsers = useSelector((state) => state.user.allUsers);

  const cancelClientUpdate = () => {
    dispatch(generalActions.hideList("updateClientForm"));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const tel1 = tel1Ref.current.value;
    const tel2 = tel2Ref.current.value;
    const region = regionRef.current.value;
    const address = addressRef.current.value;
    const location = locationRef.current.value;

    if (
      name != الاسم ||
      tel1 != تليفون ||
      tel2 != تليفون2 ||
      region != المنطقة ||
      address != العنوان ||
      location != الموقع
    ) {
      const update = confirm(
        `هل أنت متأكد من أنك تريد حفظ التعديل الجديد على بيانات العميل "${الاسم}"؟`
      );
      if (update)
        dispatch(
          updateClient(
            الاسم,
            {
              الاسم: name,
              تليفون: tel1,
              تليفون2: tel2,
              المنطقة: region,
              العنوان: address,
              الموقع: location,
            },
            allUsers
          )
        );
    }

    dispatch(generalActions.hideList("updateClientForm"));
  };
  return (
    <Form
      className="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center bg-primary_950"
      onSubmit={submitHandler}
    >
      <fieldset className="flex flex-col gap-4 w-72">
        <legend className="mx-auto text-2xl mb-4">حدث بيانات العميل</legend>
        <InputField
          label="اسم العميل"
          className="flex gap-1 justify-between flex-col"
          id="name"
          ref={nameRef}
          defaultValue={الاسم}
          autoFocus
          required
        />
        <InputField
          label="تليفون 1"
          className="flex gap-1 justify-between flex-col"
          id="tel1"
          ref={tel1Ref}
          defaultValue={تليفون}
        />
        <InputField
          label="تليفون 2"
          className="flex gap-1 justify-between flex-col"
          id="tel2"
          ref={tel2Ref}
          defaultValue={تليفون2}
        />
        <InputField
          label="المنطقة"
          className="flex gap-1 justify-between flex-col"
          id="region"
          ref={regionRef}
          defaultValue={المنطقة}
        />
        <InputField
          label="العنوان"
          className="flex gap-1 justify-between flex-col"
          id="address"
          ref={addressRef}
          defaultValue={العنوان}
        />
        <InputField
          label="الموقع"
          className="flex gap-1 justify-between flex-col"
          id="location"
          ref={locationRef}
          defaultValue={الموقع}
        />
      </fieldset>
      <div className="flex gap-2 items-center">
        <Button
          type="submit"
          kind="primary"
          className="flex-col my-4 hover:bg-primary_700"
        >
          تأكيد
        </Button>
        <Button kind="secondary" onClick={cancelClientUpdate}>
          إلغاء
        </Button>
      </div>
    </Form>
  );
}
