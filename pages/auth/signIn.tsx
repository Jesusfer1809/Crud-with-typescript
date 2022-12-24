import React, { useState } from 'react'
import {
  getCsrfToken,
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider
} from 'next-auth/react'

import { BuiltInProviderType } from 'next-auth/providers'

import { unstable_getServerSession, Session } from 'next-auth'

import { GetServerSideProps, NextPage } from 'next'
import { FcGoogle } from 'react-icons/fc'

import Link from 'next/link'
import Navbar from 'components/Navbar'
import { authOptions } from 'pages/api/auth/[...nextauth]'

interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
  csrfToken?: string | undefined
}

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  const [email, setEmail] = useState('')

  const [emailSent, setEmailSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar isInIndex={false} isInSignIn={true} />
      <div className='grid flex-grow  w-full grid-cols-1 lg:grid-cols-[minmax(800px,_1fr)_1fr]'>
        <div className=' relative flex  items-center justify-center bg-gray-800 p-4 text-white'>
          <div className='w-full md:w-4/5'>
            {emailSent ? (
              <div className='w-full  bg-black/70  p-4 md:p-6 lg:p-8'>
                <h1 className=' block text-left text-2xl  md:text-3xl font-semibold mb-10'>
                  Check your mailbox
                </h1>

                <p className='font-medium text-sm md:text-base'>
                  We have sent an email to {email}. Please check your inbox (and
                  your span ) and confirm your email{' '}
                </p>
              </div>
            ) : (
              <>
                <Link href='/'>
                  <div className=' text-[#119DFA] inline-block cursor-pointer'>
                    <span>&larr; Back</span>
                  </div>
                </Link>

                <h1 className='mt-4 block text-3xl font-medium'>Sign In</h1>

                <form className='mt-8 flex flex-col'>
                  <label htmlFor='email' className='text-gray-500 inline-block'>
                    Email address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    placeholder='Email Address'
                    className='mt-3 rounded-md bg-[#E8F0FE] p-3 text-project_main border-2 border-transparent  focus:outline-teal-500 focus:border-2 focus:border-teal-500 '
                  />

                  <button
                    onClick={async (e) => {
                      e.preventDefault()

                      if (providers !== null) {
                        await signIn(providers.email.id, {
                          email,
                          callbackUrl: '/',
                          redirect: false
                        })
                      }

                      setEmailSent(true)
                    }}
                    className=' mt-8 w-full rounded-md bg-teal-500 py-3 font-medium '
                  >
                    Sign in with Email
                  </button>
                </form>

                <div className='border-y border-gray-700 w-full mt-8 py-2 text-center'>
                  or
                </div>

                <div className='mt-8'>
                  <button
                    onClick={async (e) => {
                      e.preventDefault()

                      if (providers !== null) {
                        await signIn(providers.google.id, { callbackUrl: '/' })
                      }
                    }}
                    className='w-full rounded-md flex justify-center items-center gap-4 border-2 border-teal-500 py-3 font-medium '
                  >
                    <FcGoogle />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{ backgroundImage: ' url(https://i.imgur.com/LaKZpD1.jpg)' }}
          className=' hidden bg-cover bg-top brightness-75 lg:flex items-end justify-end '
        >
          <div className='text-white text-xs font-bold p-2 bg-slate-900 bg-opacity-80 rounded-md'>
            Foto de{' '}
            <a
              className='border-b border-white'
              target={'_blank'}
              href='https://unsplash.com/@millesanders?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
              rel='noreferrer'
            >
              Mille Sanders
            </a>{' '}
            en{' '}
            <a
              className='border-b border-white'
              target={'_blank'}
              href='https://unsplash.com/es/fotos/Bc6qPj_f-r0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
              rel='noreferrer'
            >
              Unsplash
            </a>{' '}
            🤍
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context

  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  )
  if (session !== null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)

  return {
    props: { providers, csrfToken }
  }
}
