import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId } from '@/lib/db';

function seedChallenges() {
  const existing = readTable('challenges');
  if (existing.length > 0) return existing;

  const today = new Date();
  const challenges = [
    {
      id: 1, title: 'Optimize this SQL Query', difficulty: 'Medium', xpReward: 50,
      description: 'A high-traffic e-commerce platform is experiencing slow load times on the order history page. Refactor the nested subqueries into an efficient JOIN structure with proper indexing.',
      category: 'Database',
      starterCode: `-- Original (slow) query:\nSELECT o.id, o.created_at,\n  (SELECT u.name FROM users u WHERE u.id = o.user_id) as user_name,\n  (SELECT SUM(oi.price) FROM order_items oi WHERE oi.order_id = o.id) as total\nFROM orders o\nWHERE o.status = 'completed'\nORDER BY o.created_at DESC;\n\n-- Rewrite using JOINs:`,
      expectedKeywords: ['JOIN', 'GROUP BY', 'SUM'],
      date: new Date(today.getTime()).toDateString(), featured: true
    },
    {
      id: 2, title: 'Big-O Analysis', difficulty: 'Easy', xpReward: 30,
      description: 'Analyze the time complexity of three different sorting algorithm implementations and explain the best/worst case scenarios for each.',
      category: 'Algorithms',
      starterCode: `# Analyze each function's time complexity:\n\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n\ndef binary_search(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1\n\n# Your analysis here:`,
      expectedKeywords: ['O(n)', 'O(log n)', 'O(n^2)'],
      date: new Date(today.getTime() - 1 * 86400000).toDateString(), featured: false
    },
    {
      id: 3, title: 'Regex Master', difficulty: 'Hard', xpReward: 100,
      description: 'Write a regex pattern that validates email addresses, phone numbers (Indian format), and URL strings. Handle edge cases.',
      category: 'String Processing',
      starterCode: `import re\n\n# Write regex patterns:\nemail_pattern = r''\nphone_pattern = r''  # Indian format: +91-XXXXXXXXXX or 10 digits\nurl_pattern = r''\n\n# Test cases:\nassert re.match(email_pattern, 'user@domain.com')\nassert re.match(phone_pattern, '+91-9876543210')\nassert re.match(url_pattern, 'https://parable.ai')\n\nprint("All tests passed!")`,
      expectedKeywords: ['re.', 'pattern', '@'],
      date: new Date(today.getTime() - 2 * 86400000).toDateString(), featured: false
    },
    {
      id: 4, title: 'Tree Traversal', difficulty: 'Medium', xpReward: 50,
      description: 'Implement all four tree traversal methods (inorder, preorder, postorder, level-order) for a binary tree and return results as lists.',
      category: 'Data Structures',
      starterCode: `class TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = None\n        self.right = None\n\ndef inorder(root):\n    # TODO\n    pass\n\ndef preorder(root):\n    # TODO\n    pass\n\ndef postorder(root):\n    # TODO\n    pass\n\ndef level_order(root):\n    # TODO: BFS\n    pass`,
      expectedKeywords: ['def', 'return', 'append'],
      date: new Date(today.getTime() - 3 * 86400000).toDateString(), featured: false
    },
    {
      id: 5, title: 'React Hooks Challenge', difficulty: 'Medium', xpReward: 60,
      description: 'Build a custom React hook `useDebounce` that delays value updates by a specified delay. Then use it in a search component.',
      category: 'Frontend',
      starterCode: `import { useState, useEffect } from 'react';\n\n// Implement the custom hook:\nfunction useDebounce(value, delay) {\n  // TODO\n}\n\n// Example usage:\nexport default function SearchComponent() {\n  const [query, setQuery] = useState('');\n  const debouncedQuery = useDebounce(query, 500);\n\n  useEffect(() => {\n    if (debouncedQuery) {\n      console.log('Searching for:', debouncedQuery);\n    }\n  }, [debouncedQuery]);\n\n  return <input onChange={e => setQuery(e.target.value)} placeholder="Search..." />;\n}`,
      expectedKeywords: ['useState', 'useEffect', 'setTimeout'],
      date: new Date(today.getTime() - 4 * 86400000).toDateString(), featured: false
    },
  ];
  writeTable('challenges', challenges);
  return challenges;
}

function computeStreak(userId) {
  const subs = readTable('challenge_submissions')
    .filter(s => s.userId === userId)
    .map(s => new Date(s.submittedAt).toDateString());
  const uniqueDays = [...new Set(subs)].sort().reverse();

  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = d.toDateString();
    if (uniqueDays.includes(ds)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

// GET /api/challenges — list challenges with user completion status
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const challenges = seedChallenges();
    const subs = decoded ? readTable('challenge_submissions').filter(s => s.userId === decoded.userId) : [];
    const streak = decoded ? computeStreak(decoded.userId) : 0;

    const today = new Date().toDateString();
    const enriched = challenges.map(c => ({
      ...c,
      completed: subs.some(s => s.challengeId === c.id),
      isToday: c.date === today,
    }));

    // Sort: today first, then by date desc
    enriched.sort((a, b) => {
      if (a.isToday) return -1;
      if (b.isToday) return 1;
      return new Date(b.date) - new Date(a.date);
    });

    return NextResponse.json({ challenges: enriched, streak });
  } catch (err) {
    console.error('/api/challenges GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
