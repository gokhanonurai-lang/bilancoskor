'use client'

export default function SampleReportModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">BilancoSkor</span>
              <span className="text-xs text-gray-400">Finansal Analiz Raporu</span>
              <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">Örnek</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">Örnek Şirket · Ticaret Sektörü · 46.17.01 · 2025 Yıl Sonu Kesin Mizan</div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <iframe
          src="https://www.bilancoskor.com/report/162deef5-a4ea-4484-bad3-e7f8c88aca2d"
          className="flex-1 w-full"
          style={{ minHeight: '75vh', border: 'none' }}
        />
        <div className="px-6 py-3 border-t border-gray-100 text-center flex-shrink-0">
          <p className="text-xs text-gray-400">Bu bir örnek rapordur. Gerçek raporunuz kendi verilerinizle oluşturulur.</p>
        </div>
      </div>
    </div>
  )
}
