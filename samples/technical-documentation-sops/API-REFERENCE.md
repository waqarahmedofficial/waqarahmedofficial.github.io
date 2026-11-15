# InvoiceNest API reference

InvoiceNest is a fictional invoicing product. This reference documents the InvoiceNest REST API, which lets a business create customers, issue invoices, record payments and receive webhook notifications when invoice activity happens.

- Base URL: https://api.invoicenest.com/v1
- Dashboard: https://app.invoicenest.com
- Support: support@invoicenest.com

All requests and responses use JSON. All requests must be made over HTTPS.

## Authentication

**Auth: API key (Bearer).** Every endpoint in this reference requires an API key, sent as a bearer token:

```
Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5
```

- Keys with the `in_test_` prefix operate in test mode. Test mode never sends a real email and never moves money.
- Keys with the `in_live_` prefix operate in live mode.
- The prefix is followed by exactly 24 letters or digits. Keep live keys secret; a key gives full access to the account's invoices.
- A request with a missing or invalid key fails with HTTP 401 and the error code `authentication_error`.

You create and revoke keys in the dashboard under **Settings → Developers → API keys**.

## Conventions

- **Resource IDs.** Every resource ID is a prefix followed by exactly 12 letters or digits: `inv_` for invoices, `cus_` for customers, `pay_` for payments, `we_` for webhook endpoints and `evt_` for webhook events. Example: `inv_7Kd29PxQ4mLw`.
- **Money.** Amounts are integers in the smallest currency unit. $250.00 is sent as `25000`. Amounts are never decimals.
- **Dates and times.** Calendar dates use `YYYY-MM-DD` (for example `2026-02-14`). Timestamps use ISO 8601 in UTC (for example `2026-01-15T09:30:00Z`).
- **Pagination.** List endpoints accept `limit` (default 20, maximum 100) and `offset` (default 0) and return a list object with `total`, `limit` and `offset` fields.
- **Invoice arithmetic.** For every invoice, `amount_remaining` equals `amount_due` minus `amount_paid`, and `amount_due` equals the sum of `quantity` × `unit_amount` over its line items.

## Errors

InvoiceNest uses one error shape for every endpoint:

| Field | Type | Description |
|---|---|---|
| code | string | Machine-readable error code from the table below. |
| message | string | Human-readable explanation of what went wrong. |
| param | string (nullable) | The request field that caused the error, or `null` when the error is not tied to one field. |

Example error response:

```json
{
  "error": {
    "code": "invoice_not_found",
    "message": "No invoice exists with ID inv_000000000000.",
    "param": null
  }
}
```

Error codes used in this reference:

| HTTP status | Code | Meaning |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | A request field is missing, malformed or out of range. The `param` field names it. |
| 404 | invoice_not_found | No invoice exists with the given ID. |
| 404 | customer_not_found | No customer exists with the given ID. |
| 404 | webhook_endpoint_not_found | No webhook endpoint exists with the given ID. |
| 409 | invalid_state | The resource exists but its current status does not allow this operation. |
| 429 | rate_limited | Too many requests. Wait before retrying. |
| 500 | api_error | An unexpected error on the InvoiceNest side. |

## Objects

### The invoice object

| Field | Type | Description |
|---|---|---|
| id | string | Unique invoice ID (`inv_` prefix). |
| object | string | Always `invoice`. |
| customer_id | string | ID of the customer this invoice is issued to. |
| number | string | Human-readable invoice number, for example `INV-1042`. Assigned at creation and never changes. |
| status | string | One of `draft`, `open`, `paid`, `void`, `uncollectible`. |
| currency | string | Three-letter ISO 4217 currency code, for example `USD`. |
| amount_due | integer | Total amount of the invoice, in the smallest currency unit. |
| amount_paid | integer | Amount recorded as paid so far, in the smallest currency unit. |
| amount_remaining | integer | `amount_due` minus `amount_paid`. |
| issue_date | string | Date the invoice is issued, as `YYYY-MM-DD`. |
| due_date | string | Date payment is due, as `YYYY-MM-DD`. |
| description | string | Summary shown on the invoice. Can be an empty string. |
| line_items | array | Line items; each item is a line item object (below). |
| created_at | string | ISO 8601 timestamp of when the invoice was created. |
| updated_at | string | ISO 8601 timestamp of the last change to the invoice. |

### The line item object

| Field | Type | Description |
|---|---|---|
| description | string | What this line charges for. |
| quantity | integer | Number of units. Must be at least 1. |
| unit_amount | integer | Price per unit, in the smallest currency unit. |

### The customer object

| Field | Type | Description |
|---|---|---|
| id | string | Unique customer ID (`cus_` prefix). |
| object | string | Always `customer`. |
| name | string | Customer's full name or business name. |
| email | string | Email address invoices are sent to. |
| phone | string (nullable) | Phone number, or `null` when none is recorded. |
| created_at | string | ISO 8601 timestamp of when the customer was created. |
| updated_at | string | ISO 8601 timestamp of the last change to the customer. |

### The payment object

