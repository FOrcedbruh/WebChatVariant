import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { useState } from 'react';


interface HomePropsType {
    socket: any
}



const Home: React.FC<HomePropsType> = ({socket}) => {

    const navigate = useNavigate();

    const [user, setUser] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        localStorage.setItem('user', user);
        navigate('/chat');

        socket.emit('newUser', {
            user,
            socketID: socket.id
        });
    }


    return (
        <main className={styles.window}>
            <form onSubmit={onSubmit}>
                <h2>Войдите в чат</h2>

                <div>
                    <label htmlFor="user">Имя пользователя</label>
                    <input type="text" name='user' value={user} onChange={(e) => setUser(e.target.value)}/>
                </div>
                <input type="submit" value={`Войти как ${user}`}/>
            </form>
        </main>
    )
}

export default Home;