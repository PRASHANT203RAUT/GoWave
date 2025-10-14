const nextConfig = {
//   webpack:(config)=>{
//     config.externals.push({
//       "utf-8-validate":"commonjs utf-8-validate",
//       bufferutil:"commonjs bufferutil"
//     })
// return config;
//   },
  devIndicators: false,
  images: {
    domains: [
      "uploadthing.com",
      "8kczt6ofk6.ufs.sh"
    ],
  },
};

module.exports = nextConfig;