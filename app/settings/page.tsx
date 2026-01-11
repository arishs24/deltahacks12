'use client';

import ClinicalLayout from '@/components/clinical/ClinicalLayout';
import { AboutCard } from '@/components/settings/AboutCard';
import { DisclaimerCard } from '@/components/settings/DisclaimerCard';
import { TechnicalInfoCard } from '@/components/settings/TechnicalInfoCard';
import { SupportCard } from '@/components/settings/SupportCard';

export default function SettingsPage() {
  return (
    <ClinicalLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-clinical-grey-900">Settings & About</h1>
          <p className="mt-2 text-clinical-grey-600">
            Application information, disclaimers, and configuration
          </p>
        </div>

        {/* About Section */}
        <AboutCard />

        {/* Disclaimer Section */}
        <DisclaimerCard />

        {/* Technical Information */}
        <TechnicalInfoCard />

        {/* Contact & Support */}
        <SupportCard />
      </div>
    </ClinicalLayout>
  );
}
