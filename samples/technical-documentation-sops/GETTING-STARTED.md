# Getting started with the InvoiceNest API

This guide takes you from a new InvoiceNest account to a sent, paid invoice using the API. You will create a customer, create an invoice for $250.00, send it, and record the payment. Every step uses test mode, so nothing is really emailed and no money moves.

You need:

- A computer with a terminal and `curl` installed.
- About 15 minutes.

Names, fields and values in this guide match the API reference exactly. The full endpoint list is in `API-REFERENCE.md`.

## Step 1 — Create your InvoiceNest account

1. Open https://app.invoicenest.com and choose **Create account**.
2. Enter your name, your email address and a password, then choose **Create account**.
3. Open the confirmation email we send you and choose **Confirm email address**.
4. Sign in at https://app.invoicenest.com. You are now on the InvoiceNest dashboard.

## Step 2 — Get a test API key

1. In the dashboard, open **Settings → Developers → API keys**.
2. Choose **Create test key**. Your test API key appears once, in full.
3. Copy the key and store it somewhere private. It starts with `in_test_` and looks like this:

```
in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5
```

Every API call sends this key in the `Authorization` header. The base URL for every call is https://api.invoicenest.com/v1.

## Step 3 — Create a customer

An invoice needs a customer. Create one with `POST /customers`:

```bash
curl -X POST https://api.invoicenest.com/v1/customers \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marlowe Design Co.",
    "email": "billing@marlowe.example",
    "phone": "+1 415 555 0132"
  }'
```

You get back the new customer (HTTP 201):

```json
{
  "id": "cus_5Rt8Vw2Yz6Ab",
  "object": "customer",
  "name": "Marlowe Design Co.",
  "email": "billing@marlowe.example",
  "phone": "+1 415 555 0132",
  "created_at": "2026-01-10T14:22:00Z",
  "updated_at": "2026-01-10T14:22:00Z"
}
```

Write down the `id` value, `cus_5Rt8Vw2Yz6Ab`. You use it as `customer_id` in the next step. This is your first successful API call.

## Step 4 — Create an invoice

Create an invoice for the customer with `POST /invoices`. Amounts in the API are integers in the smallest currency unit, so $250.00 is `25000`:

```bash
curl -X POST https://api.invoicenest.com/v1/invoices \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "cus_5Rt8Vw2Yz6Ab",
    "currency": "USD",
    "issue_date": "2026-01-15",
    "due_date": "2026-02-14",
    "description": "Website design services for January 2026",
    "line_items": [
      { "description": "Design work (10 hours)", "quantity": 1, "unit_amount": 25000 }
    ]
  }'
```

The response (HTTP 201) is the new invoice in `draft` status. InvoiceNest calculated `amount_due` from the line items and assigned the number `INV-1042`:

```json
{
  "id": "inv_7Kd29PxQ4mLw",
  "object": "invoice",
  "customer_id": "cus_5Rt8Vw2Yz6Ab",
  "number": "INV-1042",
  "status": "draft",
  "currency": "USD",
  "amount_due": 25000,
  "amount_paid": 0,
  "amount_remaining": 25000,
  "issue_date": "2026-01-15",
  "due_date": "2026-02-14",
  "description": "Website design services for January 2026",
  "line_items": [
    { "description": "Design work (10 hours)", "quantity": 1, "unit_amount": 25000 }
  ],
  "created_at": "2026-01-15T09:30:00Z",
  "updated_at": "2026-01-15T09:30:00Z"
}
```

## Step 5 — Send the invoice

A draft is not visible to your customer yet. Send it with `POST /invoices/{invoice_id}/send`, using the invoice `id` from step 4:

```bash
curl -X POST https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw/send \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

The response shows the same invoice, now in `open` status. In live mode the customer receives it by email at this point; in test mode no email leaves InvoiceNest.

```json
{
  "id": "inv_7Kd29PxQ4mLw",
  "object": "invoice",
  "customer_id": "cus_5Rt8Vw2Yz6Ab",
  "number": "INV-1042",
  "status": "open",
  "currency": "USD",
  "amount_due": 25000,
  "amount_paid": 0,
  "amount_remaining": 25000,
  "issue_date": "2026-01-15",
  "due_date": "2026-02-14",
  "description": "Website design services for January 2026",
  "line_items": [
    { "description": "Design work (10 hours)", "quantity": 1, "unit_amount": 25000 }
  ],
  "created_at": "2026-01-15T09:30:00Z",
  "updated_at": "2026-01-15T09:30:00Z"
}
```

## Step 6 — Record a payment

When your customer pays, record the payment with `POST /invoices/{invoice_id}/payments`:

```bash
curl -X POST https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw/payments \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25000,
    "method": "card"
  }'
```

The response (HTTP 201) is the recorded payment:

```json
{
  "id": "pay_9Qm4Lw7Rt2Vx",
  "object": "payment",
  "invoice_id": "inv_7Kd29PxQ4mLw",
  "amount": 25000,
  "method": "card",
  "status": "succeeded",
  "created_at": "2026-01-20T16:45:00Z"
}
```

Because this payment brings `amount_remaining` to zero, the invoice moves to `paid`. You can confirm this with `GET /invoices/{invoice_id}`.

## Next steps

- List and filter invoices with `GET /invoices`.
- Change a due date with `PATCH /invoices/{invoice_id}`.
- Remove a draft you created by mistake with `DELETE /invoices/{invoice_id}`.
- Look up a customer with `GET /customers/{customer_id}`.
- Get notified in your own system when an invoice is paid: register a URL with `POST /webhook-endpoints` and subscribe to the `invoice.paid` event.
- When you are ready to go live, create a live key (it starts with `in_live_`) in the same dashboard screen and swap it into your `Authorization` header. Nothing else changes.

## Troubleshooting

| What you see | What it means | What to do |
|---|---|---|
| HTTP 401 with code `authentication_error` | The API key is missing, copied incorrectly, or revoked. | Check the `Authorization` header against the key shown under **Settings → Developers → API keys**. |
| HTTP 404 with code `invoice_not_found` | No invoice exists with the ID in the URL. | Check the ID for typing errors; list your invoices with `GET /invoices` to find the right one. |
| HTTP 404 with code `customer_not_found` | The `customer_id` in your request does not match a customer. | Create the customer first (step 3) and use the `id` from the response. |
| HTTP 400 with code `invalid_request` | A field in your request is missing or out of range. The error's `param` field names it. | Fix the named field and send the request again. |
| HTTP 409 with code `invalid_state` | The invoice status does not allow this action, for example sending an invoice that is not a `draft`. | Retrieve the invoice with `GET /invoices/{invoice_id}` and check its `status`. |
