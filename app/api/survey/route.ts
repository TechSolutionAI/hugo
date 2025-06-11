import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const data = await req.json();
        const survey = await prisma.survey.create({
            data: {
                userId: session.user.id,
                response: JSON.stringify(data.response),}
        });
        return NextResponse.json(survey, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
    }
}