/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // react-native를 react-native-web으로 매핑
        'react-native$': 'react-native-web',
      };
      return config;
    },
  };
  
  export default nextConfig;
  