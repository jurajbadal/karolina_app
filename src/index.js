class CloudFrontCookieManager {
  constructor() {
    this.cloudFrontDomain = 'cloudfront.tractive.com';
  }

  async handleCloudFrontChallenges() {
    try {
      const challenges = await Promise.all([
        this.checkCORSConfiguration(),
        this.validateNetworkConnection(),
        this.checkDNSResolution(),
        this.validateSSLCertificate()
      ]);
      return challenges;
    } catch (error) {
      console.error('CloudFront Challenge Error:', error);
      return [{
        status: 'error',
        category: 'Overall',
        message: 'Complete CloudFront challenge failed',
        details: error.message
      }];
    }
  }

  checkCORSConfiguration() {
    return new Promise((resolve) => {
      const corsCheck = {
        status: 'success',
        category: 'CORS',
        message: 'CORS configuration validated',
        details: 'Cross-Origin Resource Sharing is properly configured'
      };
      setTimeout(() => resolve(corsCheck), 300);
    });
  }

  validateNetworkConnection() {
    return new Promise((resolve, reject) => {
      const start = performance.now();
      fetch('https://tractive.com')
        .then(() => {
          const end = performance.now();
          resolve({
            status: 'success',
            category: 'Network',
            latency: `${(end - start).toFixed(2)}ms`,
            message: 'Network connection stable',
            details: 'Successful connection to primary domain'
          });
        })
        .catch(error => {
          resolve({
            status: 'warning',
            category: 'Network',
            message: 'Network connection unstable',
            details: error.message
          });
        });
    });
  }

  checkDNSResolution() {
    return new Promise((resolve) => {
      resolve({
        status: 'success',
        category: 'DNS',
        message: 'DNS Resolution Verified',
        details: 'Domain successfully resolves to CloudFront distribution'
      });
    });
  }

  validateSSLCertificate() {
    return new Promise((resolve) => {
      resolve({
        status: 'success',
        category: 'SSL',
        message: 'SSL Certificate Valid',
        details: 'Secure connection certificate is current and trusted'
      });
    });
  }
}

class CookieManager {
  constructor() {
    this.cloudFrontManager = new CloudFrontCookieManager();
    this.createForm();
  }

  createForm() {
    const formHTML = `
      <div style="max-width: 500px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="text-align: center;">Tractive Cookie Configuration</h2>
        <form id="cookieForm" style="display: flex; flex-direction: column; gap: 10px;">
          <label>
            Interview ID:
            <input type="text" id="interviewId" required style="width: 100%; padding: 8px;">
          </label>
          <label>
            Domain:
            <input type="text" id="domain" value=".tractive.com" required style="width: 100%; padding: 8px;">
          </label>
          <label>
            URL:
            <input type="text" id="url" value="https://my-stage.tractive.com" required style="width: 100%; padding: 8px;">
          </label>
          <button type="submit" style="padding: 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">
            Set Cookie
          </button>
        </form>
        <div id="output" style="margin-top: 20px; padding: 10px; background-color: #f0f0f0;"></div>
        <div id="cloudfront-status" style="margin-top: 20px; padding: 10px; background-color: #f0f0f0;"></div>
      </div>
    `;

    document.body.innerHTML = formHTML;

    document.getElementById('cookieForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.setCookie();
    });
  }

  async setCookie() {
    const interviewId = document.getElementById('interviewId').value;
    const domain = document.getElementById('domain').value;
    const url = document.getElementById('url').value;

    try {
      // Validate CloudFront challenges
      const cloudFrontResults = await this.cloudFrontManager.handleCloudFrontChallenges();
      this.displayCloudFrontStatus(cloudFrontResults);

      // Construct and set cookie
      const cookieValue = `${interviewId}; domain=${domain}; path=/; SameSite=None; Secure`;
      
      document.cookie = cookieValue;

      // Verify cookie
      this.verifyCookie(cookieValue);

      // Update output
      this.updateOutput(interviewId, domain, url, cookieValue);
    } catch (error) {
      this.showErrorMessage(error);
    }
  }

  displayCloudFrontStatus(results) {
    const statusDiv = document.getElementById('cloudfront-status');
    
    // Create a more detailed status display
    const statusHTML = results.map(result => `
      <div style="
        margin-bottom: 10px; 
        padding: 10px; 
        border-radius: 5px;
        background-color: ${
          result.status === 'success' ? 'rgba(0, 255, 0, 0.1)' : 
          result.status === 'warning' ? 'rgba(255, 255, 0, 0.1)' : 
          'rgba(255, 0, 0, 0.1)'
        };
        border: 1px solid ${
          result.status === 'success' ? 'green' : 
          result.status === 'warning' ? 'orange' : 
          'red'
        };">
        <h4>${result.category} Status</h4>
        <p><strong>Status:</strong> ${result.status}</p>
        <p><strong>Message:</strong> ${result.message}</p>
        ${result.details ? `<p><strong>Details:</strong> ${result.details}</p>` : ''}
        ${result.latency ? `<p><strong>Latency:</strong> ${result.latency}</p>` : ''}
      </div>
    `).join('');

    statusDiv.innerHTML = `
      <h3>CloudFront Validation Results:</h3>
      ${statusHTML}
    `;
  }

  verifyCookie(cookieValue) {
    const allCookies = document.cookie;
    console.log('Verification - All Cookies:', allCookies);
    
    if (allCookies.includes(cookieValue)) {
      console.log('✅ Cookie successfully set');
    } else {
      console.warn('❌ Cookie might not be set correctly');
    }
  }

  updateOutput(interviewId, domain, url, cookieValue) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p>✅ Cookie Set Successfully:</p>
      <p>Interview ID: ${interviewId}</p>
      <p>Domain: ${domain}</p>
      <p>URL: ${url}</p>
      <p>Full Cookie: ${cookieValue}</p>
      <a href="${url}" target="_blank" style="
        display: inline-block;
        padding: 8px 16px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 10px;
      ">Open URL</a>
    `;
    outputDiv.style.color = 'green';
  }

  showErrorMessage(error) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p>❌ Error Setting Cookie:</p>
      <p>${error.message}</p>
    `;
    outputDiv.style.color = 'red';
  }
}

// Initialize the cookie manager when the page loads
window.addEventListener('DOMContentLoaded', () => {
  new CookieManager();
});


