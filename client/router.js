Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    name: 'index'
});

Router.route('/presentation');
Router.route('/survey');
Router.route('/editor');
Router.route('/login');
Router.route('/results');
Router.route('/aloneinfo');
Router.route('/assistanceinfo');
Router.route('/smokeinfo');
Router.route('/skiplogic');
Router.route('/ecig');

// Work on privilaged routing
//
// var adminRoutes = Router.group({
//   prefix: '/admin',
//   name: 'admin'
// });
//
// adminRoutes.route('')
