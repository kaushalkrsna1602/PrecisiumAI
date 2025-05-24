import Stripe from 'stripe';
import { getDbConnection } from './db';

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log('Checkout session completed:', session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  try {
    if ('email' in customer && priceId) {
      const { email, name } = customer;
      const sql = await getDbConnection();

      await createOrUpdateUser({
        sql,
        email: email as string,
        fullName: name as string, // Provide a default name if not available
        customerId,
        priceId: priceId as string,
        status: 'active',
      });

      await createPayment({
        sql,
        session,
        priceId: priceId as string,
        userEmail: email as string,
      });
    }
  } catch (error) {
    console.error('Error handling checkout session completion:', error);
  }
}

async function createOrUpdateUser({
  sql,
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  sql: any;
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (user.length === 0) {
      await sql`
        INSERT INTO users (email, full_name, customer_id, price_id, status)
        VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
      `;
    } else {
      await sql`
        UPDATE users
        SET full_name = ${fullName},
            customer_id = ${customerId},
            price_id = ${priceId},
            status = ${status}
        WHERE email = ${email}
      `;
    }
  } catch (error) {
    console.error('Error creating or updating user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  userEmail,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const { amount_total, id, status } = session;
    const amount = amount_total ? amount_total / 100 : 0; // Convert from cents

    await sql`
      INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
      VALUES (${amount}, ${status}, ${id}, ${priceId}, ${userEmail})
    `;
  } catch (error) {
    console.error('Error creating payment:', error);
  }
}

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  console.log('Subscription deleted:', subscriptionId);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer as string;

    const sql = await getDbConnection();

    await sql`
      UPDATE users
      SET status = 'cancelled'
      WHERE customer_id = ${customerId}
    `;
    console.log('User status updated to cancelled');
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
    throw error;
  }
}
