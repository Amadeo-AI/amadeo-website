const {src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const htmlMin = require('gulp-htmlmin');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref = require('gulp-useref');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');

const pages = [
  'company',
  'contact',
  'integrations',
  'platform',
  'product',
  'solutions',
  'technology',
  'terms-of-use'
];

const BuildCss = async (pageName) => src([`app/sass/${pageName}.sass`])
    .pipe(sass({outputStyle: 'full'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(concat(`${pageName}.css`))
    .pipe(dest('app/css'))
    .pipe(browserSync.reload({stream: true}));

const BuildCssForPage = async (
  pageName,
  minify = true,
  destination = 'build/css'
) => new Promise((resolve) =>
  src([`app/sass/${pageName}.sass`])
    .pipe(sass(minify ? {outputStyle: 'compressed'} : {}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(concat(`${pageName}.css`))
    .pipe(rename({suffix: ''}))
    .pipe(rev())
    .pipe(dest(destination))
    .pipe(rev.manifest('manifest/rev-manifest.json', {
      base: 'manifest',
      merge: true
    }))
    .pipe(dest('manifest'))
    .on('end', resolve)
);


function cleanJob() {
  return del(['build', 'manifest']);
}

async function sassJob() {
    src([
      'app/sass/style.sass',
      'app/sass/header.sass',
      'app/sass/call-to-action.sass',
      'app/sass/footer.sass',
    ])
      .pipe(sass({outputStyle: 'full'}))
      .pipe(concat('style.css'))
      .pipe(dest('app/css'))
      .pipe(browserSync.reload({stream: true}));

  for (const name of pages) {
    await BuildCss(name);
  }

    return src([
      'app/sass/home.sass',
      'app/sass/updates-modal.sass'
    ])
      .pipe(sass({outputStyle: 'full'}))
      .pipe(concat('home.css'))
      .pipe(dest('app/css'))
      .pipe(browserSync.reload({stream: true}));
}


function cssJob() {
  return src()
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('libs.css'))
    .pipe(rename({suffix: ''}))
    .pipe(dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
}

function htmlJob() {
  return src('app/*.html')
    .pipe(browserSync.reload({stream: true}));
}

function scriptJob() {
  return src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}));
}

function browserSyncJob() {
  return browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

async function exportJob() {
  const BuildCssMain = await new Promise((resolve) =>
    src([
      'app/sass/style.sass',
      'app/sass/header.sass',
      'app/sass/call-to-action.sass',
      'app/sass/footer.sass',
    ])
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('style.css'))
      .pipe(rename({suffix: ''}))
      .pipe(rev())
      .pipe(dest('build/css'))
      .pipe(rev.manifest('manifest/rev-manifest.json', {
        base: 'manifest',
        merge: true
      }))
      .pipe(dest('manifest'))
      .on('end', resolve)
  );

  const BuildCssHome = await new Promise((resolve) =>
    src([
      'app/sass/home.sass',
      'app/sass/updates-modal.sass'
    ])
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('home.css'))
      .pipe(rename({suffix: ''}))
      .pipe(rev())
      .pipe(dest('build/css'))
      .pipe(rev.manifest('manifest/rev-manifest.json', {
        base: 'manifest',
        merge: true
      }))
      .pipe(dest('manifest'))
      .on('end', resolve)
  );

  const BuildJs = await new Promise((resolve) =>
    src('app/js/**/*.js')
      .pipe(uglify())
      .pipe(rev())
      .pipe(dest('build/js'))
      .pipe(rev.manifest('manifest/rev-manifest.json', {
        base: 'manifest',
        merge: true
      }))
      .pipe(dest('manifest'))
      .on('end', resolve)
  );

  const BuildFonts = await new Promise((resolve) =>
    src('app/fonts/**/*.*')
      .pipe(dest('build/fonts'))
      .on('end', resolve)
  );

  const BuildImg = await new Promise((resolve) =>
    src('app/img/**/*.*')
      .pipe(dest('build/img'))
      .on('end', resolve)
  );

  for (const name of pages) {
    await BuildCssForPage(name);
  }

  const manifest = src('manifest/rev-manifest.json');
  const buildHtml = await new Promise((resolve) =>
    src('app/**/*.html')
      .pipe(useref())
      .pipe(revReplace({ manifest }))
      .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(dest('build'))
      .on('end', resolve)
  );
}

function watchJob() {
  watch('app/sass/**/*.sass', parallel(sassJob));
  watch('app/*.html', parallel(htmlJob));
  watch('app/js/*.js', parallel(scriptJob));
}

exports.clean = cleanJob;
exports.sass = sassJob;
exports.css = cssJob;
exports.html = htmlJob;
exports.script = scriptJob;
exports.browserSync = browserSyncJob;
exports.export = exportJob;
exports.watch = watchJob;
exports.build = series(cleanJob, exportJob);
exports.default = parallel(sassJob, browserSyncJob, watchJob);
