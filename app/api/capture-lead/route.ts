import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Save to local leads file
    const leadsPath = path.join(process.cwd(), 'data', 'leads.json');
    const dir = path.dirname(leadsPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let leads: object[] = [];
    try { leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8')); } catch {}
    leads.push(data);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    // TODO: Wire up Kit/ConvertKit when API key is available
    // const KIT_API_KEY = process.env.KIT_API_KEY;
    // const KIT_FORM_ID = process.env.KIT_FORM_ID;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
