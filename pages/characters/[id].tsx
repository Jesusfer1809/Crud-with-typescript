import axios from 'axios'
import CharInfo from 'components/CharInfo'

import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import React from 'react'
import { Character, QueryId } from 'types'

interface Props {
  character: Character
}

const CharacterPage: NextPage<Props> = ({ character }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <CharInfo character={character} />
      </div>
    </div>
  )
}

export default CharacterPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as QueryId

  const { data } = await axios.get<Character>(
    `https://rickandmortyapi.com/api/character/${id}`
  )

  return {
    props: {
      character: data
    }
  }
}
