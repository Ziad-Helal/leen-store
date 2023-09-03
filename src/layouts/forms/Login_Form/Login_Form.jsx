import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../../store/user";
import { Form, InputField, Button, Loading } from "../../../components";

export default function Login_Form() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const loading = useSelector((state) => state.general.loading.formSubmition);

    const singIn = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        dispatch(authUser({ type: "signInWithEmailAndPassword", email, password }, navigate));
    };

    const singInWithGoogle = async () => {
        dispatch(authUser({ type: "singInWithGoogle" }, navigate));
    };

    return (
        <Form
            onSubmit={singIn}
            className="p-2 mx-auto h-screen w-full absolute top-0 flex flex-col justify-center items-center"
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <fieldset className="flex flex-col gap-4 w-72">
                        <legend className="mx-auto text-2xl mb-4">
                            <h2>تسجيل دخول</h2>
                        </legend>
                        <InputField
                            ref={emailRef}
                            id="mail"
                            type="email"
                            label="الحساب الإلكتروني"
                            className="flex gap-1 justify-between flex-col"
                            autoFocus
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
                        تسجيل الدخول عن طريق حساب جوجل
                    </Button>
                    <div className="text-xs">
                        <p>ليس لديك حسابًا؟</p>
                        <Link to="/register" className="hover:text-primary_300">
                            انشئ حسابًا الآن
                        </Link>
                    </div>
                </>
            )}
        </Form>
    );
}
