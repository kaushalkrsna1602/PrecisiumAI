'use client';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteSummaryAction } from '@/actions/summary-actions';

interface DeleteButtonProps {
    summaryId: string;
}


export default function DeleteButton({ summaryId }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const [isPending , startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
        const result = await deleteSummaryAction({ summaryId });
        if(!result.success) {
            toast.error('Error deleting summary. Please try again.');
        }
        setOpen(false);
        toast.success('Summary deleted successfully.');
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={'ghost'}
                    size="icon"
                    className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-red-200 hover:bg-rose-500"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Summary</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this summary? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                     <Button
                    variant='ghost'
                    className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                 <Button
                    variant='destructive'
                    className="bg-gray-900 hover:bg-gray-600"
                    onClick={handleDelete}
                >
                    {isPending ? 'Deleting...' : 'Delete'}
                </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}