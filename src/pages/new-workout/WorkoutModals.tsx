
import { Button, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';

export const ExpectedModal = ({
    context,
    id,
    innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
    <>
        <Text size="sm">{innerProps.modalBody}</Text>
        <Button variant='outline' color='blue' fullWidth mt="md" onClick={() => context.closeModal(id)}>
            Close
        </Button>
    </>
);

export const FinishWorkoutModal = () => modals.openConfirmModal({
    title: 'Congratulation! 🎉',
    centered: true,
    withCloseButton: false,
    size: 'sm',
    radius: 'md',
    children: (
        <Text size="sm">
            You have finished the workout!
            <br />
            You will receive a reward and the workout will be saved.
        </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: 'green', variant: 'outline' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirm'),
});

export const DiscardWorkoutModal = ({ handleDiscardWorkout }: { handleDiscardWorkout: () => void }) => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    withCloseButton: false,
    size: 'sm',
    radius: 'md',
    children: (
        <Text size="sm">
            Are you sure you want to discard the workout?
            <br />
            All the exercises will be deleted and you will lose all progress.
            <br />
        </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: 'red', variant: 'outline' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => handleDiscardWorkout(),
});

