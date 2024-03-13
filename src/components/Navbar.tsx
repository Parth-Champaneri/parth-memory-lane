import { Link } from 'react-router-dom'
import ShareButton from './shared/ShareButton'

function NavBar() {
  return (
    <div className='bg-gray-900 text-white mb-2'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center '>
            <Link to={`/`}>
              <div className='flex row items-center'>
                <img
                  src={'src/assets/profile-pic.jpeg'}
                  className='h-8 rounded-full '
                />{' '}
                <h1 className='text-2xl mb-4 ml-2 mt-4 font-playfair'>
                  Parth's Memory Lane
                </h1>
              </div>
            </Link>
          </div>
          <ShareButton />
        </div>
      </div>
    </div>
  )
}

export default NavBar
