/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'i.imgur.com',
      'lh3.googleusercontent.com',
      'rickandmortyapi.com'
    ],
    loader: 'custom',
    path: '/'
  }
}
