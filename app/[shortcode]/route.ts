import {supabase} from '@/lib/supabase';
import {redirect} from 'next/navigation';

export async function GET(
    request: Request,
    context: { params: Promise<{shortcode: string}> }
) {
    const {shortcode} = await context.params;
    const {data, error} = await supabase
    .from('urls').select('original_url, clicks')
    .eq('short_code', shortcode)
    .single();

    if(error || !data) {
        return new Response(JSON.stringify({ error: 'Shortcode not found' }), { status: 404 });
    }

    await supabase.from('urls')
    .update({clicks: data.clicks +1})
    .eq('short_code', shortcode);
    
    return redirect(data.original_url);
}