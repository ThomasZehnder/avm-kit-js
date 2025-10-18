class PasswordHandler {
    constructor() {
        this.serverUrl = 'services/';
    }

    _getElements() {
        this.readOutput = document.getElementById('read-password-output');
        this.writeInput = document.getElementById('write-password-input');
        this.readBtn = document.getElementById('read-password-btn');
        this.writeBtn = document.getElementById('write-password-btn');
        this.resetBtn = document.getElementById('reset-password-btn');
        this.resultArea = document.getElementById('fetch-results');

    }

    init() {
        this._getElements()
        if (!this.readOutput || !this.writeInput || !this.readBtn || !this.writeBtn || !this.resetBtn || !this.resultArea) {
            console.error("PasswordHandler: missing required HTML elements");
            return;
        }

        this.readBtn.addEventListener('click', () => this.readPassword());
        this.writeBtn.addEventListener('click', () => this.writePassword());
        this.resetBtn.addEventListener('click', () => this.resetPassword());
    }

    logResult(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.resultArea.value = `[${timestamp}] ${message}\n`;
        this.resultArea.scrollTop = this.resultArea.scrollHeight; // auto scroll
    }

    readPassword() {
        fetch(`${this.serverUrl}getpassword`)
            .then(resp => resp.text())
            .then(text => {
                const pwd = text.replace("Stored password: ", "");
                this.readOutput.value = pwd;
                this.logResult(`Read password: ${pwd}`);
            })
            .catch(err => this.logResult("Error reading password: " + err));
    }

    writePassword() {
        const newPass = this.writeInput.value;
        console.log("New Password: ", newPass);
        if (!newPass) {
            this.logResult(`New password is empty?: ${newPass}`);
            return;
        }
        fetch(`${this.serverUrl}setpassword?password=${encodeURIComponent(newPass)}`)
            .then(resp => resp.text())
            .then(text => {
                this.logResult(text);
                this.writeInput.value = '';
            })
            .catch(err => this.logResult("Error writing password: " + err));
    }

    async resetPassword() {
        await fetch(`${this.serverUrl}resetpassword`)
            .then(resp => resp.text())
            .then(text => {
                this.logResult(text);
            })
            .catch(err => this.logResult("Error resetting password: " + err)
            );
    }
}

const pwdHandler = new PasswordHandler('');


// Load the page content dynamically
dynamicLoadPage("pages/passwordpage", 0, () => {
    pwdHandler.init();
});
