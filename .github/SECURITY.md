# Security Best Practices

## CRITICAL: Never Expose Secrets

### What NOT to do:
```javascript
// WRONG - Never hardcode secrets
const connectionString = "mongodb+srv://user:password@cluster.mongodb.net/db";
```

### What TO do:
```javascript
// CORRECT - Use environment variables
const connectionString = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@cluster.mongodb.net/db";
```

## Current Security Status

### Properly Secured:
- [x] All secrets moved to `.env` file
- [x] `.env` file is in `.gitignore`
- [x] Environment variables configured in Vercel (for Backend)
- [x] Documentation sanitized (no real secrets)
- [x] Database credentials only used in backend

### Secret Storage Locations:

#### Frontend Environment Variables (Public - Safe to Expose):
*Currently, the frontend does not use sensitive API keys directly. If added in the future (e.g., for Maps or Analytics), they should be prefixed with `VITE_`.*

#### Backend Environment Variables (Private - NEVER Expose):
- `MONGO_USERNAME` - MongoDB database username
- `MONGO_PASSWORD` - MongoDB database password
- `MONGO_PORT` - Port for the backend server (default: 7120)
- `JWT_SECRET` - Secret key for signing JSON Web Tokens (if applicable)

## How Secrets Are Used

### Backend (Vercel/Node.js Environment Variables):
```env
# These stay on the server (never sent to client)
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_password
MONGO_PORT=7120
```

## Deployment Checklist

### Before Deploying:
1.  **Verify .gitignore:**
    ```bash
    cat .gitignore | grep .env
    # Should show: .env
    ```

2.  **Check for exposed secrets:**
    ```bash
    git log -p | grep -i "password\|secret\|mongodb"
    # Should return nothing (or only sanitized code)
    ```

3.  **Set environment variables in hosting platform:**
    - **Vercel:** Project Settings → Environment Variables
    - **Render/Heroku:** Dashboard → Environment

4.  **Test with placeholder values:**
    - Verify app shows proper error messages if secrets are missing.

## What to NEVER Commit:

```gitignore
# NEVER commit these files:
.env
.env.local
.env.production
Backend/.env
Frontend/.env

# Always commit these:
.gitignore
README.md
CONTRIBUTING.md
```

## How to Check for Leaked Secrets:

### Scan your repository:
```bash
# Check if .env is tracked
git ls-files | grep .env

# Search commit history for secrets
git log -p --all -- .env
```

### Remove secrets from git history:
```bash
# If you accidentally committed secrets:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (CAUTION - this rewrites history)
git push origin --force --all
```

## If Secrets Are Exposed:

1.  **Immediately rotate all exposed credentials:**
    - Change MongoDB password in Atlas.
    - Generate new JWT secrets.
2.  **Update everywhere:**
    - Local `.env` file.
    - Vercel/Hosting environment variables.
    - Team members' local environments.
3.  **Verify:**
    - Test deployment with new secrets.
    - Check database connectivity.

## Quick Reference

| Secret Type | Storage Location | Exposed to Client? |
| :--- | :--- | :--- |
| MongoDB Username | `.env` (Backend) | **No** (backend only) |
| MongoDB Password | `.env` (Backend) | **No** (backend only) |
| JWT Secret | `.env` (Backend) | **No** (backend only) |
| Backend Port | `.env` (Backend) | **No** (backend only) |

## Additional Resources
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)

**Remember: When in doubt, treat it as a secret!**
