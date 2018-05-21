var myLogoutFunc = function(){
  //-- Go to homepage and remove previous active link, set active link to home
  Router.go('/');
  $(document.getElementsByClassName('links')[0]).addClass('active-link').siblings().removeClass('active-link');
}
AccountsTemplates.configure({
  onLogoutHook: myLogoutFunc,
  // onSubmitHook: mySubmitFunc,
  // forbidClientAccountCreation: false,
})
