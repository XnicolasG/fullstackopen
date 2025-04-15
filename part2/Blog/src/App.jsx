import { useEffect, useState } from 'react';
import blogService from './services/blog';
import { Blog } from './components/Blog';
import { LoginForm } from './components/LoginForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [userState, setUserState] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { getAll, setToken } = blogService;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();
        console.log('Response from backend:', response); // Verifica qué llega desde el backend
        setBlogs(response);
      } catch (error) {
        console.log("Error app's useEffect", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUserState(user)
        setToken(user.token)
        console.log('User logged-in sucesfully');
    } else {
        console.log('User is not logged, please login');
    }
}, [])

  return (
    <section className="w-lvw">
      <nav className="flex flex-wrap justify-around items-center p-2">
        <h1>Blog</h1>
        <LoginForm
          userState={userState}
          setUserState={setUserState}
          setToken={setToken}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg} />
      </nav>
      <main>
        {
          userState ?
          <ul className='p-2'>
          {
            blogs.map((item) =>
              <Blog
                key={item.id}
                blogItem={item}
              />
            )
          }
        </ul>
        : null
        }
      </main>
    </section>
  );
}

export default App;
