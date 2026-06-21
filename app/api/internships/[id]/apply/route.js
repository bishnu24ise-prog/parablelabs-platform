import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/internships/[id]/apply
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const listingId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const listings = readTable('internship_listings');
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    if (listing.status !== 'open') return NextResponse.json({ error: 'This listing is no longer accepting applications.' }, { status: 400 });

    const applications = readTable('applications');
    const alreadyApplied = applications.some(a => a.listingId === listingId && a.userId === decoded.userId);
    if (alreadyApplied) {
      return NextResponse.json({ error: 'You have already applied to this listing.' }, { status: 400 });
    }

    const body = await request.json();
    const { coverLetter, resumeUrl } = body;

    const newApp = {
      id: nextId(applications),
      listingId, listingTitle: listing.title, company: listing.company,
      userId: decoded.userId, userName: decoded.name, userEmail: decoded.email,
      userRole: decoded.role,
      coverLetter: coverLetter || '', resumeUrl: resumeUrl || '',
      status: 'Applied', appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    applications.push(newApp);
    writeTable('applications', applications);

    // Award XP + badge
    await awardXP(decoded.userId, 75, `Applied to: ${listing.title} at ${listing.company}`);
    await awardBadge(decoded.userId, 'first_apply');

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'APPLY_INTERNSHIP', targetType: 'application', targetId: newApp.id,
      details: `Applied to ${listing.title} at ${listing.company}` });

    return NextResponse.json({ success: true, message: 'Application submitted!', application: newApp });
  } catch (err) {
    console.error('/api/internships/[id]/apply error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
