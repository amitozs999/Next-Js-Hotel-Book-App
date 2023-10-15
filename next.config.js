/** @type {import('next').NextConfig} */
const nextConfig = {


    env:{
        API_URL: "http://localhost:3000",
      DB_LOCAL_URI: 'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
          DB_URI:   'mongodb+srv://singhekas08:hBVWcqE65vzXr1W8@cluster0.qp2xlqx.mongodb.net/mydb?retryWrites=true&w=majority',
    
          NEXTAUTH_URL: "http://localhost:3000",
          NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF",


          STRIPE_WEBHOOK_SECRET: "whsec_dcd9fe81e7a5d0c19b76758d75fddcc42b8322c24c6b06215133fdee225f348e",

          STRIPE_SECRET_KEY: "sk_test_51Nmd0wSGLLC7E7DkJKeCYpnco7neDevXP4hJNSAHOKnXH7WdjZAdSJIFtZBMlFbsUv8QTyyUnFlL3iBAyj5BvxjP00KqCZkcUq",
      
          CLOUDINARY_CLOUD_NAME: "dlwkqblhx",
          CLOUDINARY_API_KEY: "455844863614842",
          CLOUDINARY_API_SECRET: "c-aWfJvCg1mqEGDkmVlJFaDdnVo",
      
          SMTP_HOST: "sandbox.smtp.mailtrap.io",
          SMTP_PORT: 2525,
          SMTP_USER: "",
          SMTP_PASSWORD: "",
          SMTP_FROM_EMAIL: "noreply@bookit.com",
          SMTP_FROM_NAME: "BookIT",
      
          GEOCODER_API_KEY: "KBnYKpNZmoHkZ9gNdyO7afcCtxbb1tI3",
          GEOCODER_PROVIDER: "mapquest",
      
          MAPBOX_ACCESS_TOKEN: "",
        }
        ,
        images: {
          domains: ["res.cloudinary.com"],
        },
}

module.exports = nextConfig
