import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, logAuditEvent } from '@/lib/db';

// ⚠️ MOCK AI — Rule-based scoring. NOT using real AI/LLM.
// Scoring criteria: code length, keyword presence, structure quality

const EVALUATION_CRITERIA = {
  javascript: {
    keywords: ['function', 'const', 'let', 'var', 'return', 'async', 'await', 'import', 'export', 'class'],
    advanced: ['Promise', 'reduce', 'filter', 'map', 'try', 'catch', 'typeof', 'Array', 'Object'],
    antiPatterns: ['eval(', 'document.write(', 'innerHTML ='],
  },
  python: {
    keywords: ['def', 'return', 'import', 'class', 'for', 'while', 'if', 'elif', 'else', 'try', 'except'],
    advanced: ['yield', 'lambda', 'enumerate', 'zip', 'comprehension', '__init__', 'self'],
    antiPatterns: ['exec(', 'eval(', 'input('],
  },
  sql: {
    keywords: ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'INDEX'],
    advanced: ['LEFT JOIN', 'INNER JOIN', 'WITH', 'CTE', 'WINDOW', 'PARTITION BY', 'EXPLAIN'],
    antiPatterns: ['SELECT *', 'NOLOCK'],
  },
};

function mockScore(code, language = 'javascript', taskType = 'general') {
  const lang = EVALUATION_CRITERIA[language.toLowerCase()] || EVALUATION_CRITERIA.javascript;
  const codeUpper = code.toUpperCase();
  const words = code.split(/\s+/).length;

  // Base scores
  let lengthScore = Math.min(words / 50, 1) * 25; // up to 25 points for length
  
  // Keyword coverage
  const foundKeywords = lang.keywords.filter(k => code.includes(k)).length;
  let keywordScore = (foundKeywords / lang.keywords.length) * 30; // up to 30

  // Advanced patterns
  const foundAdvanced = lang.advanced.filter(k => code.includes(k)).length;
  let advancedScore = Math.min(foundAdvanced * 5, 20); // up to 20

  // Structure (functions, proper indentation, comments)
  let structureScore = 0;
  if (code.includes('//') || code.includes('#') || code.includes('/*')) structureScore += 5; // comments
  if (code.includes('\n') && code.split('\n').length > 3) structureScore += 5; // multiline
  if (code.includes('  ') || code.includes('\t')) structureScore += 5; // indentation
  structureScore = Math.min(structureScore, 15); // up to 15

  // Anti-pattern penalties
  const antiPatterns = lang.antiPatterns.filter(p => code.includes(p)).length;
  const penalty = antiPatterns * 5;

  const rawScore = lengthScore + keywordScore + advancedScore + structureScore - penalty;
  const finalScore = Math.max(0, Math.min(10, rawScore / 10)).toFixed(1);

  const breakdown = {
    codeLength: `${words} words`,
    keywordsUsed: `${foundKeywords}/${lang.keywords.length} core keywords`,
    advancedPatterns: `${foundAdvanced} advanced patterns found`,
    structureQuality: `${structureScore}/15 points`,
    penalty: `${penalty} points deducted for anti-patterns`,
  };

  const feedback = [];
  if (foundKeywords < lang.keywords.length * 0.4) {
    feedback.push('Consider using more language-specific constructs.');
  }
  if (words < 20) {
    feedback.push('Solution seems too short — add more implementation detail.');
  }
  if (!code.includes('//') && !code.includes('#')) {
    feedback.push('Adding comments improves code readability.');
  }
  if (foundAdvanced > 2) {
    feedback.push('Good use of advanced patterns!');
  }
  if (parseFloat(finalScore) >= 7) {
    feedback.push('Strong solution overall. Well done!');
  }

  return { score: parseFloat(finalScore), breakdown, feedback };
}

// POST /api/evaluations/submit
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { code, language, taskTitle, taskType } = body;
    if (!code || code.trim().length < 5) {
      return NextResponse.json({ error: 'Please submit some code for evaluation.' }, { status: 400 });
    }

    // ⚠️ MOCK AI SCORING — rule-based, not real AI
    const result = mockScore(code, language || 'javascript', taskType || 'general');

    const evaluations = readTable('ai_evaluations');
    const newEval = {
      id: nextId(evaluations),
      userId: decoded.userId, userName: decoded.name,
      taskTitle: taskTitle || 'Code Evaluation',
      language: language || 'javascript',
      code, score: result.score,
      breakdown: result.breakdown, feedback: result.feedback,
      isMockAI: true, // Clearly flagged
      submittedAt: new Date().toISOString()
    };
    evaluations.push(newEval);
    writeTable('ai_evaluations', evaluations);

    // Award XP based on score
    const xpAwarded = Math.round(result.score * 20); // 0-200 XP based on score
    await awardXP(decoded.userId, xpAwarded, `AI Evaluation: ${taskTitle || 'Code Evaluation'} (score: ${result.score}/10)`);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'AI_EVALUATION_SUBMIT', targetType: 'evaluation', targetId: newEval.id,
      details: `Submitted ${language} code for evaluation. Score: ${result.score}/10` });

    return NextResponse.json({
      success: true,
      evaluation: newEval,
      xpAwarded,
      // ⚠️ Clearly flag this as mock AI
      mockAiWarning: '⚠️ MOCK AI: This score was generated by rule-based heuristics, not a real AI model.',
    });
  } catch (err) {
    console.error('/api/evaluations/submit error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
