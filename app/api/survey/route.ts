import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const survey = await prisma.survey.create({
            data: {
                response: JSON.stringify(data.response),}
        });
        return NextResponse.json(survey, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
    }
}