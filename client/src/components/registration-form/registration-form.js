import React, {useState} from "react";
import "./registration-form.css"
import {useHttp} from "../../hooks/http.hook";

const RegistrationForm = ({ setVisible}) => {
    const [form, setForm] = useState({
        email:'',
        password: '',
        address:'',
        phone:'',
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const onPasswordChange = (e) => {
        onChange(e);
    }

    const {loading, request, error, clearError} = useHttp();
    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form});
            setVisible(false);
        } catch (e) {}
    }
    const onRepeatPasswordChange = (e) => {
        if(form.password !== e.target.value){
            const label = document.getElementById('label-for-registration-repeat-password');
            styleDisabled(label);
            disableBtn('registration-btn');
        } else {
            const label = document.getElementById('label-for-registration-repeat-password');
            styleEnabled(label);
            enableBtn('registration-btn');
        }
    }
    const disableBtn = (btnId) => {
        const submitBtn = document.getElementById(btnId);
        submitBtn.disabled = true;
    };

    const enableBtn = (btnId) => {
        const submitBtn = document.getElementById(btnId);
        submitBtn.disabled = false;
    };

    const styleDisabled = (el) => {
        el.style.color = "red";
        el.innerHTML = "Password mismatch"
    };

    const styleEnabled = (el) => {
        el.style.color = "green";
        el.innerHTML = "Congratulation!"
    };

    const onPhoneChange = (e) => {
        onChange(e);
        const phoneRegexp = /^\+375[0-9]{9}$/;
        const phoneNumber = e.target.value;
        let res = Boolean( phoneNumber.match(phoneRegexp));
        if (!res ){
            let el = document.getElementById('label-for-phone');
            el.style.color = 'red';
            el.innerHTML = 'Incorrect Phone Number';
            document.getElementById('registration-btn').disabled = true;

        } else {
            let el = document.getElementById('label-for-phone');
            el.style.color = 'green';
            el.innerHTML = 'Correct Phone Number'
            document.getElementById('registration-btn').disabled = false;
        }
    }
        return (
            <div className="container">
                <div className="form-group">
                    <label htmlFor="registration-email">Email</label>
                    <input
                        onChange={onChange}
                        type="email"
                        className="form-control"
                        name="email"
                        id="registration-email"
                        aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="registration-password">Password</label>
                    <input
                        onChange={onPasswordChange}
                        type="password"
                        className="form-control"
                        name="password"
                        id="registration-password-1"
                        min={6}
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="registration-repeat-password" id="label-for-registration-repeat-password">Repeat Password</label>
                    <input
                        onChange={onRepeatPasswordChange}
                        type="password"
                        className="form-control"
                        id="registration-repeat-password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="address-registration">Enter your address</label>
                    <input
                        onChange={onChange}
                        type="string"
                        className="form-control"
                        id="address-registration"
                        name="address"
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone-registration" id="label-for-phone">Enter your phone number</label>
                    <input
                        onChange={onPhoneChange}
                        type="string"
                        className="form-control"
                        id="phone-registration"
                        name="phone"/>
                </div>

                <button onClick={registerHandler} className="btn btn-primary" id="registration-btn">Register</button>
            </div>
        );
};

export default RegistrationForm;
