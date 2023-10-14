/** @type {import('next').NextConfig} */
const nextConfig = {


    env:{
        API_URL: "http://localhost:3000",
      DB_LOCAL_URI: 'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
          DB_URI:   'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
    
          NEXTAUTH_URL: "http://localhost:3000",
          NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF"
        }
        ,
        images: {
          domains: ["res.cloudinary.com"],
        },
}

module.exports = nextConfig
