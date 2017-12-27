// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  google: {
    BASE_URL: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=',
    BASE_ADDRESS: '10 Downing st. London',
    COORDINATES: {latitude: 51.5033635, longitude: -0.1276248}
  }
};
