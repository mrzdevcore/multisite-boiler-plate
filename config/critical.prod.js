module.exports = {
  scripts: [
    {
      condition: '.js-rr-review',
      url: '/Content/nutro/scripts/modules/rnrpopin.app.js'
    },
    {
      condition: '.js-buy-retailer',
      url: '/Content/nutro/scripts/modules/ccbin.app.js'
    },
    {
      condition: '.js-managed-password',
      url: '/Content/nutro/scripts/modules/password.app.js'
    },
    {
      condition: '.bar-rating',
      url: '/Content/nutro/scripts/modules/rating.app.js'
    },
    {
      condition: '.custom-checked',
      url: '/Content/nutro/scripts/modules/checked.app.js'
    },
    {
      condition: '.js-user-status',
      url: '/Content/nutro/scripts/modules/user-login.app.js'
    }
  ]
};

