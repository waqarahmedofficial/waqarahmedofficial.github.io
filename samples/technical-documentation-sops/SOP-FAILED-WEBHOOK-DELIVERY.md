# SOP: handling a failed webhook delivery

| Item | Detail |
|---|---|
| SOP ID | SOP-SUP-014 |
| Version | 1.2 |
| Owner | Support Lead |
| Applies to | InvoiceNest support team |
| Effective from | 2026-01-05 |
| Review cycle | Every 3 months, or after any change to webhook delivery |

## Purpose

This procedure tells the support team how to handle a webhook delivery that InvoiceNest has marked `failed`, so that the customer's system receives the event it missed and the ticket is resolved with evidence, not guesses.

## Scope

This SOP covers failed deliveries for all webhook event types (`invoice.created`, `invoice.sent`, `invoice.paid`, `invoice.voided`) on customer-registered webhook endpoints. It does not cover building or debugging the customer's receiving server; that work stays with the customer, with the information this procedure collects.

## Background

When an event happens, InvoiceNest sends it as an HTTP POST to every enabled webhook endpoint subscribed to that event type. The receiving server must answer within 10 seconds with any 2xx status. InvoiceNest retries a failed delivery up to 5 attempts over 24 hours with increasing delays between attempts. After the final failed attempt, the delivery is marked `failed` and no further automatic attempts are made. A failed delivery never disables the endpoint on its own.

A delivery carries a payload like this:

```json
{
  "id": "evt_6Vz1Hs54f8Kd",
  "object": "webhook_event",
  "type": "invoice.paid",
  "invoice_id": "inv_7Kd29PxQ4mLw",
  "created_at": "2026-01-20T16:45:00Z"
}
```

## Roles

| Role | Responsibility |
|---|---|
| Support Agent (Level 1) | Runs steps 1–9, communicates with the customer, records the outcome. |
| Support Lead (Level 2) | Takes escalations, approves a second replay, decides whether an incident is opened. |
| On-call Engineer (Level 3) | Investigates suspected platform-side delivery faults. |
| Customer contact | Confirms their endpoint URL, server availability and the response their server returns. |

## Procedure

1. Open the ticket and confirm it concerns a delivery marked `failed`, not a delivery that is still inside its automatic retry window of 5 attempts over 24 hours. If retries are still pending, tell the customer the next attempt time shown in the delivery log and stop here.
2. Open the delivery log in the dashboard under **Settings → Developers → Webhooks**, select the customer's webhook endpoint, and open the **Deliveries** tab.
3. Record the delivery details in the ticket: the event ID (`evt_` prefix), the event type, the webhook endpoint ID (`we_` prefix), the time of the first attempt and the time of the last attempt.
4. Read the response recorded for the last attempt. Note the HTTP status the customer's server returned, or that no answer arrived within 10 seconds (a timeout).
5. Check the endpoint record. Confirm `enabled` is `true` and that the registered `url` is exactly the URL the customer expects, character for character.
6. Confirm the underlying event is real. For an `invoice.paid` delivery, retrieve the invoice named in the payload with `GET /invoices/{invoice_id}` (or find it by its `number` in the dashboard) and confirm its status and `amount_paid` match the event. If the event itself is wrong, do not replay; escalate under step 11.
7. Ask the customer to confirm two things in writing: that their server is running and reachable at the registered `url`, and the response their server returns for a test POST. Give them the event ID and the attempt times from step 3 so they can find the requests in their own logs.
8. When the customer confirms their server is ready, replay the delivery once from the **Deliveries** tab by choosing **Replay** on the failed delivery.
9. Watch the replay result in the delivery log. If the customer's server answers with a 2xx status, the delivery is marked `delivered`; tell the customer, record the replay time in the ticket, and close the ticket using the checklist below.
10. If the replay fails, do not replay again. Send the customer the new response code and attempt time, and ask them to fix the cause on their server. Keep the ticket open and agree the next check time with the customer.
11. Escalate to the Support Lead when any of these is true: the event itself appears wrong (step 6), the same endpoint shows failed deliveries for three or more separate events in one day, or the customer reports the problem is affecting payments they can see in their dashboard.
12. Record the final outcome in the ticket: event ID, endpoint ID, root cause in one sentence, whether a replay succeeded, and any escalation reference. Then close the ticket using the checklist below.

## Common response patterns

| Last response | Likely cause | First action |
|---|---|---|
| 404 | The path in the registered `url` is wrong, or the route was removed. | Ask the customer to confirm the full `url` (step 5). |
| 500 | The customer's server errored while handling the event. | Ask for their server log for the attempt time (step 7). |
| Timeout (no answer in 10 seconds) | The customer's server is down or too slow. | Ask the customer to confirm server availability (step 7). |
| 401 or 403 | The customer's server is rejecting requests it does not recognise. | Ask the customer to allow deliveries from InvoiceNest and to check any signature or allowlist settings on their side. |

## Escalation path

| Level | Who | When | Response target |
|---|---|---|---|
| Level 1 | Support Agent | Every failed-delivery ticket starts here. | First reply within 2 working hours. |
| Level 2 | Support Lead | Any trigger in step 11, or no customer reply after 2 working days. | Review within the same working day. |
| Level 3 | On-call Engineer | The Support Lead suspects a platform-side fault, or failed deliveries affect many endpoints at once. | Immediate; the Support Lead opens an incident if more than one customer is affected. |

Escalations always include the delivery details from step 3. An escalation without an event ID is returned to the agent to complete.

## Checklist

Before closing any failed-delivery ticket, confirm each item:

- [ ] Event ID, event type and webhook endpoint ID are recorded in the ticket.
- [ ] The last recorded response (status code or timeout) is noted in the ticket.
- [ ] The registered `url` was checked character for character against what the customer expects.
- [ ] The underlying invoice or event was verified as real (step 6).
- [ ] At most one replay was attempted by support, and its result and time are recorded.
- [ ] The customer was told the outcome in writing.
- [ ] Any escalation reference (Level 2 or Level 3) is recorded, or the ticket states that no escalation was needed.

## Related documents

- `API-REFERENCE.md` — the webhook endpoint object, `POST /webhook-endpoints`, and the delivery and retry rules under "Webhook delivery and retries".
- `GETTING-STARTED.md` — how customers register for the `invoice.paid` event.
