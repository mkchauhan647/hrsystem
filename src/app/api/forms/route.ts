import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { File } from "buffer";
import os from 'os';
import { firestore, storage } from './initializeFirebase';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const candidateData: { [key: string]: string | Blob } = {};

    const email = formData.get('email') as string;
    if (!email) {
        return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    // Check if a candidate with the given email already exists
    const candidatesRef = firestore.collection('candidates');
    const existingCandidateSnapshot = await candidatesRef.where('email', '==', email).get();

    if (!existingCandidateSnapshot.empty) {
        return NextResponse.json({ message: "Candidate with this email already exists." }, { status: 400 });
    }

    // Generate a new document ID
    const docRef = candidatesRef.doc();
    const docId = docRef.id;
    candidateData.id = docId; // Add the generated ID to the candidate data

    const tmpDir = 'uploads'; // Use OS temp directory for temporary file storage
    const fileUploadPromises: Promise<string>[] = [];

    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            const file = value;
            const tempFilePath = path.join(tmpDir, file.name);

            const buffer = await file.arrayBuffer();
            fs.writeFileSync(tempFilePath, new Uint8Array(buffer));

            const uploadPromise = storage.bucket().upload(tempFilePath, {
                destination: `uploads/${file.name}`,
                public: true,
                metadata: {
                    contentType: file.type
                }
            }).then((uploadedFile) => {
                const fileUrl = uploadedFile[0].publicUrl();
                candidateData[key] = fileUrl;

                // Delete the temporary file after uploading
                fs.unlinkSync(tempFilePath);

                console.log('File uploaded successfully', fileUrl);
                return fileUrl;
            });

            fileUploadPromises.push(uploadPromise);
        } else {
            candidateData[key] = value.toString();
        }
    }

    const fileUrls = await Promise.all(fileUploadPromises);

    console.log(fileUrls);

    // Add candidate data to Firestore
    await docRef.set(candidateData);

    return NextResponse.json({ message: "Form submitted successfully", files: fileUrls });
}


export async function GET(req: NextRequest) {
    const candidatesRef = firestore.collection('candidates');
    const candidatesSnapshot = await candidatesRef.get();

    const candidates: { [key: string]: string }[] = [];

    candidatesSnapshot.forEach((doc) => {
        const candidate = doc.data();
        candidates.push(candidate);
    });

    return NextResponse.json(candidates);
}