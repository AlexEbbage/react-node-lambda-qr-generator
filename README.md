# WiFi Code QR Generator
![CI](https://github.com/AlexEbbage/react-node-lambda-qr-generator/workflows/CI/badge.svg)
![CD](https://github.com/AlexEbbage/react-node-lambda-qr-generator/workflows/CD/badge.svg)

A tool that takes a WiFi login and generates a QR code that when scanned; prompts modern smart phones to join the network.

See it live: [https://alexebbage.github.io/react-node-lambda-qr-generator/](https://alexebbage.github.io/react-node-lambda-qr-generator/).

## How it Works
The frontend on gh-pages takes the following inputs:
- Encryption type
- Network Name (SSID)
- Password
- Hidden (true/false)
Once the user submits their details, a POST request is made to API Gateway.

API Gateway receives the request, and data. The API then forwards the JSON to the generator Lambda Function.

The generator Lambda Function takes the JSON from API Gateway. It makes use of the [qrcode](https://www.npmjs.com/package/qrcode) lib from NPM. A QR code is generated in the format: 'WIFI:T:WPA;S:MyNetworkName;P:ThisIsMyPassword;'. The code is returned to the frontend as a base64 image.

### Automation
#### CI
The Continuous Integration workflow runs on a Pull Request into master. It's split into two tasks: 'test' and 'frontend'.
The 'test' task uses Yarn to run the automated test script from the package.json file in ./backend/lambda/generator.
The 'frontend' task uses Yarn to build the React project and check for errors. If any errors make it through, the check fails and the fixes need to be made before merging the PR.

By default, GitHub Actions treats warnings as errors.

#### CD
The Continuous Deployment workflow runs on a merge into master. It's split into two tasks: 'deploy' and 'deployFrontend'.
The 'deploy' task performs the same test run as the 'test' task from the CI workflow, and if all tests pass, the [serverless](https://www.npmjs.com/package/serverless) framework is installed, and then used to deploy the Lambda Functions and API Gateway configurations to the AWS account specified from this repository's secrets.
It also uses Yarn to build/test the React code, and if successful, Deploys the code to the gh-pages branch.
