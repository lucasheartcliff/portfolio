/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lucasheartcliff.com.br',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