| Field | Type | Description |
|---|---|---|
| id | string | Unique payment ID (`pay_` prefix). |
| object | string | Always `payment`. |
| invoice_id | string | ID of the invoice this payment is recorded against. |
| amount | integer | Amount of this payment, in the smallest currency unit. |
| method | string | One of `card`, `bank_transfer`, `cash`, `other`. |
| status | string | One of `succeeded`, `pending`, `failed`. |
| created_at | string | ISO 8601 timestamp of when the payment was recorded. |

### The webhook endpoint object

| Field | Type | Description |
|---|---|---|
| id | string | Unique webhook endpoint ID (`we_` prefix). |
| object | string | Always `webhook_endpoint`. |
| url | string | HTTPS URL that receives event notifications. |
| events | array | Event types this endpoint subscribes to. Each entry is a string, for example `invoice.paid`. |
| enabled | boolean | Whether deliveries to this endpoint are active. |
| created_at | string | ISO 8601 timestamp of when the endpoint was registered. |

### The list object

| Field | Type | Description |
|---|---|---|
| object | string | Always `list`. |
| data | array | The resources on this page. |
| total | integer | Total number of matching resources across all pages. |
| limit | integer | Page size that was applied. |
| offset | integer | Offset that was applied. |

### The deletion response object

Returned by delete endpoints instead of the full resource.

| Field | Type | Description |
|---|---|---|
| id | string | ID of the deleted resource. |
| object | string | The resource type, for example `invoice`. |
| deleted | boolean | Always `true` for a successful deletion. |

## Endpoints

### POST /customers — create a customer

Creates a customer that invoices can be issued to.

**Auth:** API key (Bearer) required.

Request body:

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | Yes | Customer's full name or business name. |
| email | string | Yes | Email address invoices are sent to. Must be a valid email address. |
| phone | string (nullable) | No | Phone number. Omit or send `null` when none is recorded. |

Example request:

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

Example response (HTTP 201):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | `name` is missing, or `email` is missing or not a valid email address. |

### GET /customers/{customer_id} — retrieve a customer

Returns one customer by ID.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| customer_id | string | The customer's ID (`cus_` prefix). |

Example request:

```bash
curl -X GET https://api.invoicenest.com/v1/customers/cus_5Rt8Vw2Yz6Ab \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

Example response (HTTP 200):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 404 | customer_not_found | No customer exists with this `customer_id`. |

### POST /invoices — create an invoice

Creates an invoice in `draft` status. The invoice is not sent to the customer until you call `POST /invoices/{invoice_id}/send`. `amount_due` is calculated from the line items; do not send it.

**Auth:** API key (Bearer) required.

Request body:

| Field | Type | Required | Description |
|---|---|---|---|
| customer_id | string | Yes | ID of an existing customer. |
| currency | string | Yes | Three-letter ISO 4217 currency code. |
| issue_date | string | Yes | Issue date as `YYYY-MM-DD`. |
| due_date | string | Yes | Due date as `YYYY-MM-DD`. Must not be earlier than `issue_date`. |
| description | string | No | Summary shown on the invoice. Defaults to an empty string. |
| line_items | array | Yes | At least one line item object. |

Example request:

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

Example response (HTTP 201):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | A required field is missing, `due_date` is earlier than `issue_date`, or a line item has `quantity` below 1. |
| 404 | customer_not_found | `customer_id` does not match an existing customer. |

### GET /invoices — list invoices

Returns invoices as a list object, newest first.

**Auth:** API key (Bearer) required.

Query parameters:

| Name | Type | Required | Description |
|---|---|---|---|
| status | string | No | Only return invoices with this status, for example `open`. |
| customer_id | string | No | Only return invoices for this customer. |
| limit | integer | No | Page size. Default 20, maximum 100. |
| offset | integer | No | Number of invoices to skip. Default 0. |

Example request:

```bash
curl -X GET "https://api.invoicenest.com/v1/invoices?status=open&limit=20&offset=0" \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

Example response (HTTP 200):

```json
{
  "object": "list",
  "data": [
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
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | `status` is not a valid invoice status, or `limit` is above 100. |

### GET /invoices/{invoice_id} — retrieve an invoice

Returns one invoice by ID.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| invoice_id | string | The invoice's ID (`inv_` prefix). |

Example request:

```bash
curl -X GET https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

Example response (HTTP 200):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 404 | invoice_not_found | No invoice exists with this `invoice_id`. |

### PATCH /invoices/{invoice_id} — update an invoice

Updates the editable fields of an invoice. Only `due_date` and `description` can be changed, and only while the invoice status is `draft` or `open`. Line items, amounts and `customer_id` cannot be changed after creation; delete the draft and create a new invoice instead.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| invoice_id | string | The invoice's ID (`inv_` prefix). |

Request body:

| Field | Type | Required | Description |
|---|---|---|---|
| due_date | string | No | New due date as `YYYY-MM-DD`. Must not be earlier than `issue_date`. |
| description | string | No | New summary shown on the invoice. |

Example request:

```bash
curl -X PATCH https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "due_date": "2026-02-21"
  }'
```

