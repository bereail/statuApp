/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**' },
      // en prod: cambia por tu dominio de Django
      // { protocol: 'https', hostname: 'api.tudominio.com', pathname: '/media/**' },
    ],
  },
};
