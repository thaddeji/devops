import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        setError("You must fill all fields");
        return;
      }
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          setError("User not found");
        } else {
          setError(data.error || "Something went wrong");
        }
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/dashboard');
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>
  );
}
