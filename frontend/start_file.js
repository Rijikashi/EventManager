const { exec } = require('child_process');
const port = process.env.PORT || 3001;
const environment = process.env.REACT_ENV || 'development';
// Function to run a command and handle output
function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    if (callback) callback();
  });
}

// Example tasks
function startCustom() {
  console.log('Starting custom script...');
  let command = ``
  switch(environment){
    case 'development':
      command = `PORT=${port} react-scripts start`
      break;
    case 'production':
      command = `npm run build && serve -s build -l ${port}`
      break;
    default:
      command = `PORT=${port} react-scripts start`

  }
  runCommand(command);
}

// Execute the custom start script
startCustom();
