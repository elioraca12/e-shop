// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  "api": {
    LOGIN_API: "http://localhost:8080/login",
    LOGOUT_API: "http://localhost:8080/logout",
    PAYLOAD_API: "http://localhost:8080/api/token",
    BASE_INVENTORY_API: "http://localhost:8080/api/inventory",
    BASE_PRODUCT_API: "http://localhost:8080/api/product",
    BASE_USER_API: "http://localhost:8080/api/user",
    BASE_TRANSACTION_API: "http://localhost:8080/api/transaction",
    BASE_ROLE_API: "http://localhost:8080/api/role",
    BASE_SIZE_API: "http://localhost:8080/api/size",
    BASE_SIZE_NAMING_API: "http://localhost:8080/api/size-naming",
    BASE_INVENTORY_STATE_API: "http://localhost:8080/api/inventory-state",
  },

  "method" : {
    GET: "/get",
    POST: "/post",
    DELETE: "/delete",
    UPDATE: "/update",
    GET_ALL: "/get-all",
    GET_AVAILABLE: '/available/get'

  },

  "query_parameter":  {
    NAME: "?name=",
    ID: "?id=",
    USERNAME: "?username="
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
