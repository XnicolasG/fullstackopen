import React, { useState } from 'react'
import loginServices from '../services/login';

export const LoginForm = ({ userState, setUserState, message, setMessage, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const user = await loginServices.login({
                username, password
            })
            setToken(user.token)
            setUserState(user)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            setMessage({ ...message, success: `Welcome ${username} !` })
            setTimeout(() => {
                setMessage({ ...message, success: null })
            }, 4000);
            setUsername('')
            setPassword('')
            console.warn('User Logged !');

        } catch (error) {
            setMessage({...message, error:`Wrong credentials, please try again ${error}`})
            setTimeout(() => {
                setMessage({...message, error:null})
            }, 4000)
        }
    }

    const handleLogout = e => {
        e.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUserState(null)
       setMessage({ ...message, success:`See you soon ${username}`})
        setTimeout(() => {
            setMessage({ ...message, success:null})
        }, 4000)
    }


    return (
        <section className='flex flex-col'>
            {
                userState ?
                    <section className='flex items-center gap-2 '>
                        <p>Logged in as {userState.username}</p>
                        <button
                            className='hover:text-red-500 transition-all'
                            onClick={handleLogout}
                        >
                            Exit
                        </button>
                    </section>
                    :
                    <form
                        onSubmit={handleLogin}
                        className="flex my-4 justify-around items-center gap-4">
                        <input
                            name='username'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            className="login__input"
                            placeholder="Username"
                            required
                        />

                        <input
                            name='password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            className="login__input"
                            placeholder="Password"
                            required
                        />
                        <button type='submit'>Enter</button>
                    </form>
            }
        </section>
    )
}
