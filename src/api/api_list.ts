const API_LIST = {
  geocode: '/geocode/search',
  sign_up: 'api/signup/user',
  admin_sign_up: 'api/signup/admin',
  login: 'api/login',
  property: {
    create: 'api/rental-properties/new',
    update: 'api/rental-properties/:id',
    all: 'api/rental-properties',
    nearest: 'api/rental-properties/nearest',
  },
}

export default API_LIST
