import { useEffect, useState } from 'react';
import blogService from './services/blog';
import { Blog } from './components/Blog';
import { LoginForm } from './components/LoginForm';
import { CreateForm } from './components/CreateForm';
import { Message } from './components/Message';
import { Togglable } from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [userState, setUserState] = useState(null);
  const [message, setMessage] = useState({
    error: null,
    success: null,
  });

  const { getAll, setToken, createBlog } = blogService;

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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserState(user);
      setToken(user.token);
      console.log('User logged-in succesfully');
    } else {
      console.log('User is not logged, please login');
    }
  }, []);

  const handleAdd = async (e, values, setValues) => {
    e.preventDefault();
    try {
      const blogObject = {
        ...values,
        id: (blogs.length + 1).toString(),
        likes: Math.floor(Math.random() * 60),
      };

      const newBlog = await createBlog(blogObject);
      setBlogs([...blogs, newBlog]);
      setValues({
        title: '',
        author: '',
        url: '',
      });
      setMessage({ ...message, success: `A new blog ${blogObject.title} by ${blogObject.author} added!` });

      setTimeout(() => {
        setMessage({ ...message, success: null });
      }, 4000);
    } catch (error) {
      console.error('Error al crear el blog:', error);

      setMessage({ ...message, error: 'Failed to add the blog. Please try again.' });

      setTimeout(() => {
        setMessage({ ...message, error: null });
      }, 4000);
    }
  };
  return (
    <section className="w-lvw">
      <nav className="flex flex-wrap justify-around items-center p-2">
        <h1>Blog</h1>
        <LoginForm
          userState={userState}
          setUserState={setUserState}
          setToken={setToken}
          message={message}
          setMessage={setMessage} />
      </nav>
      <Message message={message} />
      <main>
        {
          userState ?
            <section>
              <Togglable buttonLabel='New blog'>
                <CreateForm
                  handleAdd={handleAdd}
                />
              </Togglable>
              <ul className='p-2'>
                {
                  blogs.map((item) =>
                    <Blog
                      // key={item.id}
                      blogItem={item}
                    />
                  )
                }
              </ul>
            </section>
            : null
        }
      </main>
    </section>
  );
}

export default App;
