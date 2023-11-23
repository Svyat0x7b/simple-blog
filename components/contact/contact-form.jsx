import { useState, useRef, useEffect } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const ContactForm = () => {
    const [errors, setErrors] = useState({ email: false, name: false, message: false });
    const [reqStatus, setReqStatus] = useState();
    const [reqError, setReqError] = useState();
    const emailRef = useRef();
    const nameRef = useRef();
    const msgRef = useRef();

    useEffect(() => {
        let timer;
        if (reqStatus === 'success' || reqStatus === 'error') {
            timer = setTimeout(() => {
                setReqStatus(null);
                setReqError(null);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [reqStatus]);

    const sendContactData = async (contactData) => {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    };

    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredMsg = msgRef.current.value;

        const newErrors = { email: false, name: false, message: false };

        if (!enteredEmail || !enteredEmail.includes('@')) {
            newErrors.email = true;
        }

        if (!enteredName || !enteredName.trim() === '') {
            newErrors.name = true;
        }
        if (!enteredMsg || !enteredMsg.trim() === '') {
            newErrors.message = true;
        }

        setErrors(newErrors);
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        const dataObj = {
            email: enteredEmail,
            name: enteredName,
            message: enteredMsg,
        };
        setReqStatus('pending');
        try {
            sendContactData(dataObj);
        } catch (err) {
            setReqStatus('error');
            setReqError(err.message);
        }
        setReqStatus('success');

        emailRef.current.value = '';
        nameRef.current.value = '';
        msgRef.current.value = '';
    };

    let notification;

    if (reqStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (reqStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Your message sent successfully!',
        };
    }

    if (reqStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: reqError,
        };
    }

    return (
        <section className={classes.contact} onSubmit={sendMessageHandler}>
            <h1>Contact me</h1>
            <form className={classes.form}>
                <label for="email">
                    Your e-mail
                    <input type="email" name="email" ref={emailRef} />
                    {errors.email && <p className={classes.error}>Enter the valid email!</p>}
                </label>
                <label for="name">
                    Your name
                    <input type="text" name="name" ref={nameRef} />
                    {errors.name && <p className={classes.error}>Enter the valid name!</p>}
                </label>
                <label for="message">
                    Your question
                    <textarea type="text" name="message" ref={msgRef} />
                    {errors.message && <p className={classes.error}>Enter the valid message!</p>}
                </label>
                <button type="submit">Contact</button>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
};

export default ContactForm;
