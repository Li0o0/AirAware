import { User, Mail, Phone, MapPin, Calendar, FileText, Activity, AlertCircle } from 'lucide-react';

export function PatientProfile() {
  return (
    <div className="space-y-4">
      
      {/* Personal Information */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}>
        <h3 className="text-[#1E293B] text-[0.95rem] mb-3">Personal Information</h3>
        <div className="space-y-3">
          <InfoItem icon={Calendar} label="Date of Birth" value="March 15, 1958 (67 years)" />
          <InfoItem icon={Mail} label="Email" value="john.anderson@email.com" />
          <InfoItem icon={Phone} label="Phone" value="+1 (555) 123-4567" />
          <InfoItem icon={MapPin} label="Address" value="123 Oak St, Springfield, IL" />
        </div>
      </div>

      {/* Medical Information */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}>
        <h3 className="text-[#1E293B] text-[0.95rem] mb-3">Medical Information</h3>
        <div className="space-y-2.5">
          <MedicalRow label="Primary Diagnosis" value="COPD GOLD Stage II" />
          <MedicalRow label="Phenotype" value="Chronic Bronchitis" />
          <MedicalRow label="Diagnosis Date" value="January 2018" />
          <MedicalRow label="Smoking Status" value="Former (quit 2020)" />
        </div>
      </div>

      {/* Current Medications */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}>
        <h3 className="text-[#1E293B] text-[0.95rem] mb-3">Current Medications</h3>
        <div className="space-y-2.5">
          <MedicationItem name="Albuterol (ProAir)" dosage="As needed" />
          <MedicationItem name="Tiotropium (Spiriva)" dosage="Daily" />
          <MedicationItem name="Advair" dosage="Twice daily" />
        </div>
      </div>

      {/* Allergies */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 241, 242, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(251, 113, 133, 0.3)',
        boxShadow: '0 4px 20px rgba(251, 113, 133, 0.08)',
      }}>
        <h3 className="text-[#9F1239] text-[0.95rem] mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Allergies
        </h3>
        <div className="space-y-2">
          <AllergyItem allergen="Penicillin" severity="Severe" />
          <AllergyItem allergen="Sulfa drugs" severity="Moderate" />
        </div>
      </div>

      {/* Healthcare Team */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}>
        <h3 className="text-[#1E293B] text-[0.95rem] mb-3">Healthcare Team</h3>
        <div className="space-y-2.5">
          <TeamMember name="Dr. Sarah Johnson" role="Pulmonologist" phone="+1 (555) 234-5678" />
          <TeamMember name="Dr. Michael Chen" role="Primary Care" phone="+1 (555) 345-6789" />
          <TeamMember name="Emily Rodriguez, RN" role="Care Coordinator" phone="+1 (555) 456-7890" />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="rounded-xl p-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      }}>
        <h3 className="text-[#1E293B] text-[0.95rem] mb-3">Emergency Contact</h3>
        <div className="space-y-3">
          <InfoItem icon={User} label="Name" value="Mary Anderson (Spouse)" />
          <InfoItem icon={Phone} label="Phone" value="+1 (555) 123-4568" />
        </div>
      </div>

    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.75rem] text-slate-500 tracking-wide">{label}</p>
        <p className="text-[0.85rem] text-[#1E293B] mt-0.5">{value}</p>
      </div>
    </div>
  );
}

interface MedicalRowProps {
  label: string;
  value: string;
}

function MedicalRow({ label, value }: MedicalRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <p className="text-[0.8rem] text-slate-500">{label}</p>
      <p className="text-[0.8rem] text-[#1E293B] font-medium">{value}</p>
    </div>
  );
}

interface MedicationItemProps {
  name: string;
  dosage: string;
}

function MedicationItem({ name, dosage }: MedicationItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <div className="flex-1">
        <p className="text-[0.85rem] text-[#1E293B]">{name}</p>
        <p className="text-[0.75rem] text-slate-400 mt-0.5">{dosage}</p>
      </div>
      <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
        Active
      </span>
    </div>
  );
}

interface AllergyItemProps {
  allergen: string;
  severity: string;
}

function AllergyItem({ allergen, severity }: AllergyItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-[0.85rem] text-[#9F1239]">{allergen}</p>
      <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
        {severity}
      </span>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  phone: string;
}

function TeamMember({ name, role, phone }: TeamMemberProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.85rem] text-[#1E293B]">{name}</p>
        <p className="text-[0.75rem] text-slate-500">{role}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Phone className="w-3 h-3 text-slate-400" />
          <p className="text-[0.75rem] text-slate-400">{phone}</p>
        </div>
      </div>
    </div>
  );
}