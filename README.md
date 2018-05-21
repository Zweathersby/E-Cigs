# E-CigsUSC

##Authors
Application developed by: Alexander, Jared, Reynard, Shane, and Zach

##Purpose
This web application is intended for use in doctors offices by patients who are smokers. 

The patients will first review information regarding their smoking habits, and, depending on their choice, information about e-cigarettes as well.

Patients will then complete a survey which is customized by their doctors office. The doctor will log in to their administrator account where they can edit the questions asked in the survey to include a variety of multiple choice, short answer, slider, and true/false questions. 

The patients response are grouped by patient names and are able to be viewed in the doctor's administrator account.


* Repo: https://github.com/SCCapstone/E-CigsUSC
* Website: https://peaceful-bastion-31676.herokuapp.com/

## How to Install
### Install meteor
#### OSX/Linux
```
curl https://install.meteor.com/ | sh
```
#### Windows
```
choco install meteor
```

### Clone our repo
```
git clone https://github.com/SCCapstone/E-CigsUSC
cd E-CigsUSC
```

## How to run
### Deployment
The app is currently deployed on heroku at this address:
```
https://peaceful-bastion-31676.herokuapp.com/
```

### Local
#### Browser (Supports Google Chrome)
```
meteor run
```

#### iOS (Requires XCode)
```
meteor install-sdk ios
meteor add-platform ios
meteor run ios
```

#### Android
```
meteor install-sdk android
meteor add-platform android
meteor run android
```

## Testing


### Unit Testing

To perform our unit testing, we will use the following command:
```
meteor test --driver-package meteortesting:mocha
```

### Integration/Behavioral Testing
We have chosen to use Meteor's built in tool for testing called Meteor Build Tool and 
will use the meteor test command to run our unit and integration testing.

Please run the following command:

```
meteor test --full-app
```

Jared read this:
https://guide.meteor.com/testing.html

##NOTES
Please note that the application contains no graphics at this stage as the client's graphic designer will be undertaking their design and implementation at a later date.