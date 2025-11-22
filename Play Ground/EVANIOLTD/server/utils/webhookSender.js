// Webhook Sender Utility
import crypto from 'crypto';
import Webhook from '../models/Webhook.js';

// Send webhook event
export const sendWebhookEvent = async (event, payload) => {
  try {
    // Find all active webhooks that subscribe to this event
    const webhooks = await Webhook.find({
      isActive: true,
      events: { $in: [event] }
    });

    const results = [];

    for (const webhook of webhooks) {
      try {
        // Create signature
        const signature = crypto
          .createHmac('sha256', webhook.secret)
          .update(JSON.stringify(payload))
          .digest('hex');

        // Prepare headers
        const headers = {
          'Content-Type': 'application/json',
          'X-Webhook-Event': event,
          'X-Webhook-Signature': signature,
          'X-Webhook-Timestamp': Date.now().toString(),
          ...webhook.headers
        };

        // Send webhook
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            event,
            payload,
            timestamp: new Date().toISOString()
          }),
          timeout: 10000 // 10 second timeout
        });

        const responseBody = await response.text();

        // Record event
        webhook.events.push({
          event,
          payload,
          status: response.ok ? 'success' : 'failed',
          responseCode: response.status,
          responseBody: responseBody.substring(0, 1000), // Limit response body size
          attempts: 1
        });

        // Update stats
        webhook.stats.totalRequests += 1;
        if (response.ok) {
          webhook.stats.successfulRequests += 1;
        } else {
          webhook.stats.failedRequests += 1;
        }
        webhook.stats.lastTriggeredAt = new Date();

        await webhook.save();

        results.push({
          webhookId: webhook._id,
          webhookName: webhook.name,
          status: response.ok ? 'success' : 'failed',
          statusCode: response.status
        });
      } catch (error) {
        // Record failed event
        webhook.events.push({
          event,
          payload,
          status: 'failed',
          error: error.message,
          attempts: 1
        });

        webhook.stats.totalRequests += 1;
        webhook.stats.failedRequests += 1;

        await webhook.save();

        results.push({
          webhookId: webhook._id,
          webhookName: webhook.name,
          status: 'failed',
          error: error.message
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Error sending webhook events:', error);
    return [];
  }
};

// Verify webhook signature (for incoming webhooks)
export const verifyWebhookSignature = (signature, secret, payload, timestamp) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload) + timestamp)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};

export default { sendWebhookEvent, verifyWebhookSignature };

