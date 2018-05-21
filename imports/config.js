Meteor.startup(() => {
    AccountsTemplates.config({
        confirmPassword: true,
        forbidClientAccountCreation: false,
        showLabels: false,
    })
});
