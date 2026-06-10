import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    const body = await request.formData();
    const url = body.get('url');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    if(typeof url !== 'string' || !url) {
        return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400 });
    }

    while(true) {
        const {data, error} = await supabase.from('urls').insert({
            original_url: url,
            short_code: `bry-${Math.random().toString(36).substring(2, 8)}`,
            clicks: 0,
            expires_at: expiresAt.toISOString()
        }).select();

        if(!error) {
            return Response.json({ data });
        }

        if (error.code !== '23505') {
            throw error;
        }
    }
}