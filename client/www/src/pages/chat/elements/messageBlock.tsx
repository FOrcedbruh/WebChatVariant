import styles from './elements.module.css';
import { useState } from 'react';




interface MessageBlockPropsType {
    socket: any
}




const MessageBlock: React.FC<MessageBlockPropsType> = ({socket}) => {

    const [message, setMessage] = useState<string>('');


    const onSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('user')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('user'),
                id: `${socket.id}-${Math.random()}`,
                socketID: socket.id
            })
        }
        console.log({
            user: localStorage.getItem('user'),
            message: message
        });

        setMessage('');
    }

    return (
        <section onSubmit={onSubmit} className={styles.messageBlock}>
            <form>
                <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button>Отправить</button>
            </form>
        </section>
    )
}

export default MessageBlock;