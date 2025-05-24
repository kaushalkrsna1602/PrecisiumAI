import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  // Pass blob directly to PDFLoader
  const loader = new PDFLoader(blob);

  const docs = await loader.load();

  // Combine all pages text
  return docs.map((doc) => doc.pageContent).join('\n');
}
