import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, logAuditEvent } from '@/lib/db';

function seedInternships() {
  const existing = readTable('internship_listings');
  if (existing.length > 0) return existing;

  const seeds = [
    {
      id: 1, title: 'Frontend Intern — React', company: 'TechNova Inc',
      description: 'Build modern UIs for TechNova\'s SaaS dashboard. You\'ll work with React, TypeScript, and Tailwind.',
      location: 'Bengaluru (Hybrid)', type: 'Internship', duration: '6 months',
      stipend: '₹25,000/month', tags: ['React', 'TypeScript', 'Tailwind'], status: 'open',
      requirements: 'Strong React fundamentals, portfolio of projects.',
      postedBy: null, postedAt: new Date().toISOString()
    },
    {
      id: 2, title: 'ML Engineer Intern', company: 'ParableLabs',
      description: 'Work on real AI evaluation models, RAG pipelines, and LLM integrations.',
      location: 'Remote', type: 'Internship', duration: '3 months',
      stipend: '₹35,000/month', tags: ['Python', 'ML', 'LLMs', 'PyTorch'], status: 'open',
      requirements: 'Python proficiency, ML coursework or projects, interest in LLMs.',
      postedBy: null, postedAt: new Date().toISOString()
    },
    {
      id: 3, title: 'Backend Engineer Intern', company: 'DataFlow Systems',
      description: 'Design and build scalable REST APIs in Node.js with PostgreSQL.',
      location: 'Mumbai (On-site)', type: 'Internship', duration: '6 months',
      stipend: '₹30,000/month', tags: ['Node.js', 'PostgreSQL', 'REST APIs'], status: 'open',
      requirements: 'Node.js basics, understanding of databases, API design.',
      postedBy: null, postedAt: new Date().toISOString()
    },
    {
      id: 4, title: 'DevOps Intern', company: 'CloudStack India',
      description: 'Automate CI/CD pipelines, manage Kubernetes clusters, monitor infrastructure.',
      location: 'Pune (Hybrid)', type: 'Internship', duration: '4 months',
      stipend: '₹20,000/month', tags: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'], status: 'open',
      requirements: 'Linux basics, interest in cloud infrastructure.',
      postedBy: null, postedAt: new Date().toISOString()
    },
    {
      id: 5, title: 'Full Stack Intern', company: 'GreenTech Solutions',
      description: 'Work on sustainability analytics platform using Next.js and Python FastAPI.',
      location: 'Remote', type: 'Internship', duration: '3 months',
      stipend: '₹22,000/month', tags: ['Next.js', 'Python', 'FastAPI', 'React'], status: 'open',
      requirements: 'React and Python experience, able to build end-to-end features.',
      postedBy: null, postedAt: new Date().toISOString()
    },
  ];
  writeTable('internship_listings', seeds);
  return seeds;
}

// GET /api/internships
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const listings = seedInternships();
    const applications = decoded ? readTable('applications').filter(a => a.userId === decoded.userId) : [];

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const tag = searchParams.get('tag');
    const location = searchParams.get('location');

    let filtered = listings.filter(l => l.status === 'open');
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(ql) ||
        l.company.toLowerCase().includes(ql) ||
        l.description.toLowerCase().includes(ql)
      );
    }
    if (tag) filtered = filtered.filter(l => l.tags.includes(tag));
    if (location) filtered = filtered.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));

    const enriched = filtered.map(l => ({
      ...l,
      applicationCount: readTable('applications').filter(a => a.listingId === l.id).length,
      hasApplied: decoded ? applications.some(a => a.listingId === l.id) : false,
    }));

    return NextResponse.json({ listings: enriched });
  } catch (err) {
    console.error('/api/internships GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/internships — create listing (Recruiter/Company Admin)
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['Recruiter', 'Company Admin', 'Platform Admin'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { title, company, description, location, type, duration, stipend, tags, requirements } = body;
    if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 });

    const listings = seedInternships();
    const newListing = {
      id: nextId(listings), title, company: company || decoded.name,
      description, location: location || 'Remote', type: type || 'Internship',
      duration: duration || 'TBD', stipend: stipend || 'TBD',
      tags: tags || [], status: 'open', requirements: requirements || '',
      postedBy: decoded.userId, postedAt: new Date().toISOString()
    };
    listings.push(newListing);
    writeTable('internship_listings', listings);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_LISTING', targetType: 'internship', targetId: newListing.id,
      details: `Created listing: ${title}` });

    return NextResponse.json({ success: true, listing: newListing });
  } catch (err) {
    console.error('/api/internships POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
