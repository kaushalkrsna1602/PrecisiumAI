import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

import { createRouteHandler } from 'uploadthing/next';

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
