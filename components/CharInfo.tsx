import imageLoader from 'imageLoader'
import Image from 'next/image'
import React from 'react'
import { Character } from 'types'

const CharInfo = ({ character }: { character: Character }): JSX.Element => {
  return (
    <>
      <div className='text-lg font-medium'>{character.name}</div>
      <Image
        loader={imageLoader}
        unoptimized
        alt={character.name}
        src={character.image}
        width={200}
        height={200}
      />

      <div className='font-medium flex flex-col space-y-2'>
        <div>
          Gender: <span className='font-normal'>{character.gender}</span>
        </div>
        <div>
          Location:{' '}
          <span className='font-normal'>{character.location.name}</span>
        </div>
        <div>
          Origin: <span className='font-normal'>{character.origin.name}</span>
        </div>
        <div>
          Specie: <span className='font-normal'>{character.species}</span>
        </div>
      </div>
    </>
  )
}

export default CharInfo
