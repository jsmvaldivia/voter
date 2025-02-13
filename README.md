# Voter Bot

This project is a simple bot that uses Puppeteer to automate the process of submitting votes on a specific website.

## What it does

The bot:

- Launches a headless browser using Puppeteer.
- Navigates to the voting page.
- Selects a specific radio button.
- Clicks the "vote" button.
- Repeats the process for a specified number of votes with random delays to avoid detection.

## Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/voter.git
   cd voter
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Open the `voter.js` file and set the number of votes you want to submit by modifying the `votes` variable.

2. Run the script:
   ```sh
   node voter.js
   ```

## Notes

- The script uses a random delay between votes to avoid detection.
- Make sure to comply with the website's terms of service and use this script responsibly.

## License

This project is licensed under the ISC License.
