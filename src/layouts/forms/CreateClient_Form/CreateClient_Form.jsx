import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputField, Button } from "../../../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import * as XLSX from "xlsx";

export default function CreateClient_Form() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const tel1Ref = useRef();
  const tel2Ref = useRef();
  const regionRef = useRef();
  const addressRef = useRef();
  const locationRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    // const displayName

    // try {
    //   await setDoc(doc(db, "clients", ))
    // } catch(error) {
    //   alert(error)
    // }
  };

  const fileHandler = (event) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (event) => {
      const file = event.target.result;
      const workBook = XLSX.read(file, { type: "binary" });
      const workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const clients = XLSX.utils.sheet_to_json(workSheet);

      clients.forEach(async (client) => {
        try {
          await setDoc(doc(db, "clients", client.الاسم), {
            العنوان: !!client.العنوان ? client.العنوان : "",
            المنطقة: !!client.المنطقة ? client.المنطقة : "",
            الموقع: !!client.الموقع ? client.الموقع : "",
            تليفون: !!client.تليفون ? client.تليفون : "",
            تليفون2: !!client.تليفون2 ? client.تليفون2 : "",
          });

          await setDoc(doc(db, "clients", "updated"), {
            clientsUpdated: Date.now(),
          });
        } catch (error) {
          alert(error);
        }
      });

      navigate("/clients");
    };
  };

  return (
    <Form
      className="p-2 mx-auto h-screen w-full absolute top-0 flex flex-col justify-center items-center"
      onSubmit={submitHandler}
    >
      <fieldset className="flex flex-col gap-4 w-72">
        <legend className="mx-auto text-2xl mb-4">
          <h2>إضافة عميل جديد</h2>
        </legend>
        <InputField
          label="اسم العميل"
          className="flex gap-1 justify-between flex-col"
          id="name"
          ref={nameRef}
          autoFocus
          required
        />
        <InputField
          label="تليفون 1"
          className="flex gap-1 justify-between flex-col"
          id="tel1"
          ref={tel1Ref}
        />
        <InputField
          label="تليفون 2"
          className="flex gap-1 justify-between flex-col"
          id="tel2"
          ref={tel2Ref}
        />
        <InputField
          label="المنطقة"
          className="flex gap-1 justify-between flex-col"
          id="region"
          ref={regionRef}
        />
        <InputField
          label="العنوان"
          className="flex gap-1 justify-between flex-col"
          id="address"
          ref={addressRef}
        />
        <InputField
          label="الموقع"
          className="flex gap-1 justify-between flex-col"
          id="location"
          ref={locationRef}
        />
      </fieldset>
      <Button
        type="submit"
        kind="primary"
        className="flex-col my-4 hover:bg-primary_800"
      >
        تأكيد
      </Button>
      <div className="text-center relative w-72">
        <span className="block w-full h-0.5 rounded bg-primary_500 absolute top-1/2 -z-10" />
        <span className="bg-background px-2">أو</span>
      </div>
      <fieldset>
        <InputField
          type="file"
          id="file"
          label="أضف عددًا من العملاء"
          accept=".xls, .xlsx"
          inputClassName="hidden"
          className="flex gap-1 justify-between flex-col text-sm border rounded-lg py-1 px-3 my-4 hover:bg-gray-700 hover:border-transparent transition"
          onChange={fileHandler}
        />
      </fieldset>
    </Form>
  );
}
