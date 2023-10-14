/** @type {import('next').NextConfig} */
const nextConfig = {


    env:{
        API_URL: "http://localhost:3000",
      DB_LOCAL_URI: 'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
          DB_URI:   'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
    
          NEXTAUTH_URL: "http://localhost:3000",
          NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF",


          STRIPE_WEBHOOK_SECRET: "",

          STRIPE_SECRET_KEY: "",
      
          CLOUDINARY_CLOUD_NAME: "",
          CLOUDINARY_API_KEY: "",
          CLOUDINARY_API_SECRET: "",
      
          SMTP_HOST: "sandbox.smtp.mailtrap.io",
          SMTP_PORT: 2525,
          SMTP_USER: "",
          SMTP_PASSWORD: "",
          SMTP_FROM_EMAIL: "noreply@bookit.com",
          SMTP_FROM_NAME: "BookIT",
      
          GEOCODER_API_KEY: "",
          GEOCODER_PROVIDER: "mapquest",
      
          MAPBOX_ACCESS_TOKEN: "",
        }
        ,
        images: {
          domains: ["res.cloudinary.com"],
        },
}

module.exports = nextConfig
