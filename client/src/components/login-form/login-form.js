import React, {useEffect, useState} from "react";
import "./login-form.css"
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const LoginForm = ({ afterLoginAction, setIsAdmin}) => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        localStorage.clear();
    },[])

    useEffect(() => {
        clearError()
    }, [error])

    const onEnterButtonPress = async (e) =>{
        if(e.which === 13 || e.keyCode === 13){
            e.preventDefault();
            await loginHandler();
        }
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuthorised', "true");
            localStorage.setItem('role', data.role)
            if(data.role==="admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            afterLoginAction();
        } catch (e) {
            alert(e)
        }

    }
        return (
            <div className="container" onKeyPress={onEnterButtonPress}>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6">
                        <div className="input-field">
                            <input
                                className="form-control"
                                placeholder="Input email"
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Input password"
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="card-action">
                            <button
                                className="btn btn-secondary"
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default LoginForm;
