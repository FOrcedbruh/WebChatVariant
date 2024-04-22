import styles from './chatPage.module.css';
import SideBar from './elements/sidebar';
import Body from './elements/body';
import MessageBlock from './elements/messageBlock';
import { useEffect, useState } from 'react';
import { DataType } from '../../types/DataType';

interface ChatPagePropsType {
    socket: any
}


const ChatPage: React.FC<ChatPagePropsType> = ({socket}) => {

    const [messages, setMessages] = useState<DataType[]>([]);

    useEffect(() => {
        socket.on('response', (data: DataType) => setMessages([...messages, data]))
    }, [messages])

    return (
        <section className={styles.window}>
            <SideBar socket={socket}/>
            <main className={styles.main}>
                <Body messages={messages} socket={socket}/>
                <MessageBlock socket={socket}/>
            </main>
        </section>
    )
}

export default ChatPage;