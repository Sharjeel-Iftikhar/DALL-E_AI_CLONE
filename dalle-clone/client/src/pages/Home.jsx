import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Loader, FormField } from '../components'

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [seacrchText, setSearchText] = useState('');

  const RenderCards = ({ data, title }) => {
    if (data.length > 0) {
      return data.map((post) => <Card key={post.id} {...post} />)
    }
    return <h2 className='mt-5 font-bold text-[#6449ff]
    text-[17px] uppercase'>{title}</h2>
  }
  return (

    <section className='max-w-6xl mx-auto' >
      <div>
        <h1 className='font-bold text-[#222328] text-[28px]'>
          Community Showcase
        </h1>
        <p className='text-[#6b7280] text-[16px] mt-2 max-w-[1000px]'>
          Browse throught a collectio of imaginative and visually
          stunning creations created by the DALL-E-AI.
        </p>
      </div>


      {/* Form Field */}

      <div className='mt-16'>
        <FormField />
      </div>

      <div className='mt-10'>
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : <>
          {seacrchText && (
            <h2 className='text-[#6b7280] text-lg font-medium mb-3'>Showing result for <span className='text-[#222328]'>{seacrchText}</span>
            </h2>
          )}
          <div className='grid grid-cols-1 gap-3 
          sm:grid-cols-3 xs:grid-cols-2 lg:grid-cols-4 '>
            {seacrchText ? (
              <RenderCards
                data={[]}
                title='No search results found'
              />
            ) : (
              <RenderCards
                data={[]}
                title='No posts found'
              />)}
          </div>
        </>}
      </div>
    </section>
  )
}

export default Home