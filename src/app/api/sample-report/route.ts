import { createClient } from '@supabase/supabase-js'

const SAMPLE_REPORT_ID = '162deef5-a4ea-4484-bad3-e7f8c88aca2d'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('reports')
    .select('rapor_json, firma_adi, sektor, created_at')
    .eq('id', SAMPLE_REPORT_ID)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(data, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
  })
}
