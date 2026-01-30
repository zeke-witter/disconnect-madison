'use server';
import { revalidatePath } from 'next/cache';

let dummyPledges: any[] = [
  { id: 1, pledgeAction: 'delete_all_accounts', email: 'testemail1@fakeemail.com' },
  { id: 2, pledgeAction: 'deactivate_one_account', email: 'coward@fakeemail.com' } 
];

export async function submitPledgeAction(initialState: any, formData: FormData) {
    console.log(formData);
    try {
        // This is your "dummy API" logic
    const pledgeAction = formData.get('pledgeAction[label]') as string;
    const email = formData.get('email') as string;

    if (!email) {
        throw new Error('Missing required info');
    }

    // Simulate a validation error
    // Use this in tandem with useActionState on the client side 
    // if (!email || !email.includes('@')) {
    //     return { success: false, message: 'Please enter a valid email address' };
    // }

    // Simulate a database operation (e.g., saving data, adding a delay)
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real application, you would perform database operations here
    // await db.saveUser({ name, email });
    const newPledge = {
      id: dummyPledges.length+1,
      pledgeAction,
      email
    };

    dummyPledges.push(newPledge);

    console.log(dummyPledges);

    // Optional: Revalidate the cache for a specific path if data has changed
    // revalidatePath('/');

    // You can return a response (must be serializable)
    return { success: true, message: `${email} pledged to ${pledgeAction}` };
    } catch (error) {
        throw new Error('Caught uknown error');
    }
}

export async function getPledgesAction() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyPledges.length;
}