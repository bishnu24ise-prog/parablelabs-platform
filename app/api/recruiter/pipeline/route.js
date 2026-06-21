import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/recruiter/pipeline — all applications to this recruiter's listings
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['Recruiter', 'Company Admin', 'Platform Admin'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    let listingsRes;
    if (decoded.role === 'Platform Admin') {
      listingsRes = await dbQuery('SELECT * FROM internship_listings');
    } else {
      listingsRes = await dbQuery('SELECT * FROM internship_listings WHERE "postedBy" = $1', [decoded.userId]);
    }
    const listings = listingsRes.rows;
    const listingIds = listings.map(l => l.id);

    let allApplications = [];
    if (listingIds.length > 0) {
      const allAppRes = await dbQuery(`SELECT * FROM applications WHERE "listingId" = ANY($1)`, [listingIds]);
      allApplications = allAppRes.rows;
    }

    // Group by status
    const pipeline = {
      Applied: allApplications.filter(a => a.status === 'Applied'),
      Reviewed: allApplications.filter(a => a.status === 'Reviewed'),
      Interview: allApplications.filter(a => a.status === 'Interview'),
      Rejected: allApplications.filter(a => a.status === 'Rejected'),
      Hired: allApplications.filter(a => a.status === 'Hired'),
    };

    return NextResponse.json({
      listings,
      applications: allApplications,
      pipeline,
      stats: {
        total: allApplications.length,
        applied: pipeline.Applied.length,
        reviewing: pipeline.Reviewed.length,
        interviewing: pipeline.Interview.length,
        hired: pipeline.Hired.length,
        rejected: pipeline.Rejected.length,
      }
    });
  } catch (err) {
    console.error('/api/recruiter/pipeline error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
