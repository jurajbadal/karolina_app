class CookieManager {
    constructor() {
      this.createForm();
    }
  
    createForm() {
      const formHTML = `
        <div>
          <h2>Tractive Cookie Configuration</h2>
          <form id="cookieForm">
            <label>Request ID:
              <input type="text" id="requestId" required>
            </label>
            <label>Domain:
              <input type="text" id="domain" value=".tractive.com" required>
            </label>
            <label>Full URL:
              <input type="text" id="url" value="https://my-stage.tractive.com" required>
            </label>
            <button type="submit">Set Cookie</button>
          </form>
          <div id="output"></div>
        </div>
      `;
  
      document.body.innerHTML = formHTML;
  
      document.getElementById('cookieForm').addEventListener('submit', (e) => {
        e.preventDefault();
        this.setCookie();
      });
    }
  
    setCookie() {
      const requestId = document.getElementById('requestId').value;
      const domain = document.getElementById('domain').value;
      const url = document.getElementById('url').value;
  
      // Construct cookie with both request ID and domain
      const cookieValue = `requestId=${requestId}; domain=${domain}; path=/; SameSite=Strict`;
      
      try {
        document.cookie = cookieValue;
        
        // Display output
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `
          <p>Cookie Set Successfully:</p>
          <p>Request ID: ${requestId}</p>
          <p>Domain: ${domain}</p>
          <p>URL: ${url}</p>
          <p>Full Cookie: ${cookieValue}</p>
          <a href="${url}" target="_blank">Open URL</a>
        `;
  
        // Optional: Verify cookie
        console.log('All Cookies:', document.cookie);
      } catch (error) {
        console.error('Cookie setting failed:', error);
      }
    }
  }
  
  // Initialize the cookie manager when the page loads
  window.addEventListener('DOMContentLoaded', () => {
    new CookieManager();
  });
  