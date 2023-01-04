import React from 'react'

// import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import imageLoader from 'imageLoader'

interface DropdownMenuProps {
  userOpen: boolean
}

function UserDropdownMenu({ userOpen }: DropdownMenuProps): JSX.Element {
  const { data: session } = useSession()

  return (
    <div
      className={`absolute top-0 right-2 sm:right-3 md:right-4 mt-24 w-64 rounded-lg bg-white py-4 px-2 font-medium  text-gray-900 ${
        userOpen ? 'block' : 'hidden'
      } `}
    >
      {session !== null && session !== undefined && (
        <>
          <div className='flex items-center space-x-4 '>
            <div className='relative h-16 w-16  overflow-hidden rounded-full border border-gray-600'>
              <Image
                loader={imageLoader}
                unoptimized
                ng-src={
                  session.user !== undefined
                    ? (session.user.image as string)
                    : 'https://i.imgur.com/62MNvNU.png'
                }
                src={
                  session.user !== undefined
                    ? (session.user.image as string)
                    : 'https://i.imgur.com/62MNvNU.png'
                }
                layout='fill'
                alt='uwu'
              />
            </div>

            <div className='flex flex-col'>
              <span className='text-xs text-gray-600 2xl:text-base'>
                Welcome!
              </span>

              <span className='text-lg 2xl:text-2xl'>{session.user?.name}</span>
            </div>
          </div>

          <ul className='mt-4 flex flex-col'>
            <div className='border-t-2 border-gray-900'></div>
            <li className='p-2'>
              <Link href='/profile'>
                <a href='#' className='cursor-pointer 2xl:text-xl'>
                  Edit Profile
                </a>
              </Link>
            </li>

            <div className='border-t '></div>

            <li className='p-2'>
              <a href='#' className='cursor-pointer 2xl:text-xl'>
                Account Activity
              </a>
            </li>

            <div className='border-t '></div>

            <li className='p-2'>
              <span
                onClick={async () => await signOut()}
                className='cursor-pointer 2xl:text-xl'
              >
                Log Out
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default UserDropdownMenu
