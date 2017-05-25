angular.module('sentryException', []).factory('$exceptionHandler',
          ['$window', '$log','ENV',
  function ($window,   $log,ENV) {
    if ($window.Raven) {
      console.log('Using the RavenJS exception handler.');
      Raven.config(ENV.sentryDsn).install();
      return function (exception, cause) {
        $log.error.apply($log, arguments);
        Raven.captureException(exception);
      };
    } else {
      console.log('Using the default logging exception handler.');
      return function (exception, cause) {
        $log.error.apply($log, arguments);
      };
    }
  }
]);