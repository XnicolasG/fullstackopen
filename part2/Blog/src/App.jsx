import { useEffect, useState } from 'react';
import blogService from './services/blog';
import { Blog } from './components/Blog';
import { LoginForm } from './components/LoginForm';
import { CreateForm } from './components/CreateForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [userState, setUserState] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { getAll,setToken,createBlog} = blogService;

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

  const handleAdd = (e, values, setValues) => {
    e.preventDefault()
    const blogObject = {...values, 
        id:(blogs.length + 1).toString(),
        likes: Math.floor(Math.random() * 60)}
    createBlog(blogObject)
    .then(resp => {
        setBlogs(blogs.concat(resp))
        setValues({
            title: '',
            author: '',
            url: ''
        })
    })
}
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
            <section>
              <CreateForm 
              handleAdd={handleAdd}
              />
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
