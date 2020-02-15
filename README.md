# swiwelApp News App

## Installation

### How do I configure **iOS** app on my workstation?

- Clone project from bitbucket
- Change directory to project

  ```
  $ cd ../project path
  $ yarn install
  ```

- If cocopods is not installed on workstation,

  Run

  ```
  $ sudo gem install cocoapods
  ```

- Change directory to ios

  ```
  $ cd ios
  $ pod install
  ```

- Open `Swivel_News_App.xcworkspace` file on ios folder `(project/ios/Swivel_News_App.xcworkspace)`
- Run the project after indexing

### How do I configure **android** on my workstation?

- Clone project from bitbucket
- Change directory to project
  ```
  $ cd ../project path
  $ yarn install
  $ react-native start
  ```
- Open Android studio
- Select `Select open an existing project`
- Open android folder in project directory `(project/android)`
- Run the project after building
