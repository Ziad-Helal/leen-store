import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../store/user";
import { Form, InputField, Button, Loading } from "../../../components";

export default function Registeration_Form() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.general.loading.formSubmition);

    const submitHandler = (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        dispatch(
            authUser({ type: "createUserWithEmailAndPassword", name, email, password }, navigate)
        );
    };

    const singInWithGoogle = () => {
        dispatch(authUser({ type: "singInWithGoogle" }, navigate));
    };

    return (
        <Form
            className="p-2 mx-auto h-screen w-full absolute top-0 flex flex-col justify-center items-center"
            onSubmit={submitHandler}
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <fieldset className="flex flex-col gap-4 w-72">
                        <legend className="mx-auto text-2xl mb-4">
                            <h2>إنشاء حساب جديد</h2>
                        </legend>
                        <InputField
                            ref={nameRef}
                            id="name"
                            label="الاسم"
                            className="flex gap-1 justify-between flex-col"
                            autoFocus
                            required
                        />
                        <InputField
                            ref={emailRef}
                            id="mail"
                            type="email"
                            label="الحساب الإلكتروني"
                            className="flex gap-1 justify-between flex-col"
                            required
                        />
                        <InputField
                            ref={passwordRef}
                            id="password"
                            type="password"
                            label="رمز المرور"
                            className="flex gap-1 justify-between flex-col"
                            minLength={6}
                            required
                        />
                    </fieldset>
                    <Button type="submit" kind="primary" className="my-4">
                        تأكيد
                    </Button>
                    <div className="text-center relative w-72">
                        <span className="block w-full h-0.5 rounded bg-primary_500 absolute top-1/2 -z-10" />
                        <span className="bg-background px-2">أو</span>
                    </div>
                    <Button kind="secondary" className="text-sm my-4" onClick={singInWithGoogle}>
                        إنشاء حساب جديد باستخدام حساب جوجل
                    </Button>
                    <div className="text-xs">
                        <p>لديك حسابًا بالفعل؟</p>
                        <Link to="/login" className="hover:text-primary_300">
                            قم بتسجيل الدخول
                        </Link>
                    </div>
                </>
            )}
        </Form>
    );
}
