module.exports = {
  apps: [
    {
      name: "newsportal",
      script: "./bin/www",
      env: {
        NODE_ENV: "production",
        PORT: 80,
        DATABASE_URL:
          "postgresql://postgres.wasrelvvaorksignkqsb:AMsF3xiGi2Zc0En8@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
        SECRET_KEY: "ayam",
      },
    },
  ],
};
