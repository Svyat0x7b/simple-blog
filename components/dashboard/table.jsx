import { useState, useEffect } from 'react';
import classes from './table.module.css';

const Table = () => {
    const [messages, setMessages] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMessages = async () => {
            await fetch('/api/contact')
                .then((res) => res.json())
                .then((data) => {
                    setMessages(data.messages);
                    console.log(data);
                })
                .catch((err) => setError(err));
        };
        fetchMessages();
    }, []);

    if (!messages || messages.length === 0) {
        return <p>There is no messages!</p>;
    }
    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>E-MAIL</th>
                    <th>NAME</th>
                    <th>MESSAGE</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((msg) => (
                    <tr key={msg._id}>
                        <th>{msg._id}</th>
                        <th>{msg.email}</th>
                        <th>{msg.name}</th>
                        <th>{msg.message}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
