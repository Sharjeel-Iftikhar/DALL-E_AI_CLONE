import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { FormField, Loader } from '../components'
import { preview } from '../assets';
import {getRandomPrompt} from '../utils'


const apikey = import.meta.env.VITE_KEY;


function CreatePost() {

  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.name && form.photo)
    {
      setIsLoading(true);
      try{
        const response = await fetch('https://dall-e-ai-clone-server.vercel.app/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        const data = await response.json();
        console.log(data);
        if(data){
          navigate('/');
        }
      }
      catch(err){
        console.log(err);
        alert(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }
    else{
      alert('Please fill all the fields');
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt})
  };

  const generateImage = async () => {
    if(form.prompt)
    {
      try{
        const formm = new FormData()
        formm.append('prompt', `${form.prompt}`)
        setGeneratingImg(true);
        
        const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
          method: 'POST',
          headers: {
            'x-api-key': `${apikey}`
          },
          body: formm
        }).then(response => response.arrayBuffer())
        .then(buffer => {
          // buffer here is a binary representation of the returned image
          // you can convert it to base64 and display it in the browser directly
          // or you can save it to the disk using nodejs
           const arrayBufferToBase64 = (buffer) => {
            let binary = '';
            const bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
          };
          const base64Flag = 'data:image/png;base64,';
          const imageStr = arrayBufferToBase64(buffer);
          const base64Image = base64Flag + imageStr;

          setForm({...form, photo: base64Image});
        })
      } 
      catch(err){
        console.log(err);
        alert(err.message); 
      }
      finally{
        setGeneratingImg(false);
      }
    }
    else{
      alert('Please enter the prompt first');
    }
    
  };


  return (
    <section className='max-w-4xl mx-auto'>
      <div>
        <h1 className='font-bold text-[#222328] text-[28px]'>
          Create Post
        </h1>
        <p className='text-[#6b7280] text-[16px] mt-2 max-w-[1000px]'>
          Create a collection of imaginative and visually 
          stunning creations through DALL-E-AI.
        </p>
      </div>
      {/* Form section */}

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}> 
        <div className='flex flex-col gap-5'>
          <FormField
          labelName='Your Name'
          name='name'
          type='text'
          placeholder='Sharjeel'
          value={form.name}
          handleChange={handleChange}
          />
          <FormField
          labelName='Prompt'
          name='prompt'
          type='text'
          placeholder='"a sea otter with a pearl earring" by Johannes Vermeer'
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
              src={form.photo}
              alt={form.prompt}
              className='w-full h-full object-contain'
              />
            ):(
              <img
              src={preview}
              alt='preview'
              className = 'w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]'>
                  <Loader />
                </div>
              )}
          </div>

        </div>

        <div className='mt-5 flex gap-5'>
          <button
          type='button'
          onClick={generateImage}
          className='bg-green-700 text-white text-sm font-medium rounded-md px-5 py-3 w-full sm:w-auto'
          >
            {generatingImg ? 'Generating Image...' : 'Generate Image'}
          </button>
        </div>
        <div className='mt-8'>
          <p className='text-gray-400 text-[14px] mt-2'>Once you have created the image you want, you can share it with Community</p>
          <button
           className='bg-[#6449ff] text-white text-sm font-medium rounded-md px-5 py-3 w-full mt-5 sm:w-auto'
          >
            {isLoading ? 'Sharing...': 'Share with Community'}
          </button>
        </div>
      </form>
    </section>

  )
}

export default CreatePost