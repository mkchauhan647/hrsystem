// app/api/jobs/route.js
import {admin, firestore } from '@/lib/firebaseAdmin/initializeFirebase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
  try {
      const { companyName,title, jobDescription, requirements } = await req.json();

    //   const collectionRef = firestore.collection('jobs').get();
      //   collectionRef.ge 
    //   if(collectionRef.e)

      const docRef = firestore.collection('jobs').doc();
      const docRefId = docRef.id;
        docRef.set({
        id:docRefId,
            companyName,
        title,
        jobDescription,
            requirements,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    return new Response(JSON.stringify({ id: docRef.id }), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
      }
    // console.log('formData',await req.json());
    // console.log('formDatabody', req.body);
    // return new Response(JSON.stringify({ msg: "inserted successfully" }), { status: 200 });
}

export async function GET(req: NextRequest, res: NextResponse) {
    
    const response = await firestore.collection('jobs').get();
    const jobs:object[] = [];

    response.docs.forEach((value) => {
        jobs.push(value.data());
    })

    // console.log(jobs.docs.);
    // const singleJOb = jobs.docs


    return new Response(JSON.stringify({data:jobs}))
}