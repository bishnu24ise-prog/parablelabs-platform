import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, logAuditEvent } from '@/lib/db';

function seedProjects() {
  const existing = readTable('projects');
  if (existing.length > 0) return existing;

  const seeds = [
    {
      id: 1, title: 'AI Resume Parser', category: 'AI/ML',
      description: 'Build an AI-powered resume parser that extracts structured data (skills, experience, education) from uploaded PDFs.',
      budget: '₹15,000 – ₹25,000', duration: '2 weeks', tags: ['Python', 'NLP', 'FastAPI'],
      status: 'open', postedBy: null, postedByName: 'TechNova Inc',
      requirements: 'Experience with NLP libraries, PDF parsing, REST APIs.',
      postedAt: new Date().toISOString()
    },
    {
      id: 2, title: 'E-commerce Dashboard Redesign', category: 'Frontend',
      description: 'Redesign and rebuild an admin dashboard for an e-commerce platform with React. Mobile-first, real-time data charts.',
      budget: '₹10,000 – ₹18,000', duration: '10 days', tags: ['React', 'Recharts', 'TypeScript'],
      status: 'open', postedBy: null, postedByName: 'GreenCart',
      requirements: 'Strong React + charting experience, eye for design.',
      postedAt: new Date().toISOString()
    },
    {
      id: 3, title: 'Blockchain Voting Smart Contract', category: 'Web3',
      description: 'Develop and audit a voting smart contract on Ethereum. Must include tests and deployment scripts.',
      budget: '₹20,000 – ₹35,000', duration: '3 weeks', tags: ['Solidity', 'Hardhat', 'Ethers.js'],
      status: 'open', postedBy: null, postedByName: 'DemoDAO',
      requirements: 'Solidity experience, familiarity with Hardhat testing.',
      postedAt: new Date().toISOString()
    },
    {
      id: 4, title: 'IoT Sensor Data Pipeline', category: 'Backend',
      description: 'Build a data ingestion pipeline for IoT sensor data using Kafka, Python, and TimescaleDB for time-series storage.',
      budget: '₹30,000 – ₹50,000', duration: '1 month', tags: ['Python', 'Kafka', 'TimescaleDB'],
      status: 'open', postedBy: null, postedByName: 'SustainGrid',
      requirements: 'Backend experience, exposure to streaming data or IoT.',
      postedAt: new Date().toISOString()
    },
  ];
  writeTable('projects', seeds);
  return seeds;
}

// GET /api/projects
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const projects = seedProjects();
    const bids = readTable('project_bids');

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const category = searchParams.get('category');

    let filtered = projects.filter(p => p.status === 'open');
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql));
    }
    if (category) filtered = filtered.filter(p => p.category === category);

    const enriched = filtered.map(p => ({
      ...p,
      bidCount: bids.filter(b => b.projectId === p.id).length,
      hasBid: decoded ? bids.some(b => b.projectId === p.id && b.userId === decoded.userId) : false,
    }));

    return NextResponse.json({ projects: enriched });
  } catch (err) {
    console.error('/api/projects GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/projects — post a new project
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, description, category, budget, duration, tags, requirements } = body;
    if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 });

    const projects = seedProjects();
    const newProject = {
      id: nextId(projects), title, description,
      category: category || 'General', budget: budget || 'TBD',
      duration: duration || 'TBD', tags: tags || [],
      status: 'open', requirements: requirements || '',
      postedBy: decoded.userId, postedByName: decoded.name,
      postedAt: new Date().toISOString()
    };
    projects.push(newProject);
    writeTable('projects', projects);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_PROJECT', targetType: 'project', targetId: newProject.id,
      details: `Posted project: ${title}` });

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    console.error('/api/projects POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
