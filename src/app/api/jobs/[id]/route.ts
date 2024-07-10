// app/api/jobs/[id]/route.js
import {admin, firestore } from '@/lib/firebaseAdmin/initializeFirebase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,context:{params:{id:string}}) {
    
    // console.log('prams', req);
    // const id = URL
    // console.log('context', context);
    const id = context.params.id;
  try {
    const doc = await firestore.collection('jobs').doc(id).get();
    if (!doc.exists) {
      return new Response(JSON.stringify({ error: 'Job not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(doc.data()), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

    // console.log('params', params);
    

    // return NextResponse.json({ msg: "hello World" }, { status: 200 });
}



export async function PUT(req:NextRequest, { params }:any) {
    try {
      const { jobId, companyName, jobDescription, requirements } = await req.json();
      const docRef = firestore.collection('jobs').doc(params.id);
      await docRef.update({
        jobId,
        companyName,
        jobDescription,
        requirements,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      return new Response(JSON.stringify({ id: params.id }), { status: 200 });
    } catch (error:any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
  

export async function DELETE(req:NextRequest, { params }:any) {
  try {
    const docRef = firestore.collection('jobs').doc(params.id);
    await docRef.delete();

    return new Response(JSON.stringify({ message: 'Job deleted successfully' }), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
