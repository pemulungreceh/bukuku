import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center mb-6">
    <div className="p-3 bg-green-50 rounded-full mr-4">
      <Icon className="h-6 w-6 text-green-500" />
    </div>
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  </div>
);

export default SectionHeader;
