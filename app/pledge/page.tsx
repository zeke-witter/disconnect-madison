'use client'
// import Form from 'next/form';
import { useState, useActionState } from 'react';
import { submitPledgeAction } from '@/lib/actions';
import { Field, Fieldset, Input, Label, Legend, Radio, RadioGroup, Button } from '@headlessui/react'

const initialState = {
    message: '',
    success: false
};
const pledgeActions = [
    { label: 'Delete all accounts permanently', id: 'delete_all_accounts' },
    { label: 'Delete an account permanently', id: 'delete_an_account' },
    { label: 'Deactivate an account temporarily', id: 'deactivate_one_account' }
];

export default function Page() {
    const [state, formAction] = useActionState(submitPledgeAction, initialState);
    const [selectedPledgeAction, setSelectedPledgeAction] = useState(pledgeActions[0]);

    return (
        <form action={formAction}>
            <Fieldset className="space-y-8">
                <Legend className="text-lg font-bold">Pledge to Free Yourself from Social Media</Legend>
                <p id="pledge-action-label">What do you pledge to do in the next 10 days?</p>
                <RadioGroup name="pledgeAction" value={selectedPledgeAction} onChange={setSelectedPledgeAction} aria-labelledby="pledge-action-label">
                    {pledgeActions.map((action) => (
                        <Field key={action.id} className="flex items-center gap-2">
                            <Radio
                                value={action}
                                className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400">
                                <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
                            </Radio>
                             <Label>{action.label}</Label>
                        </Field>
                    ))}
                </RadioGroup>
                <Field>
                    <Label className="block">Email address</Label>
                    <Input className="mt-1 block" name="email" required />
                </Field>
                <p id="data-use-disclaimer">*(Your email address will <span className="font-bold">NEVER</span> be shared and we will <span className="font-bold">NEVER</span> use it to contact you. It is collected only to ensure a degree of integrity in the pledge count.)</p>
            </Fieldset>
             <Button type="submit" className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
                Submit
            </Button>

            {/* Display the response message */}
            {state?.message && (
                <p style={{ color: state.success ? 'green' : 'red' }}>
                    {state.message}
                </p>
      )}
        </form>
    )
}