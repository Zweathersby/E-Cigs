var postSignUp = function(userId) {
  console.log(userId);

  Roles.addUsersToRoles(userId, ['admin']);
}
AccountsTemplates.configure({
  postSignUpHook: postSignUp,
});
