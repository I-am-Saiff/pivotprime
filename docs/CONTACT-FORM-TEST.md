# Contact form: the sends you need to run

Written 3 September 2026. Everything except the real email sends is verified and
recorded at the bottom of this file. The sends need `RESEND_API_KEY`, which is
only in Vercel and which I was told not to read or write, so they are yours.

Run these after you deploy. Test submitter is **saify6uc@gmail.com**.

---

## 1. Deploy

```bash
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
```

```bash
cd /Users/saif/pivotprime/repo
```

```bash
npx vercel deploy --prod --yes --scope saif-scales
```

Then repoint the alias to the URL that printed:

```bash
npx vercel alias set <paste the deployment URL> pivotprime.vercel.app --scope saif-scales
```

## 2. The good submission

Open https://pivotprime.vercel.app/contact and fill in:

| Field | Value |
| --- | --- |
| Full name | Saif Test |
| Work email | saify6uc@gmail.com |
| Industry | **Other** |
| (the follow-up box) | Aviation |
| Message | Testing the contact form. Please ignore. |

Submit. The page should show **"Message sent"** on a pale green panel.

Using **Other** on purpose: it is the one field pair with a conditional rule, and
it proves the free-text answer reaches both emails rather than the word "Other".

### What should arrive

**In hello@pivotprime.ae**

- Subject: `Website enquiry from Saif Test: Other: Aviation`
- Reply-to: `saify6uc@gmail.com` — hit reply and check it addresses your Gmail,
  not Pivot Prime
- Body: name, email, industry, message, and a **Received** line reading something
  like `Thursday 3 September 2026 at 14:32 (Gulf Standard Time)`

**In saify6uc@gmail.com**

- From: `Pivot Prime <hello@send.pivotprime.ae>`
- Subject: `We have your enquiry`
- Body, exactly:

  > Thank you for getting in touch with Pivot Prime.
  >
  > We have your enquiry. Someone will reply with a first read on your bottleneck
  > and a time to talk it through.
  >
  > Pivot Prime
  > pivotprime.ae

- Reply-to: `hello@pivotprime.ae`
- No attachment, no images, no tracking pixel, one link and it is the site

## 3. Read the authentication headers

In Gmail, open the auto-reply, then the three-dot menu, then **Show original**.

Look for:

```
Authentication-Results: mx.google.com;
       dkim=pass header.i=@send.pivotprime.ae
       spf=pass smtp.mailfrom=...
       dmarc=pass header.from=send.pivotprime.ae
```

**All three must say `pass`.** If `dkim` says `none` or `fail`, the sending domain
in Resend is not doing what we think and the `from` address needs another look.

Do the same on the notification in hello@pivotprime.ae.

## 4. The honeypot

The hidden field cannot be filled by hand in a browser, so use the console on
the contact page (F12, Console tab):

```js
fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bot", email: "bot@example.com", industry: "Fintech", company: "spam" }) })
  .then(r => r.json()).then(console.log)
```

Expect `{ok: true}` **and no email in either inbox.** It answers success on
purpose: a rejection would teach a bot which field to leave alone.

## 5. The invalid email

Same console:

```js
fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Test", email: "not-an-email", industry: "Fintech" }) })
  .then(r => r.json()).then(console.log)
```

Expect `{ok: false, error: "Enter a valid email address"}` and nothing sent.

## 6. Tell me the result

Paste back the `Authentication-Results` block from both emails, and say whether
the reply-to on the notification addressed your Gmail.

---

## Already verified, against a local production build

Ran on `http://localhost:3987`, with no API key present, so every path below is
the code's own logic rather than Resend's.

| Case | Sent | Result |
| --- | --- | --- |
| Honeypot filled | `company: "spam-co"` | `200 {"ok":true}`, log `honeypot triggered, nothing sent` |
| Invalid email | `not-an-email` | `400 Enter a valid email address` |
| Missing name | `""` | `400 Enter your name` |
| Industry off the list | `Crypto Mining` | `400 Choose the industry you are in` |
| Other, no follow-up | `industryOther: ""` | `400 Tell us which industry you are in` |
| Other, with follow-up | `Aviation` | passes validation, reaches the send step |

**Rate limit**, five per ten minutes per IP: attempts 1 to 5 reached the send
step, attempt 6 and 7 returned `429 Too many messages from this address`. A
different IP was unaffected on its first attempt.

**Logging**: the server log carries `honeypot triggered` and
`RESEND_API_KEY is not set` and nothing else. No key material, no submission
bodies. Grepped for `re_` in the log: zero matches.

**Both UI states**, at 375 and 1440, no horizontal overflow at either:

- Success: "Message sent" panel, `role="status"`, 277x222 at 375 and 447x174 at 1440
- Error: red panel, `role="alert"`, 227x82 at 375 and 381x66 at 1440, **and the
  form stays on screen with its values**, so a retry does not mean retyping

**Suite**: content 151, links, behaviour 22, reverse-audit 120 traced, overflow 57
loads, palette clean, 31 tests, eslint 0 errors.
