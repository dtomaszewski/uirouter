'use strict';

var gulp = require('gulp');
var url = require('url');
var shell = require('gulp-shell');


// Config
var config = {
  dpd: require('./config/deployd.js')
};

////////////////////////
// Run Deployd Mock Server
gulp.task('dpd', function () {

  var dpdArgs = [config.dpd.path + 'app.dpd', '-d', '-p', config.dpd.port, '-P', config.dpd.dbPort];
  console.log('logg', dpdArgs);
  return gulp.src('', {read: false})
    .pipe(shell([
      'dpd ' + dpdArgs.join(' ')
    ]));
});

//// Export deployd database
//$.gulp.task('dpd:export', function () {
//  $.mongobackup.dump({
//    host : config.dpd.host,
//    port: config.dpd.dbPort,
//    out : config.dpd.export,
//    db: config.dpd.dbName
//  });
//});
//
//// Import deployd database
//$.gulp.task('dpd:import', function () {
//  $.mongobackup.restore({
//    host : config.dpd.host,
//    port: config.dpd.dbPort,
//    drop: true,
//    path: config.dpd.export + config.dpd.dbName
//  });
//});
//

