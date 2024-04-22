import { useNavigate } from 'react-router-dom';
import styles from './elements.module.css';
import { DataType } from '../../../types/DataType';
import { motion } from 'framer-motion';

interface BodyPropsType {
    messages: DataType[],
    socket: any
}


const Body: React.FC<BodyPropsType> = ({messages, socket}) => {

    const navigate = useNavigate();

    const leaveHandle = () => {
        

        navigate('/');
        socket.emit('userLeave', {
            user: localStorage.getItem('user'),
            socketID: socket.id
        });
        localStorage.removeItem('user');
    }

    const messageSenderAnimation = {
        hidden: {
            scale: 0.9,
            opacity: 0,
            x: 200
        },
        visible: {
            scale: 1,
            opacity: 1,
            x: 0
        }
    }

    const messageRecipientAnimation = {
        hidden: {
            scale: 0.9,
            opacity: 0,
            x: -200
        },
        visible: {
            scale: 1,
            opacity: 1,
            x: 0
        }
    }

    return (
        <section className={styles.body}>
            <header className={styles.header}>
                <h3>Личные сообщения</h3>
                <motion.button whileHover={{
                    scaleX: 1.2,
                }} onClick={leaveHandle}>Покинуть чат</motion.button>
            </header>
            <div className={styles.container}>
                {
                    messages.map(message => 
                        message.name === localStorage.getItem('user') ? (
                            <motion.div initial={'hidden'} animate={'visible'} variants={messageSenderAnimation} key={message.id} className={styles.chatSender}>
                                <div className={styles.user}>
                                    <p>Вы</p>
                                    <div>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial={'hidden'} animate={'visible'} variants={messageRecipientAnimation} key={message.id} className={styles.chatRecipient}>
                                <div className={styles.user}>
                                    <p>{message.name}</p>
                                    <div>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default Body;