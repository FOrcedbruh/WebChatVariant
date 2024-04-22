import { useEffect, useState } from 'react';
import styles from './elements.module.css';
import { UserType } from '../../../types/UserType';

interface SideBarPropsType {
    socket: any
}

const SideBar: React.FC<SideBarPropsType> = ({socket}) => {

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {

        socket.on('responseNewUser', (data: UserType[]) => {
            setUsers(data);
        })
        
    }, [users, socket]);

    return (
        <aside className={styles.sidebar}>
            <h2>Чаты</h2>
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.socketID}>{user.user}</li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default SideBar;