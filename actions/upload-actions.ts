'use server';

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary({fileUrl , fileName} : {fileUrl: string, fileName: string})  {
  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload failed",
      data: null,
    };
  }

  if (!fileUrl) {
    return {
      success: false,
      message: "No file URL found",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      // call OPEN AI
      if (error instanceof Error && error.message.includes("Rate limit exceeded")) {
        try {
          summary = await generateSummaryFromOpenAI(pdfText);
        } catch (error) {
          console.error("Error while generating summary:", error);
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: fileName,
        summary,
      },
    };
  } catch (error) {
    console.error("Error while fetching or parsing PDF:", error);
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();

    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      ) RETURNING id, summary_text
    `;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    return null;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  //user is logged in and has an userid
  //SavedPDf summary
  //savePdfsumaary()

  let savedSummary: any;
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'User not authenticated.',
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary. Please try again.',
      };
    }


  } catch (error) {
    console.error('Error saving PDF summary:', error); // Log the error for debugging

    return {
      success: false,
      message:
        error instanceof Error ? `Error saving PDF summary: ${error.message}` : 'An unexpected error occurred while saving the PDF summary.',
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`)

  return {
    success: true,
    message: 'PDF summary saved successfully.',
    data: {
      id: savedSummary.id,
    }
  };
}