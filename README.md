#Before starting the application.
1. You need Docker toolbox (https://docs.docker.com/toolbox/toolbox_install_windows/) 
or Docker for windows.

2. Go to the root of the project, open a command prompt window there, and run 
'docker-compose up' 
- This will setup the postgres db and the ph4admin db manager app.
- Go to the docker-compose.yml file for credentials and urls on how to access the ph4admin and the postgres db.

3. Open and run the application in visual studio 2017 through iis express.

4. Done

To run the End to End tests,
1. start the database using the 'docker-compose up' command
2. Start the application by pressing 'Ctrl + F5' in visual studio
3. You might need to change the url in the 'protractor.conf.js' file to 
match the port IIS Express opens up your application under.
4. open up a command prompt window under the ClientApp folder, and type in 'ng e2e'
5. Done. The tests should open a chrome window, run the tests, and display the results in the command prompt