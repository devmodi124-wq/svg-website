# Enquiry form → Google Sheet

The website has no backend. Enquiries are POSTed straight from the browser to a
Google Apps Script web app, which appends a row to a spreadsheet and emails you.

Free, no third party holds your leads, and the spreadsheet doubles as a lead
register you can sort and filter.

---

## Setup — about 5 minutes

Do all of this **signed in as `shreevinayakgases@gmail.com`**, so the leads live
in the business account rather than a personal one.

### 1. Create the spreadsheet

1. Go to [sheets.new](https://sheets.new)
2. Name it **Shree Vinayak Gas — Enquiries**

The script creates and formats the `Enquiries` tab itself on the first
submission. You don't need to add headers.

### 2. Attach the script

1. In the spreadsheet: **Extensions → Apps Script**
2. Delete whatever is in `Code.gs`
3. Paste the entire contents of [`Code.gs`](./Code.gs) from this folder
4. Click **Save** (💾)

### 3. Deploy it as a web app

1. **Deploy → New deployment**
2. Click the gear next to "Select type" → **Web app**
3. Set:
   - **Description:** `Enquiry endpoint`
   - **Execute as:** `Me (shreevinayakgases@gmail.com)`
   - **Who has access:** `Anyone` ← must be *Anyone*, not "Anyone with Google account"
4. **Deploy**
5. Google will ask you to authorise. It will warn "Google hasn't verified this
   app" — that's expected for your own script. Click **Advanced → Go to
   [project name] (unsafe)** → **Allow**.
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### 4. Point the site at it

In `.env.local` at the project root:

```
NEXT_PUBLIC_ENQUIRY_ENDPOINT="https://script.google.com/macros/s/AKfycb.../exec"
```

Restart `npm run dev`. The form renders in place of the "not connected yet"
fallback.

### 5. Test it

Submit a real enquiry through `/contact/`. Within a few seconds you should see:

- a new row in the `Enquiries` tab
- an email to `shreevinayakgases@gmail.com`

---

## Redeploying after a script change

Editing `Code.gs` is **not** enough — the live URL keeps serving the old version.

**Deploy → Manage deployments →** pencil icon **→ Version: New version → Deploy**

This keeps the same URL, so `.env.local` doesn't change.

---

## How it works, and why it's built this way

**Why `text/plain`?** Apps Script doesn't answer CORS preflight (`OPTIONS`)
requests. Sending `Content-Type: application/json` triggers a preflight, which
fails. `text/plain` keeps it a "simple request" that the browser sends directly.
The script parses the JSON body itself.

**Why the leading apostrophe on phone numbers?** Sheets otherwise reads
`+919876543210` as a formula or strips the `+`. The apostrophe forces text.

**Spam handling.** There's a hidden honeypot field on the form; anything that
fills it is silently accepted and dropped. Both the site and the script check
it, because this endpoint is public and will eventually be found by scrapers.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Form shows the connection error | "Who has access" isn't `Anyone` | Redeploy with access set to `Anyone` |
| Rows appear, no email | Gmail daily quota, or `NOTIFY_EMAIL` is blank | Check quota; confirm the constant at the top of `Code.gs` |
| Script edits have no effect | Deployment still points at the old version | Manage deployments → New version |
| Phone numbers lose the `+` | Row written before `normalisePhone` existed | Cosmetic only — new rows are fine |

To see what the script actually did, open the Apps Script editor →
**Executions** in the left sidebar. Failures are logged there with the error.
