import { Route, Routes } from 'react-router-dom'
import { MobileShell } from '@/components/layout/MobileShell'
import { HomePage } from '@/pages/HomePage'
import { InventoryPage } from '@/pages/InventoryPage'
import { LooksPage } from '@/pages/LooksPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ScanPage } from '@/pages/ScanPage'
import { SocialPage } from '@/pages/SocialPage'
import { TryOnPage } from '@/pages/TryOnPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MobileShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/looks" element={<LooksPage />} />
        <Route path="/try-on" element={<TryOnPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}