Example response (HTTP 200):

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
  "due_date": "2026-02-21",
  "description": "Website design services for January 2026",
  "line_items": [
    { "description": "Design work (10 hours)", "quantity": 1, "unit_amount": 25000 }
  ],
  "created_at": "2026-01-15T09:30:00Z",
  "updated_at": "2026-01-16T10:05:00Z"
}
```

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | `due_date` is earlier than `issue_date`. |
| 404 | invoice_not_found | No invoice exists with this `invoice_id`. |
| 409 | invalid_state | The invoice status is `paid`, `void` or `uncollectible`. |

### POST /invoices/{invoice_id}/send — send an invoice

Sends a `draft` invoice to the customer's email address and moves the invoice to `open`. This endpoint has no request body.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| invoice_id | string | The invoice's ID (`inv_` prefix). |

Example request:

```bash
curl -X POST https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw/send \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

Example response (HTTP 200):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 404 | invoice_not_found | No invoice exists with this `invoice_id`. |
| 409 | invalid_state | The invoice is not in `draft` status. |

### DELETE /invoices/{invoice_id} — delete a draft invoice

Permanently deletes an invoice. Only invoices in `draft` status can be deleted. To cancel an invoice that has already been sent, retrieve it and mark it `void` from the dashboard instead.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| invoice_id | string | The invoice's ID (`inv_` prefix). |

Example request:

```bash
curl -X DELETE https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5"
```

Example response (HTTP 200):

```json
{
  "id": "inv_7Kd29PxQ4mLw",
  "object": "invoice",
  "deleted": true
}
```

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 404 | invoice_not_found | No invoice exists with this `invoice_id`. |
| 409 | invalid_state | The invoice is not in `draft` status. |

### POST /invoices/{invoice_id}/payments — record a payment

Records a payment against an `open` invoice. When the recorded payments bring `amount_remaining` to zero, the invoice moves to `paid` and an `invoice.paid` webhook event is published. A payment can be partial: `amount` may be less than `amount_remaining`, but never more.

**Auth:** API key (Bearer) required.

Path parameters:

| Name | Type | Description |
|---|---|---|
| invoice_id | string | The invoice's ID (`inv_` prefix). |

Request body:

| Field | Type | Required | Description |
|---|---|---|---|
| amount | integer | Yes | Payment amount in the smallest currency unit. Must be at least 1 and at most the invoice's `amount_remaining`. |
| method | string | Yes | One of `card`, `bank_transfer`, `cash`, `other`. |

Example request:

```bash
curl -X POST https://api.invoicenest.com/v1/invoices/inv_7Kd29PxQ4mLw/payments \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25000,
    "method": "card"
  }'
```

Example response (HTTP 201):

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

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | `amount` is below 1 or above `amount_remaining`, or `method` is not a supported value. |
| 404 | invoice_not_found | No invoice exists with this `invoice_id`. |
| 409 | invalid_state | The invoice is not in `open` status. |

### POST /webhook-endpoints — register a webhook endpoint

Registers a URL to receive webhook event notifications. Supported event types are `invoice.created`, `invoice.sent`, `invoice.paid` and `invoice.voided`.

**Auth:** API key (Bearer) required.

Request body:

| Field | Type | Required | Description |
|---|---|---|---|
| url | string | Yes | HTTPS URL that receives event notifications. |
| events | array | Yes | Event types to subscribe to. At least one entry. |

Example request:

```bash
curl -X POST https://api.invoicenest.com/v1/webhook-endpoints \
  -H "Authorization: Bearer in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.marlowe.example/invoicenest",
    "events": ["invoice.paid", "invoice.sent"]
  }'
```

Example response (HTTP 201):

```json
{
  "id": "we_3Hs6Kd9Px2Qm",
  "object": "webhook_endpoint",
  "url": "https://hooks.marlowe.example/invoicenest",
  "events": ["invoice.paid", "invoice.sent"],
  "enabled": true,
  "created_at": "2026-01-12T11:05:00Z"
}
```

Errors:

| HTTP status | Code | When it happens |
|---|---|---|
| 401 | authentication_error | The API key is missing or invalid. |
| 400 | invalid_request | `url` is not an HTTPS URL, or `events` is empty or contains an unsupported event type. |

## Webhook delivery and retries

Each event is delivered as an HTTP POST with a JSON body to every enabled endpoint subscribed to that event type:

```json
{
  "id": "evt_6Vz1Hs54f8Kd",
  "object": "webhook_event",
  "type": "invoice.paid",
  "invoice_id": "inv_7Kd29PxQ4mLw",
  "created_at": "2026-01-20T16:45:00Z"
}
```

The receiving server must answer within 10 seconds with any 2xx status. Any other status, or no answer, counts as a failed attempt. InvoiceNest retries a failed delivery up to 5 attempts over 24 hours with increasing delays between attempts. After the final failed attempt the delivery is marked `failed` and no further automatic attempts are made; a user can replay the delivery from the dashboard under **Settings → Developers → Webhooks**. Failed deliveries never disable the endpoint on their own.
