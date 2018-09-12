module.exports = {
  scripts: [
    {
        condition: '.js-rr-review',
        url: '/scripts/modules/rnrpopin.app.js'
    },
    {
        condition: '.js-buy-retailer',
        url: '/scripts/modules/ccbin.app.js'
    },
    {
      condition: '.js-managed-password',
      url: '/scripts/modules/password.app.js'
    },
    {
      condition: '.bar-rating',
      url: '/scripts/modules/rating.app.js'
    },
    {
      condition: '.custom-checked',
      url: '/scripts/modules/checked.app.js'
    },
    {
      condition: '.js-user-status',
      url: '/scripts/modules/user-login.app.js'
    }
  ]
};
