import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { getClerkInstance } from "@clerk/clerk-expo";

import { getBaseUrl } from "./base-url";

interface UploadResponse {
  presignedUrl: string;
  fileUrl: string;
}

/**
 * Ensures the URI is in the correct format for file upload
 * @param uri The original URI
 * @returns A properly formatted URI for the current platform
 */
function normalizeUri(uri: string): string {
  if (Platform.OS === "ios") {
    // For iOS, ensure we have a proper file:// URI
    if (uri.startsWith("file://")) {
      return uri;
    }
    // If it's a local path without the scheme, add it
    if (uri.startsWith("/")) {
      return `file://${uri}`;
    }
  }
  return uri;
}

const uploadUrl = `${getBaseUrl()}/api/upload`;

/**
 * Uploads an image to the server and returns the URL if successful
 * @param uri The local URI of the image to upload
 * @returns The URL of the uploaded image, or null if upload failed
 */
export async function uploadImage(uri: string): Promise<string | null> {
  try {
    console.log("Starting upload process");

    const clerk = getClerkInstance();
    const token = await clerk.session?.getToken();

    if (!token) {
      console.log("No token found");
      return null;
    }

    // Normalize the URI for proper file access
    const normalizedUri = normalizeUri(uri);
    console.log({ normalizedUri });

    // Verify the file exists before attempting upload
    const fileInfo = await FileSystem.getInfoAsync(normalizedUri);
    console.log({
      exists: fileInfo.exists,
      uri: fileInfo.uri,
      isDirectory: fileInfo.isDirectory,
    });

    if (!fileInfo.exists) {
      console.log("File does not exist");
      return null;
    }

    // Get file info to determine file type and size
    const fileName = normalizedUri.split("/").pop() ?? "image.jpg";
    const fileType = getFileType(fileName);

    // Get presigned URL from your API
    const response = await fetch(uploadUrl, {
      method: "POST", // Still POST to your API to get the presigned URL
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileName,
        fileType,
        fileSize: fileInfo.size || 0,
      }),
    });

    if (!response.ok) {
      console.log(
        `Failed to get presigned URL: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as UploadResponse;
    console.log("Got presigned URL:", data.presignedUrl);

    // Upload file to R2 using the presigned URL with PUT method
    // For R2 presigned URLs, you typically use PUT with binary content
    const uploadResult = await FileSystem.uploadAsync(
      data.presignedUrl,
      normalizedUri,
      {
        httpMethod: "PUT", // Specify PUT method
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT, // Upload as binary content
        headers: {
          "Content-Type": fileType, // Set the correct Content-Type for the file
        },
      },
    );

    console.log({ uploadResult });

    if (uploadResult.status !== 200) {
      console.log(`Upload failed with non-200 status: ${uploadResult.status}`);
      console.log("Upload body:", uploadResult.body); // Log body for more details on error
      return null;
    }

    console.log("Upload successful");
    return data.fileUrl;
  } catch (error) {
    console.log("Upload failed with error", error);
    return null;
  }
}

/**
 * Determines file type based on file extension
 */
function getFileType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "pdf":
      return "application/pdf"; // Added PDF for completeness
    case "mp4":
      return "video/mp4"; // Added MP4 for completeness
    default:
      return "application/octet-stream"; // Default to a generic binary type
  }
}
