'use client';

import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from './upload-form-input';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from '@/actions/upload-actions';
import { use, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from './loading-skeleton';

const schema = z.object({
  file: z
    .instanceof(File, { message: 'File is required' })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      'File size must be less than 20MB'
    )
    .refine((file) => file.type === 'application/pdf', 'File type must be PDF'),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('Uploaded successfully!');
      toast.success('File uploaded successfully!');
    },
    onUploadError: (err) => {
      console.error('Error occurred while uploading', err);
      toast.error(`Upload failed: ${err.message}`);
    },
    onUploadBegin: (data) => {
      console.log('Upload has begun for', data);
      toast.message('Uploading file... Please wait! 🚀');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(isLoading);

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File | null;

      if (!file) {
        toast.error('File is required.');
        return;
      }

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            'Invalid file'
        );
        setIsLoading(false);
        return;
      }

      toast.message('Uploading file... Please wait! 🚀');

      const uploadResponse = await startUpload([file]);

      if (!uploadResponse) {
        toast.error('Something went wrong during upload.');
        setIsLoading(false);
        return;
      }

      toast('Processing PDF summary...');

      const uploadedFileUrl = uploadResponse[0].serverData.fileUrl;

      const result = await generatePdfSummary({
        fileUrl: uploadedFileUrl, // Make sure this is the correct path
        fileName: file.name,
      });

      const { data = null, message = null } = result || {};

      if (data?.summary) {
        toast('We are saving your summary! ✨');

        const storeResult: any = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadedFileUrl, // Make sure this is the correct path
          title: data.title,
          fileName: file.name,
        });

        toast.success('Summary generated and saved successfully! 🎉');
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      } else {
        toast.error(message || 'Failed to generate summary.');
      }
    } catch (error) {
      console.error('Error occurred while uploading', error);
      toast.error('Unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
