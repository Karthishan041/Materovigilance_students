import React, { useState } from 'react';
import { 
  Search, Download, ExternalLink, X, Eye, FileText
} from 'lucide-react';

export default function ResourcesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewResource, setPreviewResource] = useState(null);

  const categories = [
    'All',
    'Guidelines & Regulations',
    'Reference Documents',
    'Course Materials',
    'Quick Reference & SOPs',
    'External Resources'
  ];

  const resourcesData = [
    {
      id: 'res-1',
      title: 'Medical Device Rules (MDR 2017) – Statutory Vigilance Framework',
      category: 'Guidelines & Regulations',
      type: 'PDF Document',
      fileSize: '4.2 MB',
      updatedAt: 'Aug 2026',
      source: 'CDSCO / Ministry of Health & Family Welfare',
      description: 'Official statutory legislation governing classification, manufacturing, adverse event reporting timelines, and recall procedures for medical devices in India.',
      keyExcerpt: 'Rule 64 & 65: Mandatory reporting of any adverse event involving serious deterioration in patient health must be submitted to the Central Licensing Authority within 15 calendar days.',
      downloadUrl: '#'
    },
    {
      id: 'res-2',
      title: 'MvPI Medical Device Adverse Event Reporting Form (Form MD-40)',
      category: 'Guidelines & Regulations',
      type: 'Official Form (PDF)',
      fileSize: '1.1 MB',
      updatedAt: 'Sep 2026',
      source: 'Materiovigilance Programme of India (IPC)',
      description: 'Standardized regulatory reporting template used by healthcare professionals and biomedical teams to report device malfunctions, near misses, and patient injuries.',
      keyExcerpt: 'Section B & C: Detailed recording of device brand name, batch/lot number, software firmware version, and clinical intervention required to avert patient harm.',
      downloadUrl: '#'
    },
    {
      id: 'res-3',
      title: 'Medical Device Risk Classification Guidance (Class A, B, C, D)',
      category: 'Reference Documents',
      type: 'Reference Guide',
      fileSize: '2.8 MB',
      updatedAt: 'Jul 2026',
      source: 'Global Harmonization Task Force (GHTF) / CDSCO',
      description: 'Comprehensive taxonomy defining risk tiers: Class A (Low Risk), Class B (Low-Moderate), Class C (Moderate-High), and Class D (High Risk/Implantable).',
      keyExcerpt: 'Includes decision trees for invasive surgical tools, active diagnostic monitors, and life-supporting mechanical ventilation equipment.',
      downloadUrl: '#'
    },
    {
      id: 'res-4',
      title: 'ICU Smart Infusion Pump Incident Investigation Flowchart & SOP',
      category: 'Quick Reference & SOPs',
      type: 'Clinical SOP (PDF)',
      fileSize: '1.5 MB',
      updatedAt: 'Sep 2026',
      source: 'Hospital Clinical Engineering & Safety Committee',
      description: 'Step-by-step bedside protocol for nursing and pharmacy staff upon encountering smart infusion pump rate errors, occlusion alerts, or free-flow hazards.',
      keyExcerpt: 'Step 1: Immediate device isolation without power reset to preserve RAM logs; Step 2: Serial number logging; Step 3: Notification to Materiovigilance officer.',
      downloadUrl: '#'
    },
    {
      id: 'res-5',
      title: 'WHO Guidance on Post-Market Surveillance for Medical Devices',
      category: 'Reference Documents',
      type: 'WHO Global Standard',
      fileSize: '3.6 MB',
      updatedAt: 'May 2026',
      source: 'World Health Organization (WHO)',
      description: 'International best practices for proactive and reactive post-market surveillance, signal detection methodologies, and root cause analysis.',
      keyExcerpt: 'Provides international consensus guidelines for establishing hospital-level vigilance networks and national surveillance registries.',
      downloadUrl: '#'
    },
    {
      id: 'res-6',
      title: 'Medical Device Root Cause Analysis (RCA) 5-Whys Worksheet',
      category: 'Course Materials',
      type: 'Interactive Worksheet (XLS)',
      fileSize: '850 KB',
      updatedAt: 'Aug 2026',
      source: 'VCBL Educational Board',
      description: 'Structured engineering and clinical worksheet for dissecting equipment malfunctions, human-device interface errors, and maintenance lapses.',
      keyExcerpt: 'Includes automated fishbone (Ishikawa) diagram template customized for hospital biomedical engineering investigations.',
      downloadUrl: '#'
    },
    {
      id: 'res-7',
      title: 'ISO 14971: Application of Risk Management to Medical Devices',
      category: 'Reference Documents',
      type: 'Executive Summary (PDF)',
      fileSize: '2.1 MB',
      updatedAt: 'Jun 2026',
      source: 'International Organization for Standardization (ISO)',
      description: 'Executive overview of risk analysis, risk evaluation, risk control measures, and residual risk acceptability thresholds across device lifecycles.',
      keyExcerpt: 'Essential background reading for pharmacy and clinical engineering students undertaking advanced device vigilance simulations.',
      downloadUrl: '#'
    },
    {
      id: 'res-8',
      title: 'Global Medical Device Nomenclature (GMDN) Code Catalog',
      category: 'Reference Documents',
      type: 'Code Reference',
      fileSize: '1.8 MB',
      updatedAt: 'Sep 2026',
      source: 'GMDN Agency',
      description: 'Standardized nomenclature list mapping common medical devices to generic category codes required on international vigilance submissions.',
      keyExcerpt: 'Searchable GMDN index covering 12,000+ medical devices, accessories, and in-vitro diagnostic products.',
      downloadUrl: '#'
    },
    {
      id: 'res-9',
      title: 'Central Drugs Standard Control Organisation (CDSCO) Vigilance Portal',
      category: 'External Resources',
      type: 'Government Portal',
      fileSize: 'External Link',
      updatedAt: 'Live Portal',
      source: 'cdsco.gov.in',
      description: 'Official national online portal for submitting electronic medical device adverse event reports and reviewing nationwide safety alerts.',
      keyExcerpt: 'Direct access to national safety circulars, device recall notices, and public materiovigilance advisories.',
      externalUrl: 'https://cdsco.gov.in'
    },
    {
      id: 'res-10',
      title: 'US FDA MAUDE Medical Device Adverse Event Database',
      category: 'External Resources',
      type: 'Online Database',
      fileSize: 'External Link',
      updatedAt: 'Live Database',
      source: 'fda.gov/maude',
      description: 'Searchable international repository of manufacturer and user facility medical device experience reports dating from 1991 to present.',
      keyExcerpt: 'Search millions of real-world device malfunction reports by manufacturer, brand name, or product code.',
      externalUrl: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm'
    },
    {
      id: 'res-11',
      title: 'ICU Mechanical Ventilator Alarm Escalation Protocol',
      category: 'Quick Reference & SOPs',
      type: 'Clinical SOP (PDF)',
      fileSize: '1.2 MB',
      updatedAt: 'Aug 2026',
      source: 'Critical Care Safety Council',
      description: 'Clinical alarm response hierarchy for high-priority ventilator alerts (Expiratory Valve Fail, Apnea, High Circuit Pressure).',
      keyExcerpt: 'Defines emergency manual bagging trigger points and biomedical callout criteria.',
      downloadUrl: '#'
    },
    {
      id: 'res-12',
      title: 'Defibrillator Daily Energy Discharge & Inspection Checklist',
      category: 'Quick Reference & SOPs',
      type: 'Checklist (PDF)',
      fileSize: '950 KB',
      updatedAt: 'Sep 2026',
      source: 'Emergency Resuscitation Committee',
      description: 'Daily operational log template for verifying defibrillator 30J test discharge, paddle cabling integrity, and battery load reserve.',
      keyExcerpt: 'Daily shift sign-off sheet complying with hospital accreditation guidelines.',
      downloadUrl: '#'
    }
  ];

  const filteredResources = resourcesData.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-5 pb-10">
      
      {/* Header Banner */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Learning Resources
            </h1>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {resourcesData.length} Items
            </span>
          </div>
          <p className="text-xs text-slate-600 font-normal leading-relaxed">
            Access statutory medical device guidelines, official MvPI reporting forms, clinical SOP checklists, and regulatory reference databases.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-md p-4 border border-slate-200 space-y-3">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search resources by title, keyword, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="text-[11px] font-medium text-slate-400 mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0088FF] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clean 2-Column Resource Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-md p-10 border border-slate-200 text-center space-y-2.5">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">No resources found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No materials matched "{searchQuery}" under "{selectedCategory}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="bg-[#0088FF] text-white text-xs font-medium px-3.5 py-1.5 rounded-md hover:bg-[#0070D2] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-md p-4.5 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#0088FF] uppercase tracking-wider">
                    {resource.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.fileSize}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded bg-slate-50 border border-slate-200 text-[#0088FF] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Source: {resource.source}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  Updated: {resource.updatedAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewResource(resource)}
                    className="bg-white hover:bg-slate-50 border border-[#D9E1EA] text-slate-700 font-medium text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View</span>
                  </button>

                  {resource.externalUrl ? (
                    <a
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-medium text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => alert(`Downloading "${resource.title}" (${resource.fileSize})...`)}
                      className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-medium text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RESOURCE PREVIEW MODAL */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md shadow-lg border border-slate-200 w-full max-w-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#0088FF] uppercase tracking-wider">
                  {previewResource.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {previewResource.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {previewResource.source} • {previewResource.type} ({previewResource.fileSize})
                </p>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Document Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-200">
                  {previewResource.description}
                </p>
              </div>

              {previewResource.keyExcerpt && (
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Key Excerpt</h4>
                  <div className="bg-slate-50 p-3 rounded-md text-xs text-slate-700 leading-relaxed border border-slate-200">
                    "{previewResource.keyExcerpt}"
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                <span>Verification ID: VCBL-RES-{previewResource.id.toUpperCase()}</span>
                <span>Last Reviewed: {previewResource.updatedAt}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3.5">
              <button
                onClick={() => setPreviewResource(null)}
                className="bg-white hover:bg-slate-50 border border-[#D9E1EA] text-slate-700 font-medium text-xs px-4 py-1.5 rounded-md cursor-pointer transition-colors"
              >
                Close
              </button>
              {previewResource.externalUrl ? (
                <a
                  href={previewResource.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-medium text-xs px-4 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Launch Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => {
                    alert(`Downloading "${previewResource.title}"...`);
                    setPreviewResource(null);
                  }}
                  className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-medium text-xs px-4 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
