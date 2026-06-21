import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

function seedHackathons() {
  const existing = readTable('hackathons');
  if (existing.length > 0) return existing;

  const seeds = [
    {
      id: 1, title: 'BuildAI Hackathon 2026', organizer: 'ParableLabs',
      description: 'Build the next generation of AI-powered tools. Open to all skill levels. Teams of 1–4.',
      tags: ['AI', 'ML', 'Python', 'APIs'], status: 'open', prize: '₹2,00,000',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      maxTeamSize: 4, createdBy: null, createdAt: new Date().toISOString()
    },
    {
      id: 2, title: 'Web3 DeFi Challenge', organizer: 'TechNova Inc',
      description: 'Design decentralized finance applications. Blockchain, smart contracts, and Web3 stack.',
      tags: ['Web3', 'Blockchain', 'Solidity'], status: 'open', prize: '₹1,50,000',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      maxTeamSize: 3, createdBy: null, createdAt: new Date().toISOString()
    },
    {
      id: 3, title: 'SustainTech Hack', organizer: 'GreenLabs',
      description: 'Solutions for climate, renewable energy, and sustainable supply chains.',
      tags: ['IoT', 'Data', 'Sustainability'], status: 'upcoming', prize: '₹1,00,000',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000).toISOString(),
      maxTeamSize: 5, createdBy: null, createdAt: new Date().toISOString()
    },
    {
      id: 4, title: 'HealthAI Sprint', organizer: 'MedTech Partners',
      description: 'AI for healthcare diagnostics, patient monitoring, and telemedicine.',
      tags: ['Healthcare', 'AI', 'Python'], status: 'completed', prize: '₹75,000',
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      maxTeamSize: 4, createdBy: null, createdAt: new Date().toISOString()
    },
  ];
  writeTable('hackathons', seeds);
  return seeds;
}

// GET /api/hackathons — list all hackathons
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const hackathons = seedHackathons();
    const registrations = readTable('hackathon_registrations');

    // Enrich with registration status for logged-in user
    const enriched = hackathons.map(h => ({
      ...h,
      registrationCount: registrations.filter(r => r.hackathonId === h.id).length,
      isRegistered: decoded ? registrations.some(r => r.hackathonId === h.id && r.userId === decoded.userId) : false,
    }));

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const q = searchParams.get('q');

    let filtered = enriched;
    if (status) filtered = filtered.filter(h => h.status === status);
    if (tag) filtered = filtered.filter(h => h.tags.includes(tag));
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(h => h.title.toLowerCase().includes(ql) || h.description.toLowerCase().includes(ql));
    }

    return NextResponse.json({ hackathons: filtered });
  } catch (err) {
    console.error('/api/hackathons GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/hackathons — create a hackathon (Recruiter/Company Admin)
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
    const { title, description, tags, prize, deadline, startDate, endDate, maxTeamSize } = body;
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const hackathons = seedHackathons();
    const newHackathon = {
      id: nextId(hackathons), title, organizer: decoded.name, description,
      tags: tags || [], prize: prize || 'TBD', status: 'upcoming',
      deadline, startDate, endDate, maxTeamSize: maxTeamSize || 4,
      createdBy: decoded.userId, createdAt: new Date().toISOString()
    };
    hackathons.push(newHackathon);
    writeTable('hackathons', hackathons);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_HACKATHON', targetType: 'hackathon', targetId: newHackathon.id,
      details: `Created hackathon: ${title}` });

    return NextResponse.json({ success: true, hackathon: newHackathon });
  } catch (err) {
    console.error('/api/hackathons POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
