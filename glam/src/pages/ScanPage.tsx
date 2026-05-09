import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { CameraPlaceholder } from '@/components/scan/CameraPlaceholder'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { Card } from '@/components/ui/Card'

export function ScanPage() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Scan" />
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-2">
        <CameraPlaceholder />
        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-neutral-50">Add without the camera</p>
            <p className="mt-1 text-sm text-neutral-500">
              Upload a flat lay or packaging shot — we’ll parse brand & shade when vision models ship.
            </p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" />
          <PrimaryButton className="w-full gap-2" onClick={() => inputRef.current?.click()}>
            <Upload className="h-4 w-4" aria-hidden />
            Upload photo
          </PrimaryButton>
        </Card>
      </main>
    </div>
  )
}
